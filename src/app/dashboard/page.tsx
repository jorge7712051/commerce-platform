import ComerciantesTable from "@/components/ComerciantesTable";
import Header from "../../components/Header";
import PrivateRoute from "../../components/PrivateRoute";

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <ComerciantesTable />
      </div>
    </PrivateRoute>
  );
}
