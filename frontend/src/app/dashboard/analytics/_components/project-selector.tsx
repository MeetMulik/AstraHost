'use client'

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project } from "@/actions/project-actions";

type Props = {
  projects: Project[];
  selectedProjectId: string;
  onProjectChange: (value: string) => void;
};

const ProjectSelector = ({ projects, selectedProjectId, onProjectChange }: Props) => {
  return (
    <Select onValueChange={onProjectChange} value={selectedProjectId}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project: Project) => (
          <SelectItem key={project.projectId} value={project.projectId}>
            {project.projectName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProjectSelector;