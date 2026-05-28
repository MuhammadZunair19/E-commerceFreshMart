import Link from "next/link";
import { Wand2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MagicLinkPage() {
  return (
    <>
      <PageHero eyebrow="Passwordless" title="Login with magic link" description="Passwordless email login page prepared for Supabase magic-link authentication." />
      <section className="container-x grid place-items-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wand2 className="h-5 w-5" /> Magic link</CardTitle>
            <CardDescription>We will email a secure sign-in link.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <Button>Send magic link</Button>
            <Button asChild variant="ghost"><Link href="/login">Use password instead</Link></Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
