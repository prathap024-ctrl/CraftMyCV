import { ArrowLeft, GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/LoginForm"
import { Link } from "react-router-dom"
import images from "../../assets/images"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-start gap-2 md:justify-start">
          <Link to={"/"} className="flex items-center text-white gap-2 font-medium">
            <ArrowLeft /> CraftMyCV
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={images.resumeSideBG}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
