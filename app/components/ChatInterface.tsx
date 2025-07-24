'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { ChatWindow } from './ChatWindow'

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export function ChatInterface() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'New Chat',
      messages: [
        {
          id: '1',
          content: 'Hello! I\'m Blendy, your AI assistant. How can I help you today?',
          role: 'assistant',
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    }
  ])
  
  const [currentChatId, setCurrentChatId] = useState<string>('1')

  const currentChat = chats.find(chat => chat.id === currentChatId)

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    if (!currentChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date()
    }

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    )
  }

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [
        {
          id: '1',
          content: 'Hello! I\'m Blendy, your AI assistant. How can I help you today?',
          role: 'assistant',
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    }

    setChats(prevChats => [newChat, ...prevChats])
    setCurrentChatId(newChat.id)
  }

  const deleteChat = (chatId: string) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId))
    if (currentChatId === chatId && chats.length > 1) {
      setCurrentChatId(chats[0].id)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:block">
        <Sidebar 
          chats={chats}
          currentChatId={currentChatId}
          onChatSelect={setCurrentChatId}
          onNewChat={createNewChat}
          onDeleteChat={deleteChat}
        />
      </div>
      <ChatWindow 
        chat={currentChat}
        onSendMessage={addMessage}
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={setCurrentChatId}
        onNewChat={createNewChat}
        onDeleteChat={deleteChat}
      />
    </div>
  )
} 