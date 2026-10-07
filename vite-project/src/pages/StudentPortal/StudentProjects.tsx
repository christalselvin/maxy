import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "./components/ProjectCard";
import EmptyState from "./components/EmptyState";
import { downloadProject, downloadProjectFile } from "./utils/download";
import type { StudentOutletContext } from "./StudentPortalLayout";
import type { Project, ProjectFile } from "./types";

const StudentProjects = () => {
  const { profile } = useOutletContext<StudentOutletContext>();

  const handleDownload = (project: Project) =>
    downloadProject(project.id, project.title);

  const handleDownloadFile = (file: ProjectFile) =>
    downloadProjectFile(file.id, file.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Link
        to="/student-portal/dashboard"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div>
        <h2 className="text-lg font-bold text-gray-900">Projects</h2>
        <p className="mt-0.5 text-sm text-gray-500">
          Everything assigned to you so far.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.projects.length > 0 ? (
          profile.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDownload={handleDownload}
              onDownloadFile={handleDownloadFile}
            />
          ))
        ) : (
          <EmptyState label="projects" />
        )}
      </div>
    </motion.div>
  );
};

export default StudentProjects;
