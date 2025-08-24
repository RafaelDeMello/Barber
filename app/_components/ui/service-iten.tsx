"use client"
import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { Calendar } from "./calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { format } from "date-fns"

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

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time)
  }

  return (
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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" className="absolute right-4 top-20">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle className="text-center">Fazer reserva</SheetTitle>
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
                  <div className="flex justify-center gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        variant={selectedTime === time ? "default" : "outline"}
                        key={time}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}
                {selectedTime && selectedDay &&(
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(selectedDay, "d 'de' MMMM", { locale: ptBR })}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <p className="text-sm">
                            {selectedTime}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">
                             {barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="px-5">
                  <SheetClose asChild>
                    <Button type="submit">Confirmar</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
