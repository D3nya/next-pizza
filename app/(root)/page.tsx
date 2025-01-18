import Container from "@/components/shared/container";
import Filters from "@/components/shared/filters";
import ProductsGroupList from "@/components/shared/products-group-list";
import Title from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";
import { Suspense } from "react";

type SearchParams = Promise<GetSearchParams>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Filters */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* List */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
