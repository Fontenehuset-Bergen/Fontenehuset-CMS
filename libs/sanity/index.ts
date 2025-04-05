import { TrelloApiItem } from "../../types/trello.types";
import { SanityClient } from "sanity";

export async function checkForExisting(
  client: SanityClient,
  item: TrelloApiItem,
) {
  // Rate limit to avoid spam
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Modify result from Trello and add field "duplicate"
  // todo: convert to check for ID instead
  const result: TrelloApiItem[] = await client.fetch(
    `*[_type == "lunchDishes" && name match "${item.name}"] {}`,
  );

  if (result.length) {
    item.status = "duplicate";
  } else {
    item.status = "new";
  }

  // Tester
  /* data.forEach(
    (item) =>
      (item.status = Math.round(Math.random()) > 0.5 ? "new" : "duplicate"),
  ); */

  return item;
}

export async function postData(client: SanityClient, data: TrelloApiItem[]) {
  // Create promise queue
  const queue: TrelloApiItem[] = [...data];
  const result: TrelloApiItem[] = [];

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
