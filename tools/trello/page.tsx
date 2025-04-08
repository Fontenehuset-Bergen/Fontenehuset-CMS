import { Box, Card, Checkbox, Flex, Spinner, Text } from "@sanity/ui";
import { DownloadIcon, AddDocumentIcon } from "@sanity/icons";
import { LoggerComponent } from "../../components/lists/logger/container";
import { ProcessStatusButton } from "../../components/buttons/processStatusButton";
import { useTrelloContext } from "../../context/trello/provider";
import { useSanityContext } from "../../context/sanity/provider";

export function TrelloImportPage() {
  const {
    allowDuplicates,
    handleSanityPost,
    isSanityError,
    isSanityPosting,
    setAllowDuplicates,
  } = useSanityContext();
  const { handleFetch, isTrelloError, isTrelloFetching, trelloData } =
    useTrelloContext();

  function handlePost() {
    handleSanityPost(trelloData);
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
