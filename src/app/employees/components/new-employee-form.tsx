"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NewEmployeeForm() {
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [role, setRole] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("api/employees", {
      method: "POST",
      body: JSON.stringify({ name, cpf, imageUrl, description, role }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setName("");
      setCpf("");
      setImageUrl("");
      setDescription("");
      setRole("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="cpf">CPF</Label>
        <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="role">Cargo</Label>
        <Input
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="role">Descrição</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">Imagem (URL)</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Cadastrar Funcionário
      </Button>
    </form>
  );
}
