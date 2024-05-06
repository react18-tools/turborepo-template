import styles from "./loader-container.module.scss";
import useRGS from "r18gs";
import { LOADER_RGS_KEY } from "../../constants";

interface LoaderContainerProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * # LoaderContainer
 * A full screen container for the loading animation.
 */
export function LoaderContainer({ children }: LoaderContainerProps) {
  const [loading] = useRGS(LOADER_RGS_KEY, false);
  return loading ? <div className={styles.container}>{children}</div> : null;
}
