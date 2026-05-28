import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <>
      <PageHero eyebrow="Auth" title="Welcome back" description="Supabase Auth-ready login screen for email/password, magic link, and OAuth." />
      <section className="container-x grid place-items-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2"><Label>Email</Label><Input type="email" placeholder="you@example.com" /></div>
            <div className="grid gap-2"><Label>Password</Label><Input type="password" placeholder="••••••••" /></div>
            <Button>Login</Button>
            <Button variant="outline">Continue with Google</Button>
            <div className="flex items-center justify-between text-sm">
              <Link href="/magic-link" className="font-bold text-forest">Magic link</Link>
              <Link href="/forgot-password" className="font-bold text-forest">Forgot password?</Link>
            </div>
            <p className="text-center text-sm text-muted">New here? <Link href="/register" className="font-bold text-forest">Create account</Link></p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
