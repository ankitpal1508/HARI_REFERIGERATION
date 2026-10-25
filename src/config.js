// ============================================================
//  HARI REFRIGERATION — SITE CONFIGURATION
//  Edit this file to update text, images, services, contacts
// ============================================================

// Tagline options (pick one — change SITE_CONFIG.tagline below):
//  1. "Cool. Fixed. Fast."        ← Recommended — punchy & memorable
//  2. "Repair. Refresh. Relax."   ← Alliterative, customer journey
//  3. "Cooling You Can Trust"     ← Trust-focused
//  4. "Stay Cool, Always."        ← Simple & warm

export const SITE_CONFIG = {
  businessName:  "Hari Refrigeration",
  tagline:       "Certified. Reliable. Fast.",
  location:      "CBD Belapur, Navi Mumbai",
  phone:         "+91 88509 09842",
  phone2:        "+91 95949 85353",
  whatsapp:      "918850909842",
  email:         "hari.refrigeration@gmail.com",
  address:       "Shop-11, Near CBD Bus Depot, Opposite MGM Hospital, Sector 6, CBD Belapur, Navi Mumbai – 400614",
  serviceArea:   "Belapur (Headoffice), Seawoods, Nerul, Kharghar, Kamothe, Kalamboli, Ulwe, Juinagar, Sanpada, Vashi",
  foundedYear:   "2000",
  googleRating:  "5.0",
  totalReviews:  "6",

  stats: [
    { number: "10000+", label: "Happy Customers" },
    { number: "20+",   label: "Years Experience" },
    { number: "24hr",  label: "Response Time" },
  ],

  hours: [
    { day: "Every Day", time: "9 AM – 11 PM" },
  ],

  formspreeId: "mjgjjwaz",
  whatsappMsg: "Hi%2C+I+need+appliance+repair+service.",
  mapUrl:      "https://maps.google.com/?q=Hari+Refrigeration+Shop+11+CBD+Belapur+Navi+Mumbai",
  // Direct "write a review" link. Get it from Google Business Profile → "Ask for reviews"
  // (looks like https://g.page/r/XXXX/review). Until set, the Maps listing is opened instead.
  reviewUrl:   "",
};

// ============================================================
//  SERVICES
// ============================================================
export const SERVICES = [
  {
    icon: "❄️",
    title: "Air Conditioner",
    desc: "All brands — split, window, inverter. Gas refill, PCB repair, deep cleaning, installation.",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "🧊",
    title: "Refrigerator",
    desc: "Single & double door, side-by-side. Compressor, cooling coil, thermostat, gas charging.",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "👕",
    title: "Washing Machine",
    desc: "Front & top load. Motor, drum, bearing, panel, inlet valve issues fixed fast.",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "📡",
    title: "Microwave Oven",
    desc: "Convection & solo ovens. Magnetron, door latch, turntable, heating element.",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "💧",
    title: "Water Purifier",
    desc: "RO, UV & UF systems. Filter change, pump, membrane & UV lamp service.",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "🌊",
    title: "Water Chiller",
    desc: "Commercial & office water chillers. Compressor, cooling coils, thermostat servicing.",
    image: "https://images.unsplash.com/photo-1558618047-f4e3f203b20a?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "💨",
    title: "Air Cooler",
    desc: "Desert, tower & personal coolers. Pump, motor, pad cleaning & fan repair.",
    image: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?auto=format&fit=crop&w=600&q=80",
  },
  {
    icon: "🔧",
    title: "Annual Maintenance",
    desc: "AMC plans for homes, offices & commercial kitchens. Priority support year-round.",
    image: null,
  },
];

// ============================================================
//  AC REMOTE CONTROLS — available on phone call, all brands
// ============================================================
export const REMOTE_BRANDS = [
  "Samsung", "LG", "Daikin", "Voltas", "Blue Star", "Carrier",
  "Hitachi", "Panasonic", "Lloyd", "Haier", "O'General", "Mitsubishi Electric",
  "Toshiba", "Whirlpool", "Godrej", "Electrolux", "Videocon", "IFB",
  "Kelvinator", "Onida", "Koryo", "Kenstar", "Reconnect", "Hyundai",
  "Cruise", "Velvex", "Intec", "Sharp", "Fujitsu", "Midea",
];

// ============================================================
//  WHY CHOOSE US
// ============================================================
export const WHY_US = [
  { num: "20+",  title: "Years of Experience",  desc: "Deep expertise across all major appliance brands and models since 2000." },
  { num: "24hr", title: "Fast Response",         desc: "Same-day service available. We come to your home, office or shop." },
  { num: "90%",  title: "First-Visit Fix Rate",  desc: "Well-stocked service van means most repairs are done in one visit." },
  { num: "✓",   title: "Genuine Spare Parts",   desc: "Original or OEM parts only. Repair warranty included on all jobs." },
];

