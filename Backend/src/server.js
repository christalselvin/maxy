import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import multer from "multer";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { config } from "./config.js";
import { pool, query } from "./db.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });
app.use(cors({
  origin: (origin, callback) => (!origin || config.corsOrigins.includes(origin))
    ? callback(null, true) : callback(new Error("CORS blocked")),
  exposedHeaders: ["Content-Disposition"],
}));
app.use(express.json({ limit: "10mb" }));

const bad = (res, detail, status=400) => res.status(status).json({ detail });
const field = (req, key, fallback="") => typeof req.body?.[key] === "string" ? req.body[key] : fallback;
const tokenPair = (u) => ({
  access: jwt.sign({sub:u.id, role:u.role}, config.jwtSecret, {expiresIn:config.accessTtl}),
  refresh: jwt.sign({sub:u.id, role:u.role, type:"refresh"}, config.jwtSecret, {expiresIn:config.refreshTtl}),
});
function auth(req,res,next){
  const h=req.headers.authorization||"", token=h.startsWith("Bearer ")?h.slice(7):"";
  if(!token) return bad(res,"Authentication credentials were not provided.",401);
  try{req.auth=jwt.verify(token,config.jwtSecret);next();}catch{return bad(res,"Invalid or expired token.",401);}
}
const requireRole=(wanted)=>(req,res,next)=>req.auth?.role===wanted?next():bad(res,"You do not have permission to perform this action.",403);

async function init(){
  const sql=await fs.readFile(path.join(process.cwd(),"Backend/db/schema.sql"),"utf8");
  for(const s of sql.split(";").map(x=>x.trim()).filter(Boolean)) await query(s);
}
const mediaUrl=(key)=>key?"/api/media?key="+encodeURIComponent(key):null;

async function getProfile(studentId){
  const s=await query("SELECT sp.*,pu.phone_number,pu.full_name FROM student_profiles sp JOIN portal_users pu ON pu.id=sp.user_id WHERE sp.id=$1",[studentId]);
  if(!s.rowCount) return null;
  const st=s.rows[0];
  const [projects,certificates]=await Promise.all([
    query("SELECT * FROM projects WHERE student_id=$1 ORDER BY uploaded_at DESC",[studentId]),
    query("SELECT * FROM certificates WHERE student_id=$1 ORDER BY uploaded_at DESC",[studentId]),
  ]);
  const pf=projects.rowCount?await query("SELECT id,project_id,file_name,uploaded_at FROM project_files WHERE project_id=ANY($1::uuid[]) ORDER BY uploaded_at DESC",[projects.rows.map(x=>x.id)]):{rows:[]};
  const cf=certificates.rowCount?await query("SELECT id,certificate_id,file_name,uploaded_at FROM certificate_files WHERE certificate_id=ANY($1::uuid[]) ORDER BY uploaded_at DESC",[certificates.rows.map(x=>x.id)]):{rows:[]};
  const pfiles=id=>pf.rows.filter(x=>x.project_id===id).map(x=>({id:x.id,file:null,name:x.file_name,uploaded_at:x.uploaded_at}));
  const cfiles=id=>cf.rows.filter(x=>x.certificate_id===id).map(x=>({id:x.id,file:null,name:x.file_name,uploaded_at:x.uploaded_at}));
  return {
    id:st.id, phone_number:st.phone_number, full_name:st.full_name, college_name:st.college_name,
    course_name:st.course_name, branch:st.branch, year:st.year, enrollment_type:st.enrollment_type,
    photo:mediaUrl(st.photo_key),
    projects:projects.rows.map(x=>({id:x.id,title:x.title,description:x.description,tech_stack:x.tech_stack,status:x.status,link:x.link,file:null,files:pfiles(x.id),uploaded_at:x.uploaded_at})),
    certificates:certificates.rows.map(x=>({id:x.id,title:x.title,issuer:x.issuer,issue_date:x.issue_date,credential_id:x.credential_id,file:null,files:cfiles(x.id),uploaded_at:x.uploaded_at})),
  };
}
async function saveFiles(table, ownerColumn, ownerId, studentId, files){
  const out=[];
  for(const file of files||[]){
    const id=crypto.randomUUID();
    await query(`INSERT INTO ${table}(id,${ownerColumn},student_id,file_name,mimetype,data) VALUES($1,$2,$3,$4,$5,$6)`,[id,ownerId,studentId,file.originalname,file.mimetype,file.buffer]);
    out.push({id,file:null,name:file.originalname,uploaded_at:new Date().toISOString()});
  }
  return out;
}

