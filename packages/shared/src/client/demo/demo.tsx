"use client";

import { LiveEditor, LivePreview, LiveProvider } from "react-live";
import { Bars1, Bars2, Dots1, Dots2 } from "react18-loaders/dist/server";
import styles from "./demo.module.scss";
import code from "./loader-demo?raw";

/** React live demo */
export function Demo() {
  return (
    <LiveProvider
      code={code.replace(/import.*/, "")}
      scope={{ Dots1, Dots2, Bars1, Bars2 }}
    >
      <div className={styles.demo}>
        <LiveEditor className={styles.code} />
        <LivePreview className={styles.preview} />
      </div>
    </LiveProvider>
  );
}
