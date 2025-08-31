import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  ClipboardCheck, 
  Users, 
  Bell, 
  Settings, 
  UserCog, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and KPIs'
  },
  {
    title: 'Sales Transactions',
    href: '/sales-data',
    icon: Database,
    description: 'Transaction data management'
  },
  {
    title: 'Submission Status',
    href: '/tracking',
    icon: ClipboardCheck,
    description: 'Track tenant submissions'
  },
  {
    title: 'Tenant Management',
    href: '/tenants',
    icon: Users,
    description: 'Manage tenant accounts'
  },
  {
    title: 'Alert Configuration',
    href: '/alerts',
    icon: Bell,
    description: 'Configure monitoring alerts'
  },
  {
    title: 'Data Mapping',
    href: '/mapping',
    icon: Settings,
    description: 'Validation & aggregation engine'
  },
  {
    title: 'User Management',
    href: '/users',
    icon: UserCog,
    description: 'Role and user management'
  },
  {
    title: 'Audit Logs',
    href: '/audit',
    icon: FileText,
    description: 'System audit logging'
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className={cn(
      "bg-dashboard-header border-r border-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-white">Vertex View</h2>
                <p className="text-xs text-slate-400">Enterprise Platform</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white hover:bg-white/10"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = isActiveRoute(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon className={cn(
                "h-5 w-5 shrink-0",
                isActive ? "text-primary-foreground" : "text-slate-400 group-hover:text-white"
              )} />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className={cn(
                    "text-xs",
                    isActive ? "text-primary-foreground/80" : "text-slate-500"
                  )}>
                    {item.description}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border/20">
        <div className={cn(
          "flex items-center gap-3 px-3 py-2",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-white">AD</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Admin User</span>
              <span className="text-xs text-slate-400">admin@company.com</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}