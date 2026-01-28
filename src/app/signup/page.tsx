"use client";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-gray-50 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Sign Up</h1>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
