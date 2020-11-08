export enum OrderingFieldType {
  ByTitle,
  ByDescription
}

export enum OrderingType {
  AscendingOrder,
  DescendingOrder
} 

export interface ICardsOrdering {
  field: OrderingFieldType
  order: OrderingType
}
