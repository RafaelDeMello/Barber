import { Button } from "@/_components/ui/button"
import PhoneItem from "@/_components/ui/phone-item"
import ServiceItem from "@/_components/ui/service-iten"
import { db } from "@/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
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
    include: {
      services: true,
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
       
       {/* Titulo */}

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>

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
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre Nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      {/* Serviços */}
      <div className="p-5 space-y-3 border-b border-solid">
        <h2 className="text-xs font-bold uppercase text-gray-400 mb-3">Serviços</h2>
        <div className="space-y-3">
          {barbershop?.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Contato */}
      <div className="p-5 space-y-3">
          {barbershop?.phones.map(phone => (
            <PhoneItem key={phone} phone={ phone } />
          ))}
      </div>
    </div>
    
  )
}

export default BarbershopPage
