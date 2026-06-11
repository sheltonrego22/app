export const VEHICLES = {
  3: [
    {
      name: "Lexus ES 350",
      type: "Executive Sedan",
      image: "https://images.pexels.com/photos/31040150/pexels-photo-31040150.jpeg?auto=compress&cs=tinysrgb&w=600",
      price4h: 850,
      price8h: 1500,
      features: ["Leather interior", "Climate control", "Complimentary water"],
    },
    {
      name: "Tesla Model Y",
      type: "Electric Luxury",
      image: "https://images.unsplash.com/photo-1763789381416-7b94c5f97560?w=600&h=400&fit=crop",
      price4h: 900,
      price8h: 1600,
      features: ["Zero emissions", "Panoramic roof", "Premium sound"],
    },
  ],
  4: [
    {
      name: "Audi A6",
      type: "Premium Sedan",
      image: "https://images.pexels.com/photos/37098542/pexels-photo-37098542.jpeg?auto=compress&cs=tinysrgb&w=600",
      price4h: 1100,
      price8h: 1900,
      features: ["Quattro AWD", "Bang & Olufsen audio", "Ambient lighting"],
    },
  ],
  6: [
    {
      name: "Mercedes Viano",
      type: "Luxury Van",
      image: "https://images.pexels.com/photos/36407338/pexels-photo-36407338.jpeg?auto=compress&cs=tinysrgb&w=600",
      price4h: 1400,
      price8h: 2400,
      features: ["Captain seats", "Rear climate zone", "Privacy glass"],
    },
    {
      name: "GMC Yukon",
      type: "Premium SUV",
      image: "https://images.unsplash.com/photo-1767749995462-9fe0890d5960?w=600&h=400&fit=crop",
      price4h: 1500,
      price8h: 2600,
      features: ["Full-size luxury", "Third-row seating", "Premium leather"],
    },
    {
      name: "Chevrolet Suburban",
      type: "Executive SUV",
      image: "https://images.unsplash.com/photo-1767749995450-7b63ab7cd4fd?w=600&h=400&fit=crop",
      price4h: 1500,
      price8h: 2600,
      features: ["Extended cabin", "Spacious interior", "Advanced safety"],
    },
  ],
};

export const AIRPORTS = [
  "DXB - Terminal 1",
  "DXB - Terminal 2",
  "DXB - Terminal 3",
  "DWC - Al Maktoum International",
  "SHJ - Sharjah International",
];

export const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 6; h <= 23; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = h.toString().padStart(2, '0');
      const min = m.toString().padStart(2, '0');
      const label = `${h > 12 ? h - 12 : h}:${min} ${h >= 12 ? 'PM' : 'AM'}`;
      slots.push({ value: `${hour}:${min}`, label });
    }
  }
  return slots;
})();

export const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
};
