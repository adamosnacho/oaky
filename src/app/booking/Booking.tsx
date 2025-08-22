"use client";
import React, { JSX, useState, useCallback } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Plane,
  CarTaxiFront,
  ArrowLeft,
  CreditCard,
  User,
  Mail,
  Phone,
  MousePointerClick,
} from "lucide-react";

// Types
interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  description: string;
  amenities: string[];
  featured: boolean;
  bookable: boolean;
}

interface SearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

interface BookingData {
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
}

type ViewType = "home" | "reservation" | "payment";
type NavType = "flights" | "taxi";

// Easily configurable hotels data
const HOTELS_CONFIG: Hotel[] = [
  {
    id: 4,
    name: "Radisson Blu Hotel Gdańsk",
    location: "ul. Długi Targ 19, 80-828 Gdańsk, Polska",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/524484964.jpg?k=9e761593b8e2993f46c40c91b7def8bd225de005082788b615487a0dbef61311&o=",
    rating: 9.5,
    reviews: 6250,
    price: 690,
    originalPrice: 950,
    description:
      "Najlepsza oferta w Gdańsku - luksusowy hotel w sercu Starego Miasta, z eleganckimi pokojami, restauracjami i centrum wellness",
    amenities: ["wifi", "parking", "breakfast", "gym", "spa"],
    featured: true,
    bookable: true,
  },
  {
    id: 5,
    name: "Radisson RED Gdańsk",
    location: "ul. Chmielna 12, 80-830 Gdańsk, Polska",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/382817767.jpg?k=63e8c8c0c3007084a998d58b2c6a70f1a3a745febf229d91f3f1d2fcaab721b8&o=",
    rating: 9.5,
    reviews: 6250,
    price: 690,
    originalPrice: 950,
    description:
      "Najlepsza oferta w Gdańsku - stylowy hotel z nowoczesnym designem, świetną lokalizacją i dostępem do restauracji oraz wellness",
    amenities: ["wifi", "parking", "breakfast", "gym", "spa"],
    featured: false,
    bookable: false,
  },
  {
    id: 1,
    name: "Holiday Inn Gdańsk – City Centre by IHG",
    location: "ul. Chmielna 1, 80-750 Gdańsk, Polska",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/245803191.jpg?k=9091cd36449ccf8778f516e78320de6aec7b86944ae9ff77cba1e3e393053ef2&o=",
    rating: 9.2,
    reviews: 5037,
    price: 714,
    originalPrice: 900,
    description:
      "Nowoczesny hotel w centrum Gdańska z widokiem na Motławę, idealny dla turystów i podróżujących służbowo",
    amenities: ["wifi", "parking", "breakfast", "gym"],
    featured: false,
    bookable: false,
  },
  {
    id: 2,
    name: "Mercure Gdańsk Stare Miasto",
    location: "ul. Heweliusza 22, 80-830 Gdańsk, Polska",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/577750044.jpg?k=1253b7141ab7a1cecbb8684bd3a8110b8c7746c48889d0268d70e3eca392f519&o=",
    rating: 8.9,
    reviews: 3210,
    price: 650,
    originalPrice: 820,
    description:
      "Elegancki hotel w sercu Starego Miasta, oferujący komfortowe pokoje i taras z widokiem na miasto",
    amenities: ["wifi", "parking", "breakfast", "bar"],
    featured: false,
    bookable: false,
  },
  {
    id: 3,
    name: "Novotel Gdańsk Centrum",
    location: "ul. Mila 2, 80-805 Gdańsk, Polska",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/273776657.jpg?k=2ed182b049c16b04063cb982ab7b61ed1fd157f0258b5e931f1c45cf9e66a228&o=",
    rating: 9.0,
    reviews: 4125,
    price: 680,
    originalPrice: 850,
    description:
      "Rodzinny hotel z przestronnym ogrodem i centrum konferencyjnym, w pobliżu Starego Miasta",
    amenities: ["wifi", "parking", "breakfast", "pool"],
    featured: false,
    bookable: false,
  },
];

interface ReservationScreenProps {
  selectedHotel: Hotel | null;
  bookingData: BookingData;
  handleBookingInputChange: (field: keyof BookingData, value: string) => void;
  proceedToPayment: () => void;
  goBackToHome: () => void;
  searchData: any;
}

