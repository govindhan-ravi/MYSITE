import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    // Usage of service 'gmail' is generic; strictly use SMTP config for production
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || 'ethereal_user',
        pass: process.env.EMAIL_PASS || 'ethereal_pass'
    }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        // In dev, if using Ethereal, we log the URL
        const info = await transporter.sendMail({
            from: '"I Frame Youu" <noreply@iframeyouu.com>',
            to,
            subject,
            html
        });
        console.log(`📧 Email sent: ${info.messageId}`);
    } catch (error) {
        console.error('❌ Email send failed', error);
    }
};

export const sendOrderConfirmation = async (email: string, orderId: string, total: number) => {
    const html = `
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order #${orderId}.</p>
        <p>Total: ₹${total}</p>
        <p>We will notify you when it ships.</p>
    `;
    await sendEmail(email, `Order Confirmation #${orderId}`, html);
};
