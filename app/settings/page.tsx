"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, Shield, Wallet } from "lucide-react"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
          <Button className="ml-auto rounded-full">
            Save Changes
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>
                    Update your business details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Business Name</label>
                      <Input placeholder="Your Business Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Support Email</label>
                      <Input type="email" placeholder="support@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Description</label>
                    <Textarea 
                      placeholder="Brief description of your business"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Zone</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Display Settings</CardTitle>
                  <CardDescription>
                    Customize how information is displayed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Currency Display</h3>
                      <p className="text-sm text-muted-foreground">
                        Show fiat equivalent for crypto amounts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Compact Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        Use compact layout for tables and lists
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <Mail className="h-8 w-8 p-1.5 bg-primary/10 text-primary rounded-full" />
                    <div className="flex-1">
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center gap-4 pb-4 border-b">
                    <Bell className="h-8 w-8 p-1.5 bg-primary/10 text-primary rounded-full" />
                    <div className="flex-1">
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications
                      </p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-medium">Notification Events</h3>
                    <div className="space-y-4">
                      {[
                        "New payments",
                        "Failed transactions",
                        "Refund requests",
                        "Customer disputes",
                        "System updates"
                      ].map((event) => (
                        <div key={event} className="flex items-center justify-between">
                          <span className="text-sm">{event}</span>
                          <Switch defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <Shield className="h-8 w-8 p-1.5 bg-primary/10 text-primary rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Additional security for your account
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Session Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Auto-logout timer</p>
                          <p className="text-xs text-muted-foreground">
                            Automatically log out after inactivity
                          </p>
                        </div>
                        <Select defaultValue="30">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Security</CardTitle>
                  <CardDescription>
                    Configure API security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">IP Whitelisting</h3>
                      <p className="text-sm text-muted-foreground">
                        Restrict API access to specific IP addresses
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Rate Limiting</h3>
                      <p className="text-sm text-muted-foreground">
                        Limit API requests per minute
                      </p>
                    </div>
                    <Select defaultValue="100">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 requests/min</SelectItem>
                        <SelectItem value="100">100 requests/min</SelectItem>
                        <SelectItem value="200">200 requests/min</SelectItem>
                        <SelectItem value="500">500 requests/min</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Settings</CardTitle>
                <CardDescription>
                  Manage your billing preferences and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <Wallet className="h-8 w-8 p-1.5 bg-primary/10 text-primary rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Current Plan</h3>
                        <Badge>Pro</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        $49/month, billed monthly
                      </p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-14 bg-primary/10 rounded" />
                        <div>
                          <p className="text-sm font-medium">•••• 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 04/25</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Billing Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Street Address" />
                      <Input placeholder="City" />
                      <Input placeholder="State/Province" />
                      <Input placeholder="ZIP/Postal Code" />
                      <Select defaultValue="us">
                        <SelectTrigger>
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}