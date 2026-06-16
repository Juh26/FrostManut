import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Wrench, Calendar, User, LogOut, Menu, X, LayoutDashboard, ClipboardList } from 'lucide-react'

export default function Navbar() {
  const { user, signOut, isAdmin } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
    setMobileMenuOpen(false)
  }

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Wrench className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl text-dark">FrostManut</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Início</Link>
            <Link to="/services" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
              <Wrench size={18} /> Serviços
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/my-bookings" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
                  <ClipboardList size={18} /> Meus Agendamentos
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                    <LayoutDashboard size={18} /> Admin
                  </Link>
                )}
                <Link to="/profile" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
                  <User size={18} /> Perfil
                </Link>
                <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1">
                  <LogOut size={18} /> Sair
                </button>
              </div>
            ) : (
              <Link to="/profile" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">Entrar</Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 bg-white">
            <div className="flex flex-col space-y-3">
              <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-primary px-2 py-2">Início</Link>
              <Link to="/services" onClick={closeMenu} className="text-gray-700 hover:text-primary px-2 py-2 flex items-center gap-2">
                <Wrench size={18} /> Serviços
              </Link>
              {user ? (
                <>
                  <Link to="/my-bookings" onClick={closeMenu} className="text-gray-700 hover:text-primary px-2 py-2 flex items-center gap-2">
                    <ClipboardList size={18} /> Meus Agendamentos
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={closeMenu} className="text-primary hover:text-primary/80 px-2 py-2 flex items-center gap-2">
                      <LayoutDashboard size={18} /> Admin
                    </Link>
                  )}
                  <Link to="/profile" onClick={closeMenu} className="text-gray-700 hover:text-primary px-2 py-2 flex items-center gap-2">
                    <User size={18} /> Perfil
                  </Link>
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-700 px-2 py-2 flex items-center gap-2 w-full text-left">
                    <LogOut size={18} /> Sair
                  </button>
                </>
              ) : (
                <Link to="/profile" onClick={closeMenu} className="bg-primary text-white px-4 py-2 rounded-lg text-center">Entrar</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}