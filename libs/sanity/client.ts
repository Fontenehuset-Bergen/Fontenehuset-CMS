import { useState } from "react";
import { TrelloApiItem } from "../../types/trello.types";

export function useSanity() {
  const [isSanityError, setSanityError] = useState();
  const [isSanityPosting, setSanityPosting] = useState<boolean>(false);

  async function checkForExisting(data: TrelloApiItem[]) {
    // Check for dupes
    // Modify result from Trello and add field "duplicate" ?
    const addingTempDuplicateField = data.forEach(
      (item) =>
        (item.status = Math.round(Math.random()) > 0.5 ? "new" : "duplicate"),
    );
    return data;
  }

  async function postData(data: TrelloApiItem[]) {
    setSanityPosting(true);
    // Create promise queue
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setSanityPosting(false);
  }

  return { isSanityError, isSanityPosting, postData, checkForExisting };
}
