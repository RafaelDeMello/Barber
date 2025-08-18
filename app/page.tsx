import { SearchIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import Header from "./_components/ui/header";
import { Input } from "./_components/ui/input";
import Image from "next/image";

const Home = () => {
  return (
  <div>

    <Header />
    <div className="p-5">
      <h2 className="text-xl font-bold">Olá, Rafael!</h2>
      <p>Segunda feira, 18 de agosto. </p>

      <div className="mt-6 flex items-center gap-2">
        <Input placeholder="Faça sua reserva" />
        <Button>
          <SearchIcon />
        </Button>
      </div>

      <div className="relative w-full h-[150px] mt-6 ">
        <Image
         alt="Agende nos melhores com FSW Barber"
         src="/banner-01.png" 
         fill 
         className="object-cover rounded-xl"/>
      </div>
    </div>

    
  </div>
  )
}
export default Home;