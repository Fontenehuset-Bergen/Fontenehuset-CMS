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
}

export interface TrelloApiResponse {}
