import { useState } from "react";
import { Button, Card, Flex, Spinner, Text } from "@sanity/ui";
import { DownloadIcon, AddDocumentIcon, UserIcon } from "@sanity/icons";
import { LoggerComponent } from "../../components/lists/logger/container";
import { useTrello } from "../../libs/trello/client";
import { useSanity } from "../../libs/sanity/client";
import { ProcessStatusButton } from "../../components/buttons/processStatusButton";

export function TrelloImportPage() {
  const {
    trelloData,
    isTrelloAuthorized,
    isTrelloError,
    isTrelloFetching,
    fetchTrello,
    setTrelloData,
  } = useTrello();
  const { isSanityError, isSanityPosting, postData } = useSanity();
  const [currentStage, setCurrentStage] = useState<string>("login"); // change logic to use isTrolloAuthorized

  function handlePost() {
    postData(trelloData);
  }

  return (
    <Flex padding={4} gap={4} direction={"column"}>
      <Flex gap={4}>
        <Card flex={1} padding={4} border muted={currentStage !== "login"}>
          <Flex gap={4} direction={"column"}>
            <Flex justify={"center"}>
              <Text size={4}>Autorisasjon</Text>
            </Flex>
            <Button
              onClick={() => setCurrentStage("fetch")}
              disabled={currentStage !== "login"}
              text='Login'
              iconRight={UserIcon}
              space={3}
              fontSize={4}
              justify={"space-between"}
            />
          </Flex>
        </Card>
        <Card flex={1} padding={4} border muted={currentStage === "login"}>
          <Flex gap={4} direction={"column"}>
            <Flex justify={"center"}>
              <Text size={4}>Trello</Text>
            </Flex>
            <ProcessStatusButton
              disabled={currentStage === "login"}
              onClick={fetchTrello}
              loading={isTrelloFetching}
              icon={DownloadIcon}
              defaultText={
                trelloData.length > 0
                  ? "Last ned igjen"
                  : "Last ned Trello data"
              }
              activeText='Laster ned...'
            />
          </Flex>
        </Card>
        <Card flex={1} padding={4} border muted={trelloData.length === 0}>
          <Flex gap={4} direction={"column"}>
            <Flex justify={"center"}>
              <Text size={4}>Sanity</Text>
            </Flex>
            <ProcessStatusButton
              disabled={trelloData.length === 0}
              onClick={handlePost}
              loading={isSanityPosting}
              icon={AddDocumentIcon}
              // todo: update defaultText to say posted then done
              defaultText={
                trelloData.length > 0
                  ? "Overfør til Sanity"
                  : "Utilgjengelig nå"
              }
              activeText='Oppdaterer...'
            />
          </Flex>
        </Card>
      </Flex>
      <Card flex={1} padding={4} border>
        {isTrelloFetching ? (
          <Flex padding={4} gap={2}>
            <Spinner muted />
            <Text>Loading...</Text>
          </Flex>
        ) : (
          <LoggerComponent items={trelloData} />
        )}
      </Card>
    </Flex>
  );
}
