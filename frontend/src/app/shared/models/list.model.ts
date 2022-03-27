import { Card } from "@shared/models/card.model";

export interface List {
  _id?: string | any,
  title: string,
  userId: string,
  cards: Card[]
}
