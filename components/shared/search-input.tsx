"use client";

import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useClickAway, useDebounce } from "react-use";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";

interface Props {
  className?: string;
}

const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    250,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && <div className="fixed inset-0 z-30 bg-black/50" />}

      <div className={cn("relative z-30 flex h-11 flex-1 justify-between rounded-2xl", className)}>
        <Search className="absolute left-3 top-1/2 h-5 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full rounded-2xl bg-gray-100 pl-11 outline-none dark:bg-gray-800"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          ref={ref}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "invisible absolute top-14 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200 dark:bg-gray-800",
              focused && "visible top-12 opacity-100",
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex w-full items-center gap-3 px-3 py-2 transition-all hover:bg-primary hover:text-white"
                onClick={onClickItem}
              >
                <Image width={32} height={32} className="rounded-sm" src={product.imageUrl} alt={product.name} />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
