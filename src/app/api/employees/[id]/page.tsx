import { notFound } from "next/navigation";
import { db } from "@/lib/prisma"; // seu arquivo com a conexão Prisma

import EmployeeHeader from "./components/employee-header";
import EmployeeDetails from "./components/employee-details";

interface EmployeePageProps {
  params: { id: string };
}

const EmployeePage = async ({ params }: EmployeePageProps) => {
  const employee = await db.employee.findUnique({
    where: { id: params.id },
  });

  if (!employee) return notFound();

  return (
    <div className="flex h-full flex-col">
      <EmployeeHeader employee={employee} />
      <EmployeeDetails employee={employee} />
    </div>
  );
};

export default EmployeePage;
