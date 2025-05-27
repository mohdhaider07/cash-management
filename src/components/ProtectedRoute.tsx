import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks"; // Adjust path as needed
import { UserRole } from "@/enums/User";
import { setRedirectUrl } from "@/lib/auth/utils";
import Loader from "@/components/Loader"; // Import your loader component

interface ProtectedRouteProps {
  adminOnly?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  adminOnly = false,
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const href = location.pathname + location.search;

  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    // If we have a user...
    if (user) {
      setCheckingUser(false);

      // Check admin permission if adminOnly = true
      if (
        adminOnly &&
        user.role !== UserRole.ADMIN &&
        user.role !== UserRole.SUPER_ADMIN
      ) {
        setRedirectUrl(href);
        navigate("/login");
      }
    } else {
      // No user: Wait 3 seconds, then redirect if still no user
      timer = setTimeout(() => {
        setCheckingUser(false);
        if (!user) {
          navigate("/login");
        }
      }, 3000);
    }

    // Cleanup timer on unmount
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [user, adminOnly, href, navigate]);

  // While in the 3-second wait, show a loading spinner or placeholder
  if (checkingUser) {
    return <Loader size={24} fillParent />;
  }

  // Otherwise, the route is protected and user is allowed
  return <>{children}</>;
};

export default ProtectedRoute;
