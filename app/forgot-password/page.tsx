import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <>
      <PageHero eyebrow="Password reset" title="Recover your account" description="Email-based password reset flow ready for Supabase Auth integration." />
      <section className="container-x grid place-items-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Send reset link</CardTitle>
            <CardDescription>Enter the email linked to your FreshMart account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <Button>Send password reset</Button>
            <Button asChild variant="ghost"><Link href="/login">Back to login</Link></Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
