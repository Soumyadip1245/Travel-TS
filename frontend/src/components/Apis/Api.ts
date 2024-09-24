import { AddPackageWithFilesPayload, AdditionalDetail, AdminStats, Booking, BookingCreate, Destination, Package, RegisterUser, SupplierChart, SupplierStats, UploadItinery, User, UserPackage } from "../Interfaces/Interface";

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`/proxy/api/Admin/FindUserById?id=${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
export const login = async (email: string, password: string): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Account/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });



    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const fetchSupplier = async (): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Admin/suppliers`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const lockUser = async (userId: number, locked: boolean): Promise<Response> => {
  try {
    const response = await fetch('/proxy/api/Admin/toggle-lock', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        isLocked: locked
      })
    })
    return response;
  }
  catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
export const sendVerification = async (user: User): Promise<Response> => {
  const ob = {
    email: user.email,
    userName: user.username,
    signUrl: `http://localhost:5173/agreement/${user.id}`
  }
  try {
    const response = await fetch(`/proxy/api/Account/SendVerificationEmail?email=${ob.email}&userName=${ob.userName}&signUrl=${ob.signUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response;
  }
  catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
export const agreement = async (user: User): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Admin/update-supplier`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id,
        isAgreement: true
      })
    })
    return response;
  }
  catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
