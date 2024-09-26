import Form from "./_components/form";
import List from "./_components/list";
import Search from "./_components/search";

async function fetchSynonyms(query: string) {
  try {
    const url = new URL("http://localhost:3000/api");
    if (query) {
      url.searchParams.append("word", query);
    }

    const response = await fetch(url, {
      next: { tags: ["synonyms"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch synonyms for query: ${query}`);
    }

    const data = (await response.json()) as { synonyms: string[] };
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { synonyms: [] };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const data = await fetchSynonyms(searchParams.query);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Search />
        <List synonyms={data.synonyms ?? []} />
        <Form />
      </main>
    </div>
  );
}
