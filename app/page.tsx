/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItems from "./_components/ui/barbershop-itens"
import BookingItems from "./_components/ui/booking-itens"
import { quickSearchOptions } from "./_constants/search"
import Search from "./_components/ui/search"
import Link from "next/link"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import getConfirmedBookings from "./_data/get_confirmed_bookings"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      {/* Header */}
      <Header />
      <div className="p-5">
        {/* Texto */}
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "bem vindo"}!
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          <span>&nbsp;de&nbsp;</span>
          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>

        {/* Busca */}

        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RAPIDA */}

        <div className="mb-6 mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="gap-2"
              variant="secondary"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />
                {option.title}{" "}
              </Link>
            </Button>
          ))}
        </div>
        {/* Imagem */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>
            {/* Agendamentos */}
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItems key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />
              ))}
            </div>
          </>
        )}
        {/* Agendamentos */}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItems key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItems key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Home
