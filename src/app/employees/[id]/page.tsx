import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import EmployeeCard from "../components/employee-card";
interface EmployeePageProps {
  params: { id: string };
}

export default async function EmployeePage({ params }: EmployeePageProps) {
  const { id } = await params;
  const employee = await db.employee.findUnique({
    where: { id },
  });
  if (!employee) return notFound();
  return (
    <div>
      <EmployeeCard employee={employee} />
    </div>
  );
}
