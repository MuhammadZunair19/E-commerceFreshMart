import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <>
      <PageHero eyebrow="Auth" title="Create your account" description="Registration screen prepared for Supabase email verification and OAuth." />
      <section className="container-x grid place-items-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2"><Label>Full name</Label><Input placeholder="Your name" /></div>
            <div className="grid gap-2"><Label>Email</Label><Input type="email" placeholder="you@example.com" /></div>
            <div className="grid gap-2"><Label>Password</Label><Input type="password" placeholder="••••••••" /></div>
            <Button>Create account</Button>
            <p className="text-center text-sm text-muted">Already registered? <Link href="/login" className="font-bold text-forest">Login</Link></p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
