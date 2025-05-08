import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { db } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import NewEmployeeForm from "./components/new-employee-form";

export default async function EmployeesPage() {
    const employees = await db.employee.findMany({
        orderBy: { createdAt: "desc" }
    })


    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Funcionários</h1>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="default">+ Novo Funcionário</Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Cadastrar Funcionário</SheetTitle>
                        </SheetHeader>
                        <NewEmployeeForm />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee) => (
                    <Link
                        key={employee.id}
                        href={`/employees/${employee.id}`}
                        className="border rounded-md p-4 flex items-center gap-4 hover:shadow-md transition"
                    >
                        <Image
                            src={employee.imageUrl}
                            alt={employee.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold">{employee.name}</p>
                            <p className="text-sm text-gray-500">{employee.cpf}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}