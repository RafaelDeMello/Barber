import { Card, CardContent } from "./card"
import Image from "next/image"
import { Button } from "./button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { quickSearchOptions } from "@/_constants/search"
import { Avatar, AvatarImage } from "./avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center py-5 border-b border-solid gap-3">
                <Avatar>
                    <AvatarImage src="avatar.png" /> 
                </Avatar>
                <div>
                    <p className="font-bold">Nome</p>
                    <p className="text-xs">exemplo@email.com</p>
                </div>
            </div>

            <div className="flex flex-col gap-1 border-b border-solid py-5">
              <SheetClose asChild>
                  <Button className="justify-start gap-2" variant="ghost">
                    <Link href="/">
                        <HomeIcon size={18} />
                        Inicío
                    </Link>
                  </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant="ghost">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-1 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  className="justify-start gap-2"
                  variant="ghost"
                >
                  <Image src={option.imageUrl} height={18} width={18} alt="" />
                  {option.title}
                </Button>
              ))}
            </div>
            <div className="flex flex-col gap-2 py-5"> 
                <Button variant="ghost" className="justify-start gap-2">
                    <LogOutIcon size={18}/>
                    Sair da conta
                    </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
