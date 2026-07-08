import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { queryClient } from './shared/api/queryClient'
import './index.css'
import { SignInPage, SignUpPage, AuthProvider } from './features/auth'
import { LandingPage, JobDetailPage } from './features/landing'
import { DashboardPage } from './features/dashboard'
import { ProtectedRoute } from './shared/components/ProtectedRoute'
import { PublicRoute } from './shared/components/PublicRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/job/:id" element={<JobDetailPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/sign-in" element={<PublicRoute><SignInPage /></PublicRoute>} />
              <Route path="/sign-up" element={<PublicRoute><SignUpPage /></PublicRoute>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        <Toaster richColors position="top-right" closeButton />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
