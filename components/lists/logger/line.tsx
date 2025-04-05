import { Card, Flex, Text, Tooltip } from "@sanity/ui";
import { MenuItemCard } from "../../cards/menuItem";
import { TrelloApiItem } from "../../../types/trello.types";

export function LoggerLine(menuItem: TrelloApiItem) {
  const time = new Date().toLocaleTimeString("en-GB");
  return (
    <Card>
      <Flex gap={2}>
        <Text muted>{time}</Text>
        <Tooltip
          content={<MenuItemCard {...menuItem} />}
          animate
          fallbackPlacements={["right", "left"]}
          placement='top'
          portal
        >
          <Text>{menuItem.name}</Text>
        </Tooltip>
      </Flex>
    </Card>
  );
}
