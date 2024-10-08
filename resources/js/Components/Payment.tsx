import React, { useState } from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { loadStripe } from '@stripe/stripe-js'

import Stripe from 'stripe'
import LoadingBar from 'react-top-loading-bar'

interface BookingDetailsProps {
  bookingData: any
  auth: { user: any }
  updateCurrentStep: (step: number) => void
}

const Payment: React.FC<BookingDetailsProps> = ({
  bookingData,
  auth,
  updateCurrentStep
}) => {
  let busId = bookingData?.schedule?.bus?.id
  let from = bookingData.departure_stop
  let to = bookingData.arrival_stop
  let time = bookingData.departure_time
  let totalAmount = bookingData.amount

  const makePayment = async () => {
    // console.log(process.env.STRIPE_PUBLIC_KEY)

    // const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY)
    updateProgress(30)
    const stripe = await loadStripe(
      'pk_test_51Q3wbuIMqVOQVQ5ADpdbpZYftHwMsC4gnTkN21xgQp6CgExTuxvhvXNv85xjLnaElL8rVrokgWeiRGpeFRc6QgWP00x0FwRJx6'
    )

    updateProgress(70)
    const session = await makeStripePayment()
    updateProgress(100)
    stripe?.redirectToCheckout({
      sessionId: session.id
    })
  }

  async function makeStripePayment() {
    // const stripe = require('stripe')(
    //   'sk_test_51Q3wbuIMqVOQVQ5AbRLzJrBynzDiHtpcVrieYFPfImc4kgw8BYkimtnILsPzV4aEv2jI5zGhJUduy7CyEaZVHrJY00Jcgc7EXC'
    // )

    const stripe = new Stripe(
      'sk_test_51Q3wbuIMqVOQVQ5AbRLzJrBynzDiHtpcVrieYFPfImc4kgw8BYkimtnILsPzV4aEv2jI5zGhJUduy7CyEaZVHrJY00Jcgc7EXC'
    )

    const transaction = await stripe.products.create({
      name: 'Transaction A'
      // default_price_data: {
      //   unit_amount: 20000,
      //   currency: 'inr'
      // },
      // expand: ['default_price']
    })

    const price = await stripe.prices.create({
      product: transaction.id,
      unit_amount: totalAmount * 100,
      currency: 'inr'
    })

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'payment',
      success_url: `http://127.0.0.1:8000/reservation_success/${bookingData.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://127.0.0.1:8000/reservation_failed/${bookingData.id}`
    })
    return session
  }

  // loading bar

  const [progress, setProgress] = useState(0)

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress)
    // loadingBar.current.continuousStart();
  }

  return (
    <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col sm:flex-row items-start'>
      <Head title='Payment' />
      <LoadingBar
        color='blue'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className='space-y-4'>
        <div className='flex justify-between'>
          <span className='font-semibold'>Bus ID:</span>
          <span>{busId}</span>
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
          <span>&nbsp;{totalAmount}</span>
        </div>
        <PrimaryButton className='mr-4' onClick={() => updateCurrentStep(1)}>
          Go Back
        </PrimaryButton>
        <PrimaryButton
          className='bg-blue-700 hover:bg-blue-900'
          onClick={makePayment}
        >
          Pay Now
        </PrimaryButton>
      </div>
      <div
        className='sm:w-64 mt-8 sm:mt-0 flex justify-center mx-auto'
        style={{ flex: '1' }}
      >
        <div className='flex flex-col justify-start' style={{ height: '100%' }}>
          <div className='border border-gray-300 dark:border-gray-700 rounded-lg p-4'>
            {/* Picture */}
            <img
              src='travel.webp'
              alt='Description of the image'
              className='w-full h-auto mb-4'
              style={{ width: '300px', height: '300px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
