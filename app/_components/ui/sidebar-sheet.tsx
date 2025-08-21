import Image from "next/image"
import { Button } from "./button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./sheet"
import { quickSearchOptions } from "@/_constants/search"
import { Avatar, AvatarImage } from "./avatar"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"

const SidebarSheet = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        <h2 className="text-lg font-bold">Olá, faça seu login!</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Faça seu login na plataforma</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta Google
              </DialogDescription>
            </DialogHeader>

             <Button variant="outline" className="gap-2 font-bold">
                <Image alt="Fazer login com o Google" src="/google.svg" width={18} height={18} />
             </Button>
          </DialogContent>
        </Dialog>
        {/* <Avatar>
                    <AvatarImage src="avatar.png" /> 
                </Avatar>
                <div>
                    <p className="font-bold">Nome</p>
                    <p className="text-xs">exemplo@email.com</p>
                </div> */}
      </div>

      <div className="flex flex-col gap-1 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost">
            <Link className="flex items-center gap-2" href="/">
              <HomeIcon size={18} />
              Início
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
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
