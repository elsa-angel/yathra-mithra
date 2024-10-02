import React, { useState } from 'react'
import PrimaryButton from '@/Components/PrimaryButton'
import '../Components/seat_availability.css'

interface Props {
  updateCurrentStep: (step: number) => void
  totalSeats: number
}

const SeatAvailability: React.FC<Props> = ({
  updateCurrentStep,
  totalSeats
}) => {
  // Algorithm
  // 1. Get total no. of seats in the bus
  // 2. Build seatlayout

  interface ISeat {
    id: string
    //occupied: boolean
    selected: boolean
  }

  // Calculate number of rows and columns
  const rows = Math.ceil(totalSeats / 4) // Assuming 4 seats per row
  const columns = ['A', 'B', 'C', 'D']

  // Build the seat layout dynamically
  const seatLayout = (): Array<ISeat> => {
    const layout: Array<ISeat> = []
    for (let rowIndex = 1; rowIndex <= rows; rowIndex++) {
      for (const column of columns) {
        layout.push({
          id: `${rowIndex}${column}`,
          //occupied: Math.random() < 0.2,
          selected: false
        })
      }
    }
    return layout
  }

  // Add additional seats as needed...

  // 1. Get already reserved seats in the bus = ['1A','2A','2B']

  const [seats, setSeats] = useState(seatLayout)

  const handleSeatChange = (id: string) => {
    setSeats(
      seats.map((seat: ISeat) =>
        seat.id === id && !seat.occupied
          ? { ...seat, selected: !seat.selected }
          : seat
      )
    )
  }

  console.log(totalSeats, 'ttseats')

  const anySeatsSelected = seats.some((seat) => seat.selected)

  // Function to handle button click
  const onClickPayNow = () => {
    // Update
    // 1. selected seats
    // 2. fare

    updateCurrentStep(2)
  }

  return (
    <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg '>
      <div className='bus'>
        <div className='flex justify-center mb-2'>
          <PrimaryButton
            className='ms-4'
            onClick={onClickPayNow}
            disabled={!anySeatsSelected}
          >
            Book Now
          </PrimaryButton>
        </div>
        <div className='front'>
          <h1>Please Select seats</h1>
        </div>
        <div className='exit exit--front fuselage'></div>
        <ol className='cabin fuselage'>
          {Array.from({ length: totalSeats / 4 }, (_, rowIndex) => (
            <li key={rowIndex} className={`row row--${rowIndex + 1}`}>
              <ol className='seats' type='A'>
                {['A', 'B', 'C', 'D'].map((letter) => {
                  const seatId = `${rowIndex + 1}${letter}`
                  const seat = seats.find((s: any) => s.id === seatId)
                  return (
                    <li key={seatId} className='seat'>
                      <input
                        type='checkbox'
                        id={seatId}
                        checked={seat?.selected || false}
                        onChange={() => handleSeatChange(seatId)}
                        disabled={seat?.occupied}
                      />
                      <label htmlFor={seatId}>
                        {seat?.occupied ? 'Occupied' : seatId}
                      </label>
                    </li>
                  )
                })}
              </ol>
            </li>
          ))}
        </ol>
        <div className='exit exit--back fuselage'></div>
      </div>
    </div>
  )
}

export default SeatAvailability
