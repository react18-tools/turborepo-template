import styles from "./logo.module.scss";
import rebrandingConfig from "@repo/scripts/rebrand.config.json";

const { repo } = rebrandingConfig;

interface LogoProps {
  href?: string;
}

/**
 * # Logo
 *
 */
export function Logo({ href }: LogoProps) {
  return (
    <a href={href ?? "/"} target="_blank" rel="noopener noreferrer" className={styles.logo}>
      <span>{repo}</span>
    </a>
  );
}
