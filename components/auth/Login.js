import { Magic } from "magic-sdk";
import { useState } from "react";

import AuthContext from "../../context/authContext";
import { useContext } from "react";

import { useRouter } from "next/router";

export default function Login() {
  const authContext = useContext(AuthContext);
  const { signinUser } = authContext;

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY);
    const jwt = await m.auth.loginWithMagicLink({ email });
    if (jwt) {
      signinUser(jwt);
    }

    router.push("/dashboard/products");
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        action="#"
        className="sm:max-w-xl sm:mx-auto lg:mx-0"
      >
        <div className="sm:flex">
          <div className="min-w-0 flex-1">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            {loading ? (
              <button
                type="button"
                className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
              >
                Loading
              </button>
            ) : (
              <button
                type="submit"
                className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
              >
                Go to dashboard
              </button>
            )}
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-300 sm:mt-4">Automape is free.</p>
      </form>
    </>
  );
}
