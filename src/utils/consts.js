import md5 from "md5";
const { origin } = window.location;
const ENV = process.env.ENV; // 'development'
const envConfig = {
  // 测试环境
  development: {
    apiPath: "https://cdcwebt.bld365.com",
  },
  // 生产环境
  production: {
    apiPath: "https://cdcweb.bld365.com",
  },
};
export const ENV_CONFIG = envConfig[ENV];
export const LOGIN_TOKEN_KEY = md5(`_${origin}_login_storage_token_key`);
