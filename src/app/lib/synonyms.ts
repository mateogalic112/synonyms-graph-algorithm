// In-memory storage for synonyms
export const synonyms = new Map<string, Set<string>>();

// Function to add a synonym relationship
export const addSynonym = (word: string, synonym: string) => {
  if (!synonyms.has(word)) synonyms.set(word, new Set());
  if (!synonyms.has(synonym)) synonyms.set(synonym, new Set());

  synonyms.get(word)!.add(synonym);
  synonyms.get(synonym)!.add(word);
};

// Function to get all synonyms (transitive) - Visitor Pattern with BFS
export const getAllSynonyms = (word: string) => {
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
