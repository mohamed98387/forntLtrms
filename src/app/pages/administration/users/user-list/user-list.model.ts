// Table data
export interface Table {
  name: string;
  login: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  city: string;
  organization: string;
}

// Search Data
export interface SearchResult {
  tables: Table[];
  total: number;
}
