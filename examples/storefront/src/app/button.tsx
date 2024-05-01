"use client";

import { useLoader } from "react18-loaders";

export default function MyButton() {
  const { setLoading } = useLoader();
  return <button onClick={() => setLoading(true)}>Show loader</button>;
}
