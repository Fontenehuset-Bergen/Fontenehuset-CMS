import { useState } from "react";
import { useClient } from "sanity";
import { SanityApiItem, TrelloApiItemModified } from "../../types/trello.types";

export function useSanity() {
  const client = useClient({ apiVersion: "2025-02-10" });
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [isSanityError, setSanityError] = useState<string>("");
  const [isSanityPosting, setSanityPosting] = useState<boolean>(false);
  const [isSanityPruning, setSanityPruning] = useState<boolean>(false);
  const [isSanityPruned, setSanityPruned] = useState<number>(0);

  async function handleCheckForExisting(item: TrelloApiItemModified) {
    try {
      // Delay executions to avoid timeouts
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
    } catch (err) {
      console.log(err);
      if (typeof err === "string") {
        setSanityError(err);
      }
    }
  }

  async function handleSanityPost(data: TrelloApiItemModified[]) {
    // Create promise queue
    const queue: TrelloApiItemModified[] = [...data];
    const result: TrelloApiItemModified[] = [];

    // Set status and start posting
    setSanityPosting(true);

    while (queue.length) {
      const current = queue.shift();

      // Cancel if last item reached
      if (!current) continue;

      // Skip excluded files
      if (!current.include) continue;

      try {
        // Create basic document
        const document: Partial<SanityApiItem> = {
          _type: "lunchDishes",
          name: current.name,
          id: current.id,
          desc: current.desc,
        };

        // Handle date
        if (current.start) {
          const date = new Date(current.start);
          document.date = date;
        }

        // Handle allergies
        if (current.labels) {
          document.allergies = current.labels.reduce<string[]>(
            (a, current) => [...a, current.name.toLowerCase()],
            [],
          );
        }

        // Handle image
        const hasImage = current.attachments?.at(0);
        if (hasImage?.url) {
          /* // Fetch image and details from trello
          const extension = hasImage.url.split(".").pop()
          const imageResponse = await fetch(hasImage.url)
          const imageBlob = imageResponse.blob()

          // Upload image to sanity assets and attach to document
          const sanityAssetResponse = await client.assets.upload('image', imageBlob, {
            filename: 'uploaded-image.jpg',
          }); */

          // Temporary solution due to CORS problems
          document.trelloImage = hasImage.url;
        }

        // Find solution for Partial constructor earlier
        // Create document
        const response = await client.create(
          JSON.parse(JSON.stringify(document)),
        );

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
        if (typeof err === "string") {
          setSanityError(err);
        }
      }
    }

    setSanityPosting(false);
    return result;
  }

  async function handleSanityPrune() {
    setSanityPruned(0);
    setSanityPruning(true);
    try {
      // Delay executions to avoid timeouts
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // todo: add date lookup
      const result: SanityApiItem[] = await client
        .delete({
          query: `*[_type == "lunchDishes" && dateTime(date) < dateTime(now()) - 60*60*24*7]`,
        })
        .then((data) => data.results);

      // Return result of deletion and update pruned #
      if (result.length) {
        setSanityPruned(result.length as number);
        return result.map(
          (item: Record<string, any>) => item.document.id,
        ) as string[];
      }

      // Return empty array if nothing was deleted
      return [];
    } catch (err) {
      console.log(err);
      if (typeof err === "string") {
        setSanityError(err);
      }
    } finally {
      setSanityPruning(false);
    }
  }

  return {
    allowDuplicates,
    isSanityError,
    isSanityPosting,
    isSanityPruning,
    isSanityPruned,
    handleCheckForExisting,
    handleSanityPost,
    setAllowDuplicates,
    handleSanityPrune,
  };
}