app.get("/",(req,res)=>res.json({status:"ok",message:"MaxoTechs Node backend is running"}));
app.get("/health",(req,res)=>res.json({status:"ok",database:"postgres"}));

app.get("/api/auth/captcha/",async(req,res)=>{
  const key=crypto.randomBytes(12).toString("hex"),answer=String(Math.floor(1000+Math.random()*9000));
  await query("INSERT INTO captchas(id,answer,expires_at) VALUES($1,$2,NOW()+INTERVAL '5 minutes')",[key,answer]);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><rect width="100%" height="100%" fill="#f8fafc"/><text x="80" y="38" text-anchor="middle" font-family="monospace" font-size="26" font-weight="700" fill="#1e3a8a">${answer}</text></svg>`;
  res.json({captcha_key:key,image_url:"data:image/svg+xml;base64,"+Buffer.from(svg).toString("base64")});
});
app.post("/api/auth/login/",async(req,res)=>{
  const c=await query("SELECT * FROM captchas WHERE id=$1",[req.body?.captcha_key]);
  if(!c.rowCount)return bad(res,"Captcha is invalid or expired.");
  await query("DELETE FROM captchas WHERE id=$1",[req.body.captcha_key]);
  if(new Date(c.rows[0].expires_at)<new Date()||String(c.rows[0].answer)!==String(req.body?.captcha_value||"").trim())return bad(res,"Captcha is invalid.");
  const u=await query("SELECT * FROM portal_users WHERE phone_number=$1 AND role='student' AND is_active=TRUE",[String(req.body?.phone_number||"").trim()]);
  if(!u.rowCount)return bad(res,"Student account not found.",404);
  res.json({...tokenPair(u.rows[0]),redirect:"/student-portal/dashboard"});
});
app.post("/api/auth/admin/check-phone/",async(req,res)=>{
  const q=await query("SELECT 1 FROM portal_users WHERE phone_number=$1 AND role='admin' AND is_active=TRUE",[String(req.body?.phone_number||"").trim()]);
  if(!q.rowCount)return bad(res,"No Admin account found with that phone number.",404);
  res.json({detail:"Admin account found."});
});
app.post("/api/auth/admin/login/",async(req,res)=>{
  const q=await query("SELECT * FROM portal_users WHERE phone_number=$1 AND role='admin' AND is_active=TRUE",[String(req.body?.phone_number||"").trim()]);
  if(!q.rowCount||req.body?.password!==q.rows[0].password_hash)return bad(res,"Incorrect phone number or password.",401);
  res.json({...tokenPair(q.rows[0]),redirect:"/student-portal/admin"});
});
app.post("/api/auth/refresh/",async(req,res)=>{
  try{
    const p=jwt.verify(req.body?.refresh,config.jwtSecret);
    if(p.type!=="refresh")throw new Error();
    const q=await query("SELECT id,role FROM portal_users WHERE id=$1 AND is_active=TRUE",[p.sub]);
    if(!q.rowCount)throw new Error();
    res.json({access:jwt.sign({sub:p.sub,role:p.role},config.jwtSecret,{expiresIn:config.accessTtl})});
  }catch{return bad(res,"Refresh token is invalid or expired.",401);}
});
app.get("/api/auth/me/",auth,async(req,res)=>{
  const q=await query("SELECT id,phone_number,full_name,role FROM portal_users WHERE id=$1 AND is_active=TRUE",[req.auth.sub]);
  if(!q.rowCount)return bad(res,"User not found.",404);
  res.json(q.rows[0]);
});
app.post("/api/auth/admin/change-credentials/",auth,requireRole("admin"),async(req,res)=>{
  const q=await query("SELECT * FROM portal_users WHERE id=$1 AND role='admin'",[req.auth.sub]);
  if(!q.rowCount)return bad(res,"Admin account not found.",404);
  const u=q.rows[0];
  if(u.phone_number!==String(req.body?.current_phone_number||"").trim()||u.password_hash!==req.body?.current_password)return bad(res,"Current phone number or password is incorrect.",401);
  const phone=String(req.body?.new_phone_number||"").trim()||u.phone_number;
  const password=req.body?.new_password||u.password_hash;
  try{
    const n=await query("UPDATE portal_users SET phone_number=$1,password_hash=$2 WHERE id=$3 RETURNING id,phone_number,full_name,role",[phone,password,u.id]);
    res.json(n.rows[0]);
  }catch(e){if(e.code==="23505")return bad(res,"That phone number is already in use.",409);throw e;}
});

app.get("/api/students/me/",auth,requireRole("student"),async(req,res)=>{
  const q=await query("SELECT id FROM student_profiles WHERE user_id=$1",[req.auth.sub]);
  if(!q.rowCount)return bad(res,"Student profile not found.",404);
  res.json(await getProfile(q.rows[0].id));
});
app.get("/api/admin/students/",auth,requireRole("admin"),async(req,res)=>{
  const q=await query("SELECT sp.id,pu.phone_number,pu.full_name,sp.course_name,sp.college_name,sp.enrollment_type,sp.photo_key,(SELECT count(*) FROM projects p WHERE p.student_id=sp.id) project_count,(SELECT count(*) FROM certificates c WHERE c.student_id=sp.id) certificate_count FROM student_profiles sp JOIN portal_users pu ON pu.id=sp.user_id ORDER BY pu.full_name,pu.phone_number");
  res.json({count:q.rowCount,next:null,previous:null,results:q.rows.map(x=>({id:x.id,phone_number:x.phone_number,full_name:x.full_name,course_name:x.course_name,college_name:x.college_name,enrollment_type:x.enrollment_type,photo:mediaUrl(x.photo_key),project_count:Number(x.project_count),certificate_count:Number(x.certificate_count)}))});
});
app.get("/api/admin/students/:id/",auth,requireRole("admin"),async(req,res)=>{
  const p=await getProfile(req.params.id);if(!p)return bad(res,"Student not found.",404);res.json(p);
});

app.post("/api/admin/students/",auth,requireRole("admin"),upload.single("photo"),async(req,res)=>{
  const client=await pool.connect();
  try{
    await client.query("BEGIN");
    const phone=field(req,"phone_number").trim();if(!phone){await client.query("ROLLBACK");return bad(res,"Phone number is required.");}
    const u=await client.query("INSERT INTO portal_users(phone_number,full_name,role) VALUES($1,$2,'student') RETURNING id",[phone,field(req,"full_name")]);
    const s=await client.query("INSERT INTO student_profiles(user_id,college_name,course_name,branch,year,enrollment_type) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",[u.rows[0].id,field(req,"college_name"),field(req,"course_name"),field(req,"branch"),field(req,"year"),field(req,"enrollment_type","course")]);
    if(req.file){const key="student/"+s.rows[0].id;await client.query("UPDATE student_profiles SET photo_key=$1,photo_name=$2 WHERE id=$3",[key,req.file.originalname,s.rows[0].id]);await client.query("INSERT INTO stored_files(key,data,mimetype) VALUES($1,$2,$3) ON CONFLICT(key) DO UPDATE SET data=EXCLUDED.data,mimetype=EXCLUDED.mimetype",[key,req.file.buffer,req.file.mimetype]);}
    await client.query("COMMIT");
    res.status(201).json(await getProfile(s.rows[0].id));
  }catch(e){await client.query("ROLLBACK");if(e.code==="23505")return bad(res,"That phone number is already in use.",409);throw e;}finally{client.release();}
});
app.patch("/api/admin/students/:id/",auth,requireRole("admin"),upload.single("photo"),async(req,res)=>{
  const s=await query("SELECT user_id FROM student_profiles WHERE id=$1",[req.params.id]);if(!s.rowCount)return bad(res,"Student not found.",404);
  const uid=s.rows[0].user_id,u=await query("SELECT phone_number,full_name FROM portal_users WHERE id=$1",[uid]);
  const phone=field(req,"phone_number",u.rows[0].phone_number).trim();
  try{
    await query("UPDATE portal_users SET phone_number=$1,full_name=$2 WHERE id=$3",[phone,field(req,"full_name",u.rows[0].full_name),uid]);
    await query("UPDATE student_profiles SET college_name=$1,course_name=$2,branch=$3,year=$4,enrollment_type=$5 WHERE id=$6",[field(req,"college_name"),field(req,"course_name"),field(req,"branch"),field(req,"year"),field(req,"enrollment_type","course"),req.params.id]);
    if(req.file){const key="student/"+req.params.id;await query("UPDATE student_profiles SET photo_key=$1,photo_name=$2 WHERE id=$3",[key,req.file.originalname,req.params.id]);await query("INSERT INTO stored_files(key,data,mimetype) VALUES($1,$2,$3) ON CONFLICT(key) DO UPDATE SET data=EXCLUDED.data,mimetype=EXCLUDED.mimetype",[key,req.file.buffer,req.file.mimetype]);}
    res.json(await getProfile(req.params.id));
  }catch(e){if(e.code==="23505")return bad(res,"That phone number is already in use.",409);throw e;}
});
app.delete("/api/admin/students/:id/",auth,requireRole("admin"),async(req,res)=>{const q=await query("DELETE FROM student_profiles WHERE id=$1 RETURNING id",[req.params.id]);if(!q.rowCount)return bad(res,"Student not found.",404);res.status(204).send();});

app.post("/api/admin/students/:id/projects/",auth,requireRole("admin"),upload.array("files"),async(req,res)=>{
  const s=await query("SELECT id FROM student_profiles WHERE id=$1",[req.params.id]);if(!s.rowCount)return bad(res,"Student not found.",404);
  const title=field(req,"title").trim();if(!title)return bad(res,"Title is required.");
  const p=await query("INSERT INTO projects(student_id,title,description,tech_stack,status,link,assigned_by) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id",[req.params.id,title,field(req,"description"),field(req,"tech_stack"),field(req,"status","planned"),field(req,"link"),req.auth.sub]);
  await saveFiles("project_files","project_id",p.rows[0].id,req.params.id,req.files);
  const full=await getProfile(req.params.id);res.status(201).json(full.projects.find(x=>x.id===p.rows[0].id));
});
app.post("/api/admin/students/:id/certificates/",auth,requireRole("admin"),upload.array("files"),async(req,res)=>{
  const s=await query("SELECT id FROM student_profiles WHERE id=$1",[req.params.id]);if(!s.rowCount)return bad(res,"Student not found.",404);
  const title=field(req,"title").trim();if(!title)return bad(res,"Title is required.");
  const c=await query("INSERT INTO certificates(student_id,title,issuer,issue_date,credential_id,assigned_by) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",[req.params.id,title,field(req,"issuer"),field(req,"issue_date",""),field(req,"credential_id"),req.auth.sub]);
  await saveFiles("certificate_files","certificate_id",c.rows[0].id,req.params.id,req.files);
  const full=await getProfile(req.params.id);res.status(201).json(full.certificates.find(x=>x.id===c.rows[0].id));
});
app.patch("/api/admin/projects/:id/",auth,requireRole("admin"),upload.array("files"),async(req,res)=>{
  const q=await query("SELECT * FROM projects WHERE id=$1",[req.params.id]);if(!q.rowCount)return bad(res,"Not found.",404);const p=q.rows[0];
  await query("UPDATE projects SET title=$1,description=$2,tech_stack=$3,status=$4,link=$5 WHERE id=$6",[field(req,"title",p.title),field(req,"description",p.description),field(req,"tech_stack",p.tech_stack),field(req,"status",p.status),field(req,"link",p.link),p.id]);
  await saveFiles("project_files","project_id",p.id,p.student_id,req.files);
  const full=await getProfile(p.student_id);res.json(full.projects.find(x=>x.id===p.id));
});
app.patch("/api/admin/certificates/:id/",auth,requireRole("admin"),upload.array("files"),async(req,res)=>{
  const q=await query("SELECT * FROM certificates WHERE id=$1",[req.params.id]);if(!q.rowCount)return bad(res,"Not found.",404);const c=q.rows[0];
  await query("UPDATE certificates SET title=$1,issuer=$2,issue_date=$3,credential_id=$4 WHERE id=$5",[field(req,"title",c.title),field(req,"issuer",c.issuer),field(req,"issue_date",c.issue_date||""),field(req,"credential_id",c.credential_id),c.id]);
  await saveFiles("certificate_files","certificate_id",c.id,c.student_id,req.files);
  const full=await getProfile(c.student_id);res.json(full.certificates.find(x=>x.id===c.id));
});
app.delete("/api/admin/projects/:id/",auth,requireRole("admin"),async(req,res)=>{const q=await query("DELETE FROM projects WHERE id=$1 RETURNING id",[req.params.id]);if(!q.rowCount)return bad(res,"Not found.",404);res.status(204).send()});
app.delete("/api/admin/certificates/:id/",auth,requireRole("admin"),async(req,res)=>{const q=await query("DELETE FROM certificates WHERE id=$1 RETURNING id",[req.params.id]);if(!q.rowCount)return bad(res,"Not found.",404);res.status(204).send()});
app.delete("/api/admin/project-files/:id/",auth,requireRole("admin"),async(req,res)=>{const q=await query("DELETE FROM project_files WHERE id=$1 RETURNING id",[req.params.id]);if(!q.rowCount)return bad(res,"Not found.",404);res.status(204).send()});
app.delete("/api/admin/certificate-files/:id/",auth,requireRole("admin"),async(req,res)=>{const q=await query("DELETE FROM certificate_files WHERE id=$1 RETURNING id",[req.params.id]);if(!q.rowCount)return bad(res,"Not found.",404);res.status(204).send()});
app.post("/api/admin/projects/:id/files/",auth,requireRole("admin"),upload.array("files"),async(req,res)=>{const q=await query("SELECT student_id FROM projects WHERE id=$1",[req.params.id]);if(!q.rowCount)return bad(res,"Not found.",404);res.status(201).json(await saveFiles("project_files","project_id",req.params.id,q.rows[0].student_id,req.files))});
app.post("/api/admin/certificates/:id/files/",auth,requireRole("admin"),upload.array("files"),async(req,res)=>{const q=await query("SELECT student_id FROM certificates WHERE id=$1",[req.params.id]);if(!q.rowCount)return bad(res,"Not found.",404);res.status(201).json(await saveFiles("certificate_files","certificate_id",req.params.id,q.rows[0].student_id,req.files))});

async function fileEndpoint(req,res,table,id,inline){
  const q=await query(`SELECT student_id,file_name,mimetype,data FROM ${table} WHERE id=$1`,[id]);
  if(!q.rowCount)return bad(res,"File not found.",404);
  if(req.auth.role==="student"){
    const me=await query("SELECT id FROM student_profiles WHERE user_id=$1",[req.auth.sub]);
    if(!me.rowCount||me.rows[0].id!==q.rows[0].student_id)return bad(res,"Access denied.",403);
  }
  const f=q.rows[0];res.set("Content-Type",f.mimetype||"application/octet-stream");res.set("Content-Disposition",`${inline?"inline":"attachment"}; filename*=UTF-8''${encodeURIComponent(f.file_name)}`);res.send(f.data);
}
for(const [url,table] of [["project-files","project_files"],["certificate-files","certificate_files"]]){
  app.get(`/api/${url}/:id/download/`,auth,(req,res)=>fileEndpoint(req,res,table,req.params.id,false));
  app.get(`/api/${url}/:id/preview/`,auth,(req,res)=>fileEndpoint(req,res,table,req.params.id,true));
}
app.get("/api/projects/:id/download/",auth,(req,res)=>fileEndpoint(req,res,"project_files",req.params.id,false));
app.get("/api/projects/:id/preview/",auth,(req,res)=>fileEndpoint(req,res,"project_files",req.params.id,true));
app.get("/api/certificates/:id/download/",auth,(req,res)=>fileEndpoint(req,res,"certificate_files",req.params.id,false));
app.get("/api/certificates/:id/preview/",auth,(req,res)=>fileEndpoint(req,res,"certificate_files",req.params.id,true));

app.get("/api/media",async(req,res)=>{const q=await query("SELECT data,mimetype FROM stored_files WHERE key=$1",[String(req.query.key||"")]);if(!q.rowCount)return bad(res,"File not found.",404);res.set("Content-Type",q.rows[0].mimetype||"application/octet-stream");res.send(q.rows[0].data)});

app.post("/login",async(req,res)=>{const q=await query("SELECT * FROM users WHERE username=$1",[req.body?.username]);if(!q.rowCount)return bad(res,"User not found",404);if(req.body?.password!==q.rows[0].password_hash)return bad(res,"Invalid password",401);res.json({message:"Login successful"})});
app.post("/register",async(req,res)=>{const {username,password}=req.body||{};if(!username||!password)return bad(res,"Enter all fields");try{await query("INSERT INTO users(username,password_hash) VALUES($1,$2)",[username,password]);res.status(201).json({message:"User inserted successfully"})}catch(e){if(e.code==="23505")return bad(res,"Username already exists",409);throw e}});
app.post("/blog",async(req,res)=>{const {title,heading,subheading,content,author,category,tags,image_link,video_link}=req.body||{};if(!title||!content||!author||!tags)return bad(res,"All required fields must be filled");await query("INSERT INTO blogs(title,heading,subheading,content,author,category,tags,image_link,video_link) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",[title,heading,subheading,content,author,category,JSON.stringify(tags),image_link,video_link]);res.status(201).json({message:"Blog stored successfully"})});
app.post("/contact",async(req,res)=>{const {name,email,phone_number,business_category,company_name}=req.body||{};if(!name||!email||!phone_number||!business_category)return bad(res,"All required fields must be filled");await query("INSERT INTO contacts(name,email,phone_number,business_category,company_name) VALUES($1,$2,$3,$4,$5)",[name,email,phone_number,business_category,company_name]);res.status(201).json({message:"Contact stored successfully")});
app.get("/blogs",async(req,res)=>{const q=await query("SELECT id,title,heading,subheading,content,author,category,tags,image_link,video_link,created_at FROM blogs ORDER BY created_at DESC");res.json(q.rows.map(b=>({...b,_id:b.id})))});
app.get("/blogs/titles",async(req,res)=>{const q=await query("SELECT title FROM blogs ORDER BY created_at DESC");res.json({titles:q.rows.map(x=>x.title)})});
app.get("/contacts",async(req,res)=>{const q=await query("SELECT id,name,email,phone_number,business_category,company_name,created_at FROM contacts ORDER BY created_at DESC");res.json(q.rows.map(c=>({...c,_id:c.id})))});
app.get("/blogs/search",async(req,res)=>{const title=String(req.query.title||"").trim();if(!title)return bad(res,"Title query parameter is required");const q=await query("SELECT id,title,heading,subheading,content,author,category,tags,image_link,video_link,created_at FROM blogs WHERE title ILIKE '%'||$1||'%' ORDER BY created_at DESC",[title]);res.json({count:q.rowCount,blogs:q.rows.map(b=>({...b,_id:b.id}))})});

app.use((error,req,res,next)=>{console.error(error);if(error instanceof multer.MulterError)return bad(res,error.message,400);res.status(500).json({detail:error.message||"Internal server error"})});
init().then(()=>app.listen(config.port,"0.0.0.0",()=>console.log(`MaxoTechs Node API listening on port ${config.port}`))).catch((error)=>{console.error("Startup failed:",error);process.exit(1)});
