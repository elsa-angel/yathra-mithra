// src/Components/MyBookings.tsx
import { PageProps } from '@/types'
import PrimaryButton from '@/Components/PrimaryButton'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import ConfirmDialogue from '@/Components/ConfirmDialogue'

const MyBookings = ({ auth }: PageProps) => {
  const [bookings, setBookings] = useState<any[]>([])
  // const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [bookingIdToCancel, setBookingIdToCancel] = useState<number | null>(
    null
  )

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/reservations`)
        console.log('Bookings:', response.data)
        setBookings(response.data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    // Fetch bookings initially
    fetchBookings()

    // Set up interval to fetch bookings every minute
    const intervalId = setInterval(fetchBookings, 60000) // 60000 ms = 1 minute

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId)
  }, [])

  const handleCancelBooking = async (bookingId: number) => {
    setBookingIdToCancel(bookingId) // Set the booking ID to cancel
    setShowConfirm(true) // Show confirmation dialog
  }
  const handleConfirmCancellation = async () => {
    if (bookingIdToCancel) {
      try {
        await axios.delete(`/reservations/${bookingIdToCancel}`)
        setBookings(
          bookings.filter((booking) => booking.id !== bookingIdToCancel)
        )
        console.log('Booking cancelled')
      } catch (error) {
        console.error('Error canceling booking:', error)
      } finally {
        setShowConfirm(false) // Close the dialog
        setBookingIdToCancel(null) // Reset booking ID
      }
    }
  }

  const handleCancel = () => {
    setShowConfirm(false) // Close the dialog without cancellation
    setBookingIdToCancel(null) // Reset booking ID
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          My Bookings
        </h2>
      }
    >
      {showConfirm && (
        <ConfirmDialogue
          onConfirm={handleConfirmCancellation}
          onCancel={handleCancel}
        />
      )}
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6'>
          <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col sm:flex-row items-start'>
            {' '}
            <Head title='My Bookings' />
            <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
              <thead>
                <tr className='bg-gray-200 text-gray-700 uppercase text-xs leading-normal'>
                  <th className='py-3 px-4 border-b border-gray-200 text-left'>
                    Booking ID
                  </th>
                  <th className='py-3 px-4 border-b border-gray-200 text-left'>
                    Bus Name
                  </th>
                  <th className='py-3 px-4 border-b border-gray-200 text-left'>
                    Departure
                  </th>
                  <th className='py-3 px-4 border-b border-gray-200 text-left'>
                    Arrival
                  </th>
                  <th className='py-3 px-4 border-b border-gray-200 text-left'>
                    Date
                  </th>
                  <th className='py-3 px-4 border-b border-gray-200 text-left'>
                    Amount
                  </th>
                  <th className='py-3 px-4 border-b border-gray-200 text-left'>
                    Status
                  </th>
                  <th className='py-3 px-4 border-b border-gray-200 text-left'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='text-gray-700 text-sm font-light'>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr
                      // key={booking.id}
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                    >
                      <td className='py-3 px-4 border-b border-gray-200'>
                        {booking.id}
                      </td>
                      <td className='py-3 px-4 border-b border-gray-200'>
                        {booking.schedule.bus.bus_name}
                      </td>
                      <td className='py-3 px-4 border-b border-gray-200'>
                        {booking.departure_stop.charAt(0).toUpperCase() +
                          booking.departure_stop.slice(1).toLowerCase()}
                        &nbsp; ({booking.departure_time})
                      </td>
                      <td className='py-3 px-4 border-b border-gray-200'>
                        {booking.arrival_stop.charAt(0).toUpperCase() +
                          booking.arrival_stop.slice(1).toLowerCase()}
                        &nbsp; ({booking.arrival_time})
                      </td>
                      <td className='py-3 px-4 border-b border-gray-200'>
                        {/* {new Date(booking.date).toLocaleDateString()} */}
                        {booking.booking_date}
                      </td>
                      <td className='py-3 px-4 border-b border-gray-200'>
                        {booking.amount}
                      </td>
                      <td className='py-3 px-4 border-b border-gray-200'>
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1).toLowerCase()}
                      </td>
                      <td className='py-3 px-4 border-b border-gray-200'>
                        {booking.status === 'paid' ? (
                          <PrimaryButton
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </PrimaryButton>
                        ) : (
                          '--'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className='text-center py-3'>
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default MyBookings
