import styles from "../styles/About.module.css";
import Link from "next/link";
import Head from "next/head";
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
          <img src="my_image.jpg" alt="" className={styles.about_image} />
        </div>
        <div className={styles.about_text}>
          <h1>Sayar Bhattacharyya</h1>
          <p>
            Consequat irure aute labore ut sit cupidatat nisi ad quis sit. Sunt
            cupidatat eu do sunt labore culpa aliquip sunt laboris incididunt
            laboris. Pariatur dolor minim cillum ullamco proident Lorem qui.
            Minim minim anim nostrud ad irure labore ex ipsum consectetur nisi.
            Duis quis ullamco irure velit. Fugiat fugiat duis amet et eu
            adipisicing adipisicing adipisicing nulla elit duis est ullamco
            laborum. Quis duis ut irure dolore elit nulla ut ullamco ea qui.
          </p>
        </div>
      </div>
    </div>
  );
}
