import { Badge } from "@sanity/ui";
import { TrelloApiItemStatus } from "../../../types/trello.types";

export function StatusLabel({ status, hideNew = false, }: { status: TrelloApiItemStatus; hideNew?: boolean; }) {
  // Hide new tag if toggled
  if (hideNew && status === "new") return null;

  const tone = status === "duplicate" ? "caution" : status === "processed" ? "positive" : "primary";
  const message = status === "duplicate" ? "Duplikat" : status === "processed" ? "Behandlet" : "Ny";

  return <Badge tone={tone}>{message}</Badge>;
}