const ReservationScreen = ({
  selectedHotel,
  bookingData,
  handleBookingInputChange,
  proceedToPayment,
  goBackToHome,
  searchData
}: ReservationScreenProps) => {
  return <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <header className="bg-blue-700 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={goBackToHome}
            className="text-white hover:text-gray-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-2xl font-bold">Booking.com</div>
        </div>
      </div>
    </header>

    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Hotel Info Header */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-start space-x-4">
            <img
              src={selectedHotel?.image}
              alt={selectedHotel?.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedHotel?.name}
              </h1>
              <p className="text-gray-600 flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {selectedHotel?.location}
              </p>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium">
                  {selectedHotel?.rating}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({selectedHotel?.reviews} opinii)
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                ${selectedHotel?.price}
              </div>
              <div className="text-gray-500">/noc</div>
            </div>
          </div>
        </div>

        {/* Booking Form - Simplified */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Dane gościa</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imię *
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={bookingData.firstName}
                  onChange={(e) =>
                    handleBookingInputChange("firstName", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Wprowadź imię"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nazwisko *
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={bookingData.lastName}
                  onChange={(e) =>
                    handleBookingInputChange("lastName", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Wprowadź nazwisko"
                />
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">Podsumowanie rezerwacji</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Hotel:</span>
                <span>{selectedHotel?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Goście:</span>
                <span>{searchData.guests}</span>
              </div>
              <div className="flex justify-between">
                <span>Cena za noc:</span>
                <span>${selectedHotel?.price}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Łącznie:</span>
                <span>${selectedHotel?.price}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={goBackToHome}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button
              onClick={proceedToPayment}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Przejdź do płatności
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

const BookingClonePL: React.FC = () => {
  const [searchData, setSearchData] = useState<SearchData>({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2 dorosłych · 0 dzieci · 1 pokój",
  });

  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(HOTELS_CONFIG);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showRadissonMessage, setShowRadissonMessage] =
    useState<boolean>(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: "",
    lastName: "",
    // Pre-filled credit card data (not modifiable)
    cardNumber: "G1O2 F3O4R 5W6A 7R8D",
    expiryDate: "12/28",
    cvv: "456",
    cardHolder: "Rodzice Płacą",
  });
  const [isProcessingPayment, setIsProcessingPayment] =
    useState<boolean>(false);
  const [isNotifing, setIsNotifing] = useState<boolean>(false);

  const amenityIcons: { [key: string]: JSX.Element } = {
    wifi: <Wifi className="w-4 h-4" />,
    parking: <Car className="w-4 h-4" />,
    breakfast: <Coffee className="w-4 h-4" />,
    gym: <Dumbbell className="w-4 h-4" />,
  };

  // Memoized handlers to prevent unnecessary re-renders
  const handleSearch = useCallback((): void => {
    if (searchData.destination) {
      const filtered = HOTELS_CONFIG.filter(
        (hotel) =>
          hotel.location
            .toLowerCase()
            .includes(searchData.destination.toLowerCase()) ||
          hotel.name
            .toLowerCase()
            .includes(searchData.destination.toLowerCase())
      );
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(HOTELS_CONFIG);
    }
  }, [searchData.destination]);

  const handleInputChange = useCallback(
    (field: keyof SearchData, value: string): void => {
      setSearchData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const openNav = useCallback((type: NavType): void => {
    setShowMessage(true);
  }, []);

  const handleBookNow = useCallback((hotel: Hotel): void => {
    if (!hotel.bookable) {
      setShowRadissonMessage(true);
      return;
    }
    setSelectedHotel(hotel);
    setCurrentView("reservation");
  }, []);

  const handleBookingInputChange = useCallback(
    (field: keyof BookingData, value: string): void => {
      setBookingData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const proceedToPayment = useCallback((): void => {
    // Basic validation - only name and surname required
    if (!bookingData.firstName || !bookingData.lastName) {
      alert("Proszę wypełnić imię i nazwisko");
      return;
    }
    setCurrentView("payment");
  }, [bookingData.firstName, bookingData.lastName]);

  const processPayment = useCallback(async (): Promise<void> => {
    // No validation needed since card details are pre-filled
    setIsProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      // Reset to home view
      setCurrentView("home");
      setSelectedHotel(null);
      setIsNotifing(true);
      setBookingData({
        firstName: "",
        lastName: "",
        // Keep the same pre-filled card data
        cardNumber: "4532 1234 5678 9012",
        expiryDate: "12/28",
        cvv: "456",
        cardHolder: "RODZICE PLATFORMA",
      });
      alert("Rezerwacja została pomyślnie złożona!");
    }, 2000);
  }, []);

  const goBackToHome = useCallback((): void => {
    setCurrentView("home");
    setSelectedHotel(null);
  }, []);

  const goBackToReservation = useCallback((): void => {
    setCurrentView("reservation");
  }, []);

  const closeMessage = useCallback(() => {
    setShowMessage(false);
  }, []);

  const closeRadissonMessage = useCallback(() => {
    setShowRadissonMessage(false);
  }, []);

  // Notification component
  const Notification = () => {
    if (!isNotifing) return null;
    return (
      <div className="w-vws fixed left-0 top-0 bg-white rounded-md border-1 border-gray-100 z-100 p-2 m-3">
        <p className="text-gray-800 flex items-center gap-2">
          Dziękujemy za złożenie rezerwacji w Radisson Gdańsk! Mamy kilka ofert
          które mogły by Cię zainteresować
          <a
            href="/"
            className="text-cyan-600 hover:underline flex items-center"
          >
            <MousePointerClick /> Zobacz Teraz!
          </a>
        </p>
      </div>
    );
  };

  // Payment Screen Component
  const PaymentScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={goBackToReservation}
              className="text-white hover:text-gray-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-2xl font-bold">Booking.com</div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Płatność</h1>

            {/* Payment Form - Pre-filled and non-modifiable */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numer karty
                </label>
                <div className="relative" title="Rodzice Płacą">
                  <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={bookingData.cardNumber}
                    readOnly
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data wygaśnięcia
                  </label>
                  <input
                    type="text"
                    value={bookingData.expiryDate}
                    readOnly
                    title="Rodzice Płacą"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={bookingData.cvv}
                    readOnly
                    title="Rodzice Płacą"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imię i nazwisko na karcie
                </label>
                <input
                  type="text"
                  value={bookingData.cardHolder}
                  readOnly
                  title="Rodzice Płacą"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Podsumowanie zamówienia</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Hotel:</span>
                  <span>{selectedHotel?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gość:</span>
                  <span>
                    {bookingData.firstName} {bookingData.lastName}
                  </span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t text-lg">
                  <span>Do zapłaty:</span>
                  <span className="text-blue-600">${selectedHotel?.price}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={goBackToReservation}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                disabled={isProcessingPayment}
              >
                Wstecz
              </button>
              <button
                onClick={processPayment}
                disabled={isProcessingPayment}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium min-w-[120px]"
              >
                {isProcessingPayment ? "Przetwarzanie..." : "Zapłać teraz"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Home Screen
  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Notification />
      {/* Header */}
      <header className="bg-blue-700 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">Booking.com</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>PLN</span>
              <div className="w-6 h-4 bg-white rounded-sm flex items-center justify-center">
                <span className="text-red-600 text-xs font-bold">🇵🇱</span>
              </div>
            </div>
          </div>
        </div>
        {/* Navigation tabs - only Flights and Airport taxis (Polish) */}
        <div className="max-w-7xl mx-auto mt-4 px-6">
          <div className="flex space-x-4">
            <button
              onClick={() => openNav("flights")}
              className="bg-blue-800 bg-opacity-50 px-4 py-2 rounded-full flex items-center space-x-2 text-sm"
            >
              <Plane className="w-4 h-4" />
              <span>Loty</span>
            </button>
            <button
              onClick={() => openNav("taxi")}
              className="px-4 py-2 rounded-full flex items-center space-x-2 text-sm hover:bg-blue-800 hover:bg-opacity-30"
            >
              <CarTaxiFront className="w-4 h-4" />
              <span>Taksówki z lotniska</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Znajdź następny pobyt
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Szukaj ofert na hotele, domy i nie tylko...
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-yellow-400 rounded-lg p-1 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* Destination */}
              <div className="flex items-center bg-white rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none px-4 py-3">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Gdzie się wybierasz?"
                  value={searchData.destination}
                  onChange={(e) =>
                    handleInputChange("destination", e.target.value)
                  }
                  className="w-full outline-none text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Dates */}
              <div className="flex items-center bg-white border-t sm:border-t-0 sm:border-l border-gray-300 px-4 py-3">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div className="flex-1 text-gray-900 text-sm">
                  Data przyjazdu — Data wyjazdu
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center bg-white border-t sm:border-t-0 sm:border-l border-gray-300 px-4 py-3">
                <Users className="w-5 h-5 text-gray-400 mr-3" />
                <div className="text-gray-900 text-sm whitespace-nowrap">
                  {searchData.guests}
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold transition duration-200 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none w-full"
              >
                Szukaj
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Offers section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oferty</h2>
          <p className="text-gray-600">
            Promocje, oferty i specjalne rabaty dla Ciebie
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-64 flex">
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Zamieszkaj jak w domu
                </h3>
                <p className="text-gray-600 mb-4">
                  Zaoszczędź do 20% z ofertą Getaway Twój wymarzony pobyt —
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium self-start">
                Zobacz oferty
              </button>
            </div>
            <div
              className="w-1/2 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=300&fit=crop')",
              }}
            ></div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-64 flex">
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Szybki wypad
                </h3>
                <p className="text-gray-600 mb-4">
                  Zaoszczędź do 20% z ofertą Getaway
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium self-start">
                Zobacz oferty
              </button>
            </div>
            <div
              className="w-1/2 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop')",
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Hotels section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Polecane hotele
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {hotel.featured && (
                <div className="relative">
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold z-10">
                    Polecany
                  </span>
                </div>
              )}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {hotel.rating}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {hotel.location}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  {hotel.description}
                </p>
                <div className="flex items-center mb-3">
                  <span className="text-sm text-gray-500 mr-2">
                    ({hotel.reviews} opinii)
                  </span>
                  <div className="flex space-x-2">
                    {hotel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="text-gray-400"
                        title={amenity}
                      >
                        {amenityIcons[amenity]}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {hotel.originalPrice > hotel.price && (
                      <span className="text-gray-500 line-through text-sm mr-2">
                        ${hotel.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-blue-600">
                      ${hotel.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/noc</span>
                  </div>
                  <button
                    onClick={() => handleBookNow(hotel)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                  >
                    Rezerwuj
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Brak hoteli spełniających kryteria wyszukiwania.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Pomoc</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Obsługa klienta
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pomoc dla partnerów
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Kariera
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Odkryj</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Program lojalnościowy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Okazje sezonowe
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Porady podróżnicze
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Warunki i ustawienia
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Prywatność i pliki cookie
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Regulamin
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Rozwiązywanie sporów
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Partnerzy</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Logowanie Extranet
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Centrum partnerów
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Partnerzy łączności
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  // Render the appropriate screen based on current view
  return (
    <>``
      {currentView === "home" && <HomeScreen />}
      {currentView === "reservation" && <ReservationScreen selectedHotel={selectedHotel} bookingData={bookingData} handleBookingInputChange={handleBookingInputChange} proceedToPayment={proceedToPayment} goBackToHome={goBackToHome} searchData={searchData} />}
      {currentView === "payment" && <PaymentScreen />}

      {/* Modal with the required Polish message when Flights or Taxi opened */}
      {showMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeMessage}
          ></div>
          <div className="bg-white rounded-lg p-8 z-60 max-w-md mx-4 text-center">
            <h3 className="text-xl font-bold mb-4">
              A ty gdzie się wybierasz?
            </h3>
            <p className="mb-6">Wracaj do Gdańska!</p>
            <button
              onClick={closeMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              OK?
            </button>
          </div>
        </div>
      )}

      {/* Modal for non-Radisson hotels */}
      {showRadissonMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeRadissonMessage}
          ></div>
          <div className="bg-white rounded-lg p-8 z-60 max-w-md mx-4 text-center">
            <h3 className="text-xl font-bold mb-4 text-red-600">
              Serio Radisson Blu jest lepszy
            </h3>
            <p className="mb-6 text-gray-600">
              Ten hotel nie jest dostępny do rezerwacji. Radisson Blu Hotel
              Gdańsk oferuje najlepszą jakość!
            </p>
            <button
              onClick={closeRadissonMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              OK, rozumiem
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingClonePL;
