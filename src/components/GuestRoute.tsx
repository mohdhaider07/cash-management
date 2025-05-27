// components/GuestRoute.tsx
import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import Loader from "./Loader";

const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const timeoutId = setTimeout(() => {
      if (user) {
        navigate("/");
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [user]);

  if (user) {
    return <Loader fillParent size={18} />;
  }

  return <>{children}</>;
};

export default GuestRoute;
