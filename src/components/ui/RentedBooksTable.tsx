"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import axios from "axios";
import { toast } from "sonner";
import classNames from "classnames";

interface RentedBook {
  id: string;
  bookId: string;
  bookTitle: string;
  renterName: string;
  renterEmail: string;
  status: "pending" | "active" | "returned" | "overdue" | "rejected";
  rentDate: string;
  dueDate: string;
  returnDate?: string;
  fine?: number;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

export default function RentedBooksTable() {
  const [rentedBooks, setRentedBooks] = useState<RentedBook[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  const fetchRentedBooks = async () => {
    try {
      const response = await axios.get("/api/books/rent/admin");
      setRentedBooks(response.data.rentedBooks);
    } catch (error) {
      console.error("Error fetching rented books:", error);
      toast.error("Failed to fetch rented books");
    }
  };

  const handleApprove = async (rentalId: string) => {
    try {
      setLoading(rentalId);
      await axios.post("/api/books/approve", {
        rentalId,
        adminId: "ADMIN_ID", // Replace with actual admin ID from your auth system
        action: "approve",
      });
      toast.success("Rental request approved successfully");
      fetchRentedBooks(); // Refresh the list
    } catch (error) {
      console.error("Error approving rental:", error);
      toast.error("Failed to approve rental request");
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (rentalId: string) => {
    try {
      setLoading(rentalId);
      await axios.post("/api/books/rent/approve", {
        rentalId,
        adminId: "ADMIN_ID", // Replace with actual admin ID from your auth system
        action: "reject",
      });
      toast.success("Rental request rejected successfully");
      fetchRentedBooks(); // Refresh the list
    } catch (error) {
      console.error("Error rejecting rental:", error);
      toast.error("Failed to reject rental request");
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchRentedBooks();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "returned":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Rental Management
      </h1>
      <div className="rounded-lg shadow">
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Renter</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rent Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Fine</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentedBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.bookTitle}</TableCell>
                  <TableCell>
                    <div>
                      <div>{book.renterName}</div>
                      <div className="text-sm text-gray-500">
                        {book.renterEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={classNames(
                        "px-2 py-1 rounded-full text-sm font-medium",
                        getStatusColor(book.status)
                      )}
                    >
                      {book.status.charAt(0).toUpperCase() +
                        book.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(book.rentDate)}</TableCell>
                  <TableCell>{formatDate(book.dueDate)}</TableCell>
                  <TableCell>₹{book.fine || 0}</TableCell>
                  <TableCell>
                    {book.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(book.id)}
                          disabled={loading === book.id}
                          className={classNames(
                            "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm",
                            {
                              "bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-offset-2 focus:ring-green-500":
                                !loading,
                              "opacity-50 cursor-not-allowed":
                                loading === book.id,
                            }
                          )}
                        >
                          {loading === book.id ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Approve"
                          )}
                        </button>
                        <button
                          onClick={() => handleReject(book.id)}
                          disabled={loading === book.id}
                          className={classNames(
                            "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm",
                            {
                              "bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-offset-2 focus:ring-red-500":
                                !loading,
                              "opacity-50 cursor-not-allowed":
                                loading === book.id,
                            }
                          )}
                        >
                          {loading === book.id ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Reject"
                          )}
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
