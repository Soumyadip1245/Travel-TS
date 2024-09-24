import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Apis/Api";
import { useNotification } from "../Context/NotificationContext";
import { RegisterUser } from "../Interfaces/Interface";

const Register = () => {
  const [activeTab, setActiveTab] = useState<string>("user");
const [data,setData] = useState<RegisterUser | null>(null);
const notification = useNotification()
const navigate = useNavigate()
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(activeTab == "user") data!.role = "User"
    else data!.role = "Supplier"
    const response = await registerUser(data!)
    if(!response.ok){
      notification.showNotification(await response.text(),'warning')
      return
    }
    notification.showNotification(await response.text(),'success')
    navigate("/")
  };
  const handleForm= (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name
    setData({...data!, [name]: value})
  }
  return (
<div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100 min-h-screen dark:bg-gray-900">      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Register Account
        </h2>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mt-8">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="me-2">
              <a
                href="#"
                onClick={() => setActiveTab("user")}
                className={`inline-flex items-center justify-center p-4 border-b-2 ${
                  activeTab === "user"
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                <svg
                  className={`w-4 h-4 me-2 ${
                    activeTab === "user" ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                User
              </a>
            </li>
            <li className="me-2">
              <a
                href="#"
                onClick={() => setActiveTab("supplier")}
                className={`inline-flex items-center justify-center p-4 border-b-2 ${
                  activeTab === "supplier"
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                <svg
                  className={`w-4 h-4 me-2 ${
                    activeTab === "supplier" ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                Supplier
              </a>
            </li>
          </ul>
        </div>

        {/* Form */}
        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={data?.username}
                onChange={handleForm}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:placeholder-gray-500 dark:focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={data?.email}
                onChange={handleForm}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:placeholder-gray-500 dark:focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={data?.password}
                onChange={handleForm}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:placeholder-gray-500 dark:focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Conditionally show Supplier fields */}
          {activeTab === "supplier" && (
            <>
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Business Name
                </label>
                <div className="mt-2">
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={data?.businessName}
                    onChange={handleForm}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:placeholder-gray-500 dark:focus:ring-indigo-500"
                    required={activeTab === "supplier"}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactPersonName" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Contact Person Name
                </label>
                <div className="mt-2">
                  <input
                    id="contactPersonName"
                    name="contactPersonName"
                    type="text"
                    value={data?.contactPersonName}
                    onChange={handleForm}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:placeholder-gray-500 dark:focus:ring-indigo-500"
                    required={activeTab === "supplier"}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={data?.phoneNumber}
                    onChange={handleForm}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:placeholder-gray-500 dark:focus:ring-indigo-500"
                    required={activeTab === "supplier"}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Already a member&nbsp;?&nbsp;
          <a
            onClick={()=> navigate("/")}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300" style={{cursor: "pointer"}}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
