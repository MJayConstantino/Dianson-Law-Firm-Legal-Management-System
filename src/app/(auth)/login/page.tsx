'use client'
import { LoginPage } from '@/components/auth/Login'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  // Handle successful login
  const handleLoginSuccess = () => {
    router.push('test/userpage')
  }

  return (
    <LoginPage
      onLoginSuccess={handleLoginSuccess}
      onGoogleLoginSuccess={handleLoginSuccess}
    />
  )
}
