import { Link, Head } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton' // Adjust the import path if necessary

const BookingDetails = ({ auth }: PageProps) => {
  // Dummy data for demonstration
  const details = [
    {
      departure: 'City A',
      duration: '2h 30m',
      arrival: 'City B',
      fare: '$100'
    },
    {
      departure: 'City B',
      duration: '1h 45m',
      arrival: 'City C',
      fare: '$80'
    },
    {
      departure: 'City C',
      duration: '3h 15m',
      arrival: 'City D',
      fare: '$120'
    },
    {
      departure: 'City A',
      duration: '2h 30m',
      arrival: 'City B',
      fare: '$100'
    },
    {
      departure: 'City B',
      duration: '1h 45m',
      arrival: 'City C',
      fare: '$80'
    },
    {
      departure: 'City C',
      duration: '3h 15m',
      arrival: 'City D',
      fare: '$120'
    },
    {
      departure: 'City A',
      duration: '2h 30m',
      arrival: 'City B',
      fare: '$100'
    },
    {
      departure: 'City B',
      duration: '1h 45m',
      arrival: 'City C',
      fare: '$80'
    },
    {
      departure: 'City C',
      duration: '3h 15m',
      arrival: 'City D',
      fare: '$120'
    }
  ]

  return (
    <>
      <Head title='Booking Details' />

      <div className='relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900'>
        <div className='sm:fixed sm:top-0 sm:right-0 p-6 text-end'>
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className='font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500'
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={route('login')}
                className='font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500'
              >
                Log in
              </Link>

              <Link
                href={route('register')}
                className='ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500'
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className='max-w-7xl mx-auto p-6 lg:p-8'>
          <h2 className='text-2xl font-bold mb-6'>Booking Details</h2>
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='overflow-x-auto mt-4'>
                <table className='w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden'>
                  <thead>
                    <tr className='bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs leading-normal'>
                      <th className='py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left'>
                        Departure
                      </th>
                      <th className='py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left'>
                        Arrival
                      </th>
                      <th className='py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left'>
                        Total Duration
                      </th>
                      <th className='py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left'>
                        Fare
                      </th>
                      <th className='py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-left'>
                        Book
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-gray-700 dark:text-gray-300 text-sm font-light'>
                    {details.map((detail, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? 'bg-gray-100 dark:bg-gray-800'
                            : 'bg-white dark:bg-gray-900'
                        }
                      >
                        <td className='py-3 px-4 border-b border-gray-200 dark:border-gray-700'>
                          {detail.departure}
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200 dark:border-gray-700'>
                          {detail.arrival}
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200 dark:border-gray-700'>
                          {detail.duration}
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200 dark:border-gray-700'>
                          {detail.fare}
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200 dark:border-gray-700'>
                          <PrimaryButton className='ms-4'>
                            Book Now
                          </PrimaryButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-dots-darker {
          background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
        }
        @media (prefers-color-scheme: dark) {
          .dark\\:bg-dots-lighter {
            background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
          }
        }
      `}</style>
    </>
  )
}

export default BookingDetails
