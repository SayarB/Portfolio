import styles from "../styles/Certificates.module.css";
import Head from "next/head";
import certificates from "../certificates.json";
import ProjectCard from "../components/ProjectCard";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
export default function CertificatePage() {
  const [selectedOrg, setSelectedOrg] = useState(0);
  const [certificate, setCertificate] = useState(0);
  return (
    <div className={styles.container}>
      <Head>
        <title>{"Sayar's Certificates"}</title>
        <meta name="description" content="Sayar' Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              <div className={styles.organization_logo}>
                <Image
                layout="fill"
                placeholder="blur"
                blurDataURL={cert.organization_logo}
                  src={cert.organization_logo}
                  alt="Organization LOGO"
                  
                />
              </div>
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
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.certificate_preview}>
          <div className={styles.preview_image}>
            <Image
              layout="fill"
              objectFit="contain"
              blurDataURL={certificates[selectedOrg].certificates[certificate].img_src}
              placeholder="blur"
              src={certificates[selectedOrg].certificates[certificate].img_src}
              alt=""
            />
          </div>
          <a
            rel="noreferrer"
            target="_blank"
            href={certificates[selectedOrg].certificates[certificate].link}
            className={styles.visit_button}
          >
            Visit
          </a>
        </div>
      </div>
    </div>
  );
}
