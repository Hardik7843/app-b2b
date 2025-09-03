import { ApiResponse, fetchInstance } from "@/lib/fetch";
import { UserType } from "./auth.service";
import { CreateProductInput } from "@/validators/admin.product.validator";
import { number } from "zod";

// services/product.service.ts
type ProductData = {
  name: string;
  originalPrice: number;
  active: boolean;
  stock: number;
  description?: string | undefined;
  price?: number | undefined;
  images?: string[] | undefined;
  tags?: string[] | undefined;
};

export type Product = ProductData & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

// Get product by ID
export async function getProductById(
  id: number
): Promise<ApiResponse<{ admin: UserType; product: CreateProductInput }>> {
  try {
    const response = await fetchInstance<
      ApiResponse<{ admin: UserType; product: CreateProductInput }>
    >(`/admin/product/get/${id}`, {}, "GET");
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      message: "Failed to fetch product details",
    };
  }
}

// Create new product
export async function createProduct(
  productData: CreateProductInput
): Promise<ApiResponse<{ admin: UserType; product: CreateProductInput }>> {
  try {
    const response = await fetchInstance<
      ApiResponse<{ admin: UserType; product: CreateProductInput }>
    >(
      "/admin/product/new",
      {
        body: JSON.stringify(productData),
      },
      "POST"
    );
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: "Failed to create product",
    };
  }
}

// Edit existing product
export async function editProduct(
  id: number,
  productData: CreateProductInput
): Promise<ApiResponse<{ admin: UserType; product: CreateProductInput }>> {
  try {
    const response = await fetchInstance<
      ApiResponse<{ admin: UserType; product: CreateProductInput }>
    >(
      `/admin/product/edit/${id}`,
      {
        body: JSON.stringify(productData),
      },
      "PUT"
    );
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      message: "Failed to update product",
    };
  }
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  name?: string;
  tags?: string;
  description?: string;
  priceSort?: "DESC" | "ASC";
  dateSort?: "DESC" | "ASC";
  minPrice?: number;
  maxPrice?: number;
  dateFrom?: string;
  dateTo?: string;
  active?: string;
}

// Get all products (bonus function for listing page)
export async function getAllProducts(
  filtersOptions: ProductFilters
): Promise<
  ApiResponse<{ admin: UserType; products: Product[]; pagination: Pagination }>
> {
  try {
    console.log("filtersOptions: ", filtersOptions);
    const response = await fetchInstance<
      ApiResponse<{
        admin: UserType;
        products: Product[];
        pagination: Pagination;
      }>
    >(
      "/admin/product/all",
      { body: JSON.stringify({ ...filtersOptions }) },
      "POST"
    );
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      message: "Failed to fetch products",
    };
  }
}

// Delete product (bonus function)
export async function deleteProduct(id: number): Promise<ApiResponse<null>> {
  try {
    const response = await fetchInstance<ApiResponse<null>>(
      `/admin/product/${id}`,
      {},
      "DELETE"
    );
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      message: "Failed to delete product",
    };
  }
}
