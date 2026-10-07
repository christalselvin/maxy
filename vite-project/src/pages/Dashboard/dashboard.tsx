import BlogPage from "../Login/blog";
import CreateBlog from "../Login/CreateBlog";

const Dashboard = () => {
  return (
    <>
      

      <section className="mb-10">
        <CreateBlog />
      </section>

      <section>
        <BlogPage />
      </section>
    </>
  );
};

export default Dashboard;
