import { Card, Flex, Text } from "@sanity/ui";
import { TrelloApiItem } from "../../types/trello.types";

export function MenuItemCard({ name, desc, labels }: TrelloApiItem) {
  return (
    <Card>
      <Flex>
        <Text>{name}</Text>
      </Flex>
    </Card>
  );
}
