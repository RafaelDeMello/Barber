import BarbershopItems from "@/_components/ui/barbershop-itens";
import { db } from "@/_lib/prisma";

interface BarbershopsPageProps {
    searchParams: {
        search?: string;
    }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
      const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams?.search,
                mode: "insensitive",
            },
        },
      })

    return (
    <div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Resultados para &quot;${searchParams?.search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
            {barbershops.map(barbershop => (
                <BarbershopItems key={barbershop.id} barbershop={barbershop} />
            ))}
        </div>
    </div>
    )
}

export default BarbershopsPage;