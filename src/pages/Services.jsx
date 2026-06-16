import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../contexts/BookingContext'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import { Clock, DollarSign, ArrowRight } from 'lucide-react'
import Swal from 'sweetalert2'

export default function Services() {
  const { services, fetchServices } = useBooking()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const handleBookService = (service) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Faça login',
        text: 'Você precisa estar logado para agendar um serviço.',
        confirmButtonText: 'Fazer login'
      }).then(() => {
        navigate('/profile')
      })
      return
    }
    navigate(`/booking/${service.id}`)
  }

  return (
    <div className="pt-16 min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-dark mb-2">Nossos Serviços</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Escolha o serviço que melhor atende sua necessidade</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon || '🔧'}</div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock size={16} /> {service.duration} min</span>
                  <span className="flex items-center gap-1"><DollarSign size={16} /> R$ {service.price}</span>
                </div>
                <button 
                  onClick={() => handleBookService(service)} 
                  className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Agendar <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}