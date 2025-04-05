import { TrelloApiItem } from "../../types/trello.types";
import testData from "../../tests/data/trelloApiResponse.json"

const trelloCredentials = {
  trelloApiKey: process.env.SANITY_STUDIO_TRELLO_API_KEY as string,
  trelloToken: process.env.SANITY_STUDIO_TRELLO_TOKEN as string,
  trelloBoardId: process.env.SANITY_STUDIO_TRELLO_BOARD_ID as string,
};

export async function fetchTrello() {
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

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result: TrelloApiItem[] = JSON.parse(JSON.stringify(testData));
    const filtered = result.filter((item) => !item.name.includes("http"));

    // limit to 10 during testing
    filtered.length = 10;

    return filtered
  } catch (err) {
    console.log(err);
  }
}
