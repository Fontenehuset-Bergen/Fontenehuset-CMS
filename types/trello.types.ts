export type TrelloApiItemStatus = "duplicate" | "new" | "processed" | "failed";

export interface TrelloApiItem {
  id: string;
  name: string;
  desc: string;
  due?: Date | null;
  labels?: {
    name: string;
  }[];
  cover?: {
    scaled: {
      id: string;
      url: string;
    }[];
  };
  attachments?: {
    id: string;
    url: string;
  }[];
  status: TrelloApiItemStatus;
}

export interface TrelloApiResponse {}
