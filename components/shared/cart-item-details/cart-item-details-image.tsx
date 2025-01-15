import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  src: string;
  className?: string;
};

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <Image className={cn("w-[80px] h-[80px]", className)} src={src} alt="Image" width={80} height={80} />;
};
