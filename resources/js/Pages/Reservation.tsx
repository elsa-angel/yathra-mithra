import { Head, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SeatAvailability from '@/Components/SeatAvailability'
import Payment from '@/Components/Payment'
import axios from 'axios'

import { useState } from 'react'

export default function Reservation({ auth }: PageProps) {
  // Use the usePage hook to access the props
  const { props } = usePage()

  // Extract the booking_id from props
  const { booking_id } = props

  // Fetch Booking API

  const [bookingData, setBookingData] = useState({})
  const [isBookingLoading, setBookingLoading] = useState(true)

  const [totalSeats, setTotalSeats] = useState(0)

  const getBookingDetails = async () => {
    try {
      const booking = await axios.get(`/bookings/${booking_id}`)
      setTotalSeats(booking.data?.schedule?.bus?.num_seats)
      setBookingData(booking.data)
      setBookingLoading(false)
    } catch (error) {
      console.error('Error occured', error)
    }
  }

  isBookingLoading && getBookingDetails()

  // Stepper Components handling
  const [currentStep, setCurrentStep] = useState(1)

  const updateCurrentStep = (step: number) => {
    setCurrentStep(step)
  }

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
          <Head title='Reservation' />
          {isBookingLoading && <h1>Loading...</h1>}
          {currentStep == 1 && !isBookingLoading && (
            <SeatAvailability
              updateCurrentStep={updateCurrentStep}
              bookingId={booking_id as number}
              fare={(bookingData as any)?.amount}
              totalSeats={totalSeats}
            />
          )}
          {currentStep == 2 && !isBookingLoading && (
            <Payment
              bookingId={booking_id as number}
              auth={auth}
              updateCurrentStep={updateCurrentStep}
            />
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
