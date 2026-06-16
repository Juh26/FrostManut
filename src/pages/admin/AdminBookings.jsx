import { useEffect, useState } from 'react'
import { useBooking } from '../../contexts/BookingContext'
import { motion } from 'framer-motion'
import { Calendar, Clock, Wrench, CheckCircle, XCircle, Clock as ClockIcon, RefreshCw, User, Phone, MapPin } from 'lucide-react'
import Swal from 'sweetalert2'

export default function AdminBookings() {
  const { bookings, fetchAllBookings, updateBookingStatus, loading } = useBooking()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchAllBookings()
  }, [])

  const getStatusConfig = (status) => {
    const configs = {
      pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
      confirmed: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      in_progress: { label: 'Em andamento', color: 'bg-purple-100 text-purple-800', icon: Wrench },
      completed: { label: 'Concluído', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    return configs[status] || configs.pending
  }

  const handleStatusChange = async (bookingId, newStatus) => {
    const result = await Swal.fire({
      title: 'Alterar status',
      text: `Deseja alterar o status para "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1e3a5f',
      confirmButtonText: 'Sim, alterar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      await updateBookingStatus(bookingId, newStatus)
      await fetchAllBookings()
    }
  }

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter)

  const statusCounts = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="pt-16 min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-dark">Gerenciar Agendamentos</h1>
              <p className="text-gray-600">Gerencie todos os serviços agendados</p>
            </div>
            <button
              onClick={() => fetchAllBookings()}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <RefreshCw size={18} /> Atualizar
            </button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-2xl font-bold text-dark">{bookings.length}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow p-4 text-center border border-yellow-200">
              <p className="text-2xl font-bold text-yellow-800">{statusCounts.pending || 0}</p>
              <p className="text-sm text-yellow-600">Pendentes</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-4 text-center border border-blue-200">
              <p className="text-2xl font-bold text-blue-800">{statusCounts.confirmed || 0}</p>
              <p className="text-sm text-blue-600">Confirmados</p>
            </div>
            <div className="bg-purple-50 rounded-lg shadow p-4 text-center border border-purple-200">
              <p className="text-2xl font-bold text-purple-800">{statusCounts.in_progress || 0}</p>
              <p className="text-sm text-purple-600">Em andamento</p>
            </div>
            <div className="bg-green-50 rounded-lg shadow p-4 text-center border border-green-200">
              <p className="text-2xl font-bold text-green-800">{statusCounts.completed || 0}</p>
              <p className="text-sm text-green-600">Concluídos</p>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Todos ({bookings.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pendentes ({statusCounts.pending || 0})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'confirmed' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Confirmados ({statusCounts.confirmed || 0})
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'in_progress' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Em andamento ({statusCounts.in_progress || 0})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'completed' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Concluídos ({statusCounts.completed || 0})
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                filter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cancelados ({statusCounts.cancelled || 0})
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
              <p className="text-gray-500">Aguardando novos agendamentos.</p>
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
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-3 mb-2">
                          <Wrench className="text-primary" size={20} />
                          <h3 className="text-xl font-semibold text-dark">{booking.service_name}</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <User size={16} /> {booking.users?.name || 'Não informado'}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone size={16} /> {booking.users?.phone || booking.phone || 'Não informado'}
                          </p>
                          <p className="flex items-center gap-2 sm:col-span-2">
                            <Calendar size={16} />
                            {new Date(booking.scheduled_date).toLocaleDateString('pt-BR')} às {booking.scheduled_time}
                          </p>
                          <p className="flex items-center gap-2 sm:col-span-2">
                            <MapPin size={16} /> {booking.address || 'Endereço não informado'}
                          </p>
                          {booking.notes && (
                            <p className="flex items-center gap-2 sm:col-span-2 text-gray-500 italic">
                              <span className="font-medium">Obs:</span> {booking.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 min-w-[160px]">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${status.color}`}>
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary outline-none"
                        >
                          <option value="pending">⏳ Pendente</option>
                          <option value="confirmed">✅ Confirmado</option>
                          <option value="in_progress">🔄 Em andamento</option>
                          <option value="completed">✔️ Concluído</option>
                          <option value="cancelled">❌ Cancelado</option>
                        </select>
                        <p className="text-xs text-gray-400">
                          Solicitado: {new Date(booking.created_at).toLocaleDateString('pt-BR')}
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