import { useState } from "react";
import { Button, Card, Flex, Spinner, Stack, Text } from "@sanity/ui";
import { LoggerComponent } from "../../components/lists/logger/container";
import { useTrello } from "../../libs/trello/client";
import { useSanity } from "../../libs/sanity/client";

export function TrelloImportPage() {
  const { data, isTrolloAuthorized, isTrolloError, isTrolloFetching, fetchTrello } = useTrello();
  const { isSanityError, isSanityPosting, postData } = useSanity();
  const [currentStage, setCurrentStage] = useState<string>("login");

  function handlePost() {
    postData(data);
  }

  return (
    <Flex padding={4} gap={4} direction={"column"}>
      <Flex gap={4}>
        <Card flex={1} padding={4} border muted={currentStage !== "login"}>
          <Flex gap={2} direction={"column"}>
            <Text>Check login status</Text>
            <Button
              disabled={currentStage !== "login"}
              onClick={() => setCurrentStage("fetch")}
            >
              Login
            </Button>
          </Flex>
        </Card>
        <Card flex={1} padding={4} border muted={currentStage === "login"}>
          <Flex gap={2} direction={"column"}>
            <Text>Fetch Data from Trello</Text>
            <Button disabled={currentStage === "login"} onClick={fetchTrello}>
              {data.length ? "Reload" : "Fetch"}
            </Button>
          </Flex>
        </Card>
        <Card flex={1} padding={4} border muted={data.length === 0}>
          <Flex gap={2} direction={"column"}>
            <Text>Update sanity</Text>
            <Button disabled={data.length === 0} onClick={handlePost}>
              Post {data.length}
            </Button>
          </Flex>
        </Card>
      </Flex>
      <Card flex={1} padding={4} border>
        {isTrolloFetching ? (
          <Flex padding={4} gap={2}>
            <Spinner muted />
            <Text>Loading...</Text>
          </Flex>
        ) : (
          <LoggerComponent items={data} />
        )}
      </Card>
    </Flex>
  );
}
