import * as moment from 'moment';

const useHtmlTemplate = ({
  type,
  baseUrl,
  user,
  reason = '',
  actionLink,
  buttonText,
  mailList,
  fromEmail,
  toEmail,
  name,
  projectTitle,
  projectDescription,
  contactEmail,
  emailComments,
  contactMethod,
  phone,
  zoomName,
  callTime,
  userCallTime,
  zoomLink,
}) => {
  const header = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head> </head>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <style type="text/css">
        * {
          text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
  
        html {
          height: 100%;
          width: 100%;
        }
  
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          mso-line-height-rule: exactly;
        }
  
        div[style*="margin: 16px 0"] {
          margin: 0 !important;
        }
  
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
  
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
  
        .ReadMsgBody,
        .ExternalClass {
          width: 100%;
        }
  
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }
      </style>
      <!--[if gte mso 9]>
        <style type="text/css">
        li { text-indent: -1em; }
        table td { border-collapse: collapse; }
        </style>
        <![endif]-->
      <title> </title>
      <!-- content -->
      <!--[if gte mso 9]><xml>
         <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
        </xml><![endif]-->
    </head>
    <body class="body" style="background-color: #FAFBFC; margin: 0; width: 100%;">
      <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #FAFBFC; margin: 0;" bgcolor="#FAFBFC">
        <tr>
          <td class="body__content" align="left" width="100%" valign="top" style="color: #000000; font-size: 16px; line-height: 20px; font-family: Helvetica,Arial,sans-serif;">
            <div class="header" style="background-color: #E0EBF5; height: 80px; width: 100%; color: #000000; font-family: Helvetica,Arial,sans-serif;">
              <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                  <tr>
                    <td> <![endif]-->
                      <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                        <tr class="container__row">
                          <td class="container__cell" width="100%" align="left" valign="top">
                            <div class="row">
                              <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                                <tr class="row__row"> <a class="logo-link a" large="12" href="${baseUrl}" style="width: min-content; color: #336699; text-decoration: none;"><span class="a__text" style="color: #336699; text-decoration: none;">
              <img class="logo img__block" src="${baseUrl}/assets/images/logo_text.png" alt="
