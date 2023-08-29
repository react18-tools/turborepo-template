import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

/**
 * # ForkMe
 * Fork me ribbon
 * 
 * @param {React.ReactNode} [props.children]
 * @returns {React.ReactElement}
 */
export function ForkMe({ children }: Props) {
  return (
    <div>
      <h1>fork me</h1>
      {children}
    </div>
  );
};
