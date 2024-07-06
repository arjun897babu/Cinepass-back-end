import dotenv from 'dotenv';

dotenv.config();

const envString = (env: string, defaultEnv?: string): string => {
  const value = process.env[env] ?? defaultEnv;
  if (value === null || value === undefined) {
    throw new Error(`Environment variable ${env} is not defined`);
  }
  return value;
};

const envNumber = (env: string, defaultEnv?: number): number => {
  const value = process.env[env] !== undefined ? Number(process.env[env]) : defaultEnv;
  if (value === null || value === undefined) {
    throw new Error(`Environment variable ${env} is not defined`);
  }
  return value;
};

export {
  envString,
  envNumber
};
