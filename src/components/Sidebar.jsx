import React from "react";
import Input from "./Sidebar/Input";

const Sidebar = ({ handleChange, subCategory }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      {/* Price Filter */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Price</h2>

        <label className="sidebar-label-container">
          <input
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
            onChange={handleChange}
            type="radio"
            value=""
            name="test2"
          />
          <span className="checkmark">All</span>
        </label>

        <Input
          handleChange={handleChange}
          value={300}
          title=" ₹0 - ₹300"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={600}
          title=" ₹300 - ₹600"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={900}
          title=" ₹600 - ₹900"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={1000}
          title=" Over  ₹1000"
          name="test2"
        />
      </div>
      {/* Color Filter */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold mb-4">Category</h2>

        <label className="sidebar-label-container">
          <input
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
            onChange={handleChange}
            type="radio"
            value=""
            name="test"
          />
          <span className="">All</span>
        </label>
        {subCategory.map((category, idx) => (
          <Input
            key={idx}
            handleChange={handleChange}
            value={category}
            title={` ${category}`}
            name="test"
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
