import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { addSynonym, getAllSynonyms, synonyms } from "../lib/synonyms";

// POST and GET handlers
export async function POST(request: Request) {
  const formData = await request.formData();
  const word = formData.get("word") as string;
  const synonym = formData.get("synonym") as string;

  if (!word || !synonym) {
    return NextResponse.json(
      { message: "Both word and synonym are required." },
      { status: 400 }
    );
  }

  addSynonym(word, synonym);

  revalidateTag("synonyms");

  return NextResponse.json({ message: "Synonym added successfully." });
}

export async function DELETE() {
  synonyms.clear();

  revalidateTag("synonyms");

  return NextResponse.json({ message: "Synonyms deleted successfully." });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get("word");

  if (!word) {
    return NextResponse.json({ synonyms: Array.from(synonyms.keys()) });
  }

  return NextResponse.json({ synonyms: getAllSynonyms(word) });
}
