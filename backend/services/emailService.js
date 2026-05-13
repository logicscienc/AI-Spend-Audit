import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendLeadConfirmationEmail = async ({
  email,
  totalMonthlySavings,
}) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your AI Spend Audit is Ready 🚀",

      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h1>AI Spend Audit Completed</h1>

          <p>
            Thanks for trying our AI Spend Audit tool.
          </p>

          <p>
            We identified approximately
            <strong>$${totalMonthlySavings}/month</strong>
            in potential savings.
          </p>

          <p>
            Our team may reach out with additional
            optimization opportunities through Credex.
          </p>

          <br />

          <p>
            — Credex AI Spend Audit
          </p>
        </div>
      `,
    });

    console.log("EMAIL SENT:", response);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};