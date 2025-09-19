import Player from "@/components/Player";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="content flex flex-col">
      <Player />
      {children}
    </div>
  );
}
