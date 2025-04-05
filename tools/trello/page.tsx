import { useState } from "react";
import { Box, Button, Card, Checkbox, Flex, Spinner, Text } from "@sanity/ui";
import { DownloadIcon, AddDocumentIcon, UserIcon } from "@sanity/icons";
import { LoggerComponent } from "../../components/lists/logger/container";
import { ProcessStatusButton } from "../../components/buttons/processStatusButton";
import { useTrello } from "../../hooks/trello/useTrello";
import { useSanity } from "../../hooks/sanity/useSanity";

export function TrelloImportPage() {
  const {
    trelloData,
    isTrelloAuthorized,
    isTrelloError,
    isTrelloFetching,
    handleFetch,
  } = useTrello();
  const {
    allowDuplicates,
    isSanityError,
    isSanityPosting,
    handleSanityPost,
    setAllowDuplicates,
  } = useSanity();
  const [currentStage, setCurrentStage] = useState<string>("login"); // change logic to use isTrolloAuthorized

  function handlePost() {
    handleSanityPost(trelloData);
  }

  return (
    <Flex padding={4} gap={4} direction={"column"}>
      <Flex gap={4}>
        <Card flex={1} padding={4} border muted={currentStage !== "login"}>
          <Flex gap={4} direction={"column"} style={{ height: "100%" }}>
            <Flex justify={"center"}>
              <Text size={4}>Autorisasjon</Text>
            </Flex>
            <Text>
              For at vi skal kunne få tilgang på funksjonalitet må du være
              logget inn i nettleseren med en bruker som tilhører Fontenehuset
              på Trello
            </Text>
            <Box flex={1}></Box>
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
          <Flex gap={4} direction={"column"} style={{ height: "100%" }}>
            <Flex justify={"center"}>
              <Text size={4}>Trello</Text>
            </Flex>
            <Text>
              Last ned tilgjengelig data fra Trello. Kun lunchretter med dato
              framover vill bli inkludert. Inspeser data og sjekk at ingen
              felter står tomme, da må du fikse det i Trello
            </Text>
            <Box flex={1}></Box>
            <ProcessStatusButton
              disabled={currentStage === "login"}
              onClick={handleFetch}
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
          <Flex gap={4} direction={"column"} style={{ height: "100%" }}>
            <Flex justify={"center"}>
              <Text size={4}>Sanity</Text>
            </Flex>
            <Text>
              Her kan du laste opp resultatet du mottok fra Trello tidligere
            </Text>
            <Flex gap={2} align={"center"}>
              <Checkbox
                checked={allowDuplicates}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAllowDuplicates(e.target.checked)
                }
              />
              <Text>Tillat duplikater</Text>
            </Flex>
            <Box flex={1}></Box>
            <ProcessStatusButton
              disabled={trelloData.length === 0}
              onClick={handlePost}
              loading={isSanityPosting}
              icon={AddDocumentIcon}
              // todo: update defaultText to say posted then done
              defaultText={
                trelloData.length > 0
                  ? "Overfør til Sanity"
                  : "Fullfør tidligere steg"
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
