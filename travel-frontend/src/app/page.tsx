import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Calendar, Globe, Map } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Plan Your Perfect Travel Itinerary
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Create, view, and get recommendations for your next adventure with our easy-to-use travel planner.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/create">
                <Button size="lg" className="gap-1 cursor-pointer">
                  Create Itinerary <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/itineraries">
                <Button variant="outline" size="lg" className=" cursor-pointer">
                  View Itineraries
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6 py-12">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Create Itineraries</CardTitle>
              <CardDescription>
                Plan your trip day by day with activities, accommodations, and transfers.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/create" className="w-full">
                <Button className="w-full">Get Started</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Map className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>View Itineraries</CardTitle>
              <CardDescription>Browse through your saved travel plans and itineraries.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/itineraries" className="w-full">
                <Button variant="outline" className="w-full">
                  View All
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Get Recommendations</CardTitle>
              <CardDescription>Discover recommended itineraries based on your trip duration.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/recommendations" className="w-full">
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
