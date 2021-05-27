import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import Private from "../../components/auth/Private";
import DashboardLayout from "../../components/layout/DashboardLayout";

import clientAxios from "../../config/axios";
import { useRouter } from "next/router";

const Settings = () => {
  const authContext = useContext(AuthContext);
  const { user, signoutUser, signinUser, token } = authContext;

  const router = useRouter();

  const [stripeApiKey, setStripeApiKey] = useState(
    user.stripeApiKey ? user.stripeApiKey : ""
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await clientAxios.put("/users/me", {
      stripeApiKey: stripeApiKey,
    });

    signinUser(token);
  };

  const onClickSignout = () => {
    signoutUser();
    router.push("/");
  };

  return (
    <DashboardLayout
      content={
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-white text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
                    Settings
                  </h2>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
              <form
                onSubmit={onSubmit}
                className="space-y-8 divide-y divide-gray-200"
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="stripeApiKey"
                          className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                        >
                          Stripe Secret Api Key
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="stripeApiKey"
                              id="stripeApiKey"
                              value={stripeApiKey}
                              onChange={(e) => setStripeApiKey(e.target.value)}
                              className="flex-1 block w-full focus:ring-teal-500 focus:border-teal-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-between">
                    <button
                      onClick={onClickSignout}
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Log out
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-300 to-cyan-500 hover:from-teal-200 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      }
      page="Settings"
    />
  );
};

export default Private(Settings);
