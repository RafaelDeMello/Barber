import { Button } from "@/_components/ui/button"
import { db } from "@/_lib/prisma"
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BarbershopPageProps {
  params: {
    id: string
  }
}
const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  //chamar banco de dados
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  })
  return (
    <div>
      {/*imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop?.imageUrl ?? "/default-barbershop.jpg"}
          alt={barbershop?.name ?? "Barbershop"}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>

        {/* Endereco */}

        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        {/* Avaliações */}

        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" />
          <p className="text-sm">5.0 (499) Avaliações</p>
        </div>
      </div>
      {/* Descricao */}
      <div className="border-b border-solid p-5 space-y-3">
        <h2 className="uppercase font-bold text-gray-400 text-xs">Sobre Nós</h2>
        <p className="text-sm text-justify">{barbershop?.description}</p>
      </div>
    </div>
  )
}

export default BarbershopPage
