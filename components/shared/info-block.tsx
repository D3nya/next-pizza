import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import Title from "./title";

interface Props {
  title: string;
  text: string;
  imageUrl?: string;
  className?: string;
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  const router = useRouter();

  return (
    <div className={cn(className, "flex w-[840px] items-center justify-between gap-12")}>
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-lg text-gray-400">{text}</p>
        </div>

        <div className="mt-11 flex gap-5">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              На главную
            </Button>
          </Link>

          <Button
            variant="outline"
            className="border-gray-400 text-gray-500 hover:bg-gray-50"
            onClick={() => router.refresh()}
          >
            Обновить
          </Button>
        </div>
      </div>

      {imageUrl && <Image src={imageUrl} alt={title} width={300} height={300} className="w-[300px]" />}
    </div>
  );
};
