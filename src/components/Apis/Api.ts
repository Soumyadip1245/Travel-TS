import { AdminStats, Destination, Package, User } from "../Interfaces/Interface";

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
    console.log(e)
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
    console.log(e)
    throw e
  }
}
export const getUsers = async (): Promise<Response> => {
  try {
    const response = await fetch('/proxy/api/Admin/users', {
      method: 'GET'
    })
    return await response;
  }
  catch (e) {
    console.log(e)
    throw e
  }
}
export const addWatchlist = async (userId: number, packageId: number): Promise<Response> => {
  try {
    const response = await fetch(`/proxy/api/Watchlist/AddWatchlist?userId=${userId}&packageId=${packageId}`, {
      method: 'GET'
    })
    return await response;
  }
  catch (e) {
    console.log(e)
    throw e
  }
}
export const adminStats = async (): Promise<AdminStats> => {
  try{
    const response = await fetch(`/proxy/api/Admin/GetCount`)
      return await response.json()
  }
  catch(e){
    throw e
  }
}
export const GetAllPackagesThatExist = async ():Promise<Package[]> => {
  try{
    const response = await fetch('/proxy/api/Package/GetAllPackagesThatExist')
    return await response.json()
  }
  catch(e){
    throw e
  }
}
export const toggleVerify = async(packageId: number, verify: boolean):Promise<Response> => {
  try{
    const response = await fetch(`/proxy/api/Package/ToggleVerification?id=${packageId}&isVerified=${verify}`,{
      method: 'POST'
    })
    return await response
  }
  catch(e){
    throw e
  }
}
export const togglePublic = async(packageId: number, publicValue: boolean):Promise<Response> => {
  try{
    const response = await fetch(`/proxy/api/Package/TogglePublic?id=${packageId}&isPublic=${publicValue}`,{
      method: 'POST'
    })
    return await response
  }
  catch(e){
    throw e
  }
}
export const toggleFeatured = async(packageId: number, feature: boolean):Promise<Response> => {
  try{
    const response = await fetch(`/proxy/api/Package/ToggleFeatured?id=${packageId}&isFeatured=${feature}`,{
      method: 'POST'
    })
    return await response
  }
  catch(e){
    throw e
  }
}