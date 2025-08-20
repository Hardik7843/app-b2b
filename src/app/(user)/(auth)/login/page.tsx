import { masterImageBackgrounArt2 } from "@/app/static/imageImports";
import { masterImageBackgrounArt1 } from "@/app/static/imageImports";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-screen">
      <div className="p-5">
        {/* <div className="relative aspect-square w-full">
          <Image
            className="object-cover"
            src={masterImageBackgrounArt1}
            fill
            alt="ImageArt1"
          />
        </div> */}
        <div className="relative aspect-square w-ful;">
          <Image
            className="object-cover"
            src={masterImageBackgrounArt2}
            fill
            alt="ImageArt2"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
