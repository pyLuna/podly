"use client";
import { useParams } from "next/navigation";

export default function PlayerPage() {
  const { id } = useParams();

  return <div>Player Page</div>;
}
