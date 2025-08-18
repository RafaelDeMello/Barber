import { Card, CardContent } from "./card";
import Image from "next/image";
import { Button } from "./button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return (
        <Card>
            <CardContent className="p-5 justify-between flex flex-row items-center" >
                <Image alt="FSW Barber" src="/logo.png" height={18} width={120}/>
                <Button size="icon" variant="outline">
                    <MenuIcon />
                </Button>
            </CardContent>
        </Card>
    );
}
 
export default Header;