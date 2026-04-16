"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  category: string;
}

export default function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data.books.slice(0, 4)); // Get first 4 books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card key={book._id} className="overflow-hidden">
              <div className="aspect-[3/4] relative">
                <img
                  src={book.imageUrl || "/placeholder-book.jpg"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{book.title}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.category}
                </p>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/books/${book._id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/books">View All Books</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
