import { TrelloApiItem } from "../../types/trello.types";
import testData from "../../tests/data/trelloApiResponse.json";

const trelloCredentials = {
  trelloApiKey: process.env.SANITY_STUDIO_TRELLO_API_KEY as string,
  trelloToken: process.env.SANITY_STUDIO_TRELLO_TOKEN as string,
  trelloBoardId: process.env.SANITY_STUDIO_TRELLO_BOARD_ID as string,
};

export async function fetchTrello() {
  try {
    // Query string for trello api
    // const QUERY = `https://api.trello.com/1/boards/${trelloCredentials.trelloBoardId}/cards?open&fields=id,name,start,desc,labels,cover&attachments=true&key=${trelloCredentials.trelloApiKey}&token=${trelloCredentials.trelloToken}`;

    // Set headers for get method
    /* const params = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }; */

    // Processing request and converting result into an object
    /* const result = await fetch(QUERY, params);
    const parsed: TrelloApiItem[] = await result.json(); */

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const result: TrelloApiItem[] = JSON.parse(JSON.stringify(testData));
    const filtered = result.filter((item) => !item.name.includes("http") && item.start);

    return filtered;
  } catch (err) {
    console.log(err);
  }
}
