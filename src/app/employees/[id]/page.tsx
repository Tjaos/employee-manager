// app/employees/[id]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import Image from "next/image";

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
      <h1>{employee.name}</h1>
      <p>CPF: {employee.cpf}</p>
      <Image
        width={100}
        height={100}
        src={employee.imageUrl}
        alt={employee.name}
      />
    </div>
  );
};

export default EmployeePage;
