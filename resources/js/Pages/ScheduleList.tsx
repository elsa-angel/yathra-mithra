import { PageProps } from '@/types'
import PrimaryButton from '@/Components/PrimaryButton'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SeatAvailability from '../Components/SeatAvailability'
import axios from 'axios'

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const ScheduleList = ({ auth, schedules }: any & { schedules: any[] }) => {
  const getDuration = (schedule: any) => {
    const indexOfFrom = schedule.stops.split(',').indexOf(schedule.from)
    const indexOfTo = schedule.stops.split(',').indexOf(schedule.to)
    const arrivalTimeAtFrom = schedule.stops_timings.split(',')[indexOfFrom]
    const arrivalTimeAtTo = schedule.stops_timings.split(',')[indexOfTo]

    return timeDifference(arrivalTimeAtFrom, arrivalTimeAtTo)
  }

  const timeDifference = (startTime: any, endTime: any) => {
    const start: any = new Date(`1970-01-01T${startTime}`)
    const end: any = new Date(`1970-01-01T${endTime}`)

    const diffInMilliseconds = end - start

    const hours = Math.floor((diffInMilliseconds / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diffInMilliseconds / (1000 * 60)) % 60)

    return `${hours > 0 ? hours : '00'}:
           ${minutes > 0 ? minutes : '00'}:
           00 hrs`
  }

  const getFare = (schedule: any) => {
    const indexOfFrom = schedule.stops.split(',').indexOf(schedule.from)
    const indexOfTo = schedule.stops.split(',').indexOf(schedule.to)

    const distancesArray = schedule.stops_distance.split(',').map(Number)
    const distanceAtFrom = distancesArray[indexOfFrom]
    const distanceAtTo = distancesArray[indexOfTo]

    return 10 * (distanceAtTo - distanceAtFrom)
  }

  const handleBookNow = async (schedule: any) => {
    // Call an API to store the selected schedule data
    // into a temporary reservation table

    const indexOfTo = schedule.stops.split(',').indexOf(schedule.to)
    const arrivalTimeAtTo = schedule.stops_timings.split(',')[indexOfTo]

    try {
      const response = await axios.post('/bookings', {
        schedule_id: schedule.id,
        user_id: auth?.user?.id,
        booking_date: schedule?.date,
        departure_stop: schedule.from,
        arrival_stop: schedule.to,
        fare: getFare(schedule),
        reserved_seats: 'null',
        departure_time: schedule.time,
        arrival_time: arrivalTimeAtTo
      })

      window.location.href = `/reservation/${response?.data?.booking_id}`
    } catch (error: any) {
      if (error?.response?.status == 401) {
        toastr.options = {
          positionClass: 'toast-top-center'
        }

        Command: toastr['warning']('Oops! Please login to continue...')

        setTimeout(() => {
          window.location.replace('/login')
        }, 2000)
      }
    }
  }

  return (
    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
      <div className='p-6 text-gray-900 dark:text-gray-100'>
        <div className='overflow-x-auto mt-4'>
          <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
            <thead>
              <tr className='bg-gray-200 text-gray-700 uppercase text-xs leading-normal'>
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
                schedules?.map((schedule: any, index: any) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className='py-3 px-4 border-b border-gray-200'>
                      {schedule.bus_details.bus_name}
                    </td>
                    <td className='py-3 px-4 border-b border-gray-200'>
                      {schedule.from.charAt(0).toUpperCase() +
                        schedule.from.slice(1).toLowerCase()}
                    </td>
                    <td className='py-3 px-4 border-b border-gray-200'>
                      {schedule.to.charAt(0).toUpperCase() +
                        schedule.to.slice(1).toLowerCase()}
                    </td>
                    <td className='py-3 px-4 border-b border-gray-200'>
                      {getDuration(schedule)}
                    </td>
                    <td className='py-3 px-4 border-b border-gray-200'>
                      ₹{getFare(schedule)}
                    </td>
                    <td className='py-3 px-4 border-b border-gray-200'>
                      <PrimaryButton
                        className='ms-4'
                        onClick={() => handleBookNow(schedule)}
                      >
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
  )
}

export default ScheduleList
