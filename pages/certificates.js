import styles from "../styles/Certificates.module.css";
import certificates from "../certificates.json";
import ProjectCard from "../components/ProjectCard";
import Link from "next/link";
import { useState } from "react";
export default function projectsPage() {
  const [selectedOrg, setSelectedOrg] = useState(0);
  const [certificate, setCertificate] = useState(0);
  return (
    <div className={styles.container}>
      <Link className={styles.back_link} href="/">
        {"<Back"}
      </Link>
      <h1 className={styles.header_text}>Certificates</h1>
      <div className={styles.organizations_nav}>
        {certificates.map((cert, i) => {
          return (
            <div
              onClick={() => {
                setCertificate(0);
                setSelectedOrg(i);
              }}
              key={"organization-tab-" + i}
              className={
                styles.organization_tab +
                (selectedOrg == i ? " " + styles.selected_nav : "")
              }
            >
              <img
                src={cert.organization_logo}
                alt="Organization LOGO"
                className={styles.organization_logo}
              />
              <p>{cert.organization}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.certificate_preview_container}>
        <div className={styles.certificate_list}>
          <ul>
            {certificates[selectedOrg].certificates.map((cert, i) => (
              <li
                key={"cert-" + i}
                onClick={() => setCertificate(i)}
                className={
                  styles.cert_list_item +
                  (certificate === i ? " " + styles.selected_cert : "")
                }
              >
                <p>{cert.title}</p>
                {certificate === i && (
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={cert.link}
                    className={styles.visit_button}
                  >
                    Visit
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.certificate_preview}>
          <img
            className={styles.preview_image}
            src={certificates[selectedOrg].certificates[certificate].img_src}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}