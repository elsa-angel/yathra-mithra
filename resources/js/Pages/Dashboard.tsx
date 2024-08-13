import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import BusSearchForm from '../Components/BusSearchForm'
import { useLocation } from 'react-router-dom'

export default function ({ auth }: PageProps) {
  const location = useLocation()

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          {location.pathname?.endsWith('dashboard')
            ? 'Dashboard'
            : location?.pathname?.endsWith('schedule_list')
              ? 'Schedules List'
              : 'Yathra-Mithra'}
        </h2>
      }
    >
      <Head
        title={
          location.pathname?.endsWith('dashboard')
            ? 'Dashboard'
            : location?.pathname?.endsWith('schedule_list')
              ? 'Schedules List'
              : 'Yathra-Mithra'
        }
      />

      <div className='py-12'>
        {location?.pathname?.endsWith('dashboard') && (
          <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
            <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
              <div className='p-6 text-gray-900 dark:text-gray-100'>
                Welcome {auth.user.name}!
              </div>
            </div>
          </div>
        )}
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <BusSearchForm auth={auth} />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
