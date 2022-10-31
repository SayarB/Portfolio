import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Sayar Bhattacharyya</title>
        <meta name="description" content="Sayar's Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.social_links}>
        <Link href={"/resume"}>Resume</Link>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://www.linkedin.com/in/sayar-bhattacharyya/"
        >
          Linkedin
        </a>
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://github.com/SayarB"
        >
          Github
        </a>
      </div>
      <img
        src="https://ik.imagekit.io/sayarb/Portfolio/banner_iEqQQx7DD.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410080"
        className={styles.banner_img}
      />
      <div className={styles.navbar}>
        <Link href="projects">Projects</Link>
        <Link href="certificates">Certificate</Link>
        <Link href="about">About</Link>
      </div>
    </div>
  );
}
