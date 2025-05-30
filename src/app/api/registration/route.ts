import { NextResponse } from 'next/server';

import { google } from 'googleapis';

import { WEBSITE_EMAIL } from '@/shared/lib/constants/constants';

type OrderData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  role: string;
};

function makeBody(to: string, from: string, subject: string, message: string): string {
  const emailLines = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=UTF-8`,
    '',
    message,
  ];

  return Buffer.from(emailLines.join('\n'))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const bodyJSON = (await request.json()) as OrderData;
    const { name, email, phone, message, role } = bodyJSON;

    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.EMAIL_CLIENT_ID!,
      process.env.EMAIL_CLIENT_SECRET!,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.EMAIL_REFRESH_TOKEN!,
    });

    const accessToken = await oauth2Client.getAccessToken();
    if (!accessToken.token) {
      throw new Error('Failed to generate access token.');
    }

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const adminEmailBody = makeBody(
      process.env.EMAIL_USER || '',
      process.env.EMAIL_USER || '',
      'New Request Received',
      `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Role:</strong> ${role}</p>
      `
    );

    const clientEmailBody = makeBody(
      email,
      process.env.EMAIL_USER || '',
      'Your Application Has Been Successfully Received',
      `
      <table width="640" style="border-collapse: collapse; margin: 0 auto; font-style: sans-serif;background: #F2F2F2;">
    <thead>
        <tr>
            <td style="padding: 8px;">
                <img style="width: 100%" src="https://theclicksly.com/images/email_header_new.png" alt="Header" />
            </td>
        </tr>
    </thead>
    <tbody style="padding: 8px;">
        <tr>
            <td style="padding: 0 8px 0 8px;">
                <table style="width: 100%;">
                    <tr>
                        <td style="padding: 40px 40px; font-family: Roboto, sans-serif; color:#0A0A0A;border-radius: 12px;
background: #FFF;">

                            <h2 style="color: #000;
                    font-size: 28px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;">
                               Your Application Has Been Successfully Received

                            </h2>

                            <p style="color: #000;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;">Dear ${name},</p>


                            <p style="color: #000;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;">
                                Thank you for your interest in joining The Clicksly. We are pleased to inform you that we have received your application.


                            </p>

                            <p style="color: #000;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;">
                                Our team is reviewing the details, and we’ll contact you shortly with the next steps. In the meantime, please don’t hesitate to contact us if you have any questions or need further assistance.

                            </p>

                            <p style="color: #000;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;">
                              Thank you for choosing The Clicksly. We’re looking forward to connecting with you soon.
                            </p>

                            <p style="color: #000;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;">
                                Best regards,<br>
                                <b>The Clicksly Team</b>

                            </p>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td style="padding: 8px;">
                <table style="width: 100%;">
                    <tr>
                        <td style="padding: 20px;border-radius: 12px;
background: #D7FCE3;">
                            <table style="width: 100%;">
                                <tr>
                                    <td style="vertical-align: top;">
                                        <img src="https://theclicksly.com/images/email_logo_new.png"
                                            style="width: 196px;height: auto;">
                                        <p style="color: #3B3B35;
                                            text-align: left;
                                            font-size: 11px;
                                            font-style: normal;
                                            font-weight: 400;
                                            line-height: normal;">
                                            For precise ranking and competitive analysis.
                                        </p>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <h4 style="color: #000;
                                        font-size: 14px;
                                        font-style: normal;
                                        font-weight: 600;
                                        line-height: normal;
                                        margin: 0 0 5px 0;">
                                            Email:
                                        </h4>
                                        <a href="mailto:${WEBSITE_EMAIL}" style="color: #3B3B35;
                                        font-size: 12px;
                                        font-style: normal;
                                        font-weight: 400;
                                        line-height: normal;
                                        text-decoration: none;">${WEBSITE_EMAIL}</a>
                                    </td>
                                    <td style="vertical-align: top;">
                                        <h4 style="color: #000;
                                        font-size: 14px;
                                        font-style: normal;
                                        font-weight: 600;
                                        line-height: normal;
                                        margin: 0 0 5px 0;">
                                            Address:
                                        </h4>
                                        <p style="color: #3B3B35;
                                        font-size: 12px;
                                        font-style: normal;
                                        font-weight: 400;
                                        line-height: normal;
                                        margin: 0;">Intershore Chambers,Road Town, Tortola, British Virgin Islands</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </tfoot>
</table>
      `
    );

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: adminEmailBody },
    });

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: clientEmailBody },
    });

    return NextResponse.json({ message: 'Order email sent successfully.' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error sending order email:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to send order email.', error: errorMessage },
      { status: 500 }
    );
  }
}
