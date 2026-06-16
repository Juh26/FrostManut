import { createContext, useContext, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'
import Swal from 'sweetalert2'

const BookingContext = createContext({})

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  return useContext(BookingContext)
}

export function BookingProvider({ children }) {
  const [services, setServices] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  // Buscar serviços disponíveis
  const fetchServices = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name')

    if (!error && data) {
      setServices(data)
    }
    setLoading(false)
    return data
  }, [])

  // Buscar agendamentos do usuário
  const fetchBookings = useCallback(async (userId) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('scheduled_date', { ascending: true })

    if (!error && data) {
      setBookings(data)
    }
    setLoading(false)
    return data
  }, [])

  // Criar agendamento
  const createBooking = useCallback(async (bookingData) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()

      if (error) {
        console.error('Erro ao criar agendamento:', error)
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível agendar. Tente novamente.',
          confirmButtonText: 'OK'
        })
        setLoading(false)
        return null
      }

      Swal.fire({
        icon: 'success',
        title: '✅ Agendamento realizado!',
        text: `Serviço agendado para ${new Date(bookingData.scheduled_date).toLocaleDateString('pt-BR')} às ${bookingData.scheduled_time}`,
        confirmButtonText: 'OK'
      })

      // Atualizar lista
      if (bookingData.user_id) {
        await fetchBookings(bookingData.user_id)
      }

      setLoading(false)
      return data[0]
    } catch (error) {
      console.error('Erro:', error)
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Falha na conexão.',
        confirmButtonText: 'OK'
      })
      setLoading(false)
      return null
    }
  }, [fetchBookings])

  // Atualizar status do agendamento (admin)
  const updateBookingStatus = useCallback(async (bookingId, newStatus) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId)

    if (!error) {
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
      )
      Swal.fire({
        icon: 'success',
        title: 'Status atualizado!',
        timer: 1500,
        showConfirmButton: false
      })
      return true
    }
    return false
  }, [])

  // Buscar todos os agendamentos (admin)
  const fetchAllBookings = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*, users:user_id(email, name, phone)')
      .order('scheduled_date', { ascending: true })

    if (!error && data) {
      setBookings(data)
    }
    setLoading(false)
    return data
  }, [])

  return (
    <BookingContext.Provider value={{
      services,
      bookings,
      loading,
      fetchServices,
      fetchBookings,
      fetchAllBookings,
      createBooking,
      updateBookingStatus
    }}>
      {children}
    </BookingContext.Provider>
  )
}