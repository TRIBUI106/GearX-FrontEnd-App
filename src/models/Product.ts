export interface Product {
    productId: number,

    name: string,
    shortDescription: string,
    description: string,
    brandId: number,
    categoryId: number,
    model: string,
    attributes: string,
    price: number,
    compareAtPrice: number,
    currencyCode: string,
    stockQuantity: number,
    warrantyMonths: number,
    mainImageUrl: string,
    imageUrls: string,
}