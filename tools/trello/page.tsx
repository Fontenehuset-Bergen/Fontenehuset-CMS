import { Box, Card, Checkbox, Flex, Spinner, Text } from "@sanity/ui";
import {
  DownloadIcon,
  AddDocumentIcon,
  DocumentRemoveIcon,
} from "@sanity/icons";
import { LoggerComponent } from "../../components/lists/logger/container";
import { ProcessStatusButton } from "../../components/buttons/processStatusButton";
import { useTrelloContext } from "../../context/trello/provider";
import { useSanityContext } from "../../context/sanity/provider";
import { TrelloApiItemModified } from "../../types/trello.types";

export function TrelloImportPage() {
  const {
    allowDuplicates,
    handleSanityPost,
    isSanityError,
    isSanityPosting,
    isSanityPruning,
    isSanityPruned,
    setAllowDuplicates,
    handleSanityPrune,
  } = useSanityContext();
  const {
    handleFetch,
    setTrelloData,
    isTrelloError,
    isTrelloFetching,
    trelloData,
  } = useTrelloContext();

  async function handleSanityPruneResult() {
    const result = await handleSanityPrune();
    if (!result) return;
    const handled: TrelloApiItemModified[] = trelloData.map((item) =>
      result.includes(item.id) ? { ...item, status: "deleted" } : item,
    );
    setTrelloData(handled);
  }

  return (
    <Flex padding={4} gap={4} direction={"column"}>
      <Flex gap={4}>
        <Card flex={1} padding={4} border muted={trelloData.length > 0}>
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
              disabled={trelloData.length > 0}
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
            <Box flex={1}></Box>
            <ProcessStatusButton
              disabled={trelloData.length === 0}
              onClick={() => handleSanityPost(trelloData)}
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
        <Card flex={1} padding={4} border muted={trelloData.length === 0}>
          <Flex gap={4} direction={"column"} style={{ height: "100%" }}>
            <Flex justify={"center"}>
              <Text size={4}>Sanity Cleanup</Text>
            </Flex>
            <Text>
              Her kan du slette gamle lunch retter for å holde sanity ryddig
            </Text>
            <Box flex={1}></Box>
            <ProcessStatusButton
              disabled={trelloData.length === 0 || isSanityPruned > 0}
              onClick={handleSanityPruneResult}
              loading={isSanityPruning}
              icon={DocumentRemoveIcon}
              defaultText={
                isSanityPruned > 0
                  ? `${isSanityPruned} dokument${isSanityPruned > 1 ? "er" : ""} slettet`
                  : "Slett gammel data"
              }
              activeText='Sletter...'
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
