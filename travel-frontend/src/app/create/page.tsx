"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createItinerary } from "@/lib/api"
import type { TripItineraryCreate } from "@/lib/types"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function CreateItineraryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<TripItineraryCreate>({
    title: "",
    region: "",
    days: [
      {
        day_number: 1,
        hotel: {
          name: "",
          location: "",
        },
        transfers: [
          {
            from_location: "",
            to_location: "",
            method: "Car",
          },
        ],
        activities: [
          {
            name: "",
            description: "",
            location: "",
          },
        ],
      },
    ],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createItinerary(formData)
      toast({
        title: "Success!",
        description: "Your itinerary has been created.",
      })
      router.push("/itineraries")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create itinerary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const updateDayData = (dayIndex: number, field: string, value: any) => {
    const updatedDays = [...formData.days]
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      [field]: value,
    }

    setFormData({
      ...formData,
      days: updatedDays,
    })
  }

  const updateHotelData = (dayIndex: number, field: string, value: string) => {
    const updatedDays = [...formData.days]
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      hotel: {
        ...updatedDays[dayIndex].hotel,
        [field]: value,
      },
    }

    setFormData({
      ...formData,
      days: updatedDays,
    })
  }

  const updateTransferData = (dayIndex: number, transferIndex: number, field: string, value: string) => {
    const updatedDays = [...formData.days]
    const updatedTransfers = [...updatedDays[dayIndex].transfers]

    updatedTransfers[transferIndex] = {
      ...updatedTransfers[transferIndex],
      [field]: value,
    }

    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      transfers: updatedTransfers,
    }

    setFormData({
      ...formData,
      days: updatedDays,
    })
  }

  const updateActivityData = (dayIndex: number, activityIndex: number, field: string, value: string) => {
    const updatedDays = [...formData.days]
    const updatedActivities = [...updatedDays[dayIndex].activities]

    updatedActivities[activityIndex] = {
      ...updatedActivities[activityIndex],
      [field]: value,
    }

    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      activities: updatedActivities,
    }

    setFormData({
      ...formData,
      days: updatedDays,
    })
  }

  const addDay = () => {
    const newDayNumber = formData.days.length + 1

    setFormData({
      ...formData,
      days: [
        ...formData.days,
        {
          day_number: newDayNumber,
          hotel: {
            name: "",
            location: "",
          },
          transfers: [
            {
              from_location: "",
              to_location: "",
              method: "Car",
            },
          ],
          activities: [
            {
              name: "",
              description: "",
              location: "",
            },
          ],
        },
      ],
    })
  }

  const addTransfer = (dayIndex: number) => {
    const updatedDays = [...formData.days]

    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      transfers: [
        ...updatedDays[dayIndex].transfers,
        {
          from_location: "",
          to_location: "",
          method: "Car",
        },
      ],
    }

    setFormData({
      ...formData,
      days: updatedDays,
    })
  }

  const removeTransfer = (dayIndex: number, transferIndex: number) => {
    if (formData.days[dayIndex].transfers.length <= 1) {
      return
    }

    const updatedDays = [...formData.days]
    const updatedTransfers = [...updatedDays[dayIndex].transfers]

    updatedTransfers.splice(transferIndex, 1)

    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      transfers: updatedTransfers,
    }

    setFormData({
      ...formData,
      days: updatedDays,
    })
  }

  const addActivity = (dayIndex: number) => {
    const updatedDays = [...formData.days]

    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      activities: [
        ...updatedDays[dayIndex].activities,
        {
          name: "",
          description: "",
          location: "",
        },
      ],
    }

    setFormData({
      ...formData,
      days: updatedDays,
    })
  }

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    if (formData.days[dayIndex].activities.length <= 1) {
      return
    }

    const updatedDays = [...formData.days]
    const updatedActivities = [...updatedDays[dayIndex].activities]

    updatedActivities.splice(activityIndex, 1)

    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      activities: updatedActivities,
    }

    setFormData({
      ...formData,
      days: updatedDays,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create New Itinerary</h1>
        <p className="text-muted-foreground mt-2">Plan your perfect trip day by day</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the general details about your trip</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Itinerary Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="e.g. Summer Vacation in Thailand"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region/Destination</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => updateFormData("region", e.target.value)}
                placeholder="e.g. Phuket, Thailand"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="day-1" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="flex-wrap h-auto">
              {formData.days.map((day, index) => (
                <TabsTrigger key={index} value={`day-${day.day_number}`} className="mb-1">
                  Day {day.day_number}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button type="button" variant="outline" onClick={addDay} className="gap-1">
              <Plus className="h-4 w-4" /> Add Day
            </Button>
          </div>

          {formData.days.map((day, dayIndex) => (
            <TabsContent key={dayIndex} value={`day-${day.day_number}`} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Day {day.day_number} - Accommodation</CardTitle>
                  <CardDescription>Enter details about where you'll be staying</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`hotel-name-${dayIndex}`}>Hotel/Accommodation Name</Label>
                    <Input
                      id={`hotel-name-${dayIndex}`}
                      value={day.hotel.name}
                      onChange={(e) => updateHotelData(dayIndex, "name", e.target.value)}
                      placeholder="e.g. Beachfront Resort"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`hotel-location-${dayIndex}`}>Location</Label>
                    <Input
                      id={`hotel-location-${dayIndex}`}
                      value={day.hotel.location}
                      onChange={(e) => updateHotelData(dayIndex, "location", e.target.value)}
                      placeholder="e.g. Patong Beach"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Day {day.day_number} - Transfers</CardTitle>
                  <CardDescription>Add transportation details for this day</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {day.transfers.map((transfer, transferIndex) => (
                    <div key={transferIndex} className="space-y-4">
                      {transferIndex > 0 && <Separator />}
                      <div className="flex justify-between items-center pt-2">
                        <h4 className="font-medium">Transfer {transferIndex + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTransfer(dayIndex, transferIndex)}
                          disabled={day.transfers.length <= 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`transfer-from-${dayIndex}-${transferIndex}`}>From</Label>
                          <Input
                            id={`transfer-from-${dayIndex}-${transferIndex}`}
                            value={transfer.from_location}
                            onChange={(e) =>
                              updateTransferData(dayIndex, transferIndex, "from_location", e.target.value)
                            }
                            placeholder="e.g. Hotel"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`transfer-to-${dayIndex}-${transferIndex}`}>To</Label>
                          <Input
                            id={`transfer-to-${dayIndex}-${transferIndex}`}
                            value={transfer.to_location}
                            onChange={(e) => updateTransferData(dayIndex, transferIndex, "to_location", e.target.value)}
                            placeholder="e.g. Beach"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`transfer-method-${dayIndex}-${transferIndex}`}>Method</Label>
                        <Input
                          id={`transfer-method-${dayIndex}-${transferIndex}`}
                          value={transfer.method}
                          onChange={(e) => updateTransferData(dayIndex, transferIndex, "method", e.target.value)}
                          placeholder="e.g. Car, Boat, Train"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addTransfer(dayIndex)}
                    className="w-full gap-1"
                  >
                    <Plus className="h-4 w-4" /> Add Another Transfer
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Day {day.day_number} - Activities</CardTitle>
                  <CardDescription>Add activities and experiences for this day</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {day.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="space-y-4">
                      {activityIndex > 0 && <Separator />}
                      <div className="flex justify-between items-center pt-2">
                        <h4 className="font-medium">Activity {activityIndex + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeActivity(dayIndex, activityIndex)}
                          disabled={day.activities.length <= 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`activity-name-${dayIndex}-${activityIndex}`}>Activity Name</Label>
                        <Input
                          id={`activity-name-${dayIndex}-${activityIndex}`}
                          value={activity.name}
                          onChange={(e) => updateActivityData(dayIndex, activityIndex, "name", e.target.value)}
                          placeholder="e.g. Snorkeling Tour"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`activity-location-${dayIndex}-${activityIndex}`}>Location</Label>
                        <Input
                          id={`activity-location-${dayIndex}-${activityIndex}`}
                          value={activity.location}
                          onChange={(e) => updateActivityData(dayIndex, activityIndex, "location", e.target.value)}
                          placeholder="e.g. Coral Bay"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`activity-description-${dayIndex}-${activityIndex}`}>Description</Label>
                        <Textarea
                          id={`activity-description-${dayIndex}-${activityIndex}`}
                          value={activity.description}
                          onChange={(e) => updateActivityData(dayIndex, activityIndex, "description", e.target.value)}
                          placeholder="Describe the activity..."
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addActivity(dayIndex)}
                    className="w-full gap-1"
                  >
                    <Plus className="h-4 w-4" /> Add Another Activity
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Itinerary...
              </>
            ) : (
              "Create Itinerary"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
