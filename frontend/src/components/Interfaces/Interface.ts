import { ReactNode } from "react";

export interface MenuInterface {
  label: string;
  icon?: React.ReactElement;
  navigate: React.ReactElement;
}
export interface User {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
  roleId: number;
  businessName?: string | null;
  contactPerson?: string | null;
  phone?: string | null;
  accountId?: string | null;
  isLocked: boolean;
  autoRegistrationCompleted: boolean;
  isAgreement: boolean;
  registrationDate: string;
  role?: Role | null;
}

export interface Role {
  id: number;
  name: string;
  user: User[];
}

export interface Package {
  id: number;
  name: string;
  description?: string;
  price: number;
  availableCount: number;
  supplierId?: number;
  destinationId: number;
  isPublic: boolean;
  isArchived: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  flightBooking: boolean;
  accommodation: boolean;
  sightseeing: boolean;
  luxuryFacilities: boolean;
  imagePath?: string;
  pdfPath?: string;
  percentageIncome: number;
  supplier?: User;
  destination?: Destination;
  watchlists?: Watchlist[];
  payments?: Payment[];
  flightDetails?: FlightDetail[];
  accommodationDetails?: AccommodationDetail[];
  luxuryFacility?: LuxuryFacility[];
  sightseeingDetails?: SightseeingDetail[];
  images?: PackageImage[];
  bookings?: Booking[];
}
export interface AccommodationDetail {
  id: number;
  hotelName: string;
  roomType?: string;
  checkInDate?: string;
  checkOutDate?: string;
  priority: number;
  packageId: number;
  package?: Package;
}
export interface Booking {
  bookingId: number;
  packageId: number;
  userId: number;
  supplierId: number;
  bookingDate: string;
  startDate: string;
  endDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  totalPrice: number;
  supplierPaymentAmount: number;
  specialRequests?: string;
  paymentId?: number;
  status: string;
  confirmationNumber?: string;
  isCustomerDetailsVisible: boolean;
  package?: Package;
  user?: User;
  supplier?: User;
  payment?: Payment;
  travelerInfos?: TravelerInfo[];
  itinaryList?: UploadItinery[];
}
export interface Destination {
  id: number;
  name: string;
  country: string;
  description?: string;
  createdAt: string;
  packages?: Package[];
  userPackageInteraction?: UserPackageInteraction[];
}
export interface FlightDetail {
  id: number;
  flightName: string;
  flightNumber?: string;
  departureDate?: string;
  arrivalDate?: string;
  priority: number;
  packageId: number;
  package?: Package;
}
export interface LuxuryFacility {
  id: number;
  facilityName: string;
  priority: number;
  packageId: number;
  package?: Package;
}
export interface PackageImage {
  id: number;
  packageId: number;
  imagePath: string;
  package?: Package;
}
export interface Payment {
  id: number;
  bookingId: number;
  paymentMethod: string;
  amount: number;
  transactionId: string;
  paymentStatus: string;
  booking?: Booking;
}
export interface SightseeingDetail {
  id: number;
  tourName: string;
  tourDescription?: string;
  priority: number;
  packageId: number;
  package?: Package;
}
export interface TravelerInfo {
  id: number;
  bookingId?: number;
  fullName: string;
  dateOfBirth: string;
  passportNumber: string;
  booking?: Booking;
}
export interface UploadItinery {
  id: number;
  bookingId: number;
  path: string;
  flightBooking: boolean;
  accommodation: boolean;
  sightseeing: boolean;
  luxuryFacilities: boolean;
  fileName: string;
  booking?: Booking;
}
export interface UserPackageInteraction {
  id: number;
  userId: number;
  destinationId: number;
  interactionCount: number;
  updatedAt: string;
  user?: User;
  destination?: Destination;
}
export interface Watchlist {
  id: number;
  userId: number;
  packageId: number;
  user?: User;
  package?: Package;
}
export interface AdminStats {
  totalSuppliers: number;
  totalUsers: number;
  totalPackages: number;
  totalBookings: number;
}
export interface SupplierStats {
  totalPackages: number;
  totalBookings: number;
  totalUsers: number;
  approvedPackagesCount: number;
}
export interface RegisterUser {
  email: string;
  password: string;
  username: string;
  role: string;
  businessName?: string;
  contactPersonName?: string;
  phoneNumber?: string
}
export interface ShowPackage {
  showPackage: (pkge: Package) => void
}
export interface PackageData {
  pkg: Package;
  refetchPackages: () => void;
  title?: string;
  icon?: ReactNode;
  add?: boolean
  isBooking?: boolean;
}
export interface AdditionalDetail {
  packageId: number;
  flightDetails: any[

  ];
  accommodationDetails: any[

  ];
  luxuryFacilities: any[

  ];
  sightseeingDetails: any[

  ]
}
export interface AddPackageWithFilesPayload {
  name: string;
  description?: string;
  price: number;
  availableCount: number;
  destinationName: string;
  supplierId: number;
  imageFile?: File;
  pdfFile?: File;
}
export interface SupplierChart {
  destinationName: string;
  packageCount: number;
}
export interface UserPackage {
  allVerifiedPublicPackages: Package[];
  suggestedPackages: Package[];
  wishlistPackages: Package[]
}
export interface TravelerCreate {
  fullName: string;
  dateOfBirth: string;
  passportNumber: string;
}

export interface BookingCreate {
  packageId: number;
  userId: number;
  supplierId: number;
  packageName: string;
  destination: string;
  price: number;
  travellers: TravelerCreate[];
  startDate: string;
  endDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  totalPrice: number;
  supplierPaymentAmount: number;
  specialRequests: string;
}
export interface UploadItinery {
  id: number;
  bookingId: number;
  path: string;
  flightBooking: boolean
  accomodation: boolean
  sightseeing: boolean;
  luxuryFacilities: boolean;
  fileName: string;
  booking?: Booking;
}

