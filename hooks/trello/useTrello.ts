import { useState } from "react";
import { TrelloApiItemModified } from "../../types/trello.types";
import { fetchTrello } from "../../libs/trello";
import { useSanity } from "../sanity/useSanity";

export function useTrello() {
  const { handleCheckForExisting } = useSanity();
  const [trelloData, setTrelloData] = useState<TrelloApiItemModified[]>([]);
  const [isTrelloAuthorized, setIsTrelloAuthorized] = useState<boolean>(false);
  const [isTrelloFetching, setTrelloFetching] = useState<boolean>(false);
  const [isTrelloError, setTrelloError] = useState<string>();

  // Todo: add propper error messages

  async function handleFetch() {
    setTrelloFetching(true);
    const results = await fetchTrello();
    if (!results) return setTrelloError("Unable to fetch from trello");

    // Check for duplicates
    for (const item of results) {
      const result = await handleCheckForExisting(item);
    }

    // Set finished data
    setTrelloData(results);
    setTrelloFetching(false);
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
