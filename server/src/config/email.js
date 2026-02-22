import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  // For development/testing, you can use Gmail, Outlook, or any SMTP service
  // For production, use a service like SendGrid, AWS SES, or Mailgun
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS, // Your email password or app password
    },
  });

  return transporter;
};

// Send contact form email
export const sendContactEmail = async (contactData) => {
  const transporter = createTransporter();

  const { name, email, phone, subject, message } = contactData;

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: email,
    subject: `New Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c4f6f; border-bottom: 3px solid #ffaa00; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-left: 4px solid #ffaa00;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd;">
          <h3 style="color: #2c4f6f; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #333;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            This email was sent from the Prestige Build Construction website contact form.
          </p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

---
This email was sent from the Prestige Build Construction website contact form.
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✉️ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email error:', error);
    throw error;
  }
};

// Send auto-reply to contact
export const sendAutoReply = async (contactEmail, contactName) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Prestige Build Construction" <${process.env.SMTP_USER}>`,
    to: contactEmail,
    subject: 'Thank you for contacting Prestige Build',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2c4f6f; color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Prestige Build Construction</h1>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #2c4f6f;">Thank You, ${contactName}!</h2>
          
          <p style="line-height: 1.6; color: #333;">
            We've received your message and appreciate you reaching out to us. 
            Our team will review your inquiry and get back to you within 24-48 hours.
          </p>
          
          <div style="background-color: #fff7e6; border-left: 4px solid #ffaa00; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #333;">
              <strong>What happens next?</strong><br>
              One of our construction specialists will contact you to discuss your project requirements 
              and answer any questions you may have.
            </p>
          </div>
          
          <p style="line-height: 1.6; color: #333;">
            If you need immediate assistance, feel free to call us at <strong>(555) 123-4567</strong>.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Best regards,</p>
            <p style="color: #2c4f6f; font-weight: bold; margin: 5px 0;">The Prestige Build Team</p>
          </div>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            © 2024 Prestige Build Construction. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `
Thank You, ${contactName}!

We've received your message and appreciate you reaching out to us. 
Our team will review your inquiry and get back to you within 24-48 hours.

What happens next?
One of our construction specialists will contact you to discuss your project requirements 
and answer any questions you may have.

If you need immediate assistance, feel free to call us at (555) 123-4567.

Best regards,
The Prestige Build Team

© 2024 Prestige Build Construction. All rights reserved.
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✉️ Auto-reply sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Auto-reply error:', error);
    // Don't throw - auto-reply failure shouldn't fail the main request
    return null;
  }
};

export default { sendContactEmail, sendAutoReply };
