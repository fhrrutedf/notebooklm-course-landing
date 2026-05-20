import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "يرجى إدخال نص البحث" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const searchResult = await zai.functions.invoke("web_search", {
      query: query.trim(),
      num: 8,
    });

    return NextResponse.json({ results: searchResult });
  } catch (error: any) {
    console.error("Search API error:", error.message);
    return NextResponse.json(
      { error: "حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى" },
      { status: 500 }
    );
  }
}
