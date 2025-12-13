import { Md } from "@m2d/react-markdown";
import type { AstArrayElement } from "@m2d/react-markdown/utils";
import { type HTMLProps, type ReactNode, useRef } from "react";
import rehypeRaw from "rehype-raw";
import readme from "../../../../../README.md?raw";
import styles from "./docs.module.scss";
import { useDownloadDocx } from "./use-download-docx";

export interface DocsProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Renders readme
 */
export const Docs = (props: DocsProps) => {
  const className = [props.className, styles.docs].filter(Boolean).join(" ");
  const astRef = useRef<AstArrayElement[]>([]);
  const { download, error } = useDownloadDocx(astRef);

  return (
    <div {...props} className={className} data-testid="docs">
      <button onClick={download} type="button">
        Download as Docx
      </button>
      {error && (
        <div style={{ color: "red", marginTop: "0.5rem" }}>Error: {error}</div>
      )}
      <Md astRef={astRef} rehypePlugins={[rehypeRaw]}>
        {readme}
      </Md>
    </div>
  );
};
