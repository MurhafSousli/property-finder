export interface Result {
  currency: string;
  deals: Trip [];
}

export interface Trip {
  transport?: string;
  departure?: string;
  arrival?: string;
  duration?: {
    h: number;
    m: number;
  };
  cost?: number;
  discount?: number;
  reference?: string;

  search?: {
    cost?: number;
    total?: number;
    heuristic?: number;
  };
}

export interface TripForm {
  from: string;
  to: string;
  filter: string;
}
