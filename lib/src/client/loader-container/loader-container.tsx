import styles from "./loader-container.module.scss";
import useRGS from "r18gs";
import { LOADER_RGS_KEY } from "../../constants";

interface LoaderContainerProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  loading?: boolean;
}

/**
 * # LoaderContainer
 * A full screen container for the loading animation.
 */
export function LoaderContainer({ children, loading }: LoaderContainerProps) {
  const [_loading] = useRGS(LOADER_RGS_KEY, false);
  const loading_ = loading ?? _loading;
  return (
    <div className={[styles.container, loading_ ? styles.loading : ""].join(" ")}>{children}</div>
  );
}
