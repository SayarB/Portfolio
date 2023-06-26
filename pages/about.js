import styles from "../styles/About.module.css";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
export default function about() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Sayar</title>
        <meta name="description" content="Sayar' Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link className={styles.back_link} href="/">
        {"<Back"}
      </Link>
      <h1 className={styles.header_text}>About</h1>
      <div className={styles.about_text_div}>
        <div className={styles.about_image}>
          <Image
            layout="responsive"
            width={200}
            height={250}
            placeholder="blur"
            blurDataURL="https://ik.imagekit.io/sayarb/Portfolio/my_image_5RR-_l5Oc.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410400"
            src={
              "https://ik.imagekit.io/sayarb/Portfolio/my_image_5RR-_l5Oc.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1647447410400"
            }
            alt=""
            className={styles.about_image}
          />
        </div>
        <div className={styles.about_text}>
          <h1>Sayar Bhattacharyya</h1>
          <p>
            I am Full Stack Developer predominantly working in javascript libraries and frameworks, like ReactJS, NextJS, Nodejs. I am a part of Google Developer Students Club, VIT, and Codechef, VIT. I have also done an internship at a startup named FuncBox in which I contributed heavily with the implementation of Redux in the frontend and making Vanilla JS games. Apart from tech, I have a keen interest in music and occupy myself, in my spare time with composing music and mixing tracks.
          </p>
        </div>
      </div>
    </div>
  );
}
