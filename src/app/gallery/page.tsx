"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Workshops",
  "Book Launches",
  "Author Visits",
  "Reading Clubs",
  "Competitions",
];

const galleryItems = [
  {
    id: 1,
    bookId: "book-001",
    title: "Annual Literary Festival",
    date: "March 2023",
    description:
      "A celebration of literature with author talks and interactive workshops that drew over 500 attendees.",
    image:
      "https://images.unsplash.com/photo-1540224485413-4c7939106f3a?q=80&w=2798&auto=format&fit=crop",
    category: "Book Launches",
    attendees: 520,
    highlights: ["Famous author panels", "Book signings", "Writing workshops"],
  },
  {
    id: 2,
    bookId: "book-002",
    title: "Children's Story Hour",
    date: "August 2023",
    description:
      "Young readers were captivated by storytelling sessions featuring puppets and interactive elements.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=3546&auto=format&fit=crop",
    category: "Reading Clubs",
    attendees: 85,
    highlights: ["Puppet shows", "Character costumes", "Interactive stories"],
    stock: 5,
  },
  {
    id: 3,
    bookId: "book-003",
    title: "Author Meet & Greet: Maya Johnson",
    date: "October 2023",
    description:
      "Bestselling author Maya Johnson signed copies of her latest thriller and answered fan questions.",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=3271&auto=format&fit=crop",
    category: "Author Visits",
    attendees: 215,
    highlights: ["Book signing", "Q&A session", "Reading from latest work"],
    stock: 5,
  },
  {
    id: 4,
    bookId: "book-004",
    title: "Poetry Workshop",
    date: "January 2023",
    description:
      "Aspiring poets developed their craft through guided exercises and constructive feedback.",
    image:
      "https://images.unsplash.com/photo-1470754260170-299cf9c5ffb5?q=80&w=3087&auto=format&fit=crop",
    category: "Workshops",
    attendees: 42,
    highlights: [
      "Writing exercises",
      "Peer reviews",
      "Published poets as mentors",
    ],
    stock: 5,
  },
  {
    id: 5,
    bookId: "book-005",
    title: "Summer Reading Challenge",
    date: "June-July 2023",
    description:
      "Over 200 participants completed our summer reading challenge, with prizes awarded to top readers.",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=3270&auto=format&fit=crop",
    category: "Competitions",
    attendees: 230,
    highlights: ["Weekly check-ins", "Theme-based reading", "Award ceremony"],
    stock: 5,
  },
  {
    id: 6,
    bookId: "book-006",
    title: "Book to Movie Night",
    date: "September 2023",
    description:
      "We screened film adaptations of popular novels followed by comparative discussions.",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2825&auto=format&fit=crop",
    category: "Reading Clubs",
    attendees: 78,
    highlights: [
      "Film screenings",
      "Book vs. movie debates",
      "Themed refreshments",
    ],
    stock: 5,
  },
  {
    id: 7,
    bookId: "book-007",
    title: "Local Authors Showcase",
    date: "November 2023",
    description:
      "Supporting our community's literary talent with readings and networking opportunities.",
    image:
      "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=2960&auto=format&fit=crop",
    category: "Author Visits",
    attendees: 95,
    highlights: ["Author readings", "Book sales", "Networking"],
    stock: 5,
  },
  {
    id: 8,
    bookId: "book-008",
    title: "Creative Writing Workshop",
    date: "February 2023",
    description:
      "Professional authors led sessions on character development, plot structure, and dialogue.",
    image:
      "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?q=80&w=3174&auto=format&fit=crop",
    category: "Workshops",
    attendees: 55,
    highlights: [
      "Character development",
      "Plot structures",
      "Dialogue techniques",
    ],
    stock: 5,
  },
  {
    id: 9,
    bookId: "book-009",
    title: "Book Art Exhibition",
    date: "April 2023",
    description:
      "Artists showcased creative works made from and inspired by books, drawing art enthusiasts and readers alike.",
    image:
      "https://images.unsplash.com/photo-1533669955142-6a73332af4db?q=80&w=2874&auto=format&fit=crop",
    category: "Book Launches",
    attendees: 163,
    highlights: ["Book sculptures", "Paper art", "Interactive installations"],
    stock: 5,
  },
  {
    id: 10,
    bookId: "book-010",
    title: "Literacy Fundraiser Gala",
    date: "December 2023",
    description:
      "Our end-of-year gala raised funds for literacy programs while celebrating the year's literary achievements.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=3269&auto=format&fit=crop",
    category: "Book Launches",
    attendees: 180,
    highlights: ["Silent auction", "Author speeches", "Award presentations"],
    stock: 5,
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isRenting, setIsRenting] = useState(false);
  const [items, setItems] = useState(galleryItems);

  const handleRent = async (bookId: string) => {
    try {
      setIsRenting(true);
      const response = await fetch("/api/books/rent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to rent book");
      }

      toast.success("Book rented successfully!");
      // Update the stock in the UI
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.bookId === bookId
            ? { ...item, stock: data.remainingStock }
            : item
        )
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to rent book"
      );
    } finally {
      setIsRenting(false);
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 pb-4">
          Memory Gallery
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore our past events and community activities
        </p>
      </motion.div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden"
            onClick={() => setSelectedItem(item.id)}
          >
            <div className="relative h-48">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>{item.date}</span>
                <span className="mx-2">•</span>
                <span>{item.attendees} attendees</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {item.description}
              </p>
              {/* <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Stock: {item.stock}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRent(item.bookId);
                  }}
                  disabled={isRenting || item.stock <= 0}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    item.stock > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isRenting ? "Renting..." : "Rent Book"}
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const item = items.find((item) => item.id === selectedItem);
              if (!item) return null;

              return (
                <>
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
                      onClick={() => setSelectedItem(null)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                      {item.category}
                    </span>
                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span>{item.date}</span>
                      <span className="mx-2">•</span>
                      <span>{item.attendees} attendees</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {item.description}
                    </p>
                    <div>
                      <h3 className="font-semibold mb-2">Highlights:</h3>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Available Stock: {item.stock}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRent(item.bookId);
                        }}
                        disabled={isRenting || item.stock <= 0}
                        className={`px-6 py-2 rounded-md text-sm font-medium ${
                          item.stock > 0
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {isRenting ? "Renting..." : "Rent Book"}
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
