console.log(process.env.ENV);

const envConfig = {
  dev: {
    env: "dev",
    www: [],
    apiPath: "https://xcodeapi.bld365.com", // 测试环境
  },
  pre: {
    env: "pre",
    www: [],
    apiPath: "",
  },
  prod: {
    env: "prod",
    www: [],
    apiPath: "",
  },
};

// export const allHostObj = {
//   devHost: { text: '测试', host: 'https://cdcwebt.bld365.com' },
//   // devHost: { text: '生产', host: 'https://cdcweb.bld365.com' }, // 生产
//   // devHost: { text: '测试', host: 'http://1.2.4.181:8088' }, // 商
//   // devHost: { text: '测试', host: 'http://1.2.4.227:8088' }, // 婷

//   proHost: { text: '生产', host: 'https://cdcweb.bld365.com' },

export const ENV_CONFIG = getEnvConfig();

export const STORAGE_TOKEN_KEY = "login-storage-token-key";

function getEnvConfig() {
  const origin = window.location.origin || "";
  const config = Object.keys(envConfig).find((key) => {
    const c = envConfig[key];
    return c.www.indexOf(origin) > -1;
  });
  return config || envConfig.dev;
}
