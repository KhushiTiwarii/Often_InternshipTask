'use client'

import React, { useState, useEffect } from 'react'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Utensils, Building2, Sun, Loader2, Send } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

interface DayPlan {
  day: string
  activities: string[]
  description: string
}

export default function Itinerary() {
  const [destination, setDestination] = useState('')
  const [days, setDays] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null)
  const [chat, setChat] = useState<any>(null)

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || ''
  const MODEL_NAME = 'gemini-2.0-pro-exp-02-05'
  const genAI = new GoogleGenerativeAI(API_KEY)

  const generationConfig = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  }

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ]

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI.getGenerativeModel({ model: MODEL_NAME }).startChat({ generationConfig, safetySettings })
        setChat(newChat)
      } catch {
        setError("Failed to initialize chat. Please try again.")
        toast.error("Failed to initialize chat.")
      }
    }
    initChat()
  }, [])

  const handleSubmit = async () => {
    if (!destination.trim() || !days.trim()) {
      setError("Please provide both a destination and number of days.")
      toast.error("Please provide both a destination and number of days.")
      return
    }

    setLoading(true)
    setError(null)
    const loadingToast = toast.loading("Generating your itinerary...")

    try {
      const inputPrompt = `
        You are an expert travel planner. Provide a day-by-day plan in JSON format with keys "day", "activities", "description" only.
        Destination: ${destination}, Days: ${days}.
      `
      const result = await chat.sendMessage(inputPrompt)
      const resultText = await result.response.text()
      const cleaned = resultText.replace(/```json|```/g, '').trim()
      const parsed: DayPlan[] = JSON.parse(cleaned)

      setItinerary(parsed)
      toast.success("Itinerary generated!")
    } catch (err) {
      console.error("Error:", err)
      setError("Failed to generate itinerary. Please try again.")
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      toast.dismiss(loadingToast)
    }
  }

  const getActivityIcon = (activity: string) => {
    const a = activity.toLowerCase()
    if (a.includes('visit')) return <MapPin className="h-4 w-4" />
    if (a.includes('dinner') || a.includes('lunch')) return <Utensils className="h-4 w-4" />
    if (a.includes('temple')) return <Building2 className="h-4 w-4" />
    return <Sun className="h-4 w-4" />
  }

  return (
    <div className="max-w-md mx-auto space-y-8 py-10">
      <Toaster position="top-right" />
      <div className="text-center">
        <h1 className="text-3xl font-bold">Trip Itinerary Planner</h1>
        <p className="text-muted-foreground mt-2">Plan your trip day-by-day</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
          <CardDescription>Enter destination and number of days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Destination (e.g. Paris)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <Input
              placeholder="Number of days"
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleSubmit} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Create Itinerary
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {itinerary && (
        <div className="space-y-6">
          {itinerary.map((day, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Day {day.day}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ScrollArea className="h-40">
                  {day.activities.map((act, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm p-2 bg-muted rounded">
                      {getActivityIcon(act)}
                      <span>{act}</span>
                    </div>
                  ))}
                </ScrollArea>
                <Separator />
                <p className="text-sm text-muted-foreground">{day.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
