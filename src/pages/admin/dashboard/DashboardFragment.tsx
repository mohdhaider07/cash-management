import { Breadcrumb } from "@/components/Breadcrumb";
import { SummaryCards } from "@/components/SummaryCards";

function DashboardFragment() {
  return (
    <>
      <Breadcrumb items={[{ label: "Dashboard", active: true }]} />
      <SummaryCards />
      <div>
        We can display additional graphs here, and we can also add a button to
        add employees.
      </div>
    </>
  );
}

export default DashboardFragment;
