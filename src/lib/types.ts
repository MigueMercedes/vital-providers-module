export interface IResponse<T> {
  resp: {
    codigo: number;
    mensaje: string;
  };
  data: T;
}

export interface Ars {
  id: string;
  name: string;
  src: string;
}

export interface Branch {
  id: string;
  providerId: string;
  name: string;
  address: string;
  paymentMethods: string[];
  facilities: string[];
  specialties: BranchSpecialty[];
  ars: string[];
}

export interface BranchSpecialty {
  id: string;
  name: string;
  procedures: Ars[];
}

export interface Specialty {
  id: string;
  name: string;
  time: number;
}

export interface Procedure {
  id: string;
  name: string;
}

export interface ServiceProvider {
  id: string;
  src: string;
  name: string;
  phone: string;
  whatsApp: string;
  email: string;
  website: string;
  linkedIn: string;
  status: string;
  totalBranches: Total;
  totalDoctors: Total;
  affiliatedArs: string[];
  specialties: string[];
  procedures: string[];
}

export interface Total {
  active: number;
  total: number;
}
