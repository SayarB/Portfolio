import { useState } from "react";
import styles from "../styles/Card.module.css";
export default function ProjectCard({ project }) {
  return (
    <div className={styles.card_container}>
      <div className={styles.project_card}>
        <div className={styles.links}>
          <a href={project.visit}>Visit</a>
          <a href={project.github}>Github</a>
        </div>
        <div className={styles.card_text}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
        <div className={styles.stack_images}>
          {project.stack.map((tech, i) => {
            return <img key={"tech-" + i} src={`/${tech}.png`} alt={tech} />;
          })}
        </div>
      </div>
    </div>
  );
}
