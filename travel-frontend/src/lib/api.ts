import type { TripItineraryCreate } from "./types"

const API_URL = "http://localhost:8000"

export async function getItineraries() {
  try {
    const response = await fetch(`${API_URL}/itineraries/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch itineraries:", error)
    return []
  }
}

export async function getItineraryById(id: number) {
  const response = await fetch(`${API_URL}/itineraries/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}

export async function createItinerary(itineraryData: TripItineraryCreate) {
  const response = await fetch(`${API_URL}/itineraries/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itineraryData),
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}

export async function getRecommendation(nights: number) {
  const response = await fetch(`${API_URL}/recommendations/${nights}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}
