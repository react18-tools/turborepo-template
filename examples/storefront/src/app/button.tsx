"use client";

import { useLoader } from "@repo/ui";

export default function MyButton() {
  const { setLoading } = useLoader();
  return <button onClick={() => setLoading(true)}>Show loader</button>;
}
