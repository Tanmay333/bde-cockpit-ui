const api = {
  baseURL: "https://example.com",
  endpoints: {
    images: "/images",
  },
};

const awsconfig = {
  Auth: {
    region: "",
    userPoolId: "",
    userPoolWebClientId: "",
  },
};

const statusCodes = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
};

const config = {
  api,
  awsconfig,
  statusCodes,
};

export default config;
