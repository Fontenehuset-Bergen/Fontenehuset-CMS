import { useState } from "react";
import { TrelloApiItemModified } from "../../types/trello.types";
import { useSanity } from "../sanity/useSanity";
import testData from "../../tests/data/trelloApiResponse.json";

const trelloCredentials = {
  trelloApiKey: process.env.SANITY_STUDIO_TRELLO_API_KEY as string,
  trelloToken: process.env.SANITY_STUDIO_TRELLO_TOKEN as string,
  trelloBoardId: process.env.SANITY_STUDIO_TRELLO_BOARD_ID as string,
};

export function useTrello() {
  const { handleCheckForExisting } = useSanity();
  const [trelloData, setTrelloData] = useState<TrelloApiItemModified[]>([]);
  const [isTrelloAuthorized, setIsTrelloAuthorized] = useState<boolean>(false);
  const [isTrelloFetching, setTrelloFetching] = useState<boolean>(false);
  const [isTrelloError, setTrelloError] = useState<string>();

  async function handleFetch() {
    setTrelloFetching(true);

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

      if (!filtered) return setTrelloError("Unable to fetch from trello");

      for (const item of filtered) {
        // Check for duplicates
        const status = await handleCheckForExisting(item);

        // Attach fetched date key
        item.modified = new Date();
      }

      // Set finished data
      setTrelloData(filtered);
    } catch (err) {
      console.log(err);
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
