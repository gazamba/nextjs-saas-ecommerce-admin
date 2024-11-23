import React from "react";
import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import CategoryClient from "./components/category-client";

const CategoriesPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient categories={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
