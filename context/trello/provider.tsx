import { createContext, ReactNode, useContext } from "react";
import { useTrello } from "../../hooks/trello/useTrello";

const TrelloContext = createContext<ReturnType<typeof useTrello> | null>(null);

export function useTrelloContext() {
  const context = useContext(TrelloContext);
  if (!context)
    throw new Error("useTrelloContext must be used within TrelloProvider");
  return context;
}

export function TrelloProvider({ children }: { children: ReactNode }) {
  const trello = useTrello();
  return (
    <TrelloContext.Provider value={trello}>{children}</TrelloContext.Provider>
  );
}
