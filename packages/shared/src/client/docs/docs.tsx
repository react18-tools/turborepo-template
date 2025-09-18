import { Md } from "@m2d/react-markdown";
import type { AstArrayElement } from "@m2d/react-markdown/utils";
import rebrandingConfig from "@repo/scripts/rebrand.config.json";
import { toDocx } from "mdast2docx";
import {
  type HTMLProps,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import rehypeRaw from "rehype-raw";
import readme from "../../../../../README.md?raw";
import styles from "./docs.module.scss";

const { packageName } = rebrandingConfig;
export interface DocsProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Renders readme
 */
export const Docs = (props: DocsProps) => {
  const className = [props.className, styles.docs].filter(Boolean).join(" ");
  const astRef = useRef<AstArrayElement[]>([]);
  const [error, setError] = useState("");
  const downloadAsDocx = useCallback(() => {
    const mdAst = astRef.current[0].mdast;
    if (mdAst) {
      toDocx(mdAst)
        .then((docxBlob) => {
          // download docx blob
          const url = URL.createObjectURL(docxBlob as Blob);
          const anchorElement = document.createElement("a");
          anchorElement.href = url;
          anchorElement.download = `${packageName}.docx`;
          document.body.appendChild(anchorElement);
          anchorElement.click();
          document.body.removeChild(anchorElement);
          URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.error(err);
          setError(JSON.stringify(err, null, 2));
        });
    } else {
      setError("MDAST not found");
    }
  }, []);

  return (
    <div {...props} className={className} data-testid="docs">
      <button onClick={downloadAsDocx} type="button">
        Download as Docx
      </button>
      {error && <pre>{error}</pre>}
      <Md astRef={astRef} rehypePlugins={[rehypeRaw]}>
        {readme}
      </Md>
    </div>
  );
};
