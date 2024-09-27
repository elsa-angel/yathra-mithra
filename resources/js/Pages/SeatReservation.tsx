import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SeatAvailability from '../Components/SeatAvailability'

const SeatReservation: React.FC<{ auth: any }> = ({ auth }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          {location.pathname?.endsWith('dashboard')
            ? 'Dashboard'
            : location?.pathname?.endsWith('/seat_reservation')
              ? 'Seat Availability'
              : 'Yathra-Mithra'}
        </h2>
      }
    >
      <Head
        title={
          location.pathname?.endsWith('dashboard')
            ? 'Dashboard'
            : location?.pathname?.endsWith('/seat_reservation')
              ? 'Seat Availability'
              : 'Yathra-Mithra'
        }
      />

      <div className='py-12'>
        {location?.pathname?.endsWith('seat_reservation') && (
          <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
            <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
              <div className='p-6 text-gray-900 dark:text-gray-100'>
                <div className='overflow-x-auto mt-4'>
                  <SeatAvailability />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  )
}

export default SeatReservation
