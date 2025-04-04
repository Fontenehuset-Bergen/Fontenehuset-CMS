import { useTrello } from "../../libs/trello/client";
import { Button, Card, Flex, Spinner, Stack, Text } from "@sanity/ui";
import { useState } from "react";
import { LoggerComponent } from "../../components/lists/logger/container";

export function TrelloImportPage() {
  const { data, fetching, error, fetchTrello } = useTrello();

  return (
    <Flex
      padding={4}
      gap={4}
      direction={"column"}
    >
      <Flex gap={4}>
        <Card
          flex={1}
          padding={4}
          border
        >
          <Flex
            gap={2}
            direction={"column"}
          >
            <Text>Check login status</Text>
            <Button>Login</Button>
          </Flex>
        </Card>
        <Card
          flex={1}
          padding={4}
          border
        >
          <Flex
            gap={2}
            direction={"column"}
          >
            <Text>Fetch Data from Trello</Text>
            <Button onClick={fetchTrello}>Fetch</Button>
          </Flex>
        </Card>
        <Card
          flex={1}
          padding={4}
          border
        >
          <Flex
            gap={2}
            direction={"column"}
          >
            <Text>Update sanity</Text>
            <Button>Post</Button>
          </Flex>
        </Card>
      </Flex>
      <Card
        flex={1}
        padding={4}
        border
      >
        {fetching ? (
          <Flex
            padding={4}
            gap={2}
          >
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
