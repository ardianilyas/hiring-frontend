import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { queryClient } from './shared/api/queryClient'
import './index.css'
import { SignInPage, SignUpPage, AuthProvider } from './features/auth'
import { LandingPage, JobDetailPage } from './features/landing'
import { DashboardPage } from './features/dashboard'
import { DepartmentsPage } from './features/departments'
import { JobOpeningsPage } from './features/job-openings'
import { ApplicationsPage } from './features/applications/pages/ApplicationsPage'
import { MyApplicationsPage } from './features/applications/pages/MyApplicationsPage'
import { ProtectedRoute } from './shared/components/ProtectedRoute'
import { PublicRoute } from './shared/components/PublicRoute'
import { NotFoundPage } from './shared/pages/NotFoundPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/job/:id" element={<JobDetailPage />} />
              <Route path="/dashboard" element={<ProtectedRoute requireAdmin={true}><DashboardPage /></ProtectedRoute>} />
              <Route path="/dashboard/departments" element={<ProtectedRoute requireAdmin={true}><DepartmentsPage /></ProtectedRoute>} />
              <Route path="/dashboard/jobs" element={<ProtectedRoute requireAdmin={true}><JobOpeningsPage /></ProtectedRoute>} />
              <Route path="/dashboard/applications" element={<ProtectedRoute requireAdmin={true}><ApplicationsPage /></ProtectedRoute>} />
              <Route path="/sign-in" element={<PublicRoute><SignInPage /></PublicRoute>} />
              <Route path="/sign-up" element={<PublicRoute><SignUpPage /></PublicRoute>} />
              <Route path="/my-applications" element={<ProtectedRoute><MyApplicationsPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
      <Toaster richColors position="top-right" closeButton />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
