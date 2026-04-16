"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const Donation = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    author: "",
    condition: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you can add your API call or logic
    setForm({
      name: "",
      email: "",
      title: "",
      author: "",
      condition: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[48rem] p-8 mx-auto backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-gray-700 to-black flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Donate a Book
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Fill the form below to donate your book to Social Shelf
          </p>
        </div>
        {submitted && (
          <div className="mb-4 text-green-600 text-center">
            Thank you for your donation!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="block w-full py-2.5"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="block w-full py-2.5"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Book Title
              </label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="block w-full py-2.5"
                placeholder="Book title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Author
              </label>
              <Input
                name="author"
                value={form.author}
                onChange={handleChange}
                required
                className="block w-full py-2.5"
                placeholder="Author name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Book Condition
              </label>
              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                required
                className="block w-full py-2.5 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Acceptable">Acceptable</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message (optional)
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="block w-full py-2.5 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Any special notes?"
              />
            </div>
          </div>
          <Button type="submit" className="w-full py-2.5">
            Donate Book
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Donation;
