import { HTMLProps, ReactNode, useRef } from "react";
import styles from "./docs.module.scss";
import readme from "../../../../../README.md?raw"
import { Md } from "@m2d/react-markdown";
import { toDocx } from "mdast2docx";
import { AstArrayElement } from "@m2d/react-markdown/utils";

export interface DocsProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

export const Docs = (props: DocsProps) => {
	const className = [props.className, styles["docs"]].filter(Boolean).join(" ");
	const astRef = useRef<AstArrayElement[]>([])
	return (
		<div {...props} className={className} data-testid="docs">
			<button onClick={() => {
				const mdAst = astRef.current[0].mdast;
				if (mdAst) {
					toDocx(mdAst).then(docxBlob => {
						// download docx blob
						const url = URL.createObjectURL(docxBlob as Blob);
						const a = document.createElement("a");
						a.href = url;
						a.download = "document.docx";
						document.body.appendChild(a);
						a.click();
						document.body.removeChild(a);
						URL.revokeObjectURL(url);
					}).catch(() => {
						alert("Something went wrong!")
					});
				} else {
					alert("Something went wrong!")
				}
			}}>Download as Docx</button>
			<Md astRef={astRef}>{readme}</Md>
		</div>
	);
}
