import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface DonatedBook {
  _id: string;
  bookId: string;
  name: string;
  email: string;
  title: string;
  author: string;
  condition: string;
  message: string;
  createdAt: string;
}

interface DonatedBooksTableProps {
  donatedBooks: DonatedBook[];
  onBookAccepted: () => void;
}

export default function DonatedBooksTable({
  donatedBooks,
  onBookAccepted,
}: DonatedBooksTableProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAccept = async (book: DonatedBook) => {
    try {
      setLoading(book._id);

      const response = await axios.post("/api/admin/add-donated-books", {
        title: book.title,
        author: book.author,
        donorName: book.name,
        donorEmail: book.email,
      });

      if (response.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Book Accepted",
          text: "The book has been added to the library collection",
          timer: 2000,
          showConfirmButton: false,
        });
        onBookAccepted();
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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Book Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Donor Info
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Condition
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {donatedBooks.map((book) => (
            <tr key={book._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {book.title}
                </div>
                <div className="text-sm text-gray-500">{book.author}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.name}</div>
                <div className="text-sm text-gray-500">{book.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {book.condition}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500 max-w-xs truncate">
                  {book.message}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleAccept(book)}
                  disabled={loading === book._id}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading === book._id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading === book._id ? (
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
                    "Accept"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
