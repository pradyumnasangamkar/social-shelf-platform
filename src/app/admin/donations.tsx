"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import classNames from "classnames";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Donate {
  bookId: string;
  name: string;
  email: string;
  title: string;
  author: string;
  condition: string;
  message?: string;
  accepted?: boolean;
}

interface DonationsProps {
  donationArray: Donate[];
  onBookAccepted?: () => void;
}

export default function Donations({
  donationArray,
  onBookAccepted,
}: DonationsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAccept = async (book: Donate) => {
    try {
      setLoading(book.bookId);

      const response = await axios.post("/api/admin/add-donated-books", {
        title: book.title,
        author: book.author,
        donorName: book.name,
        donorEmail: book.email,
        bookId: book.bookId,
      });

      if (response.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Book Accepted",
          text: "The book has been added to the library collection",
          timer: 2000,
          showConfirmButton: false,
        });
        onBookAccepted?.();
      }
    } catch (error) {
      console.error("Error accepting book:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to accept the book. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Book Management
      </h1>
      <div className="rounded-lg shadow">
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name of Donor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Title Of Book</TableHead>
                {/* <TableHead>Stock</TableHead> */}
                <TableHead>Condition</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donationArray.map((donate) => (
                <TableRow key={donate.bookId}>
                  <TableCell>{donate.name}</TableCell>
                  <TableCell>{donate.email}</TableCell>
                  <TableCell>{donate.title}</TableCell>
                  <TableCell>
                    <span
                      className={classNames(
                        "px-2 py-1 rounded-full text-sm font-medium",
                        {
                          "bg-green-100 text-green-800":
                            donate.condition === "New",
                          "bg-blue-100 text-blue-800":
                            donate.condition === "Good",
                          "bg-yellow-100 text-yellow-800":
                            donate.condition === "Acceptable",
                        }
                      )}
                    >
                      {donate.condition}
                    </span>
                  </TableCell>
                  <TableCell>{donate.message}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleAccept(donate)}
                      disabled={loading === donate.bookId || donate.accepted}
                      className={classNames(
                        "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm",
                        {
                          "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500":
                            !donate.accepted,
                          "bg-gray-100 text-gray-500 cursor-not-allowed":
                            donate.accepted,
                          "opacity-50 cursor-not-allowed":
                            loading === donate.bookId,
                        }
                      )}
                    >
                      {loading === donate.bookId ? (
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
                      ) : donate.accepted ? (
                        "Accepted"
                      ) : (
                        "Accept"
                      )}
                    </button>
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
