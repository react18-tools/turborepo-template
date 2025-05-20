import { FC, HTMLProps } from "react";
import styles from "./logo.module.scss";
import rebrandingConfig from "@repo/scripts/rebrand.config.json";

const { packageName } = rebrandingConfig;

export interface LogoProps {
  href?: string;
  linkComponent?: React.ElementType;
}

/**
 * # Logo
 *
 */
export function Logo({ href, linkComponent }: LogoProps) {
  if (href?.startsWith("http"))
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.logo}
        data-tfx="component">
        <span>{packageName}</span>
      </a>
    );
  const Link = (linkComponent || "a") as FC<{ to?: string } & HTMLProps<HTMLAnchorElement>>;
  return (
    <Link href={href ?? "/"} to={href ?? "/"} rel="noopener noreferrer" className={styles.logo}>
      <span>{packageName}</span>
    </Link>
  );
}
