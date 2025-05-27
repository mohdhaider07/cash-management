import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLoginMutation } from "@/redux/features/apis/userApi";
import { setUser } from "@/redux/features/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import CustomInput from "@/components/inputs/CustomInput";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import {
  clearRedirectUrl,
  getRedirectUrl,
  saveUserToLocalStorage,
} from "@/lib/auth/utils";
import { UserRole } from "@/enums/User";
import ShadButton from "@/components/ShadButton";
import ShadCheckBox from "@/components/inputs/ShadCheckBox";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, {
    message: "Password must be at least 6 characters long",
  }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await login(data).unwrap();
      const user = response.user;

      dispatch(setUser(user));
      saveUserToLocalStorage(user);
      const redirectUrl = getRedirectUrl();
      clearRedirectUrl();

      if (user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN) {
        navigate(redirectUrl || "/admin/dashboard");
      } else {
        navigate(redirectUrl || "/");
      }
      toast.success("Login successful", { id: toastId });
    } catch (error: any) {
      if (
        error.status === 500 ||
        error.status === 404 ||
        error.status === "FETCH_ERROR"
      ) {
        toast.error("An unknown error occurred. Please try again later.", {
          id: toastId,
        });
      } else {
        toast.error(error?.data?.message || "Login failed", { id: toastId });
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <div className="flex-col justify-center hidden p-12 text-white lg:flex lg:w-[60%] bg-primary">
        <h1 className="mb-4 text-3xl font-semibold">
          Cash Management Dashboard
        </h1>
        <p className="text-lg opacity-90">
          Real-time Cash Reconciliation – Ensuring Accuracy & Transparency
        </p>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-center justify-center w-full p-8 lg:w-[40%]">
        <div className="w-full max-w-md ">
          <h2
            className="mb-4 text-2xl font-semibold text-center text-primary"
            style={{ textShadow: "0 6px 16px rgba(80,0,120,0.45)" }}
          >
            Sign In to Your Dashboard
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <CustomInput
                  label="Email"
                  {...form.register("email")}
                  type="email"
                  error={form.formState.errors.email}
                />

                <CustomInput
                  label="Password"
                  {...form.register("password")}
                  type="password"
                  error={form.formState.errors.password}
                />
              </div>

              <div className="flex items-center justify-between my-4">
                <ShadCheckBox id="remember" label="Remember me" />
                <span className="text-sm cursor-pointer text-primary hover:underline">
                  Forgot password
                </span>
              </div>

              {isError && error && "data" in error && (
                <p className="text-sm text-red-500">
                  {(error.data as { message?: string })?.message ??
                    "An unknown error occurred"}
                </p>
              )}

              <ShadButton
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                className="w-full "
              >
                Login to dashboard
              </ShadButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
