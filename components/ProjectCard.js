import { useState } from "react";
import styles from "../styles/Card.module.css";
export default function ProjectCard({ project }) {
  const imageLinks = {
    react:
      "https://ik.imagekit.io/sayarb/Portfolio/react_KMlxgxKDG9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410058",
    nextjs:
      "https://ik.imagekit.io/sayarb/Portfolio/nextjs_kIZIc6TQ-n.png?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410049",
    express:
      "https://ik.imagekit.io/sayarb/Portfolio/express_H8Nj4puKN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410004",
    opentrivia:
      "https://ik.imagekit.io/sayarb/Portfolio/open-trivia-database_v10Hha9RzC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410078",
    mui: "https://ik.imagekit.io/sayarb/Portfolio/mui_ajJgzWCrq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410041",
    firebase:
      "https://ik.imagekit.io/sayarb/Portfolio/firebase_sS-DpBkjC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410048",
    socketio:
      "https://ik.imagekit.io/sayarb/Portfolio/socketio_w4-Iyo9nXB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410059",
  };
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
            return <img key={"tech-" + i} src={imageLinks[tech]} alt={tech} />;
          })}
        </div>
      </div>
    </div>
  );
}
