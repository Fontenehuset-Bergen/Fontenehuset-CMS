import { Box, Card, Text, Tooltip } from "@sanity/ui";
import { MenuItemCard } from "../../cards/menuItem";
import { TrelloApiItem } from "../../../types/trello.types";

export function LoggerLine(menuItem: TrelloApiItem) {
  const time = new Date().toLocaleTimeString("en-GB");
  return (
    <Card style={{ display: "flex", gap: "1rem" }}>
      <Text>{time}</Text>
      <Tooltip
        content={<MenuItemCard {...menuItem} />}
        animate
        fallbackPlacements={["right", "left"]}
        placement='top'
        portal
      >
        <Text>{menuItem.name}</Text>
      </Tooltip>
    </Card>
  );
}
