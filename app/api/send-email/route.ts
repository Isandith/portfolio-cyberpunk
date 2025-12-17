import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: monospace; background: #0a0a0a; color: #00ffff; padding: 20px; border: 2px solid #00ffff;">
          <h2 style="color: #00ffff; text-transform: uppercase;">New Contact Message</h2>
          <hr style="border-color: #00ffff;" />
          <p><strong style="color: #ffd700;">Name:</strong> ${name}</p>
          <p><strong style="color: #ffd700;">Email:</strong> ${email}</p>
          <p><strong style="color: #ffd700;">Message:</strong></p>
          <div style="background: #1a1a1a; padding: 15px; border-left: 3px solid #00ffff; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border-color: #00ffff; margin-top: 20px;" />
          <p style="color: #666; font-size: 12px;">Sent from your cyberpunk portfolio</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
