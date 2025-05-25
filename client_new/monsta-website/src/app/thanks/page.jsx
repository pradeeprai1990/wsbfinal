import React from 'react'

export default function Thank() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Thank You for Registering!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your registration has been successfully completed. We're excited to have you on board!
          </p>
          <div className="mt-8">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
