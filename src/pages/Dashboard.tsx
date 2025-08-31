import { KPICard } from '@/components/dashboard/KPICard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Users,
  Bell,
  Download,
  Calendar,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const kpiData = [
    {
      title: 'Total Sales',
      value: '€2,847,391',
      subtitle: 'This month',
      icon: DollarSign,
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: 'Active Tenants',
      value: 24,
      subtitle: 'Currently reporting',
      icon: Users,
      trend: { value: 2.1, isPositive: true }
    },
    {
      title: 'Missing Submissions',
      value: 3,
      subtitle: 'Require attention',
      icon: AlertTriangle,
      trend: { value: -15.2, isPositive: true }
    },
    {
      title: 'Data Processing',
      value: '99.8%',
      subtitle: 'System uptime',
      icon: Activity,
      trend: { value: 0.2, isPositive: true }
    }
  ];

  const recentAlerts = [
    { tenant: 'Store Munich Central', type: 'Missing Submission', time: '2 hours ago', severity: 'high' },
    { tenant: 'Store Berlin West', type: 'Data Validation Error', time: '4 hours ago', severity: 'medium' },
    { tenant: 'Store Hamburg Nord', type: 'Late Submission', time: '6 hours ago', severity: 'low' },
  ];

  const tenantSummary = [
    { name: 'Store Munich Central', sales: '€186,429', status: 'submitted', lastUpdate: '2024-01-15' },
    { name: 'Store Berlin West', sales: '€142,837', status: 'pending', lastUpdate: '2024-01-14' },
    { name: 'Store Hamburg Nord', sales: '€198,256', status: 'submitted', lastUpdate: '2024-01-15' },
    { name: 'Store Frankfurt Main', sales: '€167,832', status: 'missing', lastUpdate: '2024-01-13' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="status-success">Submitted</Badge>;
      case 'pending':
        return <Badge className="status-warning">Pending</Badge>;
      case 'missing':
        return <Badge className="status-error">Missing</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="status-error">High</Badge>;
      case 'medium':
        return <Badge className="status-warning">Medium</Badge>;
      case 'low':
        return <Badge className="status-success">Low</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dashboard-header">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Enterprise sales data overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            This Month
          </Button>
          <Button variant="enterprise" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={kpi.title}
            {...kpi}
            className="animate-slide-up"
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="dashboard-section animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>System notifications requiring attention</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{alert.tenant}</span>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tenant Sales Summary */}
        <Card className="dashboard-section animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Tenant Performance
                </CardTitle>
                <CardDescription>Sales summary by tenant location</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View Details</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tenantSummary.map((tenant, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{tenant.name}</span>
                      {getStatusBadge(tenant.status)}
                    </div>
                    <p className="text-sm font-semibold text-primary">{tenant.sales}</p>
                    <p className="text-xs text-muted-foreground">Last update: {tenant.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="dashboard-section animate-slide-up">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used management functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Users className="h-5 w-5 mb-1" />
              <span className="text-xs">Manage Tenants</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Bell className="h-5 w-5 mb-1" />
              <span className="text-xs">Configure Alerts</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Download className="h-5 w-5 mb-1" />
              <span className="text-xs">Export Data</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Activity className="h-5 w-5 mb-1" />
              <span className="text-xs">System Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;