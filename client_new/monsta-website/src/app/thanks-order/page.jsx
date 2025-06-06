'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

const ThankYouPage = () => {
 

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Thank You for Your Order!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your order has been successfully placed and is being processed.
          </p>
        </div>

        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What's Next?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-green-500">✓</span>
              <p className="ml-3 text-gray-600">
                You will receive an order confirmation email shortly
              </p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-green-500">✓</span>
              <p className="ml-3 text-gray-600">
                Our team will process your order and prepare it for shipping
              </p>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-green-500">✓</span>
              <p className="ml-3 text-gray-600">
                You can track your order status in your account dashboard
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
