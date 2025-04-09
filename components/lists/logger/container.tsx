import { Card, Stack } from "@sanity/ui";
import { LoggerLine } from "./line";
import { TrelloApiItemModified } from "../../../types/trello.types";

export function LoggerComponent({ items }: { items: TrelloApiItemModified[] }) {
  return (
    <Card>
      <Stack space={3}>
        {items && items.map((item) => <LoggerLine key={item.id} {...item} />)}
      </Stack>
    </Card>
  );
}
