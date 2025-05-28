import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSignUpMutation } from "@/redux/features/apis/userApi";
import { Link, useNavigate } from "react-router-dom";
import ShadInput from "@/components/inputs/ShadInput";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import ShadButton from "@/components/ShadButton";

// Create signup schema to match backend requirements
const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();
  const navigate = useNavigate();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      // Extract only the fields required by the backend
      const { name, email, password } = data;
      await signUp({ name, email, password }).unwrap();

      toast.success(
        "Registration successful. Please check your email to verify your account.",
        {
          duration: 5000,
        }
      );
      navigate("/login?verifyEmail");
    } catch (error: any) {
      if (error.status == 500 || error.status == "FETCH_ERROR") {
        toast.error("An unknown error occurred. Please try again later.", {
          duration: 6000,
        });
      } else if (error.data?.message) {
        toast.error(error.data.message);
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
            Create Your Account
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="space-y-4">
                <ShadInput label="Full Name" name="name" form={form} />
                <ShadInput
                  label="Email"
                  name="email"
                  type="email"
                  form={form}
                />
                <ShadInput
                  label="Password"
                  name="password"
                  form={form}
                  type="password"
                />
                <ShadInput
                  label="Confirm Password"
                  name="confirmPassword"
                  form={form}
                  type="password"
                />
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
                className="w-full "
                loading={isLoading}
              >
                Register
              </ShadButton>
            </form>
          </Form>

          <div className="flex items-center justify-center gap-1 mt-4">
            <span className="text-sm text-slate-500">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="text-sm font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
