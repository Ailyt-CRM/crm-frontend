import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Management from "./pages/admin/Management";
import Approvals from "./pages/admin/Approvals";
import BatchAttendance from "./pages/attendance/BatchAttendance";
import MyAttendance from "./pages/attendance/MyAttendance";
import PortalLayout from "./layouts/PortalLayout";
import RoleDashboard from "./pages/common/RoleDashboard";
import Fees from "./pages/fees/Fees";
import Salary from "./pages/salary/Salary";
import Materials from "./pages/learning/Materials";
import Assignments from "./pages/learning/Assignments";
import Results from "./pages/learning/Results";
import Billing from "./pages/billing/Billing";
import Inventory from "./pages/inventory/Inventory";
import Expenses from "./pages/expenses/Expenses";
import Reports from "./pages/reports/Reports";
import Leave from "./pages/leave/Leave";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="attendance" element={<BatchAttendance />} />
            <Route path="fees" element={<Fees />} />
            <Route path="salary" element={<Salary />} />
            <Route path="materials" element={<Materials />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="results" element={<Results />} />
            <Route path="billing" element={<Billing />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="reports" element={<Reports />} />
            <Route path="leave" element={<Leave />} />
            <Route path=":resource" element={<Management />} />
          </Route>
        </Route>
        <Route element={<RoleRoute roles={["teacher"]} />}>
          <Route path="/teacher" element={<PortalLayout />}>
            <Route path="dashboard" element={<RoleDashboard />} />
            <Route path="attendance" element={<BatchAttendance />} />
            <Route path="my-attendance" element={<MyAttendance />} />
            <Route path="salary" element={<Salary />} />
            <Route path="materials" element={<Materials />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="results" element={<Results />} />
            <Route path="reports" element={<Reports />} />
            <Route path="leave" element={<Leave />} />
          </Route>
        </Route>
        <Route element={<RoleRoute roles={["employee"]} />}>
          <Route path="/employee" element={<PortalLayout />}>
            <Route path="dashboard" element={<RoleDashboard />} />
            <Route path="my-attendance" element={<MyAttendance />} />
            <Route path="salary" element={<Salary />} />
            <Route path="billing" element={<Billing />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="leave" element={<Leave />} />
          </Route>
        </Route>
        <Route element={<RoleRoute roles={["student"]} />}>
          <Route path="/student" element={<PortalLayout />}>
            <Route path="dashboard" element={<RoleDashboard />} />
            <Route path="my-attendance" element={<MyAttendance />} />
            <Route path="fees" element={<Fees />} />
            <Route path="materials" element={<Materials />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="results" element={<Results />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
