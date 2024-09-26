import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// In-memory storage for synonyms
const synonyms = new Map<string, Set<string>>();

// Function to add a synonym relationship
const addSynonym = (word: string, synonym: string) => {
  if (!synonyms.has(word)) synonyms.set(word, new Set());
  if (!synonyms.has(synonym)) synonyms.set(synonym, new Set());

  synonyms.get(word)!.add(synonym);
  synonyms.get(synonym)!.add(word);
};

// Function to get all synonyms (transitive) - Visitor Pattern with BFS
const getAllSynonyms = (word: string) => {
  if (!synonyms.has(word)) return [];

  const visited = new Set([word]); // Keep track of visited words
  const queue = [word]; // Queue to perform Breadth First Search
  const result = [];

  while (queue.length > 0) {
    const currentWord = queue.shift() as string; // Dequeue the current word in line
    result.push(currentWord);

    for (const synonym of synonyms.get(currentWord)!) {
      if (!visited.has(synonym)) {
        visited.add(synonym);
        queue.push(synonym);
      }
    }
  }

  // Remove the original word from the result
  return result.filter((w) => w !== word);
};

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
