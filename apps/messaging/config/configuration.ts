export default () => {
  ["RABBITMQ_URL", "EMAIL_QUEUE_NAME"].forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Env var ${key} is not set`);
    }
  });
  return {};
};
