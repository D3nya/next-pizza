import { cn } from "@/lib/utils";
import Title from "./title";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  text: string;
  imageUrl?: string;
  className?: string;
};

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div className={cn(className, "flex items-center justify-between w-[840px] gap-12")}>
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        <div className="flex gap-5 mt-11">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              На главную
            </Button>
          </Link>
          <a href="">
            <Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50">
              Обновить
            </Button>
          </a>
        </div>
      </div>

      {imageUrl && <Image src={imageUrl} alt={title} width={300} height={300} className="w-[300px]" />}
    </div>
  );
};
