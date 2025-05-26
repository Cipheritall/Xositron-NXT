"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Wallet } from "lucide-react";

export default function PaymentMethodsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Payment Methods</h1>
        <p className="text-muted-foreground mt-2">Manage your payment methods and preferences</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Connected Payment Methods
            </CardTitle>
            <CardDescription>Your currently connected payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-8 text-center">
              <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No payment methods yet</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Add your first payment method to start managing your finances
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}