import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { agreement, fetchUserById } from '../Apis/Api';
import { useNotification } from '../Context/NotificationContext';
import { User } from '../Interfaces/Interface';

const Agreement = () => {
    const { id } = useParams<string>();
    const [user, setUser] = useState<User|null>(null);
    const notification = useNotification();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data: User = await fetchUserById(Number(id));
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                notification.showNotification("Failed to fetch user data", "error");
            }
        };
        getUserData();
    }, [id, notification]);

    const signAgreement = async () => {
        if (!user) {
            notification.showNotification("User data is not available", "error");
            return;
        }
        try {
            const response = await agreement(user);
            if (!response.ok) {
                notification.showNotification("Contact Admins", "error");
                return;
            }
            setUser({ ...user!, isAgreement: true });
            notification.showNotification(await response.text(), "success");
        } catch (error) {
            console.error("Error signing agreement:", error);
            notification.showNotification("Failed to sign agreement", "error");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-white max-w-3xl w-full p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Supplier Agreement
                </h1>

                <p className="text-lg leading-relaxed text-gray-700">
                    This Agreement is made between <strong>Tafri Travels</strong> and <strong>{user?.username}</strong>, representing <strong>{user?.businessName}</strong>.
                    The Supplier agrees to provide tour packages via the Tafri Travels platform, and the Company agrees to compensate the Supplier as detailed below.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                    Pricing Criteria
                </h2>
                <table className="w-full table-auto text-left text-gray-700">
                    <thead className="border-b bg-gray-200">
                        <tr>
                            <th className="py-3 px-4">Price Range</th>
                            <th className="py-3 px-4">Percentage Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-3 px-4">Less than ₹25,000</td>
                            <td className="py-3 px-4">12%</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 px-4">₹25,000 to ₹49,999</td>
                            <td className="py-3 px-4">10%</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 px-4">₹50,000 to ₹99,999</td>
                            <td className="py-3 px-4">8%</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 px-4">₹100,000 to ₹199,999</td>
                            <td className="py-3 px-4">5%</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4">₹200,000 and above</td>
                            <td className="py-3 px-4">2%</td>
                        </tr>
                    </tbody>
                </table>

                <p className="text-lg leading-relaxed text-gray-700 mt-6">
                    Both parties agree to adhere to the terms of this agreement. Any modifications must be made in writing and signed by authorized representatives of both parties.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 mt-4">
                    This agreement will commence on <strong>{user?.registrationDate}</strong> and will remain in effect until terminated by either party according to the terms specified.
                </p>

                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <p className="text-2xl font-signature text-gray-800">
                            {user?.isAgreement ? user?.username : ''}
                        </p>
                        <p className="text-gray-600">{user?.username}</p>
                        <p className="text-gray-600">{user?.businessName}</p>
                    </div>

                    <div>
                        <p className="text-2xl font-signature text-gray-800">Tafri Travels</p>
                        <p className="text-gray-600">Tafri Travels</p>
                        <p className="text-gray-600">Admin</p>
                    </div>
                </div>

                {!user?.isAgreement && (
                    <button
                        className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition"
                        onClick={signAgreement}
                    >
                        Sign Agreement
                    </button>
                )}
            </div>
        </div>
    );
};

export default Agreement;
