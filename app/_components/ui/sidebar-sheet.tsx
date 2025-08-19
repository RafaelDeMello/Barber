import Image from "next/image"
import { Button } from "./button"
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./sheet"
import { quickSearchOptions } from "@/_constants/search"
import { Avatar, AvatarImage } from "./avatar"
import Link from "next/link"

const SidebarSheet= () => {
    return ( 
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
     );
}
 
export default SidebarSheet;