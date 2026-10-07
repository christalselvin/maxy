import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CertificateCard from "./components/CertificateCard";
import EmptyState from "./components/EmptyState";
import { downloadCertificate, downloadCertificateFile } from "./utils/download";
import type { StudentOutletContext } from "./StudentPortalLayout";
import type { Certificate, CertificateFile } from "./types";

const StudentCertificates = () => {
  const { profile } = useOutletContext<StudentOutletContext>();

  const handleDownload = (certificate: Certificate) =>
    downloadCertificate(certificate.id, certificate.title);

  const handleDownloadFile = (file: CertificateFile) =>
    downloadCertificateFile(file.id, file.name);

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
        <h2 className="text-lg font-bold text-gray-900">Certificates</h2>
        <p className="mt-0.5 text-sm text-gray-500">
          All the certificates assigned to you so far.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {profile.certificates.length > 0 ? (
          profile.certificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onDownload={handleDownload}
              onDownloadFile={handleDownloadFile}
            />
          ))
        ) : (
          <EmptyState label="certificates" />
        )}
      </div>
    </motion.div>
  );
};

export default StudentCertificates;
