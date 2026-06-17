import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBooking } from '../contexts/BookingContext'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, MapPin, Phone, FileText } from 'lucide-react'
import Swal from 'sweetalert2'

export default function Booking() {
  const { serviceId } = useParams()
  const { services, createBooking } = useBooking()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    scheduled_date: '',
    scheduled_time: '',
    address: '',
    phone: '',
    notes: ''
  })

  useEffect(() => {
    if (services.length > 0) {
      const found = services.find(s => s.id === parseInt(serviceId))
      setService(found)
    }
  }, [services, serviceId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Faça login',
        text: 'Você precisa estar logado para agendar.',
        confirmButtonText: 'Fazer login'
      }).then(() => {
        navigate('/profile')
      })
      return
    }

    if (!formData.scheduled_date || !formData.scheduled_time) {
      Swal.fire('Erro', 'Selecione data e horário.', 'error')
      return
    }

    setLoading(true)

    const bookingData = {
      user_id: user.id,
      service_id: service.id,
      service_name: service.name,
      scheduled_date: formData.scheduled_date,
      scheduled_time: formData.scheduled_time,
      address: formData.address || profile?.address || '',
      phone: formData.phone || profile?.phone || '',
      notes: formData.notes || '',
      status: 'pending'
    }

    const result = await createBooking(bookingData)
    setLoading(false)

    if (result) {
      navigate('/my-bookings')
    }
  }

  // Se não encontrar o serviço
  if (!service) {
    return (
      <div className="pt-16 min-h-screen bg-light flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Carregando serviço...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-light">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/services')} 
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Voltar para serviços
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-xl shadow p-6"
        >
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-dark">Agendar Serviço</h1>
            <p className="text-gray-600">
              <span className="font-semibold">{service.name}</span> - R$ {service.price}
            </p>
            <p className="text-sm text-gray-400">{service.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <Calendar size={16} /> Data *
                </label>
                <input 
                  type="date" 
                  value={formData.scheduled_date} 
                  onChange={(e) => setFormData({...formData, scheduled_date: e.target.value})} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                  <Clock size={16} /> Horário *
                </label>
                <input 
                  type="time" 
                  value={formData.scheduled_time} 
                  onChange={(e) => setFormData({...formData, scheduled_time: e.target.value})} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <MapPin size={16} /> Endereço
              </label>
              <input 
                type="text" 
                value={formData.address} 
                onChange={(e) => setFormData({...formData, address: e.target.value})} 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                placeholder="Rua, número, bairro..." 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Phone size={16} /> Telefone
              </label>
              <input 
                type="tel" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                placeholder="(11) 99999-9999" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FileText size={16} /> Observações
              </label>
              <textarea 
                value={formData.notes} 
                onChange={(e) => setFormData({...formData, notes: e.target.value})} 
                rows={3} 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" 
                placeholder="Informações adicionais..." 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Agendando...
                </span>
              ) : (
                'Confirmar Agendamento'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}