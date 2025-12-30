export interface Client {
  id: number;

  name: string;
  email: string;
  phone?: string;

  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;

  gstNumber?: string;
  isActive: boolean;
  company?: string; // ✅ Add this

  createdAt: string;
  updatedAt: string;
}

// DTO for Creating a New Client
export interface CreateClientDto {
  name: string;
  email: string;
  phone?: string;

  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;

  gstNumber?: string;
  company?: string; // ✅ Add this
}

// DTO for Updating an Existing Client
export interface UpdateClientDto {
  name: string;
  email: string;
  phone?: string;

  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;

  gstNumber?: string;
  isActive: boolean;
  company?: string; // ✅ Add this
}
