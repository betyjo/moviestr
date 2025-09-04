'use client';

import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function AdminPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', role: 'Editor' },
    { id: 2, name: 'Bob', role: 'Admin' },
    { id: 3, name: 'Charlie', role: 'Viewer' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', role: '' });

  const addUser = () => {
    if (newUser.name && newUser.role) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ name: '', role: '' });
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <NavBar />

      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-6">Admin Dashboard</h1>

        {/* Add User Form */}
        <div className="mb-8 bg-gray-800 p-4 rounded-lg border border-red-600">
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white flex-1 border border-red-500"
            />
            <input
              type="text"
              placeholder="Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white flex-1 border border-red-500"
            />
            <button
              onClick={addUser}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 font-semibold"
            >
              Add
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-red-600">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-600">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}

