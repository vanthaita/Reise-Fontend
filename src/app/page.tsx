import { Button } from "@/components/ui/button";
import React from "react";
import Map from "@/components/Index";
const Home = () => {
  return (
    <main className="w-full lg:p-[1.5rem] h-[105vh] flex items-center justify-center ">
      <div className="text-center lg:mb-[20px] flex flex-col">
        <h1 className="text-2xl lg:text-5xl font-bold text-black mb-4">
          Embark on Your <span className="bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text mr-1 ml-1">Journey</span> with Reise
        </h1>
        <p className="text-sm lg:text-xl text-gray-600 mb-6">
          Share your memories and experiences with others.
        </p>
        <div className=" flex flex-row gap-3 justify-center items-center">
          <Button>More</Button>
          <Button>Get started</Button>
        </div>
      <div className="lg:w-full lg:h-[300px] w-full h-[200px] lg:rounded-xl mt-4">
        <Map />
      </div>

      </div>
    </main>
  );
};

export default Home;
