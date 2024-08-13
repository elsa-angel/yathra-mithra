import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import PrimaryButton from '@/Components/PrimaryButton' // Adjust the import path if necessary

const SeatAvailability = ({ auth }: PageProps) => {
  // Dummy data for demonstration
  const seats = [
    { row: 1, seat: 'A', status: 'Available' },
    { row: 1, seat: 'B', status: 'Reserved' },
    { row: 1, seat: 'C', status: 'Available' },
    { row: 1, seat: 'D', status: 'Available' },
    { row: 1, seat: 'E', status: 'Reserved' },
    { row: 1, seat: 'F', status: 'Available' },
    { row: 2, seat: 'A', status: 'Reserved' },
    { row: 2, seat: 'B', status: 'Available' },
    { row: 2, seat: 'C', status: 'Reserved' },
    { row: 2, seat: 'D', status: 'Available' },
    { row: 2, seat: 'E', status: 'Available' },
    { row: 2, seat: 'F', status: 'Available' }
    // More seats can be added here
  ]

  // Group seats by rows for display
  const groupedSeats = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = []
      acc[seat.row].push(seat)
      return acc
    },
    {} as Record<number, { seat: string; status: string }[]>
  )

  // Handle seat click
  const handleSeatClick = (seat: string, status: string) => {
    if (status === 'Available') {
      // Implement reservation logic here
      alert(`Reserving seat ${seat}`)
    }
  }

  // Handle book now click
  const handleBookNowClick = () => {
    // Implement booking logic here
    alert('Proceeding to book selected seats')
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          Seat Availability
        </h2>
      }
    >
      <Head title='Seat Availability' />

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='overflow-x-auto mt-4'>
                <div className='flex flex-col'>
                  {Object.entries(groupedSeats).map(([_, seats], rowIndex) => (
                    <div key={rowIndex} className='flex mb-4 justify-center'>
                      <div className='flex flex-wrap justify-center space-x-2'>
                        {/* Render first 3 seats */}
                        {seats.slice(0, 3).map((seat, seatIndex) => (
                          <PrimaryButton
                            key={seatIndex}
                            onClick={() =>
                              handleSeatClick(seat.seat, seat.status)
                            }
                            className={`w-12 h-12 flex items-center justify-center rounded-lg border ${seat.status === 'Available' ? 'bg-green-500 text-white hover:bg-green-700' : 'bg-red-500 text-white cursor-not-allowed'}`}
                            disabled={seat.status === 'Reserved'}
                          >
                            <span className='text-sm font-medium'>
                              {seat.seat}
                            </span>
                          </PrimaryButton>
                        ))}

                        {/* Spacer between the 3rd and 4th seats */}
                        <div className='w-12'></div>

                        {/* Render last 3 seats */}
                        {seats.slice(3).map((seat, seatIndex) => (
                          <PrimaryButton
                            key={seatIndex + 3}
                            onClick={() =>
                              handleSeatClick(seat.seat, seat.status)
                            }
                            className={`w-12 h-12 flex items-center justify-center rounded-lg border ${seat.status === 'Available' ? 'bg-green-500 text-white hover:bg-green-700' : 'bg-red-500 text-white cursor-not-allowed'}`}
                            disabled={seat.status === 'Reserved'}
                          >
                            <span className='text-sm font-medium'>
                              {seat.seat}
                            </span>
                          </PrimaryButton>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Book Now Button */}
                <div className='flex justify-center mt-6'>
                  <PrimaryButton onClick={handleBookNowClick} className='ms-4'>
                    Book Now
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default SeatAvailability
