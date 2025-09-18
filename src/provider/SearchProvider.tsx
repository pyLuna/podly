"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SearchContextType = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState<string>("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
