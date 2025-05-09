import { notFound } from "next/navigation";
import { db } from "@/lib/prisma"; // seu arquivo com a conexão Prisma
import EmployeeProfile from "./components/employee-profile";

interface EmployeePageProps {
  params: { id: string };
}

const EmployeePage = async ({ params }: EmployeePageProps) => {
  const employee = await db.employee.findUnique({
    where: { id: params.id },
  });

  if (!employee) return notFound();

  return <EmployeeProfile employee={employee} />;
};

export default EmployeePage;
