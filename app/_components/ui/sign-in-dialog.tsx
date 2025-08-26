import Image from "next/image"
import { Button } from "./button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { signIn } from "next-auth/react"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google")
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça seu login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta Google
        </DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="gap-2 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Fazer login com o Google"
          src="/google.svg"
          width={18}
          height={18}
        />
      </Button>
    </>
  )
}

export default SignInDialog
