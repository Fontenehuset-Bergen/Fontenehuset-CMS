import { SanityProvider } from "../../context/sanity/provider";
import { TrelloProvider } from "../../context/trello/provider";
import { TrelloImportPage } from "./page";

export function TrelloImportWrapper() {
  return (
    <SanityProvider>
      <TrelloProvider>
        <TrelloImportPage />
      </TrelloProvider>
    </SanityProvider>
  );
}
