import React from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

interface BookingDetailsProps {
  boatId: string
  from: string
  to: string
  time: string
  totalAmount: string
  auth: { user: any }
}

const Payment: React.FC<BookingDetailsProps> = ({
  boatId,
  from,
  to,
  time,
  totalAmount,
  auth
}) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          Booking Details
        </h2>
      }
    >
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6'>
          <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
            <Head title='Payment' />
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span className='font-semibold'>BoatID:</span>
                <span>{boatId}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-semibold'>From:</span>
                <span>{from}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-semibold'>To:</span>
                <span>{to}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-semibold'>Time:</span>
                <span>{time}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-semibold'>Total Amount:</span>
                <span>{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Payment
