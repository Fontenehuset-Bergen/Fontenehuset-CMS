import { SanityProvider } from "../../context/sanity/provider";
import { TrelloProvider } from "../../context/trello/provider";
import { TrelloImportPage } from "./page";

export function TrelloImportWrapper() {
  return (
    <TrelloProvider>
      <SanityProvider>
        <TrelloImportPage />
      </SanityProvider>
    </TrelloProvider>
  );
}
