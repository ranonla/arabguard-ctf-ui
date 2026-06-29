import { Box } from "@mui/material";
import { ChatIntercface } from "../components/chat";
import ChatbotsSidebar from "../components/chat/ChatbotsSidebar";
import { useState, useEffect, useRef } from "react";
import ChatbotModal from "../components/chat/ChatbotModal";
import { useParams, useNavigate } from "react-router-dom";
import { useChatbots } from "../hooks/useChatbots";
import { useChat } from "../context/ChatContext";
import TerminalCard from "../components/TerminalCard";
import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";

const ChatbotPage = () => {
    const [showChatbotModal, setShowChatbotModal] = useState<boolean>(false);
    const { data: chatbots = [], isLoading } = useChatbots();
    const { chatbotId } = useParams();
    const previousBotId = useRef<string | undefined>(undefined);
    const [level_passed, setLevel_passed] = useState<boolean>(false);
    const [modalBot, setModalBot] = useState<any>(null);
    const selectedBot = chatbots.find((b) => b.id === chatbotId);
    const { loadChat, clearChat } = useChat();
    const isLastBot = chatbots.findIndex((b) => b.id === chatbotId) === chatbots.length - 1;
    const currentBotIndex = chatbots.findIndex((b) => b.id === chatbotId);
    const compromisedCount = currentBotIndex + 1;
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!chatbotId || !selectedBot) return;
        if (previousBotId.current === chatbotId) return;
        const isLevelPassed = modalBot?.id === chatbotId && !showChatbotModal;
        if (!isLevelPassed) {
            setModalBot(selectedBot);
            setShowChatbotModal(true);
        }
        
        previousBotId.current = chatbotId;
    }, [chatbotId, selectedBot]);

    const handleTerminalNextClick = () => {
        const currentBotIndex = chatbots.findIndex((b) => b.id === chatbotId);
        const nextBot = chatbots[currentBotIndex + 1];

        if (nextBot) {
            setModalBot(nextBot); 
            setLevel_passed(false); 
            setShowChatbotModal(true); 
        }else{
            queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
            queryClient.invalidateQueries({ queryKey: ["my-stats"] });
            navigate("/dashboard");
        }
    };

    const handleModalStart = () => {
        const token = localStorage.getItem("access_token");
        const user_id = token ? (jwtDecode(token) as any).user_id : null;
        if (!user_id) return;

        setShowChatbotModal(false);
        if (modalBot && modalBot.id !== chatbotId) {
            clearChat(); 
            navigate(`/chatbot/${modalBot.id}`);
            loadChat(modalBot.id, user_id);
        } else {
            loadChat(chatbotId!, user_id);
        }
    };

    if (isLoading) return null;

    return (
        <Box sx={{ display: "flex", height: "100vh", background: "#020617" }}>
            <ChatbotsSidebar />

            <ChatIntercface 
                bot={selectedBot} 
                level_passed={level_passed} 
                setLevel_passed={setLevel_passed} 
            />

            {level_passed && (
                <Box sx={{
                    position: "fixed", inset: 0, zIndex: 2000,
                    display: "flex", justifyContent: "center", alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
                }}>
                    <TerminalCard
                        level_passed={level_passed}
                        onClick={handleTerminalNextClick}
                        isLastBot={isLastBot}
                        compromisedCount={compromisedCount}
                        variant="game"
                    />
                </Box>
            )}

            {showChatbotModal && (
                <ChatbotModal
                    open={showChatbotModal}
                    onClose={handleModalStart}
                    bot={modalBot}
                />
            )}
        </Box>
    );
};

export default ChatbotPage;