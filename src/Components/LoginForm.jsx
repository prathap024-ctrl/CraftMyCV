"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Link } from "react-router-dom";

export function LoginForm({ className, ...props }) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center text-white">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-white text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6 text-white">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <Button variant="outline" className="w-full text-black">
          Login
        </Button>
      </div>
      <div className="text-center text-sm text-white">
        Don&apos;t have an account?{" "}
        <Link to={"/sign-up"} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
