import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./card"
import Image from "next/image"
import { Button } from "./button"
import { Badge } from "./badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemsProps {
  barbershop: Barbershop
}

const BarbershopItems = ({ barbershop }: BarbershopItemsProps) => {
  return (
    <Card className="min-w-[159px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* IMAGEM */}
        <div className="relative h-[159px] w-full">
          <Image
            fill
            className="rounded-2xl object-contain object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />

          <Badge className="absolute left-2 top-2 space-x-1" variant="secondary">
             <StarIcon size={12} className="fill-primary text-primary"/>
             <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* TEXTO */}

        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>
              Reservar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItems
