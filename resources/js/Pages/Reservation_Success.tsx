import React, { useEffect, useState } from 'react'
import '../Components/reservation.css'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link, usePage } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'
import Stripe from 'stripe'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import QRCode from 'react-qr-code'

const Reservation_Success: React.FC<{ auth: any }> = ({ auth }) => {
  // Fetch Stripe Session data using passed session_id in query params
  const location = useLocation()

  // Function to get the query parameters
  const getQueryParams = () => {
    const query = new URLSearchParams(location.search)
    return {
      sessionId: query.get('session_id')
    }
  }

  const { sessionId } = getQueryParams()

  const stripe = new Stripe(
    'sk_test_51Q3wbuIMqVOQVQ5AbRLzJrBynzDiHtpcVrieYFPfImc4kgw8BYkimtnILsPzV4aEv2jI5zGhJUduy7CyEaZVHrJY00Jcgc7EXC'
  )

  // Get Booking Data using booking_id
  const url = window.location.href
  const parsedUrl = new URL(url)
  const bookingId = parsedUrl.pathname.split('/')[2] // This gets the 3rd segment of the path

  const makeReservation = async () => {
    try {
      // Fetch Stripe session data
      const stripeSession = await stripe.checkout.sessions.retrieve(
        sessionId as string
      )

      // Fetch booking data
      const bookingData = await axios.get(`/bookings/${bookingId}`)

      // Prepare data for reservation
      const reservationData = {
        schedule_id: bookingData?.data?.schedule_id,
        user_id: auth?.user?.id,
        payment_id: stripeSession.id,
        amount: bookingData?.data?.amount,
        status: stripeSession?.payment_status,
        departure_stop: bookingData?.data?.departure_stop,
        departure_time: bookingData?.data?.departure_time,
        arrival_stop: bookingData?.data?.arrival_stop,
        arrival_time: bookingData?.data?.arrival_time,
        qr_code: 'null',
        reserved_seats: bookingData?.data?.reserved_seats,
        booking_date: bookingData?.data?.booking_date
      }

      // Make the reservation
      const response = await axios.post('/reservations', reservationData)
      console.log('Reservation successful:', response.data)
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }

  useEffect(() => {
    makeReservation()
  }, [sessionId, bookingId]) // Dependencies for useEffect to re-run if sessionId or bookingId changes

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
          <div className='message-box _success'>
            <h2>Your payment was successful</h2>
            <p>Thank you for your payment.</p>
            <br></br>
            <div>
              <Link
                href={route('my_bookings')}
                className='font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500'
              >
                <PrimaryButton>View your Bookings</PrimaryButton>
              </Link>
            </div>
            <div className='success-animation'>
              <svg
                className='checkmark'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 52 52'
              >
                <circle
                  className='checkmark__circle'
                  cx='26'
                  cy='26'
                  r='25'
                  fill='none'
                />
                <path
                  className='checkmark__check'
                  fill='none'
                  d='M14.1 27.2l7.1 7.2 16.7-16.8'
                />
              </svg>
            </div>
            <br />
            <br />
            <div
              style={{
                height: 'auto',
                margin: '0 auto',
                maxWidth: 128,
                width: '100%'
              }}
            >
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={sessionId as string}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Reservation_Success
