"use client";
import { RadioIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function LeftSideBar() {
  const pathname = usePathname();

  const Button = ({
    href,
    text,
    icon,
  }: {
    href: string;
    text: string;
    icon: ReactNode;
  }) => (
    <Link
      href={href}
      className={`flex flex-col justify-center items-center gap-2 hover:text-primary duration-300 ${
        pathname === href ? "text-primary" : ""
      }`}
    >
      {icon}
      <small
        className={`text-xs text-muted-foreground/90 duration-300 ${
          pathname === href ? "text-primary" : ""
        }`}
      >
        {text}
      </small>
    </Link>
  );

  return (
    <nav className="h-screen w-[100px] text-foreground flex flex-col justify-center gap-8">
      <Button
        href="/"
        text="Best"
        icon={<StarIcon />}
      />
      {/* <Button
        href="/genres"
        text="Genres"
        icon={<RadioIcon />}
      /> */}
      <Button
        href="/player/123asd"
        text="Now Playing"
        icon={<RadioIcon />}
      />
    </nav>
  );
}