// ============================================================
//  GALLERY — Real appliance service photos
//  Replace url with your own photos for best results:
//  Upload to imgbb.com and paste the direct link
// ============================================================
// To use your own real photos: upload to https://imgbb.com → paste direct link as url
export const GALLERY = [
  {
    url: "https://i.ibb.co/7tFhHm2H/Screenshot-2026-04-24-131448.png",
    type: "ac", label: "AC Installation", caption: "Split AC Installation — CBD Belapur",
  },
  {
    url: "https://i.ibb.co/gLQm5SSd/Screenshot-2026-04-24-130321.png",
    type: "commercial-fridge", label: "Refrigerator Repair", caption: "Fridge Compressor Service — Nerul",
  },
  {
    url: "https://i.ibb.co/vxpM4CfX/Screenshot-2026-04-24-130042.png",
    type: "washing", label: "Washing Machine Repair", caption: "Washer Motor Fix — Seawoods",
  },
  {
    url: "https://i.ibb.co/BKTMdfCd/Screenshot-2026-04-24-130929.png",
    type: "ac", label: "AC Gas Charging", caption: "Refrigerant Gas Refill & Pressure Check — Kharghar",
  },
  {
    url: "https://i.ibb.co/1tN07HYP/Screenshot-2026-04-24-131044.png",
    type: "ac", label: "AC Deep Cleaning", caption: "Filter & Coil Service — Vashi",
  },
  {
    url: "https://i.ibb.co/HftJBQ9R/Screenshot-2026-04-24-131141.png",
    type: "washing", label: "Washing Machine PCB Repair", caption: "PCB Circuit Board Repair — Kharghar",
  },
];

// ============================================================
//  TESTIMONIALS
// ============================================================
// Reviews — first 2 are confirmed real Google reviews (from Google Business profile)
export const TESTIMONIALS = [
  {
    name: "Ramesh Patil",
    initials: "R",
    avatarColor: "#FF7043",
    location: "Kharghar, Navi Mumbai",
    stars: 5,
    text: "Clear explanation, fair price (₹2,200 including part), and no mess left behind. Highly recommended!",
    source: "google",
  },
  {
    name: "Prakash N.",
    initials: "P",
    avatarColor: "#43A047",
    location: "CBD Belapur",
    stars: 5,
    text: "Nice service and instant work. Very professional team.",
    source: "google",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    avatarColor: "#1E88E5",
    location: "Vashi Office Complex",
    stars: 5,
    text: "Our office has 6 ACs under AMC with Hari Refrigeration. Response is always quick and work quality is excellent.",
    source: "google",
  },
  {
    name: "Sunita Desai",
    initials: "SD",
    avatarColor: "#8E24AA",
    location: "Nerul, Navi Mumbai",
    stars: 5,
    text: "Fridge stopped cooling at night, called them, technician came next morning. Fixed in 1 hour. Very satisfied!",
    source: "google",
  },
  {
    name: "Vijay Kumar",
    initials: "VK",
    avatarColor: "#00897B",
    location: "Kharghar, Navi Mumbai",
    stars: 5,
    text: "Very honest technician. Told me the exact issue and fixed it at a reasonable cost. AC is running perfectly.",
    source: "google",
  },
  {
    name: "Meena Joshi",
    initials: "MJ",
    avatarColor: "#F4511E",
    location: "Seawoods, Navi Mumbai",
    stars: 5,
    text: "Washing machine was making a loud noise. They fixed it the same day. Service was quick and clean.",
    source: "google",
  },
];

// ============================================================
//  BRAND SCROLLER — brands serviced (AC, Fridge, Washing)
// ============================================================
// Unified brand list with clearbit logo domains
// Domain is used to fetch: https://logo.clearbit.com/{domain}
export const BRANDS_ALL = [
  { name: "Samsung",          domain: "samsung.com",             color: "#1428A0" },
  { name: "LG",               domain: "lg.com",                  color: "#A50034" },
  { name: "Daikin",           domain: "daikin.com",              color: "#0073CE" },
  { name: "Voltas",           domain: "voltas.com",              color: "#E31837" },
  { name: "Blue Star",        domain: "bluestarindia.com",       color: "#003DA5" },
  { name: "Carrier",          domain: "carrier.com",             color: "#0055A5" },
  { name: "Hitachi",          domain: "hitachi.com",             color: "#D40000" },
  { name: "Panasonic",        domain: "panasonic.com",           color: "#003087" },
  { name: "Haier",            domain: "haier.com",               color: "#005BAC" },
  { name: "Whirlpool",        domain: "whirlpool.com",           color: "#003087" },
  { name: "Godrej",           domain: "godrej.com",              color: "#2C5599" },
  { name: "Mitsubishi",       domain: "mitsubishielectric.com",  color: "#E4032E" },
  { name: "Toshiba",          domain: "toshiba.com",             color: "#CC0000" },
  { name: "Electrolux",       domain: "electrolux.com",          color: "#1E88E5" },
  { name: "IFB",              domain: "ifbglobal.com",           color: "#1B4F72" },
  { name: "O'General",        domain: "ogref.com",               color: "#E65100" },
  { name: "Lloyd",            domain: "lloydindia.com",          color: "#8B1A1A" },
  { name: "Kelvinator",       domain: "kelvinator.in",           color: "#00838F" },
  { name: "Onida",            domain: "onida.com",               color: "#C62828" },
  { name: "Kenstar",          domain: "kenstar.com",             color: "#D84315" },
  { name: "Videocon",         domain: "videocon.com",            color: "#D32F2F" },
  { name: "Koryo",            domain: null,                      color: "#6A1B9A" },
];

// Legacy sub-arrays kept for backward compat
export const BRANDS = {
  ac:      BRANDS_ALL.filter(b => ["Samsung","LG","Daikin","Voltas","Blue Star","Carrier","Hitachi","Panasonic","Lloyd","Haier","O'General","Mitsubishi","Toshiba","Whirlpool","Godrej","Kelvinator","Onida","Kenstar","Koryo","IFB"].includes(b.name)),
  fridge:  BRANDS_ALL.filter(b => ["Samsung","LG","Whirlpool","Godrej","Haier","Bosch","Panasonic","Electrolux","Kelvinator","Videocon"].includes(b.name)),
  washing: BRANDS_ALL.filter(b => ["Samsung","LG","Whirlpool","IFB","Bosch","Haier","Godrej","Panasonic","Siemens","Electrolux"].includes(b.name)),
};
