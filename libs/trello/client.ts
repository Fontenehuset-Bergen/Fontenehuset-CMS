import { useState } from "react";
import { trelloCredentials } from "./credentials";
import { TrelloApiItem } from "../../types/trello.types";
import testData from "../../tests/data/trelloApiResponse.json";

export function useTrello() {
  const [data, setData] = useState<TrelloApiItem[]>([]);
  const [isTrolloAuthorized, setIsTrolloAuthorized] = useState<boolean>(false);
  const [isTrolloFetching, setTrolloFetching] = useState<boolean>(false);
  const [isTrolloError, setTrolloError] = useState();

  async function fetchTrello() {
    try {
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
      setTrolloFetching(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTrolloFetching(false);

      const result: TrelloApiItem[] = JSON.parse(JSON.stringify(testData));
      const filtered = result.filter((item) => !item.name.includes("http"));
      const addingTempDuplicateField = filtered.forEach(
        (item) =>
          (item.status = Math.round(Math.random()) > 0.5 ? "new" : "duplicate"),
      );
      setData(filtered);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    data,
    isTrolloAuthorized,
    isTrolloFetching,
    isTrolloError,
    fetchTrello,
  };
}
