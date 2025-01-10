import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>
  );
};

export default Container;
