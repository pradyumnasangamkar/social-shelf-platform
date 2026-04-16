"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { books } from "../../components/ui/Temp";
import { Upload } from "lucide-react";
import FileUpload from "../../components/layouts/FileUpload";

interface Book {
  _id: string;
  bookId: string;
  title: string;
  author: string;
  stock: number;
  category: string;
  imageUrl?: string;
  condition?: string;
  description?: string;
}

interface BooksProps {
  bookArray: Book[];
}

interface ImageUploadResponse {
  url: string;
  fileId: string;
  name: string;
}

export default function Allbooks({ bookArray }: BooksProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editedBook, setEditedBook] = useState<Partial<Book>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const categories = [...new Set(books.map((book) => book.category))];

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setEditedBook({
      category: book.category,
      stock: book.stock,
      imageUrl: book.imageUrl || "",
    });
    setImagePreview(book.imageUrl || null);
    setIsOpen(true);
  };

  const HandleBannerImage = (imageData: ImageUploadResponse) => {
    const imageUrl = imageData.url;
    setImagePreview(imageUrl);
    setEditedBook({ ...editedBook, imageUrl: imageUrl });
  };

  const handleSave = async () => {
    if (!selectedBook) return;

    try {
      const response = await axios.put("/api/admin/update-book-details", {
        bookId: selectedBook._id,
        ...editedBook,
      });

      if (response.data.success) {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Book updated successfully!",
          toast: true,
          showConfirmButton: false,
          timer: 2000,
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          customClass: {
            popup: "border border-border shadow-lg",
          },
        });
        setIsOpen(false);
        // Refresh the page to show updated data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating book:", error);
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Failed to update book. Please try again.",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        background: "hsl(var(--card))",
        color: "hsl(var(--card-foreground))",
        customClass: {
          popup: "border border-border shadow-lg",
        },
      });
    }
  };

  const handleDelete = async (bookId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        background: "hsl(var(--card))",
        color: "hsl(var(--card-foreground))",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `/api/admin/delete-book?bookId=${bookId}`
        );

        if (response.data.success) {
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Book deleted successfully!",
            toast: true,
            showConfirmButton: false,
            timer: 2000,
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            customClass: {
              popup: "border border-border shadow-lg",
            },
          });
          // Refresh the page to show updated data
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Failed to delete book. Please try again.",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        background: "hsl(var(--card))",
        color: "hsl(var(--card-foreground))",
        customClass: {
          popup: "border border-border shadow-lg",
        },
      });
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
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                {/* <TableHead>Stock</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookArray.map((book) => (
                <TableRow key={book.bookId}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  {/* <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{book.stock || 0}</span>
                            </div>
                          </TableCell> */}
                  <TableCell>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-white">
                      Available
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(book.bookId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={editedBook.category}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, category: e.target.value })
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
              <Label htmlFor="condition">Stock</Label>
              <Input
                id="stock"
                value={editedBook.stock}
                onChange={(e) =>
                  setEditedBook({
                    ...editedBook,
                    stock: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Book Cover Image</Label>
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="relative flex flex-col items-center justify-center w-full h-46 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <p className="text-white text-sm font-medium">
                          Click to change image
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-4 text-gray-400 dark:text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or WEBP (MAX. 2MB)
                      </p>
                    </div>
                  )}
                  <FileUpload
                    folderPath={"SocialShelf/Books/CoverImage"}
                    onSuccess={HandleBannerImage}
                    FileName={"Book_Cover"}
                  />
                </label>
                {!imagePreview && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Please upload an image for your book cover
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
