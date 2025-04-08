import { Box, Card, Checkbox, Flex, Text, Tooltip } from "@sanity/ui";
import { MenuItemCard } from "../../cards/menuItem";
import { TrelloApiItemModified } from "../../../types/trello.types";
import { StatusLabel } from "../labels/status";
import { LabelsInline } from "../labels/inline";
import { useTrelloContext } from "../../../context/trello/provider";

// todo add button for removing a single item
export function LoggerLine(lunchDish: TrelloApiItemModified) {
  const { trelloData, setTrelloData } = useTrelloContext();
  const due = lunchDish.start ? new Date(lunchDish.start) : undefined;
  const currentTime = new Date();

  function handleCheckbox(checked: boolean) {
    const trelloDataNew = trelloData.map((item) =>
      item.id === lunchDish.id ? { ...item, include: checked } : item,
    );
    setTrelloData(trelloDataNew);
  }

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
          <Text>
            {lunchDish.name} {lunchDish.include ? "true" : "false"}
          </Text>
        </Tooltip>
        {lunchDish.labels && <LabelsInline labels={lunchDish.labels} />}
        <Box flex={1}></Box>
        {lunchDish.status && <StatusLabel status={lunchDish.status} />}
        <Box style={{ width: 100, textAlign: "end" }}>
          <Text muted>
            {due
              ? due.toLocaleDateString("no-NB", { dateStyle: "long" })
              : "dato mangler"}
          </Text>
        </Box>
        <Checkbox
          checked={lunchDish.include}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleCheckbox(e.target.checked)
          }
        />
      </Flex>
    </Card>
  );
}
