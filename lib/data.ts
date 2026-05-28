export type Category = {
  name: string;
  slug: string;
  image: string;
  count: number;
  subcategories: string[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  sku: string;
  weight: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  threshold: number;
  organic: boolean;
  featured: boolean;
  image: string;
  images: string[];
  description: string;
  nutrition: string[];
  ingredients: string[];
  tags: string[];
};

export const categories: Category[] = [
  {
    name: "Fruits & Veg",
    slug: "fruits-veg",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    count: 124,
    subcategories: ["Citrus", "Leafy Greens", "Root Vegetables"]
  },
  {
    name: "Dairy",
    slug: "dairy",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=80",
    count: 58,
    subcategories: ["Milk", "Cheese", "Yogurt"]
  },
  {
    name: "Bakery",
    slug: "bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    count: 44,
    subcategories: ["Bread", "Cakes", "Pastry"]
  },
  {
    name: "Meat",
    slug: "meat",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80",
    count: 36,
    subcategories: ["Chicken", "Beef", "Seafood"]
  },
  {
    name: "Beverages",
    slug: "beverages",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
    count: 72,
    subcategories: ["Juice", "Tea", "Soft Drinks"]
  },
  {
    name: "Snacks",
    slug: "snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=80",
    count: 91,
    subcategories: ["Chips", "Biscuits", "Nuts"]
  },
  {
    name: "Frozen",
    slug: "frozen",
    image: "https://images.unsplash.com/photo-1589634733820-9d8afec2a4b9?auto=format&fit=crop&w=900&q=80",
    count: 29,
    subcategories: ["Ready Meals", "Ice Cream", "Vegetables"]
  },
  {
    name: "Household",
    slug: "household",
    image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=900&q=80",
    count: 63,
    subcategories: ["Cleaning", "Paper Goods", "Laundry"]
  }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Organic Bananas",
    slug: "organic-bananas",
    category: "Fruits & Veg",
    brand: "Green Valley",
    sku: "FM-FV-1001",
    weight: "1 dozen",
    price: 420,
    salePrice: 360,
    rating: 4.8,
    reviews: 218,
    stock: 34,
    threshold: 10,
    organic: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Naturally sweet bananas sourced from certified organic farms and packed fresh every morning.",
    nutrition: ["High potassium", "Rich in vitamin B6", "Approx. 105 calories per banana"],
    ingredients: ["Organic bananas"],
    tags: ["fruit", "organic", "breakfast"]
  },
  {
    id: "p2",
    name: "Farm Fresh Milk",
    slug: "farm-fresh-milk",
    category: "Dairy",
    brand: "DairyPure",
    sku: "FM-DA-2104",
    weight: "1 liter",
    price: 240,
    rating: 4.7,
    reviews: 154,
    stock: 16,
    threshold: 12,
    organic: false,
    featured: true,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80"],
    description: "Pasteurized full-cream milk with a clean, creamy taste for tea, cereal, and cooking.",
    nutrition: ["Calcium rich", "3.5% fat", "Protein source"],
    ingredients: ["Pasteurized cow milk"],
    tags: ["dairy", "milk", "breakfast"]
  },
  {
    id: "p3",
    name: "Sourdough Loaf",
    slug: "sourdough-loaf",
    category: "Bakery",
    brand: "Morning Crust",
    sku: "FM-BA-3307",
    weight: "550g",
    price: 690,
    salePrice: 620,
    rating: 4.9,
    reviews: 88,
    stock: 9,
    threshold: 10,
    organic: false,
    featured: true,
    image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=900&q=80"],
    description: "Slow-fermented loaf with a crisp crust and open crumb, baked in small batches.",
    nutrition: ["No artificial preservatives", "Naturally fermented", "Good source of carbohydrates"],
    ingredients: ["Flour", "Water", "Salt", "Starter culture"],
    tags: ["bakery", "bread", "fresh"]
  },
  {
    id: "p4",
    name: "Chicken Breast Fillet",
    slug: "chicken-breast-fillet",
    category: "Meat",
    brand: "Prime Poultry",
    sku: "FM-MT-4202",
    weight: "500g",
    price: 780,
    rating: 4.6,
    reviews: 132,
    stock: 0,
    threshold: 8,
    organic: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80"],
    description: "Lean boneless chicken breast, cleaned and portioned for quick weeknight cooking.",
    nutrition: ["Lean protein", "Low fat", "No added water"],
    ingredients: ["Chicken breast"],
    tags: ["meat", "chicken", "protein"]
  },
  {
    id: "p5",
    name: "Cold Pressed Orange Juice",
    slug: "cold-pressed-orange-juice",
    category: "Beverages",
    brand: "Citrus Co.",
    sku: "FM-BV-5105",
    weight: "750ml",
    price: 540,
    salePrice: 490,
    rating: 4.5,
    reviews: 76,
    stock: 22,
    threshold: 10,
    organic: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80"],
    description: "Fresh oranges cold pressed into a bright juice with no added sugar.",
    nutrition: ["Vitamin C", "No added sugar", "Naturally pulpy"],
    ingredients: ["Orange juice"],
    tags: ["juice", "organic", "beverage"]
  },
  {
    id: "p6",
    name: "Roasted Almond Mix",
    slug: "roasted-almond-mix",
    category: "Snacks",
    brand: "NutriBite",
    sku: "FM-SN-6102",
    weight: "250g",
    price: 980,
    rating: 4.8,
    reviews: 101,
    stock: 41,
    threshold: 10,
    organic: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
    images: ["https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80"],
    description: "Dry-roasted almonds with a light sea-salt finish for a clean everyday snack.",
    nutrition: ["Protein source", "Healthy fats", "No trans fat"],
    ingredients: ["Almonds", "Sea salt"],
    tags: ["snack", "nuts", "healthy"]
  }
];

export const dashboardSeries = [
  { label: "Mon", revenue: 72000, orders: 31, customers: 180 },
  { label: "Tue", revenue: 88000, orders: 38, customers: 192 },
  { label: "Wed", revenue: 76000, orders: 34, customers: 211 },
  { label: "Thu", revenue: 104000, orders: 49, customers: 238 },
  { label: "Fri", revenue: 128000, orders: 57, customers: 267 },
  { label: "Sat", revenue: 154000, orders: 68, customers: 306 },
  { label: "Sun", revenue: 117000, orders: 51, customers: 328 }
];

export const recentOrders = [
  { id: "FM-2026-00041", customer: "Ayesha Khan", total: 3890, status: "Pending", time: "2 min ago" },
  { id: "FM-2026-00040", customer: "Bilal Ahmed", total: 2640, status: "Packed", time: "11 min ago" },
  { id: "FM-2026-00039", customer: "Sara Malik", total: 5120, status: "Confirmed", time: "18 min ago" },
  { id: "FM-2026-00038", customer: "Omar Raza", total: 1760, status: "Delivered", time: "34 min ago" }
];
