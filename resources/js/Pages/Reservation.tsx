import { Head, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SeatAvailability from '@/Components/SeatAvailability'
import Payment from '@/Components/Payment'

import { useState } from 'react'

export default function Reservation({ auth }: PageProps) {
  // Use the usePage hook to access the props
  const { props } = usePage()

  // Extract the schedule_id from props
  const { schedule_id } = props

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
          <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg '>
            {' '}
            <Head title='Reservation' />
            {currentStep == 1 && (
              <SeatAvailability updateCurrentStep={updateCurrentStep} />
            )}
            {currentStep == 2 && (
              <Payment
                auth={auth}
                scheduleId={schedule_id as string}
                updateCurrentStep={updateCurrentStep}
              />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
