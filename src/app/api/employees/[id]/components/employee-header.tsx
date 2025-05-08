import Image from "next/image";

interface EmployeeHeaderProps {
  employee: {
    name: string;
    id: string;
    imageUrl: string | null;
  };
}

const EmployeeHeader = ({ employee }: EmployeeHeaderProps) => {
  return (
    <div className="p-4 border-b flex items-center gap-4">
      {employee.imageUrl && (
        <Image
          src={employee.imageUrl}
          alt={employee.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      )}
      <div>
        <h1 className="text-2xl font-bold">{employee.name}</h1>
        <p className="text-sm text-gray-600">ID: {employee.id}</p>
      </div>
    </div>
  );
};

export default EmployeeHeader;
