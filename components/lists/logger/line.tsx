import { Badge, Box, Card, Flex, Text, Tooltip } from "@sanity/ui";
import { MenuItemCard } from "../../cards/menuItem";
import { TrelloApiItem } from "../../../types/trello.types";
import { StatusLabel } from "../labels/status";

export function LoggerLine(menuItem: TrelloApiItem) {
  // todo add button for removing a single item
  const time = new Date();
  return (
    <Card>
      <Flex gap={4} align={"center"}>
        <Text muted>{time.toLocaleTimeString("no-NB")}</Text>
        <Tooltip
          content={<MenuItemCard {...menuItem} />}
          animate
          fallbackPlacements={["right", "left"]}
          placement='top'
          portal
        >
          <Text>{menuItem.name}</Text>
        </Tooltip>
        <Box flex={1}></Box>
        {menuItem.status && <StatusLabel status={menuItem.status} hideNew/>}
        <Text muted>
          {time.toLocaleDateString("no-NB", { dateStyle: "long" })}
        </Text>
      </Flex>
    </Card>
  );
}
