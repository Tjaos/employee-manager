// app/api/employees/route.ts
import { z } from "zod";
import { db } from "@/lib/prisma"; // <-- Aqui está a mudança

const EmployeeSchema = z.object({
  name: z.string().min(1),
  cpf: z.string().length(11),
  imageUrl: z.string().url(),
});

export async function GET() {
  const employees = await db.employee.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(employees);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = EmployeeSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.errors }), {
      status: 400,
    });
  }

  const employee = await db.employee.create({
    data: parsed.data,
  });

  return Response.json(employee);
}
