const GenreSkeleton = () => {
  const skeletons = Array.from({ length: 20 }, (_, index) => (
    <li key={index}>
      <div className="animate-pulse bg-gray-600 h-4 rounded-md w-full"></div>
    </li>
  ));

  return (
    <section className="flex flex-col gap-4">
      <h1>Genres</h1>
      <div className="rounded-md">
        <ul className="space-y-2">{skeletons}</ul>
      </div>
    </section>
  );
};

export default GenreSkeleton;
