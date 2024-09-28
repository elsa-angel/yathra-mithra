import React from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { loadStripe } from '@stripe/stripe-js'
import { scheduler } from 'timers/promises'

import Stripe from 'stripe'

interface BookingDetailsProps {
  boatId: string
  from: string
  to: string
  time: string
  totalAmount: number
  auth: { user: any }
}

const Payment: React.FC<BookingDetailsProps> = ({
  boatId,
  from,
  to,
  time,
  totalAmount,
  auth
}) => {
  totalAmount = 210

  const makePayment = async () => {
    // console.log(process.env.STRIPE_PUBLIC_KEY)

    // const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY)
    const stripe = await loadStripe(
      'pk_test_51Q3wbuIMqVOQVQ5ADpdbpZYftHwMsC4gnTkN21xgQp6CgExTuxvhvXNv85xjLnaElL8rVrokgWeiRGpeFRc6QgWP00x0FwRJx6'
    )

    const session = await makeStripePayment()

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
      success_url: 'http://127.0.0.1:8000/payment',
      cancel_url: 'http://127.0.0.1:8000/payment'
    })
    return session
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          Booking Details
        </h2>
      }
    >
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6'>
          <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col sm:flex-row items-start'>
            {' '}
            <Head title='Payment' />
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span className='font-semibold'>BoatID:</span>
                <span>{boatId}</span>
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
              <div
                className='flex flex-col justify-start'
                style={{ height: '100%' }}
              >
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
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Payment
