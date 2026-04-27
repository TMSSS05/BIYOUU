export type Category =
  | "vehicules"
  | "logements"
  | "activites-aquatiques"
  | "activites-terrestres"
  | "services-prives"
  | "packs"
  | "bonnes-adresses";

export type DocumentRequirement = "id" | "passport" | "license";

export type OfferOption = {
  id: string;
  label: string;
  price: number; // MAD
};

export type Offer = {
  slug: string;
  title: string;
  category: Category;
  location: string;
  shortDescription: string;
  description: string;
  price: number; // MAD per unit (day/night/person/session)
  unit: "jour" | "nuit" | "personne" | "session" | "service";
  images: string[];
  rating: number;
  reviews: number;
  capacity?: number;
  duration?: string;
  level?: "detente" | "famille" | "aventure";
  range?: "standard" | "premium" | "luxe";
  // vehicle
  vehicleType?: "citadine" | "suv" | "luxe" | "moto";
  airportDelivery?: boolean;
  // stay
  stayType?: "villa" | "appartement";
  hasPool?: boolean;
  seaView?: boolean;
  // service
  serviceType?: "chef" | "menage" | "garde" | "chauffeur" | "transfert";
  atHome?: boolean;
  // benefits
  highlights: string[];
  conditions: string[];
  documents: DocumentRequirement[];
  options: OfferOption[];
  available: boolean;
  supplierId?: string;
};

export type Supplier = {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  notes: string;
  offerSlugs: string[];
};

export type CartItem = {
  id: string; // unique per add
  slug: string;
  title: string;
  image: string;
  category: Category;
  unit: Offer["unit"];
  unitPrice: number;
  quantity: number; // days/nights/persons
  startDate?: string; // ISO
  endDate?: string; // ISO
  options: OfferOption[];
  guestCount: number;
};

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  language: string;
  guestCount: number;
  specialRequest?: string;
};

export type Reservation = {
  id: string;
  reference: string;
  createdAt: string;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  documents: { type: DocumentRequirement; name: string }[];
};
