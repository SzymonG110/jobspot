"use client";

import { Input, Select, SelectItem } from "@nextui-org/react";

const categories = [
  {
    id: "108726430912",
    name: "IT",
  },
  {
    id: "108726430913",
    name: "Banking",
  },
  {
    id: "108726430914",
    name: "Shopping",
  },
];

export default function Search() {
  return (
    <div className="flex w-full gap-5">
      <Input placeholder="Find..." aria-label="Company name, position..." />

      <Select
        placeholder="Select a category"
        selectionMode="multiple"
        className="max-w-xs"
        aria-label="Category"
      >
        {categories.map((category) => (
          <SelectItem key={category.id}>{category.name}</SelectItem>
        ))}
      </Select>

      <Input
        placeholder="Localization..."
        aria-label="Localization"
        className="max-w-xs"
      />
    </div>
  );
}
