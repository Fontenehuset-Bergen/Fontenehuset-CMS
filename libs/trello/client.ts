import { useState } from "react";
import { trelloCredentials } from "./credentials";
import { TrelloApiItem } from "../../types/trello.types";
import testData from "../../tests/data/trelloApiResponse.json";
import { useSanity } from "../sanity/client";

export function useTrello() {
  const [trelloData, setTrelloData] = useState<TrelloApiItem[]>([]);
  const [isTrelloAuthorized, setIsTrelloAuthorized] = useState<boolean>(false);
  const [isTrelloFetching, setTrelloFetching] = useState<boolean>(false);
  const [isTrelloError, setTrelloError] = useState();
  const { checkForExisting } = useSanity();

  async function fetchTrello() {
    try {
      setTrelloFetching(true);
      // Query string for trello api
      /* const QUERY = `https://api.trello.com/1/boards/${trelloCredentials.trelloBoardId}/cards?fields=id,name,due,desc,labels,cover&attachments=true&attachment_fields=url&key=${trelloCredentials.trelloApiKey}&token=${trelloCredentials.trelloToken}`; */

      // Get headers
      /* const params = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }; */

      // Processing request and converting result into an object
      /* const result = await fetch(QUERY, params);
      const parsed = await result.json(); */

      /* if (parsed) {
        console.log(parsed);
        setData(parsed);
      } */

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result: TrelloApiItem[] = JSON.parse(JSON.stringify(testData));
      const filtered = result.filter((item) => !item.name.includes("http"));
      const duplicateMarked = await checkForExisting(filtered);

      setTrelloData(duplicateMarked);
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
    fetchTrello,
    setTrelloData,
  };
}
