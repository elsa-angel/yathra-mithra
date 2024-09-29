import React from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { loadStripe } from '@stripe/stripe-js'
import { scheduler } from 'timers/promises'

import Stripe from 'stripe'

interface BookingDetailsProps {
  scheduleId: string
  boatId: string
  from: string
  to: string
  time: string
  totalAmount: number
  auth: { user: any }
  updateCurrentStep: () => void
}

const Payment: React.FC<BookingDetailsProps> = ({
  scheduleId,
  // busId,
  // from,
  // to,
  // time,
  // totalAmount,
  auth,
  updateCurrentStep
}) => {
  let busId = 'Test'
  let from = 'Test'
  let to = 'Test'
  let time = 'Test'
  let totalAmount = 210

  const makePayment = async () => {
    // console.log(process.env.STRIPE_PUBLIC_KEY)

    // const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY)
    const stripe = await loadStripe(
      'pk_test_51Q3wbuIMqVOQVQ5ADpdbpZYftHwMsC4gnTkN21xgQp6CgExTuxvhvXNv85xjLnaElL8rVrokgWeiRGpeFRc6QgWP00x0FwRJx6'
    )

    const session = await makeStripePayment()

    const response = await stripe?.redirectToCheckout({
      sessionId: session.id
    })
    debugger

    // if (error) {
    //   console.error('Payment Failed', error)
    // } else {
    //   console.info('Payment Success')
    // }
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
      success_url: `http://127.0.0.1:8000/reservation/${scheduleId}`,
      cancel_url: `http://127.0.0.1:8000/reservation_failed`
    })
    return session
  }

  return (
    <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col sm:flex-row items-start'>
      {' '}
      <Head title='Payment' />
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
        <PrimaryButton className='' onClick={makePayment}>
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
