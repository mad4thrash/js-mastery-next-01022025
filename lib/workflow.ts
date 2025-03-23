import config from "@/config";
import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";

interface Email {
    email: string;
    subject: string;
    message: string;
}

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})


const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async ( {email, subject, message}: Email) => {
    await qstashClient.publishJSON({
        api: {
          name: "email",
          provider: resend({ token: config.env.resendToken }),
        },
        body: {
          from: "Fabio <madfortest.shop>",
          to: [email],
          subject: subject,
          html: message,
        },
      });
}

