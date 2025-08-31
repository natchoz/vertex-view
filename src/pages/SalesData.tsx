import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Database,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SalesData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for sales transactions
  const salesData = [
    {
      id: 'TXN-001',
      date: '2024-01-15',
      time: '14:23:15',
      amount: '€89.50',
      vat: '€17.90',
      storeName: 'Store Munich Central',
      tenant: 'Munich Operations',
      paymentMethod: 'Card',
      category: 'Electronics'
    },
    {
      id: 'TXN-002',
      date: '2024-01-15',
      time: '14:18:42',
      amount: '€156.75',
      vat: '€31.35',
      storeName: 'Store Berlin West',
      tenant: 'Berlin Operations',
      paymentMethod: 'Cash',
      category: 'Clothing'
    },
    {
      id: 'TXN-003',
      date: '2024-01-15',
      time: '14:15:28',
      amount: '€234.20',
      vat: '€46.84',
      storeName: 'Store Hamburg Nord',
      tenant: 'Hamburg Operations',
      paymentMethod: 'Card',
      category: 'Home & Garden'
    },
    {
      id: 'TXN-004',
      date: '2024-01-15',
      time: '14:12:03',
      amount: '€67.30',
      vat: '€13.46',
      storeName: 'Store Frankfurt Main',
      tenant: 'Frankfurt Operations',
      paymentMethod: 'Digital',
      category: 'Food & Beverage'
    },
    {
      id: 'TXN-005',
      date: '2024-01-15',
      time: '14:08:17',
      amount: '€445.90',
      vat: '€89.18',
      storeName: 'Store Munich Central',
      tenant: 'Munich Operations',
      paymentMethod: 'Card',
      category: 'Electronics'
    },
  ];

  const totalPages = Math.ceil(salesData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = salesData.slice(startIndex, endIndex);

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'Card':
        return <Badge className="status-success">Card</Badge>;
      case 'Cash':
        return <Badge className="status-warning">Cash</Badge>;
      case 'Digital':
        return <Badge className="status-info">Digital</Badge>;
      default:
        return <Badge variant="secondary">{method}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dashboard-header flex items-center gap-2">
            <Database className="h-8 w-8 text-primary" />
            Sales Data Transactions
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive transaction data across all tenant locations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="enterprise" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="dashboard-section">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
          <CardDescription>Find specific transactions or filter by criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="munich">Store Munich Central</SelectItem>
                <SelectItem value="berlin">Store Berlin West</SelectItem>
                <SelectItem value="hamburg">Store Hamburg Nord</SelectItem>
                <SelectItem value="frankfurt">Store Frankfurt Main</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="dashboard-section">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction Records</CardTitle>
              <CardDescription>
                Showing {startIndex + 1}-{Math.min(endIndex, salesData.length)} of {salesData.length} transactions
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Transaction ID</th>
                  <th className="text-left p-4 font-semibold">Date & Time</th>
                  <th className="text-left p-4 font-semibold">Amount</th>
                  <th className="text-left p-4 font-semibold">VAT</th>
                  <th className="text-left p-4 font-semibold">Store</th>
                  <th className="text-left p-4 font-semibold">Payment</th>
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((transaction, index) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-mono text-sm">{transaction.id}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium">{transaction.date}</div>
                        <div className="text-sm text-muted-foreground">{transaction.time}</div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-primary">{transaction.amount}</td>
                    <td className="p-4 text-sm text-muted-foreground">{transaction.vat}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium">{transaction.storeName}</div>
                        <div className="text-sm text-muted-foreground">{transaction.tenant}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      {getPaymentMethodBadge(transaction.paymentMethod)}
                    </td>
                    <td className="p-4 text-sm">{transaction.category}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Transaction</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Flag Transaction
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, salesData.length)} of {salesData.length} entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesData;