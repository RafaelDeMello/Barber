/* eslint-disable @typescript-eslint/no-explicit-any */
import BookingItems from "@/_components/ui/booking-itens"
import Header from "@/_components/ui/header"
import { getConcludedBookings } from "@/_data/get_concluded_bookings"
import getConfirmedBookings from "@/_data/get_confirmed_bookings"
import { authOptions } from "@/_lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return notFound()
  }
  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItems key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />
            ))}
          </>
        )}
        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItems key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
