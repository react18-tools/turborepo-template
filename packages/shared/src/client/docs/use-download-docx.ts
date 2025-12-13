import type { AstArrayElement } from "@m2d/react-markdown/utils";
import rebrandingConfig from "@repo/scripts/rebrand.config.json";
import { toDocx } from "mdast2docx";
import { type MutableRefObject, useCallback, useState } from "react";

const { packageName } = rebrandingConfig;

export const useDownloadDocx = (
  astRef: MutableRefObject<AstArrayElement[]>,
) => {
  const [error, setError] = useState("");

  const download = useCallback(() => {
    const mdAst = astRef.current[0]?.mdast;
    if (mdAst) {
      toDocx(mdAst)
        .then((docxBlob) => {
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
          setError(
            err instanceof Error ? err.message : "Failed to generate DOCX",
          );
        });
    } else {
      setError("MDAST not found");
    }
  }, [astRef]);

  return { download, error };
};
