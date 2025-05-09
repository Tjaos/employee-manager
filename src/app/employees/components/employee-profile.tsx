import Image from "next/image";

interface EmployeeProps {
  employee: {
    id: string;
    name: string;
    cpf: string;
    imageUrl: string | null;
    role: string;
    description: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  };
}

const EmployeeProfile = ({ employee }: EmployeeProps) => {
  return (
    <div className="p-6">
      <div className="p-4 border-b flex items-center gap-4">
        {employee.imageUrl && (
          <Image
            src={employee.imageUrl}
            alt={employee.name}
            className="w-16 h-16 rounded-full object-cover"
            width={64}
            height={64}
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{employee.name}</h1>
          <p className="text-sm text-gray-600">ID: {employee.id}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <p>
          <strong>CPF:</strong> {employee.cpf}
        </p>
        <p>
          <strong>Cargo:</strong> {employee.role}
        </p>
        <p>
          <strong>Descrição:</strong> {employee.description}
        </p>
        <p>
          <strong>Criado em:</strong>{" "}
          {new Date(employee.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Atualizado em:</strong>{" "}
          {new Date(employee.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default EmployeeProfile;
