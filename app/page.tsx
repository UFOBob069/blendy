'use client'

import { useState } from 'react'
import { ChatInterface } from './components/ChatInterface'

export default function Home() {
  return (
    <main className="h-screen bg-gray-50">
      <ChatInterface />
    </main>
  )
}
