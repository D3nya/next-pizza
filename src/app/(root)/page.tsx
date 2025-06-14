import { Suspense } from "react";

import Container from "@/components/shared/container";
import Filters from "@/components/shared/filters";
import ProductsList from "@/components/shared/products-list";
import { Stories } from "@/components/shared/srories";
import Title from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";
import { findPizzas, SearchParams } from "@/lib/find-pizzas";

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const search = await searchParams;

  const categories = await findPizzas(search);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Filters */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* List */}
          <ProductsList categories={categories} />
        </div>
      </Container>
    </>
  );
}
