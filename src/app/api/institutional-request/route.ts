import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TARGET_EMAIL = "info@manasadigital.com";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      institutionName,
      contactPerson,
      jobTitle,
      countryCity,
      whatsappNumber,
      email,
      teacherCount,
      subjectsGrades,
      trainingType,
      additionalNotes,
    } = data;

    if (!institutionName || !contactPerson || !whatsappNumber) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toLocaleString("ar-SA", {
      timeZone: "Asia/Riyadh",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailSubject = `طلب تدريب مؤسسي جديد: ${institutionName} — ${contactPerson}`;

    const emailHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.8; color: #242424; max-width: 600px; margin: 0 auto; border: 1px solid #E2E2DF; border-radius: 12px; padding: 24px; background-color: #FAFAF8;">
        <div style="text-align: center; border-bottom: 2px solid #E3342F; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #E3342F; margin: 0;">طلب تدريب مؤسسي جديد للمدارس والمعاهد</h2>
          <p style="color: #666666; margin: 4px 0 0 0; font-size: 14px;">كورس الذكاء الاصطناعي للمعلمين</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; width: 35%; color: #555;">المؤسسة التعليمية:</td>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; color: #111;">${institutionName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; color: #555;">اسم المسؤول:</td>
            <td style="padding: 10px; border-bottom: 1px solid #E2E2DF;">${contactPerson}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; color: #555;">المسمى الوظيفي:</td>
            <td style="padding: 10px; border-bottom: 1px solid #E2E2DF;">${jobTitle || 'غير محدد'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; color: #555;">الدولة والمدينة:</td>
            <td style="padding: 10px; border-bottom: 1px solid #E2E2DF;">${countryCity}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; color: #555;">عدد المعلمين:</td>
            <td style="padding: 10px; font-weight: bold; color: #E3342F; border-bottom: 1px solid #E2E2DF;">${teacherCount || 'غير محدد'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; color: #555;">نوع التدريب المطلوب:</td>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF;">${trainingType || 'غير محدد'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; color: #555;">المواد أو المراحل:</td>
            <td style="padding: 10px; border-bottom: 1px solid #E2E2DF;">${subjectsGrades || 'غير محدد'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; color: #555;">رقم واتساب:</td>
            <td style="padding: 10px; direction: ltr; text-align: right; border-bottom: 1px solid #E2E2DF;">
              <a href="https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}" style="color: #25D366; font-weight: bold; text-decoration: none;">${whatsappNumber}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #E2E2DF; color: #555;">البريد الإلكتروني:</td>
            <td style="padding: 10px; direction: ltr; text-align: right; border-bottom: 1px solid #E2E2DF;">
              ${email ? `<a href="mailto:${email}" style="color: #0066CC;">${email}</a>` : 'لم يُذكر'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">الملاحظات:</td>
            <td style="padding: 10px; white-space: pre-wrap;">${additionalNotes || 'لا توجد ملاحظات إضافية'}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 12px; background-color: #F0F0EE; border-radius: 8px; font-size: 12px; color: #666; text-align: center;">
          تم استلام هذا الطلب عبر نموذج المؤسسات في: ${submissionTime}
        </div>
      </div>
    `;

    const plainText = `
طلب تدريب مؤسسي جديد للمدارس والمعاهد
--------------------------------------
المؤسسة: ${institutionName}
المسؤول: ${contactPerson}
المسمى الوظيفي: ${jobTitle || 'غير محدد'}
الدولة والمدينة: ${countryCity}
عدد المعلمين: ${teacherCount || 'غير محدد'}
نوع التدريب: ${trainingType || 'غير محدد'}
المواد أو المراحل: ${subjectsGrades || 'غير محدد'}
واتساب: ${whatsappNumber}
البريد: ${email || 'لم يُذكر'}
الملاحظات: ${additionalNotes || 'لا توجد'}
وقت الإرسال: ${submissionTime}
    `.trim();

    // 1. تسجيل الطلب محلياً وفي السجلات
    console.log(`[INSTITUTIONAL REQUEST -> ${TARGET_EMAIL}] received from ${institutionName} (${contactPerson})`);

    let emailDelivered = false;

    // 2. محاولة الإرسال عبر SMTP (Nodemailer) - الأنسب لحساب Zoho Mail أو أي مزود بريد
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const port = Number(process.env.SMTP_PORT) || 465;
        const secure = port === 465;
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port,
          secure,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"منصة ديجيتال" <${process.env.SMTP_USER}>`,
          to: TARGET_EMAIL,
          replyTo: email || undefined,
          subject: emailSubject,
          text: plainText,
          html: emailHtml,
        });

        console.log(`[SMTP Success]: Email dispatched to ${TARGET_EMAIL}`);
        emailDelivered = true;
      } catch (smtpErr) {
        console.warn("[SMTP Error]:", smtpErr);
      }
    }

    // 3. محاولة الإرسال عبر Resend API
    if (!emailDelivered && process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "منصة ديجيتال <onboarding@resend.dev>",
            to: [TARGET_EMAIL],
            reply_to: email || undefined,
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (resendRes.ok) {
          console.log(`[Resend Success]: Email dispatched to ${TARGET_EMAIL}`);
          emailDelivered = true;
        } else {
          const errText = await resendRes.text();
          console.warn("[Resend Error]:", errText);
        }
      } catch (resendErr) {
        console.warn("[Resend Error]:", resendErr);
      }
    }

    // 4. إرسال فوري ومباشر كبديل تلقائي عبر FormSubmit بدون الحاجة لإعداد مسبق
    if (!emailDelivered) {
      try {
        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/03913a3be76582fa45b5a9f1bc2260ff`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Referer: "https://course.manasadigital.com/schools",
            Origin: "https://course.manasadigital.com",
          },
          body: JSON.stringify({
            _subject: emailSubject,
            _template: "table",
            "اسم المؤسسة": institutionName,
            "اسم المسؤول": contactPerson,
            "المسمى الوظيفي": jobTitle || "غير محدد",
            "الدولة والمدينة": countryCity,
            "عدد المعلمين": teacherCount || "غير محدد",
            "نوع التدريب": trainingType || "غير محدد",
            "المواد أو المراحل": subjectsGrades || "غير محدد",
            "رقم واتساب": whatsappNumber,
            "البريد الإلكتروني": email || "لم يُذكر",
            "ملاحظات إضافية": additionalNotes || "لا توجد",
            "تاريخ ووقت الطلب": submissionTime,
          }),
        });

        if (formSubmitRes.ok) {
          console.log(`[FormSubmit Success]: Request forwarded to ${TARGET_EMAIL}`);
          emailDelivered = true;
        } else {
          console.warn("[FormSubmit Warning]: Status", formSubmitRes.status);
        }
      } catch (fsErr) {
        console.warn("[FormSubmit Error]:", fsErr);
      }
    }

    // 5. إشعار الويب هوك الإضافي إن وُجد (مثل Slack / Discord / Zapier)
    if (process.env.NOTIFICATION_WEBHOOK_URL) {
      try {
        await fetch(process.env.NOTIFICATION_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetEmail: TARGET_EMAIL,
            institutionName,
            contactPerson,
            whatsappNumber,
            countryCity,
            teacherCount,
            trainingType,
            subjectsGrades,
            email,
            additionalNotes,
            submittedAt: submissionTime,
          }),
        });
      } catch (hookErr) {
        console.warn("[Webhook Dispatch Error]:", hookErr);
      }
    }

    return NextResponse.json({
      success: true,
      delivered: emailDelivered,
      message: `تم استلام الطلب وتوجيهه إلى البريد ${TARGET_EMAIL}`,
      targetEmail: TARGET_EMAIL,
    });
  } catch (error) {
    console.error("[Institutional Request API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
