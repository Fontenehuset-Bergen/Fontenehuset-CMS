import { TrelloApiItem, TrelloApiItemModified } from "../../types/trello.types";
import { SanityClient } from "sanity";

export async function checkForExisting(
  client: SanityClient,
  item: TrelloApiItemModified,
) {
  // Rate limit to avoid spam
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Modify result from Trello and add field "duplicate"
  // todo: convert to check for ID instead
  const result: TrelloApiItem[] = await client.fetch(
    `*[_type == "lunchDishes" && name match "${item.name}"] {}`,
  );

  // Assign duplicate status
  if (result.length) {
    item.status = "duplicate";
    item.include = false;
  } else {
    item.status = "new";
    item.include = true;
  }
  
  // Attach fetched date key
  item.modified = new Date();

  return item;
}

export async function postData(client: SanityClient, data: TrelloApiItemModified[]) {
  // Create promise queue
  const queue: TrelloApiItemModified[] = [...data];
  const result: TrelloApiItemModified[] = [];

  while (queue.length) {
    const current = queue.shift();

    try {
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

  return result;
}

// todo: add function for deleting old menu items.
