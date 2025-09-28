import React, { useMemo, useState } from "react";
import {
  ShoppingCart,
  Leaf,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
  Check,
  ChevronRight,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ---------- THEME ---------- //
const brand = {
  name: "Melissa's Wreaths & Giggles",
  tagline: "Ridiculously delightful wreaths, centerpieces, and memorial florals",
  phone: "(555) 867-5309",
  email: "hello@wreathandwarmth.com",
  socials: {
    instagram: "https://instagram.com/yourwreathshop",
    facebook: "https://facebook.com/yourwreathshop",
    youtube: "https://youtube.com/@yourwreathshop",
  },
};

const nav = [
  { href: "#shop", label: "Shop" },
  { href: "#custom", label: "Custom Order" },
  { href: "#tutorials", label: "Tutorials" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

// ---------- HELPERS ---------- //
const currency = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

const BASE_PRICES = {
  wreath: { small: 45, medium: 65, large: 95 },
  centerpiece: { small: 35, medium: 55, large: 85 },
  memorial: { small: 40, medium: 70, large: 110 },
};
const MATERIAL_MULT = { faux: 1.0, dried: 1.15, fresh: 1.25 };
const ADDONS = { lights: 12, ribbon: 8, personalization: 10 };

// ---------- APP ---------- //
export default function WreathSite() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <Hero />
      <Products />
      <CustomBuilder />
      <Tutorials />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

// ---------- HEADER ---------- //
function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <Leaf className="h-6 w-6" />
          <span className="font-semibold tracking-tight">{brand.name}</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {n.label}
            </a>
          ))}
          <Button className="gap-2">
            <ShoppingCart className="h-4 w-4" /> Shop
          </Button>
        </nav>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

// ---------- MOBILE NAV ---------- //
function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <ChevronRight className="h-5 w-5 rotate-90" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                <span className="font-semibold">{brand.name}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </Button>
            </div>

            <nav className="flex flex-col gap-4">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-base"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              ))}
              <Button className="mt-2 gap-2" onClick={() => setOpen(false)}>
                <ShoppingCart className="h-4 w-4" /> Shop
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// ---------- HERO ---------- //
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50 to-amber-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Welcome to <span className="text-emerald-700">{brand.name}</span>
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            {brand.tagline}. Custom work available for every season and
            occasion, with accessible at-home craftsmanship at our core.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="gap-2">
              <a href="#shop">
                <ShoppingCart className="h-4 w-4" /> Shop featured
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href="#custom">
                <Sparkles className="h-4 w-4" /> Build your own
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-neutral-600">
            Hand-made in small batches, powered by snacks. Disability-friendly
            studio practices.
          </p>
        </div>
        <div
          className="aspect-square w-full rounded-3xl bg-[url('https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center shadow-2xl"
          aria-label="Photo of a decorative wreath"
        />
      </div>
    </section>
  );
}

// ---------- PRODUCTS ---------- //
function Products() {
  const items = [
    {
      id: "spring-bloom",
      title: "Spring Bloom Wreath",
      price: 75,
      img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1200&auto=format&fit=crop",
      tags: ["Faux", '18"'],
    },
    {
      id: "autumn-harvest",
      title: "Autumn Harvest Centerpiece",
      price: 68,
      img: "https://images.unsplash.com/photo-1543342386-c5a4f5ea62cc?q=80&w=1200&auto=format&fit=crop",
      tags: ["Dried", "Table"],
    },
    {
      id: "evergreen-classic",
      title: "Evergreen Classic Wreath",
      price: 95,
      img: "https://images.unsplash.com/photo-1543589077-47f3ea36d3f6?q=80&w=1200&auto=format&fit=crop",
      tags: ["Fresh", '24"'],
    },
  ];

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Featured designs
          </h2>
          <p className="mt-1 text-neutral-600">
            Seasonal favorites ready to ship or pick up locally.
          </p>
        </div>
        <div className="hidden gap-2 md:flex">
          <Button variant="outline">All</Button>
          <Button variant="outline">Wreaths</Button>
          <Button variant="outline">Centerpieces</Button>
          <Button variant="outline">Memorial</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card key={it.id} className="overflow-hidden rounded-2xl">
            <div
              className="aspect-square w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${it.img})` }}
            />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{it.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between pb-6">
              <div>
                <div className="font-semibold">{currency(it.price)}</div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-neutral-600">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-neutral-100 px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Button className="gap-2">
                <ShoppingCart className="h-4 w-4" /> Add
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" className="gap-2" asChild>
          <a href="#custom">
            <Sparkles className="h-4 w-4" /> Start a custom order
          </a>
        </Button>
      </div>
    </section>
  );
}

// ---------- (other sections stay the same) ---------- //
// CustomBuilder, Tutorials, About, FAQ, Contact, Footer, and UI helpers 
// … keep exactly as in your working file (they don’t affect the mobile nav issue).
