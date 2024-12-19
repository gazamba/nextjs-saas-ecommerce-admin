"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  orders: OrderColumn[];
}

const OrderClient = ({ orders }: OrderClientProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${orders.length})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={orders} />
    </>
  );
};

export default OrderClient;
