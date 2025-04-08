import { useState } from "react";
import { useClient } from "sanity";
import { TrelloApiItemModified } from "../../types/trello.types";

export function useSanity() {
  const client = useClient({ apiVersion: "2025-02-10" });
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [isSanityError, setSanityError] = useState<string>("");
  const [isSanityPosting, setSanityPosting] = useState<boolean>(false);
  const [isSanityPruning, setSanityPruning] = useState<boolean>(false);

  async function handleCheckForExisting(item: TrelloApiItemModified) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    // todo: convert to check for ID instead
    const result: TrelloApiItemModified[] = await client.fetch(
      `*[_type == "lunchDishes" && id match "${item.id}"] {}`,
    );

    // Assign duplicate status
    if (result.length) {
      item.status = "duplicate";
      item.include = false;
    } else {
      item.status = "new";
      item.include = true;
    }

    return item;
  }

  async function handleSanityPost(data: TrelloApiItemModified[]) {
    // Create promise queue
    const queue: TrelloApiItemModified[] = [...data];
    const result: TrelloApiItemModified[] = [];

    // Set status and start posting
    setSanityPosting(true);
    while (queue.length) {
      const current = queue.shift();
      try {
        // Cancel if last item reached
        if (!current) continue;

        const response = await client.create({
          _type: "lunchDishes",
          name: current.name,
        });

        // Mark status and push to result
        if (response._id) {
          current.status = "processed";
        } else {
          current.status = "failed";
        }

        result.push(current);

        // Rate limit to avoid spam
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (err) {
        console.log(err);
      }
    }

    setSanityPosting(false);
    return result;
  }

  async function handleSanityPrune() {
    setSanityPruning(true);
    const date = new Date();

    const result = client.delete({ query: `*[_type == "lunchDishes"]` });
    // const result = client.fetch(`*[_type == "lunchDishes" && ]`)
    console.log(result);
    setSanityPruning(false);
  }

  return {
    allowDuplicates,
    isSanityError,
    isSanityPosting,
    isSanityPruning,
    handleCheckForExisting,
    handleSanityPost,
    setAllowDuplicates,
    handleSanityPrune,
  };
}
