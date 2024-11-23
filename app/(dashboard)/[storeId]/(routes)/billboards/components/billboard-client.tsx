"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";
import dynamic from "next/dynamic";

// const DataTable = dynamic(() => import("@/components/ui/data-table"), { ssr: false });
// const DataTable = React.lazy(() => import('@/components/ui/data-table'));

interface BillboardsPageProps {
  billboards: BillboardColumn[];
}

const BillboardClient = ({ billboards }: BillboardsPageProps) => {
  const router = useRouter();
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={billboards} />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardsId" />
    </>
  );
};

export default BillboardClient;
