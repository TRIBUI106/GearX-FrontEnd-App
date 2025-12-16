import { apiService } from "./axiosConfig";

export const getHomepageProductsApi = async (page: number = 1, size: number = 10) => {
    return await apiService.get("product/search", {
        params: {
            page,
            size
        }
    })
}

export const getProductByIdApi = async (productId: number) => {
    return await apiService.get(`product/get/${productId}`)
}

// Search products with filters
export const searchProductsApi = async (params: {
    q?: string;
    active?: boolean;
    hasStock?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    dir?: 'asc' | 'desc';
}) => {
    return await apiService.get("product/search", { params });
}

// Search by brand
export const searchProductsByBrandApi = async (brandId: number, params: {
    q?: string;
    active?: boolean;
    hasStock?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    dir?: 'asc' | 'desc';
}) => {
    return await apiService.get(`product/search/brand/${brandId}`, { params });
}

// Search by category
export const searchProductsByCategoryApi = async (categoryId: number, params: {
    q?: string;
    active?: boolean;
    hasStock?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    dir?: 'asc' | 'desc';
}) => {
    return await apiService.get(`product/search/category/${categoryId}`, { params });
}

// Insert product
export const insertProductApi = async (data: {
    name: string;
    shortDescription?: string;
    description?: string;
    brandId: number;
    categoryId: number;
    model?: string;
    attributes?: string;
    price: number;
    compareAtPrice?: number;
    currencyCode: string;
    stockQuantity: number;
    warrantyMonths?: number;
    mainImageUrl?: string;
    imageUrls?: string;
    isActive?: number;
    createdBy: string;
}) => {
    return await apiService.post("product/insert", data);
}

// Update product
export const updateProductApi = async (productId: number, data: {
    name?: string;
    shortDescription?: string;
    description?: string;
    brandId?: number;
    categoryId?: number;
    model?: string;
    attributes?: string;
    price?: number;
    compareAtPrice?: number;
    stockQuantity?: number;
    warrantyMonths?: number;
    mainImageUrl?: string;
    imageUrls?: string;
    updatedBy: string;
}) => {
    return await apiService.put(`product/update/${productId}`, data);
}

// Soft delete product
export const deleteProductApi = async (productId: number, updatedBy: string) => {
    return await apiService.delete(`product/delete/${productId}`, {
        params: { updatedBy }
    });
}

// Restore product
export const restoreProductApi = async (productId: number, updatedBy: string) => {
    return await apiService.post(`product/restore/${productId}`, null, {
        params: { updatedBy }
    });
}

// Update active status
export const updateProductActiveApi = async (productId: number, value: number, updatedBy: string) => {
    return await apiService.patch(`product/active/${productId}`, null, {
        params: { value, updatedBy }
    });
}

// Check if product exists by name
export const checkProductExistsApi = async (name: string) => {
    return await apiService.get("product/exists", {
        params: { name }
    });
}

// Upload main image
export const uploadProductMainImageApi = async (productId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return await apiService.post(`product/${productId}/images/main`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// Upload gallery images
export const uploadProductGalleryImagesApi = async (productId: number, files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });
    
    return await apiService.post(`product/${productId}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
