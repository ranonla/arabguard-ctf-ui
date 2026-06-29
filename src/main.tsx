import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatsProvider } from './context/StatsContext.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <ChatProvider>
            <StatsProvider>
              <App />
            </StatsProvider>
          </ChatProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)