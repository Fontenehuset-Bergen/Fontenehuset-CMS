import {
  Box,
  Card,
  Flex,
  Stack,
  Text,
} from "@sanity/ui";
import { TrelloApiItem } from "../../types/trello.types";
import { LabelsInline } from "../lists/labels/inline";
import { useEffect, useState } from "react";

export function MenuItemCard({
  name,
  desc,
  labels,
  start,
  cover,
}: TrelloApiItem) {
  const [time, setTime] = useState<Date | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (start) {
      setTime(new Date(start));
    }
    if (cover?.scaled.length) {
      const firstImage = cover.scaled.at(1);
      setImage(firstImage?.url);
    }
  }, []);
  return (
    <Card
      padding={2}
      style={{ minWidth: 200, maxWidth: "50svw", width: "100%" }}
    >
      <Stack space={4}>
        <Flex align={"center"} gap={3}>
          <Card border style={{ width: 50, height: 50, overflow: "hidden" }}>
            <img
              src={image}
              alt='Bilde'
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </Card>
          <Stack flex={1} space={3}>
            <Flex align={"center"}>
              <Box flex={1}>
                <Text size={3} style={{ width: "100%" }}>
                  {name}
                </Text>
              </Box>
              <Text size={3} muted>
                {time
                  ? time.toLocaleDateString("no-NB", { dateStyle: "full" })
                  : "Ingen dato"}
              </Text>
            </Flex>
            {labels && <LabelsInline labels={labels} />}
          </Stack>
        </Flex>
        {desc ? (
          <Text>{desc}</Text>
        ) : (
          <Text muted style={{fontStyle: "italic"}}>Beskrivelse på matrett mangler</Text>
        )}
      </Stack>
    </Card>
  );
}
