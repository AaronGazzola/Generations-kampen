import * as nodemailer from 'nodemailer';
import useHtmlTemplate from './useHtmlTemplate';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport(
    process.env.NODE_ENV === 'production'
      ? {
          service: process.env.SMTP_SERVICE_PROD,
          auth: {
            user: process.env.SMTP_USER_PROD,
            pass: process.env.SMTP_PASSWORD_PROD,
          },
        }
      : {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        },
  );

  const [mailList, subject, html] = useHtmlTemplate(options);

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.ADMIN_EMAIL}>`,
    to: mailList,
    subject,
    html,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
