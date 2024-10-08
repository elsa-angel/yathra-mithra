import React from 'react'
import { Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import '../Components/reservation.css'
import PrimaryButton from '@/Components/PrimaryButton'

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
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-5'>
                <div className='message-box _success _failed'>
                  <div className='fail-animation'>
                    <svg
                      className='crossmark'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 52 52'
                    >
                      <circle
                        className='crossmark__circle'
                        cx='26'
                        cy='26'
                        r='25'
                        fill='none'
                      />
                      <path
                        className='crossmark__cross'
                        fill='none'
                        d='M16 16l20 20M16 36l20-20'
                      />
                    </svg>
                  </div>

                  <h2>Your payment failed</h2>
                  <p>Try again later</p>
                  <p>
                    <div>
                      {/* <Link
                          href={route('/reservation/{booking_id}')}
                          className='font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500'
                        >
                          <PrimaryButton>Go Back</PrimaryButton>
                        </Link> */}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Reservation_Failed
