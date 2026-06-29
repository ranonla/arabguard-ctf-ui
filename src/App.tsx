import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home, Dashboard, ChatbotPage }  from './pages';
import {ChatToaster} from './components/chat';
import AdminPanel from './pages/AdminPanel';
import { DisplayCharacters, AddCharacter } from './components/Admin';

function App() {

  return (
    <BrowserRouter>
      <ChatToaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/chatbot/:chatbotId" element={<ChatbotPage />} />
        <Route path="/admin/characters" element={<DisplayCharacters />} />
        <Route path="/admin/character/new" element={<AddCharacter />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
