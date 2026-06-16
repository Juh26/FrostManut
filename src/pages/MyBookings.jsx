import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useBooking } from '../contexts/BookingContext'
import { motion } from 'framer-motion'
import { Calendar, Clock, Wrench, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react'

export default function MyBookings() {
  const { user } = useAuth()
  const { bookings, fetchBookings, loading } = useBooking()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (user) {
      fetchBookings(user.id)
    }
  }, [user])

  const getStatusConfig = (status) => {
    const configs = {
      pending: { 
        label: 'Pendente', 
        color: 'bg-yellow-100 text-yellow-800', 
        icon: ClockIcon 
      },
      confirmed: { 
        label: 'Confirmado', 
        color: 'bg-blue-100 text-blue-800', 
        icon: CheckCircle 
      },
      in_progress: { 
        label: 'Em andamento', 
        color: 'bg-purple-100 text-purple-800', 
        icon: Wrench 
      },
      completed: { 
        label: 'Concluído', 
        color: 'bg-green-100 text-green-800', 
        icon: CheckCircle 
      },
      cancelled: { 
        label: 'Cancelado', 
        color: 'bg-red-100 text-red-800', 
        icon: XCircle 
      }
    }
    return configs[status] || configs.pending
  }

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter)

  if (!user) {
    return (
      <div className="pt-16 min-h-screen bg-light flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Faça login para ver seus agendamentos</h2>
          <Link to="/profile" className="text-primary hover:underline">Entrar</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-dark mb-2">Meus Agendamentos</h1>
          <p className="text-gray-600 mb-6">Acompanhe seus serviços agendados</p>

          {/* Filtros */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'confirmed' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Confirmados
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'in_progress' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Em andamento
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'completed' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Concluídos
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cancelados
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum agendamento encontrado</h3>
              <p className="text-gray-500 mb-4">Você ainda não agendou nenhum serviço.</p>
              <Link 
                to="/services" 
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 inline-block transition-colors"
              >
                Agendar Serviço
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const status = getStatusConfig(booking.status)
                const StatusIcon = status.icon
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Wrench className="text-primary" size={20} />
                          <h3 className="text-xl font-semibold text-dark">{booking.service_name}</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <Calendar size={16} />
                            {new Date(booking.scheduled_date).toLocaleDateString('pt-BR')}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock size={16} />
                            {booking.scheduled_time}
                          </p>
                          <p className="flex items-center gap-2 sm:col-span-2">
                            <span className="font-medium">Endereço:</span> {booking.address || 'Não informado'}
                          </p>
                          <p className="flex items-center gap-2 sm:col-span-2">
                            <span className="font-medium">Telefone:</span> {booking.phone || 'Não informado'}
                          </p>
                          {booking.notes && (
                            <p className="flex items-center gap-2 sm:col-span-2">
                              <span className="font-medium">Observações:</span> {booking.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${status.color}`}>
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                        <p className="text-xs text-gray-400">
                          Solicitado em: {new Date(booking.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}