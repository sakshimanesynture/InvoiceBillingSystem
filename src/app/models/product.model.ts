export interface Product {
  id?: number;         
  name: string;
  code: string;
  description?: string;
  unitPrice: number;
  gstRate: number;
  unit?: string;
  status: 'Active' | 'Inactive';
}
