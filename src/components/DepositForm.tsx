import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomInput from "@/components/inputs/CustomInput";
import { Button } from "@/components/ui/button";
import { useCreateDepositMutation } from "@/redux/features/apis/depositApi";
import { toast } from "react-hot-toast";
import ShadButton from "./ShadButton";

type Props = {
  employeeId: string;
  onSuccess: () => void;
};

const depositSchema = z.object({
  amount: z
    .string()
    .min(1, { message: "Deposit amount is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    }),
  depositDate: z.string().min(1, { message: "Date is required" }),
});
type DepositFormInputs = z.infer<typeof depositSchema>;

const DepositForm: React.FC<Props> = ({ employeeId, onSuccess }) => {
  const [createDeposit, { isLoading }] = useCreateDepositMutation();
  const form = useForm<DepositFormInputs>({
    resolver: zodResolver(depositSchema),
    defaultValues: { amount: "", depositDate: "" },
  });

  const onSubmit = async (data: DepositFormInputs) => {
    // add a confirn for saving the deposit
    const res = confirm(
      `Are you sure you want to save this deposit of ${data.amount}?`
    );
    if (!res) return;
    const toastId = toast.loading("Saving deposit...");
    try {
      await createDeposit({
        employeeId,
        amount: Number(data.amount),
        depositDate: data.depositDate,
      }).unwrap(); // Ensure errors are caught
      form.reset();
      onSuccess();
      toast.success("Deposit saved successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save deposit", {
        id: toastId,
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <CustomInput
        label="Amount"
        type="number"
        {...form.register("amount")}
        error={form.formState.errors.amount}
      />
      <CustomInput
        label="Deposit Date"
        type="date"
        {...form.register("depositDate")}
        error={form.formState.errors.depositDate}
      />

      <div className="flex gap-2 mt-4">
        <Button
          className="w-full"
          type="button"
          variant="outline"
          onClick={onSuccess}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <ShadButton
          type="submit"
          disabled={isLoading || !employeeId}
          loading={isLoading}
          className="w-full"
        >
          Save Deposit
        </ShadButton>
      </div>
    </form>
  );
};

export default DepositForm;
