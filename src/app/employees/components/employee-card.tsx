"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EmployeeCardProps {
  employee: {
    id: string;
    name: string;
    cpf: string;
    role: string;
    description: string;
    imageUrl: string | null;
  };
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: employee.name,
    cpf: employee.cpf,
    role: employee.role,
    description: employee.description,
    imageUrl: employee.imageUrl || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    setIsSubmitting(true);
    const res = await fetch(`/api/employees/${employee.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Funcionário atualizado com sucesso!");
      router.refresh(); // Recarrega os dados do server
      setIsEditing(false);
    } else {
      alert("Erro ao atualizar funcionário.");
    }

    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      "Tem certeza que deseja excluir este funcionário?"
    );
    if (!confirmed) return;

    setIsDeleting(true);

    const res = await fetch(`/api/employees/${employee.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Funcionário excluído com sucesso!");
      router.push("/employees");
    } else {
      alert("Erro ao excluir funcionário.");
    }

    setIsDeleting(false);
  };

  return (
    <div className="flex h-screen flex-col items-center bg-gray-50 p-6">
      <div className=" w-screen pt-0 mt-0">
        <Button variant={"outline"} onClick={() => router.back()}>
          voltar
        </Button>
      </div>
      <div className="max-w-4xl w-full bg-white border border-gray-300 rounded-lg shadow-lg p-6 space-y-4">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24">
            <Image
              className="rounded-full border-2 border-gray-300"
              width={96}
              height={96}
              src={formData.imageUrl || "/default-avatar.png"}
              alt={formData.name}
            />
          </div>
          <div className="flex flex-col justify-center space-y-2 w-full">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Nome"
                />
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="CPF"
                />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Cargo"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Descrição"
                />
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="URL da foto de perfil"
                />
              </>
            ) : (
              <>
                <h3 className="text-3xl font-semibold text-gray-800">
                  {employee.name}
                </h3>
                <p className="text-md text-gray-600">CPF: {employee.cpf}</p>
                <p className="text-md text-gray-600">Cargo: {employee.role}</p>
                <p className="text-md text-gray-600">
                  Descrição: {employee.description}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                onClick={handleEdit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
              <Button
                variant="outline"
                className="border-gray-500 text-gray-500"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </Button>
          )}

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </div>
    </div>
  );
}