Apex Apps" border="0" style="display: block; max-width: 100%; white-space: pre; text-align: center; margin-left: 15px; font-size: 30px; color: #336699;"/>
            </span></a> </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </table> <!--[if mso | IE]> </td>
                  </tr>
                </table> <![endif]--> </div>
            </div>
            <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
              <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                <tr>
                  <td> <![endif]-->
                    <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                      <tr class="container__row">
                        <td class="container__cell" width="100%" align="left" valign="top">
                          <div class="content row" style="background-color: #FFFFFF; border-radius: 15px; margin: 10px 10px 30px; padding: 20px;">
                            <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                              <tr class="row__row">
                                <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top">`;
  const footer = `
                                <p class="content-text signature1 text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #474545; font-size: 18px; margin: 0 0 5px; margin-left: 20px;">
                                <br/> Kind Regards, </p>
                                <p class="content-text signature2 text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #474545; font-size: 18px; margin: 0 0 5px; font-style: italic; margin-left: 40px;">Aaron Gazzola</p>
  </td>
  </tr>
</table>
</div>
</td>
</tr>
</table> <!--[if mso | IE]> </td>
</tr>
</table> <![endif]--> </div>
<div class="footer" style="background-color: #FAFBFC; height: min-content; width: 100%;">
<div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
<table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
<tr>
<td> <![endif]-->
<table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
<tr class="container__row">
<td class="container__cell" width="100%" align="left" valign="top">
<div class="footer-row row" style="padding: 10px 25px;">
  <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
    <tr class="row__row">
      <p class="footer-text text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0; color: #474545; font-size: 14px; margin: 0;"> This email was sent by Apex Apps, ABN: 81700757157. </p>
      <p class="footer-text footer-center text p" large="2" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #474545; font-size: 14px; padding: 0; margin: 0; text-align: center;">
      <br/> &copy; Copyright ${moment().format('YYYY')}, Apex Apps </p>
      <p class="footer-text footer-center text p" large="4" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; color: #474545; font-size: 14px; padding: 0; margin: 0; text-align: center;">
      Designed and developed by <a class="link a" href="${baseUrl}" style="font-weight: 500; color: #41992B; text-decoration: none;"><span class="a__text" style="color: #41992B; text-decoration: none;">Apex Apps</span></a> </p>
    </tr>
  </table>
</div>
</td>
</tr>
</table> <!--[if mso | IE]> </td>
</tr>
</table> <![endif]--> </div>
</div>
</td>
</tr>
</table>
<div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
</body>
</html>`;

  const heading = (text) =>
    `<h1 class="title header h1" style="margin: 20px 0; line-height: 40px; width: 100%; font-family: Helvetica,Arial,sans-serif; padding-left: 10px; background-color: transparent; margin-bottom: 20px; margin-top: 0; height: min-content; color: #336699; font-weight: 500;">${text}</h1>`;

  const paragraph = (text, br = 'none') =>
    `<p class="content-text text p" style="display: block; line-height: 20px; font-family: Helvetica,Arial,sans-serif; padding: 0 15px; color: #474545; font-size: 18px; margin: 0 0 5px;">
${br === 'before' || br === 'both' ? '<br />' : ''}
${text}
${br === 'after' || br === 'both' ? '<br />' : ''}
</p>`;

  const button = `  <div class="button button">
  <table role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <table role="presentation" width="auto" align="center" border="0" cellspacing="0" cellpadding="0" class="button__table" style="margin: 20px auto 30px;">
          <tr>
            <td align="center" class="button__cell" style="border-radius: 3px; padding: 6px 12px; background-color: #41992B;" bgcolor="#41992B"><a href="${actionLink}" class="button__link" style="text-decoration: none; background-color: #41992B; color: #FFFFFF; font-weight: 700; display: inline-block;"><span class="button__text" style="text-decoration: none; color: #FFFFFF;">${buttonText}</span></a></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>`;

  switch (type) {
    case 'VERIFY_USER':
      return [
        user.email,
        `Please verify your email address`,
        `${header}
        ${heading(`Hi,`)}
        ${paragraph(
          `Please click the button below to verify your email address`,
        )}
        ${button}
        ${paragraph(
          `If you did not signup at Apex Apps, please ignore this email.`,
          'after',
        )}
        ${footer}`,
      ];
    case 'RESET_PASSWORD':
      return [
        user.email,
        `Reset password request`,
        `${header}
        ${heading(`Hi,`)}
        ${paragraph(`Please click the button below to reset your password`)}
        ${button}
        ${paragraph(
          `If you did not request to reset your password, please ignore this email.`,
          'after',
        )}
        ${footer}`,
      ];
    case 'UPDATE_EMAIL':
      return [
        user.newEmail,
        `Email Update request`,
        `${header}
        ${heading(`Hi,`)}
        ${paragraph(
          `Please click the button below to update your email address`,
        )}
        ${button}
        ${paragraph(
          `If you did not request to update your email address, please ignore this email.`,
          'after',
        )}
        ${footer}`,
      ];
    case 'CONTACT':
      return [
        process.env.ADMIN_EMAIL,
        `Contact email from ${name}`,
        `${header}
        ${heading(`New email from ${name}`)}
        ${paragraph(`Project name: ${projectTitle}`)}
        ${paragraph(`Project description: ${projectDescription}`)}
        ${paragraph(`Comments: ${emailComments}`)}
        ${paragraph(`User email: ${fromEmail}`)}
        ${paragraph(`Contact email: ${contactEmail}`)}
        ${paragraph(`User name: ${name}`)}
        ${footer}`,
      ];
    case 'BOOKING':
      return [
        process.env.ADMIN_EMAIL,
        `Call booking for ${name}`,
        `${header}
        ${heading(`Call booking for ${name}`)}
        ${paragraph(`Call time: ${callTime}`)}
        ${paragraph(`Contact method: ${contactMethod}`)}
        ${paragraph(`Phone number: ${phone}`)}
        ${paragraph(`Zoom name: ${zoomName}`)}
        ${paragraph(`Project name: ${projectTitle}`)}
        ${paragraph(`Project description: ${projectDescription}`)}
        ${paragraph(`User email: ${fromEmail}`)}
        ${paragraph(`Contact email: ${contactEmail}`)}
        ${paragraph(`User name: ${name}`)}
        ${button}
        ${footer}`,
      ];
    case 'CONFIRM_BOOKING':
      return [
        toEmail,
        `Apex Apps call confirmation`,
        `${header}
        ${heading(
          `${contactMethod[0].toUpperCase()}${contactMethod.slice(
            1,
          )} call confirmed for ${userCallTime.slice(0, 7)}`,
        )}
        ${paragraph(`Thank you for booking a call at Apex Apps.`)}
        ${paragraph('', 'after')}
        ${paragraph(
          `I'll give you call you by ${contactMethod} ${
            contactMethod === 'phone' ? `on ${phone}` : `via ${zoomName}`
          } at ${userCallTime}.`,
        )}
       ${paragraph('', 'after')}
          ${
            zoomLink
              ? `${paragraph(
                  `Zoom meeting link: ${zoomLink}`,
                  'after',
                )}${paragraph('', 'after')}`
              : ''
          }
        ${paragraph(`I look forward to discussing your project!`)}
        ${footer}`,
      ];
    default:
      break;
  }
};

export default useHtmlTemplate;
