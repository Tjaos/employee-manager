import { db } from "@/lib/prisma";
import { z } from "zod";

// Schemas de validação
const ParamsSchema = z.object({
  id: z.string().uuid(),
});

const UpdateEmployeeSchema = z.object({
  name: z.string().min(1).optional(),
  cpf: z.string().length(11).optional(),
  imageUrl: z.string().url().optional(),
  role: z.string().min(1).optional(),
  description: z.string().max(255).optional(),
});

const Responses = {
  invalidId: () => new Response("ID inválido", { status: 400 }),
  notFound: () => new Response("Funcionário não encontrado", { status: 404 }),
  validationError: (errors: z.ZodError) =>
    new Response(JSON.stringify({ errors: errors.format() }), { status: 400 }),
  noContent: () => new Response(null, { status: 204 }),
};

// HANDDLERS
async function handleEmployeeUpdate(req: Request, params: { id: string }) {
  const idValidation = ParamsSchema.safeParse({ id: params.id });
  if (!idValidation.success) return Responses.invalidId();

  const body = await req.json();
  const dataValidation = UpdateEmployeeSchema.safeParse(body);
  if (!dataValidation.success)
    return Responses.validationError(dataValidation.error);

  try {
    const updatedEmployee = await db.employee.update({
      where: { id: params.id },
      data: {
        ...dataValidation.data,
        updatedAt: new Date(),
      },
    });
    return Response.json(updatedEmployee);
  } catch (error) {
    console.error("Erro ao editar funcionário:", error);
    return Responses.notFound();
  }
}

async function handleEmployeeDeletion(params: { id: string }) {
  const idValidation = ParamsSchema.safeParse({ id: params.id });
  if (!idValidation.success) return Responses.invalidId();

  try {
    await db.employee.delete({ where: { id: params.id } });
    return Responses.noContent();
  } catch (error) {
    console.error("Erro ao deletar funcionário:", error);
    return Responses.notFound();
  }
}

// EXPORTA AS FUNÇÕES CRIADAS
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handleEmployeeUpdate(req, params);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return handleEmployeeDeletion(params);
}
