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

export function Search() {
  return (
    <div className="flex w-full gap-5 flex-col lg:flex-row px-3 md:px-0">
      <Input placeholder="Find..." aria-label="Company name, position..." />

      <Select
        placeholder="Select a category"
        selectionMode="multiple"
        className="lg:max-w-xs"
        aria-label="Category"
      >
        {categories.map((category) => (
          <SelectItem key={category.id}>{category.name}</SelectItem>
        ))}
      </Select>

      <Input
        placeholder="Localization..."
        aria-label="Localization"
        className="lg:max-w-xs"
      />
    </div>
  );
}
