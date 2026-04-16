"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { books } from "../ui/Temp";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Gift,
  Users,
  Settings,
  BarChart,
  Upload,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    imageUrl: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Calculate statistics
  const totalBooks = books.length;
  const availableBooks = books.filter((book) => book.available).length;
  const categories = [...new Set(books.map((book) => book.category))];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding new book:", { ...newBook, image: selectedImage });
    setNewBook({ title: "", author: "", category: "", imageUrl: "" });
    setSelectedImage(null);
    setImagePreview("");
  };

  const sidebarItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    { id: "books", label: "Books", icon: <BookOpen className="w-5 h-5" /> },
    { id: "add", label: "Add Book", icon: <PlusCircle className="w-5 h-5" /> },
    { id: "donations", label: "Donations", icon: <Gift className="w-5 h-5" /> },
    { id: "users", label: "Users", icon: <Users className="w-5 h-5" /> },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart className="w-5 h-5" />,
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
      <div className="w-64  shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Admin Panel
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
                Dashboard Overview
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Total Books
                  </h3>
                  <p className="text-3xl font-bold text-primary">
                    {totalBooks}
                  </p>
                </div>
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Available Books
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    {availableBooks}
                  </p>
                </div>
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Categories
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {categories.length}
                  </p>
                </div>
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Rented Books
                  </h3>
                  <p className="text-3xl font-bold text-orange-600">
                    {totalBooks - availableBooks}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Books Tab */}
          {activeTab === "books" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Book Management
              </h1>
              <div className="rounded-lg shadow">
                <div className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{book.stock || 0}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                book.available
                                  ? "bg-green-600 text-white"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {book.available ? "Available" : "Rented"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                            >
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
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

          {/* Add Book Tab */}
          {activeTab === "add" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Add New Book
              </h1>
              <div className="rounded-lg shadow p-6">
                <form onSubmit={handleAddBook} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-xl">
                      Title
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      value={newBook.title}
                      onChange={(e) =>
                        setNewBook({ ...newBook, title: e.target.value })
                      }
                      className="h-8"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-xl">
                      Author
                    </Label>
                    <Input
                      id="author"
                      type="text"
                      value={newBook.author}
                      onChange={(e) =>
                        setNewBook({ ...newBook, author: e.target.value })
                      }
                      className="h-8"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-xl">
                      Category
                    </Label>
                    <select
                      id="category"
                      value={newBook.category}
                      onChange={(e) =>
                        setNewBook({ ...newBook, category: e.target.value })
                      }
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Book Cover Image</Label>
                    <div className="flex flex-col items-center justify-center w-full">
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="max-h-36 object-contain"
                            />
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG or WEBP (MAX. 2MB)
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                        />
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12">
                    Add Book
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* Donations Tab */}
          {activeTab === "donations" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Book Donations
              </h1>
              <div className="rounded-lg shadow p-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Recent Donations
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No donations yet
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Donation Statistics
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Total Donations
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          0
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Pending Approvals
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                User Management
              </h1>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-400">
                  User management features coming soon...
                </p>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Analytics Dashboard
              </h1>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Analytics features coming soon...
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Settings features coming soon...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
