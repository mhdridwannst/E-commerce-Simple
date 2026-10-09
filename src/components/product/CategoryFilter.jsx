"use client";

import { Button } from "@/components/ui/button";

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const active = value === category.value;
        return (
          <Button
            key={category.value}
            size="sm"
            variant={active ? "solid" : "outline"}
            aria-pressed={active}
            onClick={() => onChange(category.value)}
          >
            {category.label}
          </Button>
        );
      })}
    </div>
  );
}
