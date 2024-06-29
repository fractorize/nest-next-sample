export default () => {
  ["NESTJS_PORT", "RABBITMQ_URL"].forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Env var ${key} is not set`);
    }
  });
  return {
    port: parseInt(process.env.NESTJS_PORT as string),
  };
};
