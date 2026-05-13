import {  ProductDTO } from "../core/models/product.model";

export const mockProductDTO: ProductDTO = {
  id: 1,
  title: 'Test product',
  price: 100,
  description: 'desc',
  category: 'electronics',
  image: '',
  rating: { rate: 4, count: 10 },
};
