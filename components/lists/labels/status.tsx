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
      message = "Eksisterer allerede";
      break;
    case status === "processed":
      tone = "primary";
      message = "Lagt til!";
      break;
    case status === "failed":
      tone = "critical";
      message = "Feil";
      break;
    case status === "deleted":
      tone = "critical";
      message = "Slettet";
      break;
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
