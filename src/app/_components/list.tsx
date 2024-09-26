interface Props {
  synonyms: string[];
}

const List = ({ synonyms }: Props) => {
  return (
    <ol>
      <h1 className="text-md font-bold mb-2">Words</h1>

      {synonyms.map((synonym: string) => (
        <li key={synonym}>{synonym}</li>
      ))}
    </ol>
  );
};

export default List;
