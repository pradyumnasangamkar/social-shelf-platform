"use client";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Upload } from "lucide-react";
import FileUpload from "@/components/layouts/FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  capacity: number;
  category: string;
}

export default function Events() {
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    imageUrl: "",
    capacity: 0,
    category: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const categories = [
    "Book Launch",
    "Author Meet",
    "Reading Session",
    "Book Discussion",
    "Workshop",
    "Other",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // Here you would typically upload the image to your server/storage
        // and get back the URL to store in newEvent.imageUrl
      };
      reader.readAsDataURL(file);
    }
  };

  const HandleBannerImage = (response: IKUploadResponse) => {
    try {
      console.log(response);
      setImagePreview(response.url);
      setImageUrl(response.url);
      setNewEvent({ ...newEvent, imageUrl: response.url });
    } catch (error) {
      throw new Error("Something when Wrong Uploading the Cover Image !");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(newEvent);
      const response = await axios.post("/api/admin/add-event", newEvent);
      if (response.data.success) {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Event created successfully!",
          toast: true,
          showConfirmButton: false,
          timer: 2000,
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          customClass: {
            popup: "border border-border shadow-lg",
          },
        });
        // Reset form
        setNewEvent({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          imageUrl: "",
          capacity: 0,
          category: "",
        });
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Failed to create event. Please try again.",
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
        Create New Event
      </h1>
      <div className="rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xl">
              Event Title
            </Label>
            <Input
              id="title"
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="h-8"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xl">
              Description
            </Label>
            <textarea
              id="description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-xl">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="h-8"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-xl">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
                className="h-8"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-xl">
              Location
            </Label>
            <Input
              id="location"
              type="text"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
              className="h-8"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-xl">
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                value={newEvent.capacity}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    capacity: parseInt(e.target.value),
                  })
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
                value={newEvent.category}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, category: e.target.value })
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Event Banner Image</Label>
            <div className="flex flex-col items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {/* {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-36 object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or WEBP (MAX. 2MB)
                      </p>
                    </>
                  )} */}
                </div>
                <FileUpload
                  folderPath={"SocialShelf/Event/BannerImage"}
                  onSuccess={HandleBannerImage}
                  FileName={"Banner_Image"}
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
            Create Event
          </Button>
        </form>
      </div>
    </div>
  );
}
