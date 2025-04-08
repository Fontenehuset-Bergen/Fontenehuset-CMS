export type TrelloApiItemStatus = "duplicate" | "new" | "processed" | "failed";

export interface TrelloApiItem {
  id: string;
  name: string;
  desc: string;
  start: string | Date | undefined;
  labels?: {
    name: string;
  }[];
  cover?: {
    scaled: {
      url: string;
    }[];
  };
  attachments?: { url: string }[];
  status?: TrelloApiItemStatus;
}

export interface TrelloApiResponse {}
