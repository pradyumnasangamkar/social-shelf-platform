export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  // Dummy implementation for development
  console.log(`Pretend email sent to ${to}: ${subject} - ${text}`);
  return Promise.resolve();
}
