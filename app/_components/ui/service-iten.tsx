import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./button"
import { Card, CardContent } from "./card"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="relative min-w[159px] rounded-2xl">
      <CardContent className="flex items-center gap-3 p-3">
        {/* Image */}
        <div className="max-h[110px] max-w[110px] relative h-[110px] w-[110px]">
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="object-cover rounded-xl"
          />
          1
        </div>
        {/* Direita */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Button variant="secondary" className="absolute right-4 top-20">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
