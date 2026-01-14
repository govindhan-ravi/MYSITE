"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderConfirmation = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    // Usage of service 'gmail' is generic; strictly use SMTP config for production
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || 'ethereal_user',
        pass: process.env.EMAIL_PASS || 'ethereal_pass'
    }
});
const sendEmail = async (to, subject, html) => {
    try {
        // In dev, if using Ethereal, we log the URL
        const info = await transporter.sendMail({
            from: '"I Frame Youu" <noreply@iframeyouu.com>',
            to,
            subject,
            html
        });
        console.log(`📧 Email sent: ${info.messageId}`);
    }
    catch (error) {
        console.error('❌ Email send failed', error);
    }
};
exports.sendEmail = sendEmail;
const sendOrderConfirmation = async (email, orderId, total) => {
    const html = `
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order #${orderId}.</p>
        <p>Total: ₹${total}</p>
        <p>We will notify you when it ships.</p>
    `;
    await (0, exports.sendEmail)(email, `Order Confirmation #${orderId}`, html);
};
exports.sendOrderConfirmation = sendOrderConfirmation;
