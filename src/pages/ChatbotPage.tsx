import { Box } from "@mui/material";
import { ChatIntercface } from "../components/chat";
import ChatbotsSidebar from "../components/chat/ChatbotsSidebar";
import { useState, useEffect } from "react";
import { chatbots } from "../constants";
import ChatbotModal from "../components/chat/ChatbotModal";
import { useParams } from "react-router-dom";

const ChatbotPage = () => {
    const [ showChatbotModal, setShowChatbotModal ] = useState<boolean>(false);
    const { chatbotId } = useParams();
    const selectedBot = chatbots.find((b) => b.id === chatbotId);
    useEffect(() => {
        if(chatbotId){
            setShowChatbotModal(true);
        }
    },[chatbotId])
    return (
        <Box
        sx={{
            display: "flex",
            height: "100vh",
            background: "#020617",
        }}
        >
        
            <ChatbotsSidebar />

            <ChatIntercface bot={selectedBot}
            userId={1}
            />

            {showChatbotModal &&
                <ChatbotModal
                open={showChatbotModal}
                onClose={() => setShowChatbotModal(false)} 
                bot={selectedBot}
                />
            }

        </Box>
    );
};

export default ChatbotPage;