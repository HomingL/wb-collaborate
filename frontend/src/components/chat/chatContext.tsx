
import React, { useState, useContext, createContext, useEffect } from 'react'
import { message } from '../chat/chat'

export interface Chatprops {
    messages: message[];
    setMessages?: (state : message[]) => void;
}

const ChatContext = createContext<Chatprops>({
    messages: [],
});

const ChatProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<message[]>([]);

    return (
        <ChatContext.Provider value={{messages, setMessages}}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
    return useContext(ChatContext);
}

export  { ChatContext, ChatProvider}