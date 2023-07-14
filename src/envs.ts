const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return import.meta.env[key] || "";
};

export const isDevEnv = import.meta.env.MODE === "development";
export const isProdEnv = import.meta.env.MODE === "production";

export const BASE_API_URL = getEnvVar("VITE_BASE_API_URL");
