import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpUser, signUpUserSchema } from "@/types/user";
import { useSignUpMutation } from "@/store/api/user-api";
import { isExpectedError } from "@/store/helpers/is-expected-error";
import { toast } from "sonner";
import { AppRoute } from "@/lib/enums/app-route";


export function SignUpPage() {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()

  const form = useForm<SignUpUser>({
    resolver: zodResolver(signUpUserSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpUser) {
    const resp = await signUp(values)

    if (resp.error && isExpectedError(resp.error)) {
      toast.error(resp.error.data.detail)
    } else {
      navigate(AppRoute.HOME)
    }
  }

  return (
    <main className="flex-grow flex items-center justify-center p-4 overflow-auto">
      <Card className="w-full max-w-md border-secondary">
        <CardHeader>
          <div className="flex items-center justify-center">
            <img src="/logo.png" className="h-8" />
          </div>
          <CardTitle className="text-2xl text-center text-primary">
            Sign Up
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="horselover" {...field} />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/sign-in" className="text-sm text-primary hover:underline">
            Already have an account?
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