export const getDestinations = async (): Promise<Destination[]> => {
  try {
    const response = await fetch('/proxy/api/Destination/GetAllDestinationDetails', {
      method: 'GET'
    })
    return await response.json();
  }
  catch (e) {

    throw e
  }
}
export const getAllVerifiedPackages = async (): Promise<Package[]> => {
  try {
    const response = await fetch('/proxy/api/Package/GetAllVerifiedPackages', {
      method: 'GET'
    })
    return await response.json();
  }
  catch (e) {

    throw e
  }
}
export const getUsers = async (): Promise<Response> => {
  try {
    const response = await fetch('/proxy/api/Admin/users', {
      method: 'GET'
    })
    return response;
  }
  catch (e) {

    throw e
  }
}
export const addWatchlist = async (userId: number, packageId: number): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Watchlist/AddWatchlist?userId=${userId}&packageId=${packageId}`, {
      method: 'GET'
    })
    return response;
  }
  catch (e) {

    throw e
  }
}
export const removeWatchlist = async (userId: number, packageId: number): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Watchlist/RemoveWatchlist?userId=${userId}&packageId=${packageId}`, {
      method: 'GET'
    })
    return response;
  }
  catch (e) {

    throw e
  }
}
export const adminStats = async (): Promise<AdminStats> => {
  try {
    const response = await fetch(`/proxy/api/Admin/GetCount`)
    return await response.json()
  }
  catch (e) {
    throw e
  }
}
export const supplierStats = async (supplierId: number): Promise<SupplierStats> => {
  try {
    const response = await fetch(`/proxy/api/Supplier/SupplierDashboardData/${supplierId}`)
    return await response.json()
  }
  catch (e) {
    throw e
  }
}
export const supplierChart = async (supplierId: number): Promise<SupplierChart[]> => {
  try {
    const response = await fetch(`/proxy/api/Supplier/SupplierDestinationPackageCounts/${supplierId}`)
    return await response.json()
  }
  catch (e) {
    throw e
  }
}
export const GetAllPackagesThatExist = async (): Promise<Package[]> => {
  try {
    const response = await fetch('/proxy/api/Package/GetAllPackagesThatExist')
    return await response.json()
  }
  catch (e) {
    throw e
  }
}
export const GetAllPackagesForSupplier = async (supplierId: number): Promise<Package[]> => {
  try {
    const response = await fetch(`/proxy/api/Package/GetAllPackages?supplierId=${supplierId}`)
    return await response.json()
  }
  catch (e) {
    throw e
  }
}
export const toggleVerify = async (packageId: number, verify: boolean): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Package/ToggleVerification?id=${packageId}&isVerified=${verify}`, {
      method: 'POST'
    })
    return response
  }
  catch (e) {
    throw e
  }
}
export const togglePublic = async (packageId: number, publicValue: boolean): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Package/TogglePublic?id=${packageId}&isPublic=${publicValue}`, {
      method: 'POST'
    })
    return response
  }
  catch (e) {
    throw e
  }
}
export const toggleFeatured = async (packageId: number, feature: boolean): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Package/ToggleFeatured?id=${packageId}&isFeatured=${feature}`, {
      method: 'POST'
    })
    return response
  }
  catch (e) {
    throw e
  }
}
export const fetchBookings = async (userId?: number): Promise<Response> => {
  try {
    if (userId) {
      console.log(userId)
      const response = await fetch(`/proxy/api/Booking/GetBusiness?userId=${userId}`)
      return response
    }
    else {
      const response = await fetch("/proxy/api/Booking/GetBusinessForAdmin")
      return response
    }
  }
  catch (e: any) {
    throw e
  }
}
export const fetchBookingsForUser = async (userId?: number): Promise<Response> => {
  try {
      console.log(userId)
      const response = await fetch(`/proxy/api/Booking/GetBusinessForUser?userId=${userId}`)
      return response
   
  }
  catch (e: any) {
    throw e
  }
}
export const rejectBooking = async (bookingId: number): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Booking/RejectBooking?id=${bookingId}`)
    return response
  }
  catch (e: any) {
    throw e
  }
}
export const sendPayment = async (amount: number, bookingId: number, name: string, email: string): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Payment/createPaymentLink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify({
        amount: amount,
        id: bookingId,
        customerName: name,
        customerEmail: email
      })
    })
    console.log(response)
    return response
  }
  catch (e: any) {
    throw e
  }
}
export const registerUser = async (data: RegisterUser): Promise<Response> => {
  try {
    const response = fetch("/proxy/api/Account/Register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(data)
    })
    return response
  }
  catch (e: any) {
    throw e
  }
}
export const uploadImageWithfile = async (packageId: number, image: File): Promise<Response> => {
  try {
    const formData = new FormData();
    formData.append('images', image);
    formData.append('packageId', packageId.toString());

    const response = await fetch("/proxy/api/Package/UploadImages", {
      method: 'POST',
      headers: {
        'Accept': '*/*'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (e: any) {
    console.error('Upload failed:', e);
    throw e;
  }
};
export const deleteImage = async (path: string): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Package/DeleteImage?path=${path}`)
    return response
  }
  catch (e: any) {
    throw e
  }
}
export const addPackageAdditionalDetails = async (data: AdditionalDetail): Promise<Response> => {
  try {

    const response = fetch('/proxy/api/Package/AddPackageAdditionalDetails', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(data)
    })
    return response
  }
  catch (e: any) {
    throw e
  }
}
export const addPackageWithFiles = async (ob: AddPackageWithFilesPayload): Promise<Response> => {
  try {
    const formData = new FormData();
    formData.append('Name', ob.name);
    formData.append('Description', ob.description || '');
    formData.append('Price', ob.price.toString());
    formData.append('AvailableCount', ob.availableCount.toString());
    formData.append('DestinationName', ob.destinationName);
    formData.append('SupplierId', ob.supplierId.toString());
    if (ob.imageFile) {
      formData.append('imageFile', ob.imageFile);
    }
    if (ob.pdfFile) {
      formData.append('pdfFile', ob.pdfFile);
    }
    const response = await fetch('/proxy/api/Package/AddPackageWithFiles', {
      method: 'POST',
      headers: {
        'accept': '*/*',
      },
      body: formData
    });
    return response
  }
  catch (e: any) {
    throw e
  }
}
export const fetchDestinations = async (): Promise<Destination[]> => {
  try {
    const response = await fetch('/proxy/api/Destination/GetAllDestinationDetails')
    return response.json()
  }
  catch (e: any) {
    throw e
  }
}
export const uploadExcel = async (file: File, supplierId: number): Promise<Response> => {
  try {
    const formData = new FormData();
    formData.append("file", file)
    const response = await fetch(`/proxy/api/PackageUpload/UploadPackages?supplierId=${supplierId}`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
      },
      body: (formData)
    })
    return response
  }
  catch (e: any) {
    throw e
  }
}
export const adminMonthly = async (): Promise<number[]> => {
  try {
    const response = await fetch('/proxy/api/Admin/GetMonthlyBookings')
    return response.json()
  }
  catch (e: any) {
    throw e
  }
}
export const fetchPackagesForuser = async (userId: number): Promise<UserPackage> => {
  try {
    const response = await fetch(`/proxy/api/Package/GetPackagesForUser?userId=${userId}`)
    return response.json()
  }
  catch (e: any) {
    throw e
  }
}
export const interactPackage = async (userId: number, destinationId: number): Promise<Response> => {

  try {
    const response = await fetch(`/proxy//api/PackageInteraction/InteractWithPackage?userId=${userId}&destinationId=${destinationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': '*/*'
      }
    })
    return response;
  }
  catch (e: any) {
    throw e
  }
}
export const getAvailableCountForPackage = async (packageId: number): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Package/GetAvailableCountForPackage?packageId=${packageId}`)
    return response
  }
  catch (e: any) {
    throw e
  }
}
export const createBooking = async (booking: BookingCreate): Promise<Response> => {
  try {
    const response = await fetch("/proxy/api/Booking/createBooking", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
    return response
  }
  catch (e: any) {
    throw e
  }
}
export const fetchItinery = async (bookingId?: number): Promise<UploadItinery[]> => {
  try {
      const response = await fetch(`/proxy/api/UploadItinery/GetItineryForBooking?bookingId=${bookingId}`)
      return response.json()
   
  }
  catch (e: any) {
    throw e
  }
}
export const fetchBookingbyId = async (bookingId?: number): Promise<Booking> => {
  try {
      const response = await fetch(`/proxy/api/Booking/GetBookingWithId?id=${bookingId}`)
      return response.json()
   
  }
  catch (e: any) {
    throw e
  }
}
export const uploadItinery = async(bookingId: number, fileName: string,type: string, file: File):Promise<Response>=>{
  try{
    const formData = new FormData();
    formData.append('pdfFile', file);
    const response = await fetch(`/proxy/api/UploadItinery/UploadItinery?bookingId=${bookingId}&fileName=${fileName}&type=${type}`, {
      method: 'POST',
      body: formData,
  });
  return response
  }
  catch(e:any){
    throw e
  }
}