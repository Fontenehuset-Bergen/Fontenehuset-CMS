import { Badge, Box, Card, Flex, Text, Tooltip } from "@sanity/ui";
import { MenuItemCard } from "../../cards/menuItem";
import { TrelloApiItem } from "../../../types/trello.types";
import { StatusLabel } from "../labels/status";

// todo add button for removing a single item
export function LoggerLine(lunchDish: TrelloApiItem) {
  const { id, name, desc, start, cover, labels, status } = lunchDish;
  const due = start ? new Date(start) : undefined;
  const currentTime = new Date();
  return (
    <Card>
      <Flex gap={4} align={"center"}>
        <Text muted>{currentTime.toLocaleTimeString("no-NB")}</Text>
        <Tooltip
          content={<MenuItemCard {...lunchDish} />}
          animate
          fallbackPlacements={["right", "left"]}
          placement='top'
          portal
        >
          <Text>{name}</Text>
        </Tooltip>
        <Box flex={1}></Box>
        {status && <StatusLabel status={status} />}
        <Box style={{width: 100, textAlign: "end"}}>
          <Text muted>
            {due
              ? due.toLocaleDateString("no-NB", { dateStyle: "long" })
              : "dato mangler"}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
