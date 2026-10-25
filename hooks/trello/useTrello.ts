import { useState } from "react";
import { TrelloApiItemModified } from "../../types/trello.types";
import testData from "../../tests/data/trelloApiResponse.json";
import { useSanityContext } from "../../context/sanity/provider";

const trelloCredentials = {
  trelloApiKey: process.env.SANITY_STUDIO_TRELLO_API_KEY as string,
  trelloToken: process.env.SANITY_STUDIO_TRELLO_TOKEN as string,
  trelloBoardId: process.env.SANITY_STUDIO_TRELLO_BOARD_ID as string,
};

export function useTrello() {
  const { handleCheckForExisting } = useSanityContext();
  const [trelloData, setTrelloData] = useState<TrelloApiItemModified[]>([]);
  const [isTrelloAuthorized, setIsTrelloAuthorized] = useState<boolean>(false);
  const [isTrelloFetching, setTrelloFetching] = useState<boolean>(false);
  const [isTrelloError, setTrelloError] = useState<string>();

  async function handleFetch() {
    setTrelloFetching(true);
    setTrelloError(undefined);

    try {
      // Query string for trello api
      const QUERY = `https://api.trello.com/1/boards/${trelloCredentials.trelloBoardId}/cards?open&fields=id,name,start,desc,labels,cover&attachments=true&key=${trelloCredentials.trelloApiKey}&token=${trelloCredentials.trelloToken}`;

      // Set headers for get method
      const params = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      // Processing request and converting result into an object
      const result = await fetch(QUERY, params);
      const parsed: TrelloApiItemModified[] = await result.json();

      /* const result: TrelloApiItemModified[] = JSON.parse(
        JSON.stringify(testData),
      ); */
      const filtered = parsed.filter(
        (item) => !item.name.includes("http") && item.start,
      );

      if (filtered.length === 0)
        return setTrelloError("Fant ingen lunsjretter med dato i Trello");

      const checked: TrelloApiItemModified[] = [];

      for (const item of filtered) {
        // Check for duplicates
        const checkedItem = await handleCheckForExisting(item);

        // Attach fetched date key
        checked.push({ ...(checkedItem ?? item), modified: new Date() });
      }

      // Set finished data
      setTrelloData(checked);
    } catch (err) {
      console.log(err);
      setTrelloError(
        err instanceof Error ? err.message : "Ukjent feil fra Trello",
      );
    } finally {
      setTrelloFetching(false);
    }
  }

  return {
    trelloData,
    isTrelloAuthorized,
    isTrelloFetching,
    isTrelloError,
    handleFetch,
    setTrelloData,
  };
}
