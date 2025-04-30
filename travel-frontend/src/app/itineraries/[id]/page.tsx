import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bed, Calendar, Car, MapPin, Palmtree } from "lucide-react"
import { getItineraries } from "@/lib/api"

export default async function ItineraryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const itineraryId = Number.parseInt(params.id)

  if (isNaN(itineraryId)) {
    return notFound()
  }

  const itineraries = await getItineraries()
  const itinerary = itineraries.find((i) => i.id === itineraryId)
 console.log("iti" ,itinerary);
 
  if (!itinerary) {
    return notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{itinerary.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{itinerary.region}</span>
        </div>
      </div>

      <Tabs defaultValue={`day-1`} className="w-full">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          {itinerary.days.map((day) => (
            <TabsTrigger key={day.id} value={`day-${day.day_number}`} className="mb-1">
              Day {day.day_number}
            </TabsTrigger>
          ))}
        </TabsList>

        {itinerary.days.map((day) => (
          <TabsContent key={day.id} value={`day-${day.day_number}`} className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Day {day.day_number}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hotel */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <Bed className="h-5 w-5 text-primary" />
                    Accommodation
                  </h3>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">{day.hotel.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {day.hotel.location}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* Transfers */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <Car className="h-5 w-5 text-primary" />
                    Transfers
                  </h3>
                  <div className="space-y-3">
                    {day.transfers.map((transfer, index) => (
                      <Card key={index}>
                        <CardHeader className="py-3">
                          <CardTitle className="text-base flex items-center justify-between">
                            <span>
                              {transfer.from_location} to {transfer.to_location}
                            </span>
                            <Badge>{transfer.method}</Badge>
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <Palmtree className="h-5 w-5 text-primary" />
                    Activities
                  </h3>
                  <div className="space-y-3">
                    {day.activities.map((activity, index) => (
                      <Card key={index}>
                        <CardHeader className="py-3">
                          <CardTitle className="text-base">{activity.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm">{activity.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
