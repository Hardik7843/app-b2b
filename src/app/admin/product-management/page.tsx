// "use client";
// import { getAllProducts, Product } from "@/services/admin.product.service";

// import React, { useState } from "react";

// const ProductListPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   React.useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const response = await getAllProducts();
//     if (response.success && response.data) {
//       setProducts(response.data.product);
//     } else {
//       console.error("Failed to fetch products:", response.message);
//     }
//   };

//   return <div>ProductListPage</div>;
// };

// export default ProductListPage;

"use client";

import { getAllProducts, Product } from "@/services/admin.product.service";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const PAGE_SIZE = 20; // products per page

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, page]);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await getAllProducts({
      dateSort: sortOrder === "newest" ? "DESC" : "ASC",
      page,
      limit: PAGE_SIZE,
    });
    // const response = await getAllProducts({
    //   sort: sortOrder,
    //   page,
    //   limit: PAGE_SIZE,
    // });
    console.log("response: ", response);
    if (response.success && response.data) {
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.pagination.total / PAGE_SIZE));
    } else {
      console.error("Failed to fetch products:", response.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* Filter + Loader */}
      <div className="flex items-center justify-between">
        <Select
          value={sortOrder}
          onValueChange={(val: string) =>
            setSortOrder(val as "newest" | "oldest")
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        <Link
          href="/admin/product-management/manage/new"
          className="flex items-center gap-2 rounded-xl bg-admin-button-primary px-1.5 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:bg-admin-button-primary/90 active:scale-95 sm:px-4 sm:py-2 sm:text-sm"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>New Product</span>
        </Link>
      </div>

      {/* Product list */}

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin"></Loader>
        </div>
      ) : (
        products.length > 0 && (
          <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-black border rounded-2xl relative"
              >
                <div
                  className={`absolute border border-black z-10  top-[10px] left-[10px] rounded-[10px] px-4 py-1 text-xs ${
                    product.active
                      ? "bg-admin-active text-[#333] "
                      : "bg-admin-inactive text-[#333] "
                  }`}
                >
                  {product.active ? "LIVE" : "DRAFT"}
                </div>
                {/* <div
                  className={`${
                    product.active ? "bg-green-400" : "bg-gray-500"
                  }`}
                >
                  {product.active ? "Live" : "Draft"}
                </div> */}
                <Link href={`product-management/manage/${product.id}`}>
                  <div className="relative aspect-square ">
                    <Image
                      className="rounded-t-2xl"
                      alt="Product Image"
                      fill
                      src={
                        "https://ckfob8zphd0vlpan.public.blob.vercel-storage.com/open-burger-and-french-fries.webp"
                      }
                    />
                  </div>
                </Link>
                <div className="px-2 py-1">
                  <p className="font-bold">{product.name}</p>
                  <p className="text-md">
                    Created : {dayjs(product.createdAt).format("DD-MMM-YYYY")}
                  </p>
                  <p className="text-md">
                    Updated : {dayjs(product.updatedAt).format("DD-MMM-YYYY")}
                  </p>
                  <p className="text-md">Price : ₹ {product.originalPrice}</p>
                  <p className="text-md">Selling : ₹ {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          variant="outline"
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages || loading}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductListPage;
