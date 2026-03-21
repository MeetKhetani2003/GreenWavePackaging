import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, phone, inquiryType, message, token } = await req.json();

  // Validate Captcha
  const verify = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=6LdAESYsAAAAALlQkmNtw8LIOHeNVUHoxkbg_pa5&response=${token}`,
    { method: "POST" }
  ).then((res) => res.json());

  if (!verify.success) {
    return Response.json(
      { success: false, error: "Captcha failed" },
      { status: 400 }
    );
  }

  // Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: `📩 Inquiry: ${inquiryType}`,
    html: `
    <div style="background:#f4f7f6; padding:35px; font-family:sans-serif;">
      <div style="max-width:620px; margin:auto; background:white; padding:30px; border-radius:12px;">

        <h2 style="text-align:center; color:#0c4a2e;">📩 New Inquiry Received</h2>
        <p style="text-align:center; color:#555;">
          Someone submitted a message through the website contact form.
        </p>

        <hr style="border:0; height:2px; background:#22c55e; width:80px; margin:20px auto;" />

        <table style="width:100%; font-size:16px;">
          <tr><td style="font-weight:bold;">👤 Name:</td><td>${name}</td></tr>
          <tr><td style="font-weight:bold;">📧 Email:</td><td>${email}</td></tr>
          <tr><td style="font-weight:bold;">📞 Phone:</td><td>${
            phone || "Not provided"
          }</td></tr>
          <tr><td style="font-weight:bold;">📌 Inquiry Type:</td><td>${inquiryType}</td></tr>
          <tr><td style="font-weight:bold;">📝 Message:</td><td>${message.replace(
            /\n/g,
            "<br>"
          )}</td></tr>
        </table>

        <br />

        <div style="text-align:center;">
          <a href="mailto:${email}" 
             style="background:#22c55e; padding:12px 22px; color:white; text-decoration:none; border-radius:6px;">
            Reply to Customer
          </a>
        </div>

        <p style="text-align:center; font-size:12px; color:#888; margin-top:30px;">
          GreenWave Packaging © ${new Date().getFullYear()}
        </p>
      </div>
    </div>
    `,
  });

  return Response.json({ success: true });
}
