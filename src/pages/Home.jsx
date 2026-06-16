import { motion } from 'framer-motion'
import { Wrench, Calendar, Shield, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="pt-16 min-h-screen bg-light">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Manutenção de <span className="text-blue-200">Ar Condicionado</span>
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Agende serviços especializados para seu ar-condicionado com profissionais qualificados
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                to="/services" 
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                Agendar Serviço <ArrowRight size={18} />
              </Link>
              <Link 
                to="/profile" 
                className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Criar Conta
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher a FrostManut?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Wrench, title: 'Profissionais Qualificados', desc: 'Técnicos certificados com experiência' },
              { icon: Calendar, title: 'Agendamento Fácil', desc: 'Marque sua manutenção em poucos cliques' },
              { icon: Shield, title: 'Garantia de Serviço', desc: 'Qualidade garantida em todos os serviços' }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para agendar sua manutenção?</h2>
          <p className="text-lg mb-6 opacity-90">Agende agora e tenha seu ar-condicionado funcionando perfeitamente</p>
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Agendar Agora <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}