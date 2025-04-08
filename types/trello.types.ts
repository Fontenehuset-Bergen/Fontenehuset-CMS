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
}

export type TrelloApiItemStatus = "duplicate" | "new" | "processed" | "failed";
export interface TrelloApiItemModified extends TrelloApiItem {
  status?: TrelloApiItemStatus;
  include?: boolean;
  modified?: Date;
}
