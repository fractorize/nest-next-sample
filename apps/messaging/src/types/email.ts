export type Email = {
  from: string;
  to: string;
  subject: string;
  text: string;
  cc?: string;
  bcc?: string;
};
