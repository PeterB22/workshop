
export type ProductListDTO = ProductDTO[];

export type ProductCategory = 'electronics' | 'jewelery' | 'men\'s clothing' | 'women\'s clothing';

export interface ProductDTO {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const createProduct = (productDTO: ProductDTO): ProductWithExtensions => ({
    id: productDTO.id.toString(),
    name: productDTO.title,
    price: productDTO.price,
    description: productDTO.description,
    category: productDTO.category as ProductCategory,
    imageUrl: productDTO.image,
    rating: productDTO.rating,
    isInCart: false
});

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: ProductCategory;
    imageUrl: string;
    rating: {
        rate: number;
        count: number;
    };
}

export type ProductWithExtensions = Product & {
    isInCart: boolean;
};