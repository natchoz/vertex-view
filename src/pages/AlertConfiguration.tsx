import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Bell, 
  Plus, 
  MoreHorizontal, 
  AlertTriangle,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2
} from 'lucide-react';

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  trigger: string;
  channel: 'email' | 'sms' | 'webhook';
  status: 'active' | 'inactive';
  lastTriggered: string;
  triggeredCount: number;
}

const mockAlerts: AlertRule[] = [
  {
    id: '1',
    name: 'Missing Daily Submission',
    condition: 'No submission for 24 hours',
    trigger: 'Daily at 6:00 PM',
    channel: 'email',
    status: 'active',
    lastTriggered: '2024-01-15 18:00',
    triggeredCount: 5
  },
  {
    id: '2',
    name: 'Large Transaction Alert',
    condition: 'Transaction > 100,000 THB',
    trigger: 'Immediate',
    channel: 'email',
    status: 'active',
    lastTriggered: '2024-01-15 14:30',
    triggeredCount: 2
  },
  {
    id: '3',
    name: 'API Key Expiration',
    condition: 'API key expires in 7 days',
    trigger: 'Weekly',
    channel: 'email',
    status: 'inactive',
    lastTriggered: '2024-01-10 09:00',
    triggeredCount: 1
  }
];

export default function AlertConfiguration() {
  const [searchTerm, setSearchTerm] = useState('');
  const [alerts, setAlerts] = useState<AlertRule[]>(mockAlerts);

  const filteredAlerts = alerts.filter(alert =>
    alert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAlertStatus = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id 
        ? { ...alert, status: alert.status === 'active' ? 'inactive' : 'active' }
        : alert
    ));
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'bg-success/20 text-success border-success/30'
      : 'bg-muted/20 text-muted-foreground border-muted/30';
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'webhook':
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alert Configuration</h1>
          <p className="text-muted-foreground">Configure monitoring alerts and notifications</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Alert Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Alert Rule</DialogTitle>
              <DialogDescription>
                Set up a new monitoring alert with conditions and actions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Alert Name</label>
                <Input placeholder="Enter alert name" />
              </div>
              <div>
                <label className="text-sm font-medium">Condition</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-submission">No submission received</SelectItem>
                    <SelectItem value="large-transaction">Transaction amount threshold</SelectItem>
                    <SelectItem value="api-key-expire">API key expiration</SelectItem>
                    <SelectItem value="tenant-inactive">Tenant inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Notification Channel</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Recipients</label>
                <Input placeholder="Enter email addresses (comma-separated)" />
              </div>
              <Button className="w-full">Create Alert Rule</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 rules active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Triggered Today</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 critical, 1 warning</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3m</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Rules Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>Manage monitoring rules and notifications</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert Name</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Triggered</TableHead>
                <TableHead>Count</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div className="font-medium">{alert.name}</div>
                    <div className="text-sm text-muted-foreground">{alert.trigger}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{alert.condition}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getChannelIcon(alert.channel)}
                      <span className="capitalize">{alert.channel}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={alert.status === 'active'}
                        onCheckedChange={() => toggleAlertStatus(alert.id)}
                      />
                      <Badge className={getStatusBadge(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{alert.lastTriggered}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{alert.triggeredCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Rule
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bell className="h-4 w-4 mr-2" />
                          Test Alert
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Rule
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}