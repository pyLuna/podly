export default function Lists({ lists }: { lists?: Record<string, any>[] }) {
  return (
    <div>
      {lists?.map((list) => (
        <div key={list.id}>{list.title}</div>
      ))}
    </div>
  );
}
