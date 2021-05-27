import { useContext, useState } from "react";
import AuthContext from "../../../context/authContext";
import Private from "../../../components/auth/Private";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import ListOfProducts from "../../../components/elements/ListOfProducts";

import Link from "next/link";
import clientAxios from "../../../config/axios";

import useSWR, { mutate } from "swr";

const fetcher = (url) => clientAxios.get(url).then((res) => res.data);

const Products = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { data, error } = useSWR(`/users/me/stripe/products`, fetcher);

  return (
    <DashboardLayout
      content={
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center content-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    Products
                  </h2>
                </div>

                <div className="flex">
                  {user.stripeApiKey ? (
                    <Link href="/dashboard/products/new">
                      <button
                        type="button"
                        className="text-white ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-300 to-cyan-500 hover:from-teal-200 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        New product
                      </button>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </header>
          {!user.stripeApiKey ? (
            <main className="mt-10">
              <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                Before uploading a product you have to{" "}
                <Link href="/dashboard/settings" className="underline">
                  connect Stripe
                </Link>
              </div>
            </main>
          ) : (
            <main className="mt-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <ListOfProducts />
              </div>
            </main>
          )}
        </div>
      }
      page="Products"
    />
  );
};

export default Private(Products);
