import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getItineraries } from "@/lib/api"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, MapPin } from "lucide-react"

export default async function ItinerariesPage() {
  const itineraries = await getItineraries()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Itineraries</h1>
        <Link href="/create">
          <Button>Create New Itinerary</Button>
        </Link>
      </div>

      {itineraries.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No itineraries found</h2>
          <p className="text-muted-foreground mb-6">You haven&apos;t created any travel itineraries yet.</p>
          <Link href="/create">
            <Button>Create Your First Itinerary</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <Card key={itinerary.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{itinerary.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {itinerary.region}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <p className="text-sm text-muted-foreground mb-4">{itinerary.days.length} days itinerary</p> */}
                <Link href={`/itineraries/${itinerary.id}`}>
                  <Button variant="outline" className="w-full gap-2 cursor-pointer">
                    <Eye className="h-4 w-4 cursor-pointer" /> View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
