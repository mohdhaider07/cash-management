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
    <div>
      <h3>Sign Up</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ShadInput label="Full Name" name="name" form={form} />

          <ShadInput label="Email" name="email" type="email" form={form} />

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

          {isError && error && "data" in error && (
            <p>
              {(error.data as { message?: string })?.message ??
                "An unknown error occurred"}
            </p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader size={6} /> : "Register"}
          </Button>
        </form>
      </Form>

      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
