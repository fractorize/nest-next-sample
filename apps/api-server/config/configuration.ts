export default () => ({
  port: parseInt(process.env.NESTJS_PORT as string) || 4000,
});
