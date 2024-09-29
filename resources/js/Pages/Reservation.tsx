import { Head, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SeatAvailability from '@/Components/SeatAvailability'
import Payment from '@/Components/Payment'
import axios from 'axios'

import { useEffect, useState } from 'react'

export default function Reservation({ auth }: PageProps) {
  // Use the usePage hook to access the props
  const { props } = usePage()

  // Extract the schedule_id from props
  const { schedule_id } = props

  // Fetch Schedule API

  const [schedule, setSchedule] = useState({})
  const [isScheduleLoading, setScheduleLoading] = useState(true)

  const [totalSeats, setTotalSeats] = useState(0)

  const getScheduleDetail = async () => {
    try {
      const schedule = await axios.get(`/schedule_details/${schedule_id}`)
      setTotalSeats(schedule.data.bus.num_seats)
      setSchedule(schedule.data)
      setScheduleLoading(false)
      debugger
    } catch (error) {
      console.error('Error occured', error)
    }
  }

  isScheduleLoading && getScheduleDetail()

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
          {isScheduleLoading && <h1>Loading...</h1>}
          {currentStep == 1 && !isScheduleLoading && (
            <SeatAvailability
              updateCurrentStep={updateCurrentStep}
              totalSeats={totalSeats}
            />
          )}
          {currentStep == 2 && !isScheduleLoading && (
            <Payment
              auth={auth}
              schedule={schedule}
              updateCurrentStep={updateCurrentStep}
            />
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
