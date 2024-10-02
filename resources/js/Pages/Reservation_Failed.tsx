import React from 'react'
import { Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const Reservation_Failed: React.FC<{ auth: any }> = ({ auth }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          Reserve your tickets
        </h2>
      }
    >
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6'>
          <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg '>
            Oops!! Payment Failed
            <div>
              <Link
                href={route('dashboard')}
                className='font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500'
              >
                Return Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Reservation_Failed
