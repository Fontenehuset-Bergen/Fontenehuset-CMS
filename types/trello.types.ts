import { SanityDocument } from "sanity";

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

export interface SanityApiItem extends SanityDocument {
  id: string;
  name: string;
  desc: string;
  allergies?: string[];
  trelloImage: string
}


export type TrelloApiItemStatus = "duplicate" | "new" | "processed" | "failed";
export interface TrelloApiItemModified extends TrelloApiItem {
  status?: TrelloApiItemStatus;
  include?: boolean;
  modified?: Date;
}
