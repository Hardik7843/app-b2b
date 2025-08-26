/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// shadCN UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Service functions
import {
  createProduct,
  editProduct,
  getProductById,
} from "@/services/admin.product.service";

// ✅ import your schema & type
import {
  createProductSchema,
  CreateProductInput,
} from "@/validators/admin.product.validator";

export default function ProductManagementPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(false);
  const [product, setProduct] = useState<null | CreateProductInput>(null);

  const productId = params?.id as string;
  const isEditing = productId && productId !== "new";
  const isCreating = productId === "new";

  //   const {
  //     register,
  //     handleSubmit,
  //     // setValue,
  //     // watch,
  //     formState: { errors },
  //     reset,
  //   } = useForm<CreateProductInput>({
  //     resolver: zodResolver(createProductSchema),
  //     defaultValues: {
  //       name: "",
  //       description: "",
  //       price: undefined,
  //       originalPrice: 0,
  //       images: [],
  //       tags: [],
  //       stock: 0,
  //     },
  //   });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });

  //   const isActive = watch("active");

  // Fetch product details if editing
  useEffect(() => {
    const fetchProduct = async () => {
      if (!isEditing) return;

      setFetchingProduct(true);
      try {
        const response = await getProductById(parseInt(productId));
        if (response.success && response.data) {
          const productFetched = response.data.product;
          setProduct(productFetched);
          reset(productFetched);
        } else {
          toast.error("Failed to fetch product details");
          router.push("/admin/products");
        }
      } catch (error) {
        // console.error("Error fetching product:", error);
        toast.error("Error loading product details");
        router.push("/admin/products");
      } finally {
        setFetchingProduct(false);
      }
    };

    fetchProduct();
  }, [isEditing, productId, reset, router]);

  const onSubmit: SubmitHandler<CreateProductInput> = async (
    data: CreateProductInput
  ) => {
    setLoading(true);

    try {
      let response;

      if (isCreating) {
        response = await createProduct(data);
        if (response.success) {
          toast.success("Product created successfully!");
        } else {
          toast.error(response.message || "Failed to create product");
        }
      } else if (isEditing) {
        response = await editProduct(Number(productId), data);
        if (response.success) {
          toast.success("Product updated successfully!");
        } else {
          toast.error(response.message || "Failed to update product");
        }
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("An error occurred while saving the product");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProduct) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading product details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen p-6">
      <h1>{isCreating ? "Create New Product" : `Edit Product ${productId}`}</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={4}
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price *</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                {...register("originalPrice", { valueAsNumber: true })}
              />
              {errors.originalPrice && (
                <p className="text-red-500 text-sm">
                  {errors.originalPrice.message}
                </p>
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock">Stock *</Label>
            <Input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="bg-admin-primary"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : isCreating
                ? "Create Product"
                : "Update Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
