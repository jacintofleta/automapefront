import { useState } from "react";
import Private from "../../../components/auth/Private";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import Loading from "../../../components/layout/Loading";
import Notification from "../../../components/elements/Notification";

import { XIcon } from "@heroicons/react/solid";

import Link from "next/link";
import clientAxios from "../../../config/axios";
import useSWR, { mutate } from "swr";

import { useRouter } from "next/router";

const fetcher = (url) => clientAxios.get(url).then((res) => res.data);

const NewProduct = () => {
  const router = useRouter();

  const { data, error } = useSWR(`/users/me/stripe/products`, fetcher);

  const [message, setMessage] = useState("");
  const [stripeId, setStripeId] = useState("");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");

  const [notification, setNotification] = useState({
    title: "",
    text: "",
    type: "",
    showing: false,
  });

  if (error) {
    return <>error</>;
  }

  if (!data) {
    return <Loading />;
  }

  let stripeProducts = data.data;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!message || !stripeId || !file || !name) {
      setNotification({
        title: "Not that fast",
        text: "Please complete all fields",
        type: "error",
        showing: true,
      });
      return;
    }

    const data = new FormData();
    data.append("files", file);

    let responseUploadFile = await clientAxios.post("/upload", data);

    let dataProduct = {
      file: responseUploadFile.data[0]._id,
      stripeId,
      message,
      name,
    };

    let response = await clientAxios.post("/products/me/create", dataProduct);

    router.push("/dashboard/products");
  };

  return (
    <DashboardLayout
      content={
        <div className="py-10">
          <Notification
            title={notification.title}
            text={notification.text}
            type={notification.type}
            showing={notification.showing}
            setNotification={setNotification}
          />
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center content-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    New product
                  </h2>
                </div>
              </div>
            </div>
          </header>

          <main className="mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <form
                encType="multipart/form-data"
                onSubmit={onSubmit}
                className="space-y-8 divide-y divide-gray-200"
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div>
                    <div className="mt-6 space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="stripeProduct"
                          className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                        >
                          Select Stripe Product
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="stripeProduct"
                            name="stripeProduct"
                            onChange={(e) => {
                              setStripeId(e.target.value);
                              setName(
                                stripeProducts.filter(
                                  (product) => product.id === e.target.value
                                )[0]?.name
                              );
                            }}
                            className="max-w-lg block focus:ring-teal-500 focus:border-teal-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="">Select Stripe product</option>
                            {stripeProducts.map((product) => (
                              <option
                                key={product.id}
                                value={product.id}
                                name={product.name}
                              >
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                        >
                          Email message
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="max-w-lg shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300 rounded-md"
                          />
                          <p className="mt-2 text-sm text-gray-300">
                            We'll send an email for every purchase
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="cover_photo"
                        className="block text-sm font-medium text-white sm:mt-px sm:pt-2"
                      >
                        File
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        {!file ? (
                          <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-300"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-300">
                                <label
                                  htmlFor="file-upload"
                                  className="p-1 relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={(e) => setFile(e.target.files[0])}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-300">
                                Up to 10MB
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-teal-500 mx-auto flex inline">
                            {file.name}{" "}
                            <span
                              className="cursor-pointer ml-3"
                              onClick={() => setFile("")}
                            >
                              <XIcon className="w-6 h-6" />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <Link href="/dashboard/products">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Cancel
                      </button>
                    </Link>
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
      page="Products"
    />
  );
};

export default Private(NewProduct);
