import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { userAPI } from '../api/endpoints';
import { handleAPIError } from '../utils/errorHandler';
import { AuthUser } from '../context/AuthContext';

/**
 * Example Admin User Management Page
 * Demonstrates admin-only functionality:
 * - View all users
 * - Approve alumni accounts
 * - Role-based access
 */
export const AdminUserManagementExample: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await userAPI.getAllUsers();
      setUsers(data.users);
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAlumni = async (userId: string) => {
    try {
      const { data } = await userAPI.approveAlumni(userId);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, isApproved: data.user.isApproved } : u))
      );
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    }
  };

  if (user?.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {u.role === 'alumni' && !u.isApproved && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Pending
                      </span>
                    )}
                    {u.role === 'alumni' && u.isApproved && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Approved
                      </span>
                    )}
                    {u.role !== 'alumni' && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {u.role === 'alumni' && !u.isApproved && (
                      <button
                        onClick={() => handleApproveAlumni(u._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagementExample;
