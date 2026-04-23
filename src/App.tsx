import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home, Dashboard, ChatbotPage }  from './pages';
import {ChatToaster} from './components/chat';

function App() {

  return (
    <BrowserRouter>
      <ChatToaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot/:chatbotId" element={<ChatbotPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
