import { cleanEnv, makeValidator, num, port, str } from 'envalid';

export const evalValidator = makeValidator((value: string) => {
  if (!/^[\d+\-*/\s().]+$/.test(value)) {
    throw new Error(`Bad eval input value: ${value}`);
  }
  return eval(value);
});

export const ENV = cleanEnv(process.env, {
  PORT: port(),

  DATABASE_URL: str(),
  REDIS_URL: str(),

  JWT_ACCESS_TOKEN_SECRET: str(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: evalValidator(),

  PASSWORD_HASH: num(),
});
