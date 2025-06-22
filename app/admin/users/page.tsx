'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin, isAuthenticated } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'seller' | 'client';
  createdAt: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'seller' | 'client'>('client');
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const userRole = localStorage.getItem("actingEurope_userRole");
      console.log('Client-side User Role from localStorage:', userRole);
      console.log('Sending Authorization header:', `Bearer ${userRole}`);
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${userRole}`,
        },
      });
      if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      console.log('Received data from /api/users:', data);
      // Ensure data is an array, or access the users property if it's an object
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push('/login');
      return;
    }

    fetchUsers();
  }, [router, fetchUsers]);

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'seller' | 'client') => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("actingEurope_userRole")}`,
        },
        body: JSON.stringify({ id: userId, newRole }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedUser = await response.json();
      setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("actingEurope_userRole")}`,
        },
        body: JSON.stringify({ id: userId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUsers(users.filter(user => user.id !== userId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("actingEurope_userRole")}`,
        },
        body: JSON.stringify({ email: newUserEmail, password: newUserPassword, role: newUserRole }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserRole('client');
      fetchUsers(); // Refresh the user list
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <Label htmlFor="newUserEmail">Email</Label>
            <Input
              id="newUserEmail"
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="newUserPassword">Password</Label>
            <Input
              id="newUserPassword"
              type="password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="newUserRole">Role</Label>
            <Select value={newUserRole} onValueChange={(value: 'admin' | 'seller' | 'client') => setNewUserRole(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="client" value="client">Client</SelectItem>
                <SelectItem key="seller" value="seller">Seller</SelectItem>
                <SelectItem key="admin" value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Existing Users</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <Select
                    value={user.role}
                    onValueChange={(value: 'admin' | 'seller' | 'client') => handleRoleChange(user.id, value)}
                    disabled={user.role === 'super_admin'} // Prevent changing super_admin role
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder={user.role} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="client" value="client">Client</SelectItem>
                      <SelectItem key="seller" value="seller">Seller</SelectItem>
                      <SelectItem key="admin" value="admin">Admin</SelectItem>
                      {user.role === 'super_admin' && <SelectItem key="super_admin" value="super_admin">Super Admin</SelectItem>}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  {user.role !== 'super_admin' && (
                    <Button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;