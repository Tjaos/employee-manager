"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewEmployeeForm() {
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const defaultImage =
      "https://img.freepik.com/psd-gratuitas/ilustracao-de-icone-de-contacto-isolada_23-2151903337.jpg?t=st=1746798956~exp=1746802556~hmac=6174ea7348dd99047962c9dc7f96522afb783e1a60a9ef3234574d70062fc565&w=740";
    const res = await fetch("api/employees", {
      method: "POST",
      body: JSON.stringify({
        name,
        cpf,
        imageUrl: imageUrl || defaultImage,
        description,
        role,
      }),
    });

    if (res.ok) {
      setName("");
      setCpf("");
      setImageUrl("");
      setDescription("");
      setRole("");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex: João Silva"
        />
      </div>
      <div>
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value.slice(0, 11))}
          placeholder="Digite apenas números"
        />
      </div>
      <div>
        <Label htmlFor="role">Cargo</Label>
        <Input
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="ex: Desenvolvedor Web"
        />
      </div>
      <div>
        <Label htmlFor="role">Descrição</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ex: responsável pelo site da empresa"
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">
          Imagem URL (https://i.pravatar.cc/150?img=n)
        </Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="ex: https://i.pravatar.cc/150?img=n"
        />
      </div>
      <Button type="submit" className="w-full">
        Cadastrar Funcionário
      </Button>
    </form>
  );
}
