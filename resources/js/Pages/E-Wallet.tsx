import React, { useState, useEffect } from 'react'
import '../Components/e-wallet.css'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'

interface Transaction {
  title: string
  vendor: string
  date: string
  amount: string
  currency: string
  action: string
}

interface CreditCard {
  type: string
  number: string
  month: string
  year: string
  id: number
  transactions: Transaction[]
}

const initialData: CreditCard[] = [
  // Initial data for credit cards as per your example
  {
    type: 'visa',
    number: '**** **** **** 2562',
    month: '12',
    year: '17',
    id: 1,
    transactions: [
      // Transactions for this card
    ]
  },
  {
    type: 'amex',
    number: '**** ****** 14525',
    month: '07',
    year: '19',
    id: 2,
    transactions: [
      // Transactions for this card
    ]
  },
  {
    type: 'mc',
    number: '**** **** **** 8866',
    month: '02',
    year: '22',
    id: 3,
    transactions: [
      // Transactions for this card
    ]
  }
]
export default function EWallet({ auth }: PageProps) {
  const [data, setData] = useState<CreditCard[]>(initialData)
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(data[0])
  const [balance, setBalance] = useState<number>(0)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newCard, setNewCard] = useState<{
    type: string
    number: string
    month: string
    year: string
  }>({ type: '', number: '', month: '', year: '' })

  useEffect(() => {
    calculateBalance()
  }, [selectedCard])

  const calculateBalance = () => {
    if (selectedCard) {
      const total = selectedCard.transactions.reduce((acc, trans) => {
        return trans.action === 'credit'
          ? acc + parseFloat(trans.amount)
          : acc - parseFloat(trans.amount)
      }, 0)
      setBalance(total)
    }
  }

  const handleCardSelect = (card: CreditCard) => {
    setSelectedCard(card)
  }

  const handleNewCardChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewCard((prev) => ({ ...prev, [name]: value }))
  }

  const addNewCard = () => {
    if (newCard.type && newCard.number && newCard.month && newCard.year) {
      const newId = data.length + 1
      const newCardData: CreditCard = {
        type: newCard.type,
        number:
          newCard.type === 'amex'
            ? `**** ****** ₹{newCard.number}`
            : `**** **** **** ₹{newCard.number}`,
        month: newCard.month,
        year: newCard.year,
        id: newId,
        transactions: []
      }
      setData([...data, newCardData])
      setModalOpen(false)
      setNewCard({ type: '', number: '', month: '', year: '' })
    } else {
      alert('Please fill in all fields.')
    }
  }

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
            <div className='econtainer'>
              <div className='wallet'>
                <aside className='left-wallet'>
                  <div className='wallet-head'>
                    <h1>My Wallets</h1>
                    <div
                      className='modal-open'
                      onClick={() => setModalOpen(true)}
                    >
                      +
                    </div>
                  </div>
                  <div className='cc-select'>
                    {data.map((card) => (
                      <div
                        key={card.id}
                        className={`cc ₹{card.type} ₹{selectedCard?.id === card.id ? 'cc-active' : ''}`}
                        onClick={() => handleCardSelect(card)}
                      >
                        <div className='cc-img-main'></div>
                        <div className='cc-num'>{card.number}</div>
                        <div className='cc-date'>
                          Valid Thru: {card.month}/{card.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </aside>
                <div className='right-trans'>
                  <h1>Current Balance</h1>
                  <h4 id='balance'>₹{balance.toFixed(2)}</h4>
                  <div className='trans-list'>
                    {selectedCard?.transactions.length === 0 ? (
                      <h5 className='no-trans'>
                        No transactions for this card
                      </h5>
                    ) : (
                      selectedCard?.transactions.map((trans, index) => (
                        <div
                          key={index}
                          className={`trans trans-₹{trans.action}`}
                        >
                          <div className='trans-details'>
                            <span
                              className={`trans-₹{trans.action === 'credit' ? 'plus' : 'minus'}`}
                            ></span>
                            <h3 className='trans-name'>{trans.title}</h3>
                            <h5 className='trans-type-date'>
                              {trans.vendor} - {trans.date}
                            </h5>
                          </div>
                          <div className='trans-amt'>
                            <h4
                              className={`trans-amt amt-₹{trans.action === 'credit' ? 'green' : 'blue'}`}
                            >
                              {trans.currency} {trans.amount}
                            </h4>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {modalOpen && (
                <div className='modal'>
                  <div className='modal-body'>
                    <h3>Add a New Card</h3>
                    <h5>Select a card on the left and enter the information</h5>
                    <div
                      className='modal-close'
                      onClick={() => setModalOpen(false)}
                    >
                      x
                    </div>
                    <div className='modal-cards'>
                      {['visa', 'amex', 'mc'].map((type) => (
                        <div
                          key={type}
                          className={`md-cc ₹{type}`}
                          onClick={() =>
                            setNewCard((prev) => ({ ...prev, type }))
                          }
                        >
                          <div className={`cc-img ₹{type}`}></div>
                        </div>
                      ))}
                    </div>
                    <form id='ewalletForm'>
                      <input
                        type='text'
                        name='number'
                        placeholder='Card Number'
                        value={newCard.number}
                        onChange={handleNewCardChange}
                      />
                      <select
                        name='month'
                        value={newCard.month}
                        onChange={handleNewCardChange}
                      >
                        <option value=''>Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option
                            key={i + 1}
                            value={String(i + 1).padStart(2, '0')}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <select
                        name='year'
                        value={newCard.year}
                        onChange={handleNewCardChange}
                      >
                        <option value=''>Year</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={2023 + i} value={String(23 + i)}>
                            {2023 + i}
                          </option>
                        ))}
                      </select>
                    </form>
                    <button className='modal-add-cc' onClick={addNewCard}>
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
