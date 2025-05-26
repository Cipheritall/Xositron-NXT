"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Plus, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const apiKeys = [
  {
    id: "key_live_1234",
    name: "Production API Key",
    type: "live",
    created: "2025-04-15T10:00:00Z",
    lastUsed: "2025-04-20T15:30:00Z",
    status: "active"
  },
  {
    id: "key_test_5678",
    name: "Test API Key",
    type: "test",
    created: "2025-04-10T14:20:00Z",
    lastUsed: "2025-04-20T12:45:00Z",
    status: "active"
  },
  {
    id: "key_live_9012",
    name: "Webhook Key",
    type: "live",
    created: "2025-04-01T09:15:00Z",
    lastUsed: "2025-04-19T18:20:00Z",
    status: "revoked"
  }
]

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date(dateString))
}

export default function APIKeysPage() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-lg font-semibold md:text-2xl">API Keys</h1>
          <Button className="ml-auto rounded-full">
            <Plus className="mr-2 h-4 w-4" /> Create API Key
          </Button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API Access</CardTitle>
            <CardDescription>
              Manage your API keys for secure access to Xositron&apos;s payment infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium">Test Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Toggle between test and live API environments
                  </p>
                </div>
                <Switch />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell>{key.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="rounded bg-muted px-2 py-1">
                            {showKeys[key.id] ? key.id : '••••••••••••'}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleKeyVisibility(key.id)}
                          >
                            {showKeys[key.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={key.type === 'live' ? 'default' : 'secondary'}>
                          {key.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(key.created)}</TableCell>
                      <TableCell>{formatDate(key.lastUsed)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={key.status === 'active' ? 'secondary' : 'destructive'}
                          className={cn(
                            key.status === 'active' && "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700",
                          )}
                        >
                          {key.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "text-destructive hover:text-destructive",
                            key.status === 'revoked' && "opacity-50 cursor-not-allowed"
                          )}
                          disabled={key.status === 'revoked'}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Settings</CardTitle>
            <CardDescription>
              Configure webhook endpoints to receive real-time payment notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Webhook URL</label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    placeholder="https://your-domain.com/webhook"
                    className="flex-1"
                  />
                  <Button>Save</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-4 border-t">
                <div>
                  <h3 className="font-medium">Webhook Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable webhook notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}