import { useState } from "react";
import { useClient } from "sanity";
import { TrelloApiItem, TrelloApiResponse } from "../../types/trello.types";
import { checkForExisting, postData } from "../../libs/sanity";

export function useSanity() {
  const client = useClient();
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [isSanityError, setSanityError] = useState();
  const [isSanityPosting, setSanityPosting] = useState<boolean>(false);

  async function handleCheckForExisting(item: TrelloApiItem) {
    return await checkForExisting(client, item);
  }

  async function handleSanityPost(data: TrelloApiItem[]) {
    setSanityPosting(true);

    if (allowDuplicates) {
      await postData(client, data);
    } else {
      const filtered = data.filter((item) => item.status == "new");
      await postData(client, filtered);
    }

    setSanityPosting(false);
  }

  return {
    allowDuplicates,
    isSanityError,
    isSanityPosting,
    handleCheckForExisting,
    handleSanityPost,
    setAllowDuplicates,
  };
}
