declare module "*.module.css";
declare module "*.module.scss";
declare module "*?raw" {
  const value: string;
  export default value;
}
