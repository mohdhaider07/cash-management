import React, { useState } from "react";
import Modal from "@/components/Modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGetAllEmployeesQuery } from "@/redux/features/apis/employeeApi";
import CollectionForm from "@/components/CollectionForm";
import DepositForm from "@/components/DepositForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Enum for tab values
export enum EmployeeTab {
  Collection = "collection",
  Deposit = "deposit",
}

export default function InsertEmployeeDataModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<EmployeeTab>(EmployeeTab.Collection);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const { data, isLoading: loadingEmployees } = useGetAllEmployeesQuery();
  const employees = data?.employees ?? [];

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Insert Employee Data"
      size="medium"
    >
      <div className="space-y-2">
        <Label className="block text-sm font-medium text-foreground">
          Select Employee
        </Label>
        <Select
          disabled={loadingEmployees}
          onValueChange={setSelectedEmployee}
          value={selectedEmployee}
        >
          <SelectTrigger className="border rounded-sm shadow-none text-primary h-11 border-primary">
            <SelectValue placeholder="Select Employee" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {employees.map((e: any) => (
              <SelectItem key={e._id} value={e._id}>
                {e.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Tabs value={tab} onValueChange={setTab as any}>
          <TabsList className="">
            <TabsTrigger value={EmployeeTab.Collection} className="">
              {EmployeeTab.Collection.charAt(0).toUpperCase() +
                EmployeeTab.Collection.slice(1)}
            </TabsTrigger>
            <TabsTrigger value={EmployeeTab.Deposit} className="">
              {EmployeeTab.Deposit.charAt(0).toUpperCase() +
                EmployeeTab.Deposit.slice(1)}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={EmployeeTab.Collection}>
            <div
              className={
                selectedEmployee ? "" : "pointer-events-none opacity-50"
              }
            >
              <CollectionForm
                employeeId={selectedEmployee}
                onSuccess={() => setOpen(false)}
              />
            </div>
          </TabsContent>
          <TabsContent value={EmployeeTab.Deposit}>
            <div
              className={
                selectedEmployee ? "" : "pointer-events-none opacity-50"
              }
            >
              <DepositForm
                employeeId={selectedEmployee}
                onSuccess={() => setOpen(false)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}
