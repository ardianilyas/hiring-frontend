import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { queryClient } from './shared/api/queryClient'
import './index.css'
import App from './App.tsx'
import { SignInPage, SignUpPage } from './features/auth'
import { ProtectedRoute } from './shared/components/ProtectedRoute'
import { PublicRoute } from './shared/components/PublicRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
            <Route path="/sign-in" element={<PublicRoute><SignInPage /></PublicRoute>} />
            <Route path="/sign-up" element={<PublicRoute><SignUpPage /></PublicRoute>} />
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-right" closeButton />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
