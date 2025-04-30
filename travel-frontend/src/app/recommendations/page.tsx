"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getRecommendation } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function RecommendationsPage() {
  const [nights, setNights] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nights || isNaN(Number.parseInt(nights)) || Number.parseInt(nights) <= 0) {
      setError("Please enter a valid number of nights")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await getRecommendation(Number.parseInt(nights))
      router.push(`/itineraries/${result.recommended_itinerary_id}`)
    } catch (err) {
      setError("No recommendation found for this duration. Please try a different number of nights.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Get Recommendations</h1>
        <p className="text-muted-foreground mt-2">Find the perfect itinerary based on your trip duration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Duration</CardTitle>
          <CardDescription>Enter the number of nights for your trip to get a recommended itinerary</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nights">Number of Nights</Label>
              <Input
                id="nights"
                type="number"
                min="1"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                placeholder="e.g. 3"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding recommendations...
                </>
              ) : (
                "Get Recommendation"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
