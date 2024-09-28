import React, { useState } from 'react'
import '../Components/SeatAvailability.css'
import PrimaryButton from '@/Components/PrimaryButton'

const SeatAvailability: React.FC = () => {
  // Algorithm
  // 1. Get total no. of seats in the bus
  // 2. Build seatlayout

  interface ISeat {
    id: string
    occupied: boolean
    selected: boolean
  }

  const seatLayout: Array<ISeat> = [
    { id: '1A', occupied: false, selected: false },
    { id: '1B', occupied: false, selected: false },
    { id: '1C', occupied: false, selected: false },
    { id: '1D', occupied: true, selected: false },
    { id: '2A', occupied: false, selected: false },
    { id: '2B', occupied: false, selected: false },
    { id: '2C', occupied: false, selected: false },
    { id: '2D', occupied: false, selected: false }

    // Add additional seats as needed...
  ]

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

  return (
    <div className='bus'>
      <div className='front'>
        <h1>Please select a seat</h1>
      </div>
      <div className='exit exit--front fuselage'></div>
      <ol className='cabin fuselage'>
        {Array.from({ length: 7 }, (_, rowIndex) => (
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
      <div className='flex justify-center'>
        <PrimaryButton
          className='ms-4'
          // onClick={() => handleBookNow(schedule)}
        >
          Book Now
        </PrimaryButton>
      </div>
    </div>
  )
}

export default SeatAvailability
