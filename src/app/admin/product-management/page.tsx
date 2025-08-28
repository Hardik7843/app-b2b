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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 6; // products per page

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
    const response = await getAllProducts();
    // const response = await getAllProducts({
    //   sort: sortOrder,
    //   page,
    //   limit: PAGE_SIZE,
    // });
    if (response.success && response.data) {
      setProducts(response.data.product);
      setTotalPages(Math.ceil(response.data.pagination.total / PAGE_SIZE));
    } else {
      console.error("Failed to fetch products:", response.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">
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

        {loading && <span className="text-sm text-gray-500">Loading...</span>}
      </div>

      {/* Product list */}
      <div className="grid grid-cols-3 gap-4">
        {!loading &&
          products.map((product) => (
            <div key={product.id} className="border rounded-xl p-4 shadow">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
          ))}
      </div>

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
