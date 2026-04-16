"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  BookOpen,
  Clock,
  Heart,
  History,
  Star,
  Bookmark,
  Settings,
  Bell,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const User = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for user's books
  const rentedBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      dueDate: "2024-03-25",
      daysLeft: 5,
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      dueDate: "2024-03-28",
      daysLeft: 8,
    },
  ];

  const readBooks = [
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      readDate: "2024-02-15",
      rating: 5,
    },
    {
      id: 4,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      readDate: "2024-02-28",
      rating: 4,
    },
  ];

  const wishlistBooks = [
    {
      id: 5,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      addedDate: "2024-03-10",
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      addedDate: "2024-03-15",
    },
  ];

  const sidebarItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "rented",
      label: "Rented Books",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "read",
      label: "Read Books",
      icon: <History className="w-5 h-5" />,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      id: "reviews",
      label: "My Reviews",
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: "bookmarks",
      label: "Bookmarks",
      icon: <Bookmark className="w-5 h-5" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            My Library
          </h2>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primary/5 ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary border-r-4 border-primary"
                  : ""
              }`}
            >
              {item.icon}
              <span className="mx-4">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                My Reading Dashboard
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Books Rented
                  </h3>
                  <p className="text-3xl font-bold text-primary">
                    {rentedBooks.length}
                  </p>
                </div>
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Books Read
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    {readBooks.length}
                  </p>
                </div>
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Wishlist
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {wishlistBooks.length}
                  </p>
                </div>
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Reviews Given
                  </h3>
                  <p className="text-3xl font-bold text-orange-600">
                    {readBooks.filter((book) => book.rating).length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rented Books Tab */}
          {activeTab === "rented" && (
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
                        <TableHead>Author</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Days Left</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rentedBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.dueDate}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                book.daysLeft <= 3
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {book.daysLeft} days
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                            >
                              Renew
                            </Button>
                            <Button variant="destructive" size="sm">
                              Return
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {/* Read Books Tab */}
          {activeTab === "read" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Read Books
              </h1>
              <div className="rounded-lg shadow">
                <div className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Read Date</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {readBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.readDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < book.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Write Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                My Wishlist
              </h1>
              <div className="rounded-lg shadow">
                <div className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Added Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {wishlistBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.addedDate}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                            >
                              Rent Now
                            </Button>
                            <Button variant="destructive" size="sm">
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                My Reviews
              </h1>
              <div className="rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Your book reviews will appear here...
                </p>
              </div>
            </div>
          )}

          {/* Bookmarks Tab */}
          {activeTab === "bookmarks" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                My Bookmarks
              </h1>
              <div className="rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Your bookmarks will appear here...
                </p>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Notifications
              </h1>
              <div className="rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Your notifications will appear here...
                </p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Settings
              </h1>
              <div className="rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Your settings will appear here...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
