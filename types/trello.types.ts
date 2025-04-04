export interface TrelloApiItem {
  id: string
  name: string
  desc: string
  labels: {
    name: string
  }[]
  cover: {}
}

export interface TrelloApiResponse {

}