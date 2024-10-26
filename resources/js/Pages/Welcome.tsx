import { Link, Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import MovingBus from '@/Components/MovingBus'

export default function Welcome({
  auth
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Head title='Welcome' />

      <div className='relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white'>
        <div className='sm:fixed sm:top-0 sm:right-0 p-6 text-end'>
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className='font-semibold text-2xl text-white hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-white'
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={route('login')}
                className='font-semibold text-2xl text-white hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-white'
              >
                Log in
              </Link>

              <Link
                href={route('register')}
                className='ms-4 text-2xl font-semibold text-white hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-white'
              >
                Register
              </Link>
            </>
          )}
        </div>

        <MovingBus />

        {/* remaining */}
      </div>

      <style>{`
               .bg-dots-darker {
                   background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
               }
               @media (prefers-color-scheme: dark) {
                   .dark\\:bg-dots-lighter {
                       background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                   }
               }
           `}</style>
    </>
  )
}
