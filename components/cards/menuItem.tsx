import { Badge, Box, Card, Flex, Inline, Stack, Text } from "@sanity/ui";
import { TrelloApiItem } from "../../types/trello.types";
import { LabelsInline } from "../lists/labels/inline";
import testTrelloApiItem from "../../tests/data/trelloApiItem.json";

export function MenuItemCard({ name, desc, labels }: TrelloApiItem) {
  const time = new Date();

  return (
    <Card
      padding={2}
      style={{ minWidth: 200, maxWidth: "50svw", width: "100%" }}
    >
      <Stack space={4}>
        <Flex gap={3}>
          <Box>image</Box>
          <Stack flex={1} space={3}>
            <Flex align={"center"}>
              <Box flex={1}>
                <Text size={3} style={{ width: "100%" }}>
                  {name}
                </Text>
              </Box>
              <Text size={3} muted>
                {time.toLocaleDateString("no-NB", { dateStyle: "full" })}
              </Text>
            </Flex>
            {labels && <LabelsInline labels={labels} />}
          </Stack>
        </Flex>
        {desc ? <Text>{desc}</Text> : <Text muted>Beskrivelse på matrett mangler</Text>}
      </Stack>
    </Card>
  );
}
