export default function SignUpPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 border border-red-600">
        <h1 className="text-2xl font-bold mb-6 text-red-500 text-center">Sign Up</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 rounded bg-gray-700 border border-red-500 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700 border border-red-500 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 border border-red-500 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

