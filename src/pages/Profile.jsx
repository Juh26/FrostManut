import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, LogOut } from 'lucide-react'
import Swal from 'sweetalert2'

export default function Profile() {
  const { user, profile, signIn, signUp, signOut, updateProfile } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)

    let success
    if (isLogin) {
      success = await signIn(email, password)
    } else {
      success = await signUp(email, password, name, phone)
    }

    setLoading(false)
    if (success && isLogin) {
      window.location.href = '/'
    }
  }

  const handleUpdateProfile = async () => {
    const success = await updateProfile({ name, phone })
    if (success) {
      setEditing(false)
    }
  }

  if (!user) {
    return (
      <div className="pt-16 min-h-screen bg-light flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLogin ? '🔐 Entrar' : '📝 Criar Conta'}
            </h2>
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    required={!isLogin}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
              </button>
            </form>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setEmail('')
                setPassword('')
                setName('')
              }}
              className="w-full mt-4 text-sm text-primary hover:text-primary/80"
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
            <h1 className="text-2xl font-bold">Meu Perfil</h1>
            <p className="opacity-90">Gerencie suas informações</p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="text-primary" size={20} />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="text-primary" size={20} />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Nome</p>
                {editing ? (
                  <input
                    type="text"
                    value={name || profile?.name || ''}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                ) : (
                  <p className="font-medium">{profile?.name || 'Não informado'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="text-primary" size={20} />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Telefone</p>
                {editing ? (
                  <input
                    type="tel"
                    value={phone || profile?.phone || ''}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                ) : (
                  <p className="font-medium">{profile?.phone || 'Não informado'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="text-primary" size={20} />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Endereço</p>
                <p className="font-medium">{profile?.address || 'Não informado'}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              {editing ? (
                <>
                  <button onClick={handleUpdateProfile} className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                    Salvar
                  </button>
                  <button onClick={() => setEditing(false)} className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                    Cancelar
                  </button>
                </>
              ) : (
                <button onClick={() => {
                  setEditing(true)
                  setName(profile?.name || '')
                  setPhone(profile?.phone || '')
                }} className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                  Editar Perfil
                </button>
              )}
            </div>

            <button onClick={signOut} className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
              <LogOut size={18} /> Sair
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}