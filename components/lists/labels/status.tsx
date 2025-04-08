import { Badge } from "@sanity/ui";
import { TrelloApiItemStatus } from "../../../types/trello.types";

export function StatusLabel({
  status,
  hideNew = false,
}: {
  status: TrelloApiItemStatus;
  hideNew?: boolean;
}) {
  // Hide new tag if toggled
  if (hideNew && status === "new") return null;

  let tone: "primary" | "positive" | "caution" | "critical";
  let message;

  switch (true) {
    case status === "duplicate":
      tone = "caution";
      message = "Duplikat";
      break;
    case status === "processed":
      tone = "primary";
      message = "Behandlet";
      break;
    case status === "failed":
      tone = "critical";
      message = "Feil";
    default:
      tone = "positive";
      message = "Ny";
  }

  return (
    <Badge tone={tone} paddingLeft={2} paddingRight={2}>
      {message}
    </Badge>
  );
}
