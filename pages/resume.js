import styles from "../styles/Resume.module.css";
import Link from "next/link";
import Image from "next/image";
import { saveAs } from "file-saver";
export default function Resume() {
  return (
    <div className={styles.container}>
      <Link className={styles.back_link} href="/">
        {"<Back"}
      </Link>
      <div className={styles.resume}>
        <Image width={600} height={800} src="/resume.png" alt="" />
      </div>
      <button
        onClick={() => {
          saveAs("/resume.pdf", "resume-sayar.pdf");
        }}
        className={styles.download_button}
      >
        Download
      </button>
    </div>
  );
}
