import styles from "../styles/Projects.module.css";
import projects from "../projects.json";
import ProjectCard from "../components/ProjectCard";
import Link from "next/link";
export default function projectsPage() {
  return (
    <div className={styles.container}>
      <Link className={styles.back_link} href="/">
        {"<Back"}
      </Link>
      <h1 className={styles.header_text}>Projects</h1>
      <div className={styles.project_card_container}>
        <div className={styles.project_cards_carousel}>
          {projects.map((project, i) => {
            return <ProjectCard key={`proj-${i}`} project={project} />;
          })}
        </div>
      </div>
    </div>
  );
}
