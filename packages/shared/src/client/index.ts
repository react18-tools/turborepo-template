"use client";

/**
 * Server components and client components need to be exported from separate files as
 * directive on top of the file from which component is imported takes effect.
 * i.e., server component re-exported from file with "use client" will behave as client component
 */

// client component exports
export * from "./demo";
export * from "./header";
export * from "./global-loader";
export * from "./drawer-button";
