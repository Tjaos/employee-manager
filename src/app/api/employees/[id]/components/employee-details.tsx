interface EmployeeDetailsProps {
  employee: {
    cpf: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  };
}

const EmployeeDetails = ({ employee }: EmployeeDetailsProps) => {
  return (
    <div className="p-4">
      <p>
        <strong>CPF:</strong> {employee.cpf}
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
  );
};

export default EmployeeDetails;
