import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSignInMutation } from "@/store/api/user-api";
import { toast } from "sonner";
import { SignInUser, signInUserSchema } from "@/types/user";
import { saveTokens } from "@/lib/utils";
import { AppRoute } from "@/lib/enums/app-route";
import { isExpectedError } from "@/store/helpers";


export function SignInPage() {
  const navigate = useNavigate()
  const [signIn] = useSignInMutation()

  const form = useForm<SignInUser>({
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInUser) {
    const resp = await signIn(values)

    if (resp.error && isExpectedError(resp.error)) {
      toast.error(resp.error.data.detail)
    } else if (resp.data) {
      saveTokens(resp.data.access_token, resp.data.refresh_token)
      navigate(AppRoute.HOME)
    }

  }

  return (
    <main className="flex-grow flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-secondary">
        <CardHeader>
          <div className="flex items-center justify-center">
            <img src="/logo.png" className="h-8" />
          </div>
          <CardTitle className="text-2xl text-center text-primary">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="horselover@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/sign-up" className="text-sm text-primary hover:underline">
            Don't have an account?
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
