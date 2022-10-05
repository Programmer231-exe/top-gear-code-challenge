import { Project } from "../core/geo_app_types";
import ProjectGridView from "./ProjectGridView";
import ProjectListView from "./ProjectListView";

interface ProjectViewProps {
  view: string;
  projects: [Project];
}

const ProjectView = (props: ProjectViewProps) => {
  const { view, projects } = props;
  if (view === "list") {
    return <ProjectListView projects={projects} />;
  } else {
    return <ProjectGridView projects={projects} />;
  }
};

export default ProjectView;
