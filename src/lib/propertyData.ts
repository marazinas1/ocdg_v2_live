// Property data configuration - easily swappable for future projects
import exteriorFront from "@/assets/exterior-front.jpg";
import exteriorSide from "@/assets/exterior-side.jpg";
import exteriorAerial from "@/assets/exterior-aerial.jpg";
import twilightBalcony from "@/assets/twilight-balcony.jpg";
import familyLawn from "@/assets/family-lawn.jpg";
import poolDining from "@/assets/pool-dining.jpg";
import floorGround from "@/assets/floor-ground.jpg";
import floorFirst from "@/assets/floor-first.jpg";
import floorSecond from "@/assets/floor-second.jpg";
import floorAttic from "@/assets/floor-attic.jpg";
import ocdgLogo from "@/assets/ocdg-logo.png";
import interiorLiving from "@/assets/morningside-int-01.jpg";
import interiorKitchen from "@/assets/morningside-int-02.jpg";
import interiorGreatRoom from "@/assets/morningside-int-03.jpg";
import interiorMaster from "@/assets/morningside-int-04.jpg";
import interiorMasterBath from "@/assets/morningside-int-05.jpg";
import interiorGuestBath from "@/assets/morningside-int-06.jpg";

export const propertyConfig = {
  name: "71 Morningside Road",
  headline: "Coastal Excellence",
  tagline: "A four-level architectural masterpiece in Ocean City's exclusive Gardens neighborhood — crafted for generations of ocean-side living, just steps from the beach.",
  price: "$5,995,000",
  developer: "Ocean City Development Group, LLC",
  logo: ocdgLogo,
  
  // Property Details from MLS
  details: {
    bedrooms: 6,
    fullBaths: 4,
    halfBaths: 1,
    totalRooms: 14,
    locationHighlight: "Prime Beach Block — Ocean-Side in the Gardens",
  },
  
  // Contact Information
  contact: {
    name: "Patrick Halliday",
    company: "Ocean City Development Group, LLC",
    phone: "(609) 602-3917",
    email: "PatrickAHalliday@gmail.com",
  },
  
  location: {
    city: "Ocean City",
    state: "NJ",
    coordinates: { lat: 39.2776, lng: -74.5746 },
    embedQuery: "71+Morningside+Rd,+Ocean+City,+NJ",
  },
  
  images: {
    hero: exteriorFront,
    exterior: [
      { src: exteriorFront, alt: "71 Morningside Road - Front Exterior View" },
      { src: exteriorSide, alt: "71 Morningside Road - Side Exterior View" },
      { src: exteriorAerial, alt: "71 Morningside Road - Aerial View with Pool" },
    ],
    lifestyle: [
      { src: twilightBalcony, alt: "Twilight view from master balcony" },
      { src: familyLawn, alt: "Family enjoying the front lawn" },
      { src: poolDining, alt: "Poolside dining and entertainment" },
    ],
    interior: [
      { src: interiorLiving, alt: "71 Morningside Road - Living Room & Fireplace" },
      { src: interiorKitchen, alt: "71 Morningside Road - Chef's Kitchen" },
      { src: interiorGreatRoom, alt: "71 Morningside Road - Open-Concept Great Room" },
      { src: interiorMaster, alt: "71 Morningside Road - Master Sanctuary" },
      { src: interiorMasterBath, alt: "71 Morningside Road - Master Bath" },
      { src: interiorGuestBath, alt: "71 Morningside Road - Guest Bath Suite" },
    ],
  },
  
  floorPlans: [
    { 
      id: "ground", 
      name: "Ground Level", 
      image: floorGround,
      description: "Multi-car garage with storage, an elegant entry foyer with custom trim work, and a 4-stop residential elevator with Longport interior cab. Step outside to a private in-ground pool with IPE decking, integrated drainage, and a landscaped spa-like oasis.",
      highlights: [
        "Multi-Car Garage with Ample Storage",
        "4-Stop Elevator · Longport Interior Cab",
        "Private In-Ground Pool & IPE Decking",
        "Integrated Drainage & Landscaping",
      ],
    },
    { 
      id: "first", 
      name: "First Floor", 
      image: floorFirst,
      description: "Junior Master Suite with full ensuite bath, additional guest bedrooms with thick-set mortar tile showers and custom tile work, and a dedicated laundry room for effortless living.",
      highlights: [
        "Junior Master with Full Ensuite Bath",
        "Thick-Set Mortar Tile Showers",
        "Custom Tile Work Throughout",
        "Dedicated Laundry Room",
      ],
    },
    { 
      id: "second", 
      name: "Second Floor", 
      image: floorSecond,
      description: "Open-concept great room with a gas fireplace and non-combustible hearth, flowing into a gourmet kitchen with full Wolf & Sub-Zero appliance package. Seamless access to a covered front porch with flower boxes and integrated irrigation.",
      highlights: [
        "Open-Concept Great Room & Gas Fireplace",
        "Gourmet Kitchen · Wolf & Sub-Zero",
        "Covered Front Porch · Flower Boxes",
        "Powder Room",
      ],
    },
    { 
      id: "third", 
      name: "Third Floor — The Crown Jewel", 
      image: floorAttic,
      description: "An entire floor devoted to the Master Sanctuary — spa-inspired Master Bath with floor-to-ceiling custom tile, a bespoke walk-in closet, and a private Master Deck offering unobstructed ocean views.",
      highlights: [
        "Master Sanctuary · Full Floor",
        "Spa-Inspired Master Bath",
        "Bespoke Walk-in Closet",
        "Private Master Deck · Ocean Views",
      ],
    },
  ],
  
  specs: [
    {
      icon: "elevator",
      title: "4-Stop Elevator",
      description: "Accredited residential elevator with Longport interior cab finish, serving all four levels from ground to the Master Sanctuary.",
    },
    {
      icon: "appliances",
      title: "Wolf & Sub-Zero",
      description: "Full luxury appliance package — Wolf range, Sub-Zero refrigeration, and premium fixtures throughout the gourmet kitchen.",
    },
    {
      icon: "floors",
      title: "Custom Hardwood & Tile",
      description: "8\", 9\" & 10\" random-width hardwood flooring with thick-set mortar tile showers and custom tile work in every bath.",
    },
    {
      icon: "resilience",
      title: "Coastal Engineering",
      description: "Hurricane-rated clips, CMU foundation, James Hardie Cedar Shingle siding, NuCedar accents, and standing seam metal roofing.",
    },
  ],
  
  luxuryFeatures: [
    "Full Wolf & Sub-Zero appliance package",
    "4-stop residential elevator · Longport cab",
    "Private in-ground pool & IPE decking",
    "8/9/10\" random-width hardwood flooring",
    "NuCedar Shingle & James Hardie siding",
    "Standing seam metal roofing",
    "Gas fireplace · non-combustible hearth",
    "Flower boxes with integrated irrigation",
  ],
  
  locationFeatures: [
    "Prime Beach Block — ocean-side, just 1.5 houses from the sand",
    "Ocean City's exclusive Gardens neighborhood",
    "Premium corner lot with exceptional privacy",
    "Minutes from downtown dining, boardwalk, and entertainment",
  ],
  
  interestLevels: [
    { value: "investor", label: "Investor" },
    { value: "primary", label: "Primary Residence" },
    { value: "secondary", label: "Secondary Home" },
  ],
};
