import React from 'react';

const UsersTable = ({ users, loading, error,page, totalPages, setPage }) => {
  const itemsPerPage = 8;
  if (loading) return <p className="text-gray-500 text-center py-6">Loading users...</p>;
  if (error) return <p className="text-red-500 text-center py-6">{error}</p>;

  return (
    <div className="overflow-x-auto px-4">
      <div className="inline-block min-w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full leading-normal text-sm text-gray-700">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">#</th>
              <th className="px-6 py-4 text-left font-semibold">Username</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Admin</th>
              <th className="px-6 py-4 text-left font-semibold">Created Date</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {(page - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user.isAdmin ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.isAdmin ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(user.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Prev
        </button>

        <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default UsersTable;
