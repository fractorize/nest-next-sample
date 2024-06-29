export default () => {
  ["RABBITMQ_URL", "EMAIL_QUEUE_NAME", "EMAIL_HOST", "EMAIL_PORT"].forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Env var ${key} is not set in .env.local file`);
    }
  });
  ["EMAIL_SENDER_ADDRESS", "EMAIL_SENDER_PASSWORD"].forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Env var ${key} is not set in .env file`);
    }
  });
  return {};
};
