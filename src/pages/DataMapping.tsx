import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  ArrowRight,
  Database,
  FileText,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Download
} from 'lucide-react';

interface FieldMapping {
  id: string;
  sourceField: string;
  targetField: string;
  dataType: string;
  required: boolean;
  validation: string;
  status: 'mapped' | 'unmapped' | 'error';
  tenant: string;
}

interface ValidationRule {
  id: string;
  field: string;
  rule: string;
  description: string;
  status: 'active' | 'inactive';
}

const mockMappings: FieldMapping[] = [
  {
    id: '1',
    sourceField: 'transaction_id',
    targetField: 'SAP_DOC_ID',
    dataType: 'string',
    required: true,
    validation: 'Alphanumeric, 12 chars',
    status: 'mapped',
    tenant: 'Acme Corp'
  },
  {
    id: '2',
    sourceField: 'amount',
    targetField: 'SAP_AMOUNT',
    dataType: 'decimal',
    required: true,
    validation: 'Positive number',
    status: 'mapped',
    tenant: 'Acme Corp'
  },
  {
    id: '3',
    sourceField: 'vat_rate',
    targetField: 'SAP_VAT_RATE',
    dataType: 'decimal',
    required: true,
    validation: '0-20%',
    status: 'error',
    tenant: 'Global Retail'
  }
];

const mockValidations: ValidationRule[] = [
  {
    id: '1',
    field: 'transaction_amount',
    rule: 'Range Validation',
    description: 'Amount must be between 0 and 1,000,000',
    status: 'active'
  },
  {
    id: '2',
    field: 'transaction_date',
    rule: 'Date Format',
    description: 'Must be in YYYY-MM-DD format',
    status: 'active'
  },
  {
    id: '3',
    field: 'vat_number',
    rule: 'Pattern Validation',
    description: 'Must match Thai VAT format',
    status: 'inactive'
  }
];

export default function DataMapping() {
  const [mappings] = useState<FieldMapping[]>(mockMappings);
  const [validations] = useState<ValidationRule[]>(mockValidations);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMappings = mappings.filter(mapping =>
    mapping.sourceField.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.targetField.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.tenant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      mapped: 'bg-success/20 text-success border-success/30',
      unmapped: 'bg-warning/20 text-warning border-warning/30',
      error: 'bg-destructive/20 text-destructive border-destructive/30'
    };
    return variants[status as keyof typeof variants] || variants.unmapped;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'mapped':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'unmapped':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Mapping</h1>
          <p className="text-muted-foreground">Configure field mappings and validation rules</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Mappings
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Mapping
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Field Mapping</DialogTitle>
                <DialogDescription>
                  Map a source field to a target SAP field with validation rules.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tenant</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Corp</SelectItem>
                      <SelectItem value="global">Global Retail Ltd</SelectItem>
                      <SelectItem value="metro">Metro Solutions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Source Field</label>
                    <Input placeholder="e.g., transaction_id" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Target SAP Field</label>
                    <Input placeholder="e.g., SAP_DOC_ID" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="decimal">Decimal</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Required</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Required?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Validation Rule</label>
                  <Input placeholder="e.g., Alphanumeric, max 50 chars" />
                </div>
                <Button className="w-full">Create Mapping</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mappings</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Across all tenants</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successfully Mapped</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">91% success rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validation Errors</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Validation rules</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="mappings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="mappings">Field Mappings</TabsTrigger>
          <TabsTrigger value="validation">Validation Rules</TabsTrigger>
          <TabsTrigger value="preview">Preview & Test</TabsTrigger>
        </TabsList>

        <TabsContent value="mappings">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Field Mappings</CardTitle>
                  <CardDescription>Map source fields to SAP target fields</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search mappings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source Field</TableHead>
                    <TableHead></TableHead>
                    <TableHead>Target Field</TableHead>
                    <TableHead>Data Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Validation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tenant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMappings.map((mapping) => (
                    <TableRow key={mapping.id}>
                      <TableCell>
                        <div className="font-medium font-mono text-sm bg-muted px-2 py-1 rounded">
                          {mapping.sourceField}
                        </div>
                      </TableCell>
                      <TableCell>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium font-mono text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                          {mapping.targetField}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{mapping.dataType}</Badge>
                      </TableCell>
                      <TableCell>
                        {mapping.required ? (
                          <Badge className="bg-destructive/20 text-destructive border-destructive/30">Required</Badge>
                        ) : (
                          <Badge variant="secondary">Optional</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">{mapping.validation}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(mapping.status)}
                          <Badge className={getStatusBadge(mapping.status)}>
                            {mapping.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{mapping.tenant}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation">
          <Card>
            <CardHeader>
              <CardTitle>Validation Rules</CardTitle>
              <CardDescription>Configure data validation and business rules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Rule Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validations.map((validation) => (
                    <TableRow key={validation.id}>
                      <TableCell>
                        <div className="font-medium font-mono text-sm">{validation.field}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{validation.rule}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">{validation.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={validation.status === 'active' ? 'bg-success/20 text-success border-success/30' : 'bg-muted/20 text-muted-foreground border-muted/30'}>
                          {validation.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Preview & Test Mappings</CardTitle>
              <CardDescription>Test your field mappings with sample data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Select>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select tenant to preview" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Corp</SelectItem>
                      <SelectItem value="global">Global Retail Ltd</SelectItem>
                      <SelectItem value="metro">Metro Solutions</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview Mapping
                  </Button>
                </div>
                
                <div className="border rounded-lg p-6 bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    Select a tenant to preview field mappings and test with sample data
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}