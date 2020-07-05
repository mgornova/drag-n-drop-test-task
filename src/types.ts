export interface IDictionary<Type> {
  [key: string]: Type;
}

export interface IRectangle {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
}
