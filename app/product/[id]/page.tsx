import { Params } from "next/dist/server/request/params";
import React from "react";

type Props = {
  className?: string;
};

const Page: React.FC<Props> = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);
  return <div>Page</div>;
};

export default Page;
