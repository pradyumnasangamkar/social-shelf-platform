import React, { useState } from "react";
import { Button } from "./button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Book {
  bookId: string;
  title: string;
  author: string;
  category: string;
  imageUrl?: string;
  stock: number;
}

interface BooksProps {
  bookArray: Book[];
}

const Books = ({ bookArray }: BooksProps) => {
  const { data: session } = useSession();
  const [rentingBooks, setRentingBooks] = useState<Record<string, boolean>>({});

  const handleRent = async (book: Book) => {
    if (!session?.user) {
      toast.error("Please login to rent books");
      return;
    }

    if (book.stock <= 0) {
      toast.error("This book is currently not available");
      return;
    }

    // Set loading state for this specific book
    setRentingBooks((prev) => ({ ...prev, [book.bookId]: true }));

    try {
      // Log the data we're sending
      const requestData = {
        bookId: book.bookId,
        userId: session.user.id,
        userName: session.user.name,
        userEmail: session.user.email,
      };
      console.log("Sending rental request with data:", requestData);

      const response = await fetch("/api/books/rent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("Rental API response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to rent book");
      }

      toast.success("Book rented successfully!");
      // You might want to trigger a refresh of the book list here
      // or update the local state to reflect the new stock
    } catch (error) {
      console.error("Rental error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to rent book"
      );
    } finally {
      // Clear loading state for this book
      setRentingBooks((prev) => ({ ...prev, [book.bookId]: false }));
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container p-6 mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-primary dark:text-white">
            Featured Books
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Discover our collection of best-selling books and literary
            masterpieces
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {bookArray.map((book) => (
            <article
              key={book.bookId}
              className="flex flex-col overflow-hidden transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-black"
            >
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label={book.title}
                className="relative block overflow-hidden group"
              >
                <img
                  alt={`${book.title} cover`}
                  className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                  src={book.imageUrl}
                />
              </a>
              <div className="flex flex-col flex-1 p-6">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase hover:underline"
                >
                  {book.category}
                </a>
                <h3 className="mb-3 text-xl font-semibold leading-snug text-primary dark:text-white">
                  {book.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  By {book.author}
                </p>
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {book.stock > 0
                      ? `${book.stock} Available`
                      : "Out of Stock"}
                  </span>
                  <Button
                    onClick={() => handleRent(book)}
                    disabled={rentingBooks[book.bookId] || book.stock <= 0}
                    className="min-w-[100px]"
                  >
                    {rentingBooks[book.bookId] ? "Buying..." : "Buy Now"}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;
