import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import classNames from "classnames";
import { useState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";

interface Rented {
  bookId: string;
  renterId: string;
  renterName: string;
  renterEmail: string;
  bookTitle: string;
  rentDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "pending" | "active" | "returned" | "overdue" | "rejected";
  fine?: number;
  createdAt?: Date;
  updatedAt?: Date;
  daysRemaining?: number;
}

interface RentedProps {
  rentedArray: Rented[];
}

export default function Rented({ rentedArray }: RentedProps) {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [fines, setFines] = useState<{ [key: string]: number }>({});

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

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "pending":
        return "Waiting for admin approval";
      case "rejected":
        return "Request was rejected";
      default:
        return "";
    }
  };

  const handleReturn = async (bookId: string) => {
    try {
      setLoading((prev) => ({ ...prev, [bookId]: true }));
      const response = await fetch("/api/books/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to return book");
      }

      toast.success("Book returned successfully");
      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to return book"
      );
    } finally {
      setLoading((prev) => ({ ...prev, [bookId]: false }));
    }
  };

  const handleRenew = async (bookId: string) => {
    try {
      setLoading((prev) => ({ ...prev, [bookId]: true }));
      const response = await fetch("/api/books/renew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to renew book");
      }

      toast.success("Book renewed successfully");
      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to renew book"
      );
    } finally {
      setLoading((prev) => ({ ...prev, [bookId]: false }));
    }
  };

  const fetchFine = async (bookId: string) => {
    const response = await fetch("/api/books/fine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    });
    const data = await response.json();
    return data.fine || 0;
  };

  useEffect(() => {
    const getFines = async () => {
      const finesObj: { [key: string]: number } = {};
      for (const book of rentedArray) {
        if (book.status === "overdue" || book.status === "returned") {
          finesObj[book.bookId] = await fetchFine(book.bookId);
        }
      }
      setFines(finesObj);
    };
    getFines();
  }, [rentedArray]);

  useEffect(() => {
    rentedArray.forEach((book) => {
      const today = new Date();
      const dueDate = new Date(book.dueDate);
      const daysRemaining = Math.ceil(
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (
        book.status === "active" &&
        (daysRemaining === 1 || daysRemaining === 2)
      ) {
        toast.warning(
          `Your book "${book.bookTitle}" is due in ${daysRemaining} day(s)!`
        );
      }
    });
  }, [rentedArray]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Rented Books
      </h1>
      <div className="rounded-lg shadow">
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rented Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Fine</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentedArray.map((book) => {
                const today = new Date();
                const dueDate = new Date(book.dueDate);
                const daysRemaining = Math.ceil(
                  (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                );

                const isActionDisabled =
                  book.status === "pending" ||
                  book.status === "rejected" ||
                  book.status === "returned";
                const isLoading = loading[book.bookId];

                return (
                  <TableRow key={book.bookId}>
                    <TableCell>{book.bookTitle}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span
                          className={classNames(
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                            getStatusColor(book.status)
                          )}
                        >
                          {book.status.charAt(0).toUpperCase() +
                            book.status.slice(1)}
                        </span>
                        {(book.status === "pending" ||
                          book.status === "rejected") && (
                          <span className="text-xs text-gray-500">
                            {getStatusMessage(book.status)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(book.rentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(book.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {book.status === "active" && (
                        <span
                          className={classNames(
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                            daysRemaining <= 3
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          )}
                        >
                          {daysRemaining} days
                          {(daysRemaining === 1 || daysRemaining === 2) && (
                            <span className="ml-2 text-yellow-600 font-bold">
                              Due Soon!
                            </span>
                          )}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {(book.status === "overdue" ||
                        book.status === "returned") &&
                      fines[book.bookId]
                        ? `₹${fines[book.bookId]}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        disabled={isActionDisabled || isLoading}
                        onClick={() => handleRenew(book.bookId)}
                      >
                        {isLoading ? "Renewing..." : "Renew"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isActionDisabled || isLoading}
                        onClick={() => handleReturn(book.bookId)}
                      >
                        {isLoading ? "Returning..." : "Return"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
