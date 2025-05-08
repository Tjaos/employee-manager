// app/employees/[id]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface EmployeePageProps {
  params: { id: string };
}

const EmployeePage = async ({ params }: EmployeePageProps) => {
  const employee = await db.employee.findUnique({
    where: { id: params.id },
  });

  if (!employee) return notFound();

  return (
    <div className="flex h-screen flex-auto w-screen items-center justify-center">
      <div className="flex mb-10 border border-separate border-gray-800 p-3 rounded-lg h-32">
        <div className="bg-slate-400 rounded-lg mr-5 items-center justify-center">
          <Image
            className="rounded-full"
            width={100}
            height={100}
            src={employee.imageUrl}
            alt={employee.name}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-serif">{employee.name}</h3>
          <p className="text-center font-thin">CPF: {employee.cpf}</p>
        </div>
        <div className="flex items-center justify-center flex-col ml-10 space-y-5">
          <Button variant={"outline"}>Editar</Button>
          <Button variant={"destructive"}>Excluir</Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
