import useRGS from "r18gs";
import { LOADER_RGS_KEY } from "../constants";

/**
 *
 * @returns
 */
export function useLoader() {
  const [loading, setLoading] = useRGS<boolean>(LOADER_RGS_KEY);
  return { loading, setLoading };
}
