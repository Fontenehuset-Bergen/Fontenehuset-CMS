import { useState } from "react";
import { trelloCredentials } from "./credentials";
import { TrelloApiItem } from "../../types/trello.types";
import testData from "../../testData/trello.json";

export function useTrello() {
  const [data, setData] = useState<TrelloApiItem[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState();

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
      setFetching(true)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFetching(false)

      const filtered = testData.filter((item) => !item.name.includes("http"));
      setData(filtered);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    data,
    fetching,
    error,
    fetchTrello,
  };
}
