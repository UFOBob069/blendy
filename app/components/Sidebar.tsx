'use client'

import { Chat } from './ChatInterface'
import { Trash2, Plus, MessageSquare } from 'lucide-react'

interface SidebarProps {
  chats: Chat[]
  currentChatId: string
  onChatSelect: (chatId: string) => void
  onNewChat: () => void
  onDeleteChat: (chatId: string) => void
}

export function Sidebar({ chats, currentChatId, onChatSelect, onNewChat, onDeleteChat }: SidebarProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full hidden md:flex">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Blendy</h1>
            <p className="text-sm text-gray-500">AI Assistant</p>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 transition-colors duration-200 font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto chat-scrollbar">
        <div className="px-4 space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group relative flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                currentChatId === chat.id
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  currentChatId === chat.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {chat.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(chat.createdAt)}
                </p>
              </div>
              
              {chats.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteChat(chat.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Powered by AI
        </div>
      </div>
    </div>
  )
} 