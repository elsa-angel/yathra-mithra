import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import PrimaryButton from '@/Components/PrimaryButton'

const ScheduleList = ({
  auth,
  schedules
}: PageProps & { schedules: any[] }) => {
  return (
    // <AuthenticatedLayout
    //   user={auth.user}
    //   header={
    //     <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
    //       Booking Details
    //     </h2>
    //   }
    // >
    //   <Head title='Booking Details' />
    <div className='py-12'>
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
          <div className='p-6 text-gray-900 dark:text-gray-100'>
            <div className='overflow-x-auto mt-4'>
              <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
                <thead>
                  <tr className='bg-gray-200 text-gray-700 uppercase text-xs leading-normal'>
                    <th className='py-3 px-4 border-b border-gray-200 text-left'>
                      Departure
                    </th>
                    <th className='py-3 px-4 border-b border-gray-200 text-left'>
                      Arrival
                    </th>
                    <th className='py-3 px-4 border-b border-gray-200 text-left'>
                      Total Duration
                    </th>
                    <th className='py-3 px-4 border-b border-gray-200 text-left'>
                      Fare
                    </th>
                    <th className='py-3 px-4 border-b border-gray-200 text-left'>
                      Book
                    </th>
                  </tr>
                </thead>
                <tbody className='text-gray-700 text-sm font-light'>
                  {schedules?.length > 0 ? (
                    schedules.map((schedule, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                      >
                        <td className='py-3 px-4 border-b border-gray-200'>
                          {schedule.from}
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200'>
                          {schedule.to}
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200'>
                          {schedule.duration}
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200'>
                          ₹{schedule.fare}
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200'>
                          <PrimaryButton className='ms-4'>
                            Book Now
                          </PrimaryButton>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className='py-3 px-4 text-center border-b border-gray-200'
                      >
                        No schedules found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    //{' '}
    //</AuthenticatedLayout>
  )
}

export default ScheduleList
