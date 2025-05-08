import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Criando 5 funcionários
  await db.employee.createMany({
    data: [
      {
        name: "Maria Oliveira",
        cpf: "98765432100",
        imageUrl: "https://i.pravatar.cc/150?img=5",
      },
      {
        name: "Carlos Pereira",
        cpf: "11223344556",
        imageUrl: "https://i.pravatar.cc/150?img=8",
      },
      {
        name: "Ana Souza",
        cpf: "22334455667",
        imageUrl: "https://i.pravatar.cc/150?img=9",
      },
      {
        name: "Ricardo Almeida",
        cpf: "33445566778",
        imageUrl: "https://i.pravatar.cc/150?img=11",
      },
      {
        name: "Fernanda Costa",
        cpf: "44556677889",
        imageUrl: "https://i.pravatar.cc/150?img=16",
      },
    ],
  });

  console.log("5 funcionários criados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    db.$disconnect();
  });
