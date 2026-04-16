"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { books } from "../../components/ui/Temp";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Gift,
  Users,
  Settings,
  BarChart,
  Upload,
  Contact,
  Calendar1,
  ClipboardList,
  SquareCheckBig,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import Donations from "./donations";
import Allbooks from "./allbooks";
import UsersInfo from "./users";
import Rental from "./rental";

import Feedback from "./feedback";

import mongoose from "mongoose";
import Events from "./events";
import FileUpload from "@/components/layouts/FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import Swal from "sweetalert2";
import RegisteredEvents from "./registeredEvents";

interface Book {
  bookId: string;
  title: string;
  author: string;
  category: string;
  imageUrl?: string;
}
interface Donate {
  bookId: string;
  name: string;
  email: string;
  title: string;
  author: string;
  condition: string;
  message?: string;
}
interface User {
  _id: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  role: string;
}
interface Stats {
  totalBooks: number;
  availableBooks: number;
  categories: string[];
  rentedBooks: number;
}

interface Feedback {
  _id?: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  phoneno: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookArray, setBookArray] = useState<Book[]>([]);
  const [donationArray, setDonationArray] = useState<Donate[]>([]);
  const [userArray, setUsersArray] = useState<User[]>([]);
  const [feedbackArray, setFeedbackArray] = useState<Feedback[]>([]);

  const [booksStats, setBooksStats] = useState<Stats | null>(null);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    imageUrl: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");

  // Calculate statistics

  const categories = [...new Set(books.map((book) => book.category))];
  const router = useRouter();

  useEffect(() => {
    HandleGetBook();
    HandleGetDonations();
    HandleGetUsers();
    HandleGetBookStats();
    HandleGetFeedbacks();
  }, []);

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

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/add-book", {
        ...newBook,
        imageUrl: coverImageUrl,
      });
      if (response.data.success) {
        router.push("/admin");
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Book Added Successfully",
          toast: true,
          showConfirmButton: false,
          timer: 2000,
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          customClass: {
            popup: "border border-border shadow-lg",
          },
        });
      }
    } catch {
      throw new Error("Error at Frontened");
    }
    setSelectedImage(null);
    setImagePreview("");
  };

  const HandleGetBook = async () => {
    try {
      const response = await axios.get("/api/admin/get-books");
      setBookArray(response.data.bookArray);
    } catch (err) {
      console.error("Error fetching books:", err);
      throw new Error("Error at Frontend");
    }
  };

  const HandleGetDonations = async () => {
    try {
      const response = await axios.get("/api/admin/get-donations");
      setDonationArray(response.data.donationsArray);
    } catch (err) {
      console.error("Error fetching donations:", err);
      throw new Error("Error at Frontend");
    }
  };

  const HandleGetBookStats = async () => {
    try {
      const response = await axios.get("/api/admin/get-book-info");
      setBooksStats(response.data.stats);
    } catch (err) {
      console.error("Error fetching book stats:", err);
      throw new Error("Error at Frontend");
    }
  };

  const HandleGetUsers = async () => {
    try {
      const response = await axios.get("/api/admin/get-users");
      setUsersArray(response.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
      throw new Error("Error at Frontend");
    }
  };

  const HandleGetFeedbacks = async () => {
    try {
      const response = await axios.get("/api/contact/get-contact");
      setFeedbackArray(response.data.feedbackArray);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      throw new Error("Error at Frontend");
    }
  };

  const HandleCoverImage = (response: IKUploadResponse) => {
    try {
      console.log(response);
      setImagePreview(response.url);
      setCoverImageUrl(response.url);
    } catch (error) {
      throw new Error("Something when Wrong Uploading the Cover Image !");
    }
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
    {
      id: "rental",
      label: "Rental",
      icon: <SquareCheckBig className="w-5 h-5" />,
    },
    { id: "events", label: "Events", icon: <Calendar1 className="w-5 h-5" /> },
    {
      id: "registered-events",
      label: "Registered Events",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    { id: "users", label: "Users", icon: <Users className="w-5 h-5" /> },
    {
      id: "feedbacks",
      label: "Feedbacks",
      icon: <Contact className="w-5 h-5" />,
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
                    {booksStats?.totalBooks || 0}
                  </p>
                </div>
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Available Books
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    {booksStats?.availableBooks || 0}
                  </p>
                </div>
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Categories
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {booksStats?.categories?.length || 0}
                  </p>
                </div>
                <div className="bg-white dark:bg-secondary p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Rented Books
                  </h3>
                  <p className="text-3xl font-bold text-orange-600">
                    {booksStats?.rentedBooks || 0}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Books Tab */}
          {activeTab === "books" && <Allbooks bookArray={bookArray} />}
          {activeTab === "rental" && <Rental />}

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
                        {/* <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                        </div> */}

                        {/*  temporary Code  */}

                        <FileUpload
                          folderPath={"SocialShelf/Book/coverImage"}
                          onSuccess={HandleCoverImage}
                          FileName={"Cover_Image"}
                        />

                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-36 object-contain"
                          />
                        ) : (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Please Upload the File
                          </p>
                        )}
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
            <Donations donationArray={donationArray} />
          )}

          {/* Events Tab */}
          {activeTab === "events" && <Events />}

          {/* Registered Events Tab */}
          {activeTab === "registered-events" && <RegisteredEvents />}

          {/* Users Tab */}
          {activeTab === "users" && <UsersInfo usersArray={userArray} />}

          {activeTab === "feedbacks" && (
            <Feedback feedbackArray={feedbackArray} />
          )}

          {/* Analytics Tab */}

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
}
