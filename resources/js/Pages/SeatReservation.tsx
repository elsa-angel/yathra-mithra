import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SeatAvailability from '../Components/SeatAvailability'
import { useLocation } from 'react-router-dom'

const SeatReservation: React.FC<{ auth: any }> = ({ auth }) => {
  const location = useLocation()

  return (
    // <AuthenticatedLayout
    //   user={auth.user}
    //   header={
    //     <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
    //       {location.pathname?.endsWith('dashboard')
    //         ? 'Dashboard'
    //         : location?.pathname?.endsWith('seat_reservation')
    //           ? 'Seat Availability'
    //           : 'Yathra-Mithra'}
    //     </h2>
    //   }
    // >
    //   <Head
    //     title={
    //       location.pathname?.endsWith('dashboard')
    //         ? 'Dashboard'
    //         : location?.pathname?.endsWith('/seat_reservation')
    //           ? 'Seat Availability'
    //           : 'Yathra-Mithra'
    //     }
    //   />

    <div className=''>
      {location?.pathname?.endsWith('seat_reservation') && (
        <div className=''>
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
    // </AuthenticatedLayout>
  )
}

export default SeatReservation
