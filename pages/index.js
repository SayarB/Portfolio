import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sayar Bhattacharyya</title>
        <meta name="description" content="Sayar' Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.social_links}>
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
