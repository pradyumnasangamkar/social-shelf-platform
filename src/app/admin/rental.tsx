"use client";

import React from "react";
import RentedBooksTable from "@/components/ui/RentedBooksTable";

export default function AdminRentalsPage() {
  return (
    <div className="container mx-auto py-8">
      {/* <h1 className="text-3xl font-bold mb-6">Rental Management</h1> */}
      <div className=" rounded-lg shadow">
        <div className="p-6">
          <RentedBooksTable />
        </div>
      </div>
    </div>
  );
}
