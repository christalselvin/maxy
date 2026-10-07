import { useEffect, useState } from "react";
import api from "../api/api";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  business_category: string;
  company_name?: string;
  created_at: string;
}

const User = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get<Contact[]>("/contacts");
      setContacts(res.data);
    } catch (err: any) {
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading contacts...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Contact Requests</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="text-center">
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.email}</td>
                <td className="border p-2">{c.phone_number}</td>
                <td className="border p-2">{c.business_category}</td>
                <td className="border p-2">{c.company_name || "-"}</td>
                <td className="border p-2">{c.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
