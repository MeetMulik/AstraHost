"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ExternalLink, Github } from "lucide-react";
import { Project } from "@/actions/project-actions";
import { format } from "date-fns";

const ProjectCard = ({ project }: { project: Project }) => {
  const [status, setStatus] = useState("Loading...");
  const [statusHistory, setStatusHistory] = useState<boolean[]>([]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`http://${project.subdomain}.localhost:8001/`);
        setStatus(response.ok ? "Online" : "Offline");
      } catch (error) {
        setStatus("Offline");
      }
    };
    checkStatus();

    setStatusHistory(
      Array(90)
        .fill(true)
        .map(() => Math.random() > 0.05)
    );
  }, [project.subdomain]);

  const uptime = ((statusHistory.filter(Boolean).length / statusHistory.length) * 100).toFixed(3);

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center justify-between mb-4 space-x-2">
          <a
            href={`http://${project?.subdomain}.localhost:8001`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {project.projectName}
            <ExternalLink size={16} className="ml-2" />
          </a>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "Online"
                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
            }`}
          >
            {status}
          </span>
        </div>
        <span className="text-green-500">{uptime}% uptime</span>
      </div>
      <div className="flex mb-4">
        {statusHistory.map((status, index) => (
          <div key={index} className={`flex-1 h-8 ${status ? "bg-green-500" : "bg-red-500"} mr-0.5 last:mr-0`}></div>
        ))}
      </div>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        <Github size={18} className="mr-2" />
        View on GitHub
      </a>
    </motion.div>
  );
};

const ProjectsTab = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="bg-gray-900 text-white p-8 rounded-xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-2">
          <CheckCircle size={24} className="text-green-500 mr-2" />
          <h1 className="text-2xl font-bold">All services are online</h1>
        </div>
        <p suppressHydrationWarning className="text-gray-400">
          Last updated on {format(new Date(), "PPpp")}
        </p>
      </div>
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Current status by service</h2>
          <div className="flex items-center">
            <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
            <span>Operational</span>
          </div>
        </div>
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.projectId} project={project} />
          ))}
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm">Powered by AstraHost</div>
    </div>
  );
};

export default ProjectsTab;
