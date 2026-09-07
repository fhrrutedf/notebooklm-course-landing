import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(30),
  subject: z.string().trim().max(120).optional().or(z.literal('')),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = registrationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: 'تأكد من تعبئة الاسم والبريد ورقم WhatsApp بشكل صحيح.' }, { status: 400 })
    }

    await db.workshopRegistration.create({ data: parsed.data })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, message: 'تعذر حفظ التسجيل الآن. حاول مرة ثانية.' }, { status: 500 })
  }
}
