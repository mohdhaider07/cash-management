import React from "react";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  // if user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
  return <div className="container px-4 py-12 mx-auto">home page</div>;
};

export default Home;
