"use client";

import React, { useState } from "react";

// Form type definition
interface FormData {
  itemName: string;
  description: string;
  price: string;
  image: File | null;
}

export default function SellItemPage() {
  const [form, setForm] = useState<FormData>({
    itemName: "",
    description: "",
    price: "",
    image: null,
  });

  // Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting item:", form);

    alert("Item submitted successfully!");

    // Reset the form
    setForm({
      itemName: "",
      description: "",
      price: "",
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center">
        Sell Your Item
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-green-50 p-6 rounded-2xl shadow-md max-w-xl mx-auto space-y-6"
      >
        {/* Item Name */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="itemName" className="font-medium text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={form.itemName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter item name"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Describe the item"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="price" className="font-medium text-gray-700">
            Price (₦)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter price in Naira"
          />
        </div>

        {/* Upload Image */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Post Item
        </button>
      </form>
    </div>
  );
}
