export interface ActivityModel {
    name: string
    description: string
    location: string
  }
  
  export interface TransferModel {
    from_location: string
    to_location: string
    method: string
  }
  
  export interface HotelModel {
    name: string
    location: string
  }
  
  export interface DayModel {
    day_number: number
    hotel: HotelModel
    transfers: TransferModel[]
    activities: ActivityModel[]
  }
  
  export interface TripItineraryCreate {
    title: string
    region: string
    days: DayModel[]
  }
  
  export interface TripItinerary extends TripItineraryCreate {
    id: number
  }
  
  export interface RecommendationResponse {
    recommended_itinerary_id: number
  }
  