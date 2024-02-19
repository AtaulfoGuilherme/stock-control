export interface GetAllProductsResponse {
  id: string;
  Name: string;
  amount: number;
  description: string;
  price: string;
  category: {
    id: string;
    name: string;
  }
}
