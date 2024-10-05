// src/Components/MyBookings.tsx
import { PageProps } from '@/types'
import PrimaryButton from '@/Components/PrimaryButton'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'

const MyBookings = ({ auth }: PageProps) => {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/bookings/${booking_id}`)
        console.log('Bookings:', response.data)
        setBookings(response.data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await axios.delete(`/bookings/${booking_id}`)
      setBookings(bookings.filter((booking) => booking.id !== bookingId))
    } catch (error) {
      console.error('Error canceling booking:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          My Bookings
        </h2>
      }
    >
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white shadow-md rounded-lg overflow-hidden'>
            <Head title='My Bookings' />
            <table className='min-w-full'>
              <thead>
                <tr className='bg-gray-200 text-gray-700'>
                  <th className='py-3 px-4'>Booking ID</th>
                  <th className='py-3 px-4'>Bus Name</th>
                  <th className='py-3 px-4'>Departure</th>
                  <th className='py-3 px-4'>Arrival</th>
                  <th className='py-3 px-4'>Date</th>
                  <th className='py-3 px-4'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.id} className='border-b'>
                      <td className='py-3 px-4'>{booking.id}</td>
                      <td className='py-3 px-4'>{booking.bus_name}</td>
                      <td className='py-3 px-4'>{booking.departure_stop}</td>
                      <td className='py-3 px-4'>{booking.arrival_stop}</td>
                      <td className='py-3 px-4'>
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className='py-3 px-4'>
                        <PrimaryButton
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </PrimaryButton>
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
