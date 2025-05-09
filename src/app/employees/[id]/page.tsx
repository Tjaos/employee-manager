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
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24">
            <Image
              className="rounded-full border-2 border-gray-300"
              width={96}
              height={96}
              src={employee.imageUrl || "/default-avatar.png"} // Usando uma imagem padrão caso não tenha imageUrl
              alt={employee.name}
            />
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <h3 className="text-3xl font-semibold text-gray-800">
              {employee.name}
            </h3>
            <p className="text-md text-gray-600">CPF: {employee.cpf}</p>
            <p className="text-md text-gray-600">Cargo: {employee.role}</p>
            <p className="text-md text-gray-600">
              Descrição: {employee.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
          >
            Editar
          </Button>
          <Button
            variant="destructive"
            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
