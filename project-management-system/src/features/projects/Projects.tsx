import { useState } from 'react';

import ProjectForm from './components/ProjectForm';

import type { Project } from './types/project.types';
import type { ProjectFormValues } from './schemas/project.schema';

function Projects() {

  const [projects, setProjects] = useState<Project[]>([]);

  function handleCreateProject(data: ProjectFormValues) {

    const newProject: Project = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    setProjects((previousProjects) => [
      newProject,
      ...previousProjects
    ]);
  }

  return (
    <main className="projects-page">

      <div className="projects-heading">
        <h1>Project Management</h1>
        <p>Create and manage your organization projects.</p>
      </div>

      <section className="project-form-container">

        <h2>Create New Project</h2>

        <ProjectForm
          onCreateProject={handleCreateProject}
        />

      </section>

      {/* Project List */}

      <section className="created-projects">

        <div className="projects-list-heading">
          <h2>Created Projects</h2>
          <span>{projects.length} Projects</span>
        </div>

        {projects.length === 0 ? (

          <div className="empty-state">
            <h3>No projects created yet</h3>
            <p>Create your first project using the form above.</p>
          </div>

        ) : (

          <div className="projects-grid">

            {projects.map((project) => (

              <article className="project-card" key={project.id}>

                <div className="project-card-heading">
                  <h3>{project.projectName}</h3>

                  <span className={`priority ${project.priority.toLowerCase()}`}>
                    {project.priority}
                  </span>
                </div>

                <p>{project.description}</p>

                <div className="project-meta">
                  <span>Manager: {project.managerId}</span>
                  <span>
                    {project.startDate} – {project.endDate}
                  </span>
                  <span>
                    {project.milestones.length} Milestones
                  </span>
                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Projects;