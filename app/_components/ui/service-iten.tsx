"use client"
import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./sheet"
import { Calendar } from "./calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { isPast, isToday, set } from "date-fns"
import { createBooking } from "@/_actions/create-booking"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { getBookings } from "@/_actions/get-bookings"
import { Dialog, DialogContent } from "./dialog"
import SignInDialog from "./sign-in-dialog"
import BookingSummary from "./booking-summary"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  // Se o dia selecionado for anterior ao dia atual, não mostra nenhum horário
  if (
    selectedDay &&
    selectedDay <
      set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
  ) {
    return []
  }

  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])
    const timeDate = set(selectedDay, { hours: hour, minutes })

    // Para o dia de hoje, só mostra horários futuros
    if (isToday(selectedDay) && isPast(timeDate)) {
      return false
    }

    // Se já existe booking nesse horário, não mostra
    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}
const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingsSheetIsOpen, setBookingsSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return 
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingsSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingsSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao criar reserva")
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
      <Card className="min-w[159px] relative rounded-2xl">
        <CardContent className="flex items-center gap-3 p-3">
          {/* Image */}
          <div className="max-h[110px] max-w[110px] relative h-[110px] w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-xl object-cover"
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

              <Sheet
                open={bookingsSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  className="absolute right-4 top-20"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle className="text-center">
                      Fazer reserva
                    </SheetTitle>
                  </SheetHeader>
                  <div className="border-b border-solid py-5">
                    <Calendar
                      className="w-full"
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>
                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
                    </div>
                  )}
                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        service={service}
                        barbershop={barbershop}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}
                  <SheetFooter className="mt-5 p-5">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
