import { createContext, ReactNode, useContext } from "react";
import { useSanity } from "../../hooks/sanity/useSanity";

const SanityContext = createContext<ReturnType<typeof useSanity> | null>(null);

export function useSanityContext() {
  const context = useContext(SanityContext);
  if (!context)
    throw new Error("useSanityContext must be used within SanityProvider");
  return context;
}

export function SanityProvider({ children }: { children: ReactNode }) {
  const Sanity = useSanity();
  return (
    <SanityContext.Provider value={Sanity}>{children}</SanityContext.Provider>
  );
}
