import React, { useState, useEffect } from 'react'
import '../Components/e-wallet.css'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import axios from 'axios'

interface Transaction {
  title: string
  vendor: string
  date: string
  amount: string
  currency: string
  action: string
}

export default function EWallet({ auth }: PageProps) {
  let [balance, updateBalance] = useState(0)
  let [transactions, updateTransactions] = useState([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response = await axios.get('/transactions')

        const TRANSACTIONS = response?.data
        updateTransactions(TRANSACTIONS)
        updateBalance(
          TRANSACTIONS[TRANSACTIONS?.length - 1]['ewallet']['balance']
        )
      } catch (error) {
        console.error(error)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
          E-Wallet
        </h2>
      }
    >
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6'>
          <div className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col sm:flex-row items-start'>
            {' '}
            <Head title='E-Wallet' />
            <div className='ewallet-container'>
              <div className='wallet'>
                <aside className='left-wallet'>
                  <div className='wallet-head'>
                    <h1>My Wallets</h1>
                  </div>
                </aside>
                <div className='right-trans'>
                  <h1>Current Balance</h1>
                  <h4 id='balance'>₹{balance.toFixed(2)}</h4>
                  <div className='trans-list' style={{ display: 'block' }}>
                    {' '}
                    {transactions?.map((trans: any, index) => (
                      <div key={index} className='trans trans-visa'>
                        {' '}
                        <div className='trans-details'>
                          {' '}
                          <span
                            className={
                              trans.type === 'credit'
                                ? 'trans-plus'
                                : 'trans-minus'
                            }
                          ></span>{' '}
                          <h3 className='trans-name'>{trans.title}</h3>{' '}
                          <h5 className='trans-type-date'>
                            {}
                            {new Date(trans.created_at).toLocaleString()}
                          </h5>{' '}
                        </div>{' '}
                        <div className='trans-amt'>
                          {' '}
                          <h4
                            className={
                              trans.type === 'credit'
                                ? 'trans-amt amt-green'
                                : 'trans-amt amt-blue'
                            }
                          >
                            ₹{trans.amount}
                          </h4>{' '}
                        </div>{' '}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
