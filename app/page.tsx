import Container from "@/components/shared/container";
import Filters from "@/components/shared/filters";
import ProductsGroupList from "@/components/shared/products-group-list";
import Title from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Filters */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* List */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                  {
                    id: 2,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                  {
                    id: 3,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                  {
                    id: 4,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                  {
                    id: 5,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                ]}
              />
              <ProductsGroupList
                title="Комбо"
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                  {
                    id: 2,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                  {
                    id: 3,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                  {
                    id: 4,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                  {
                    id: 5,
                    name: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.avif",
                    price: 550,
                    items: [{ price: 5540 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
