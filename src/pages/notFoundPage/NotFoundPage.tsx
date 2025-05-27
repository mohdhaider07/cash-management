import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-full max-w-md p-8 text-center border rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-destructive md:text-4xl">
          404
        </h1>
        <p className="mb-2 text-lg md:text-xl ">Oops! Page not found.</p>
        <p className="mb-6 md:text-lg">
          The page you are looking for does not exist.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
