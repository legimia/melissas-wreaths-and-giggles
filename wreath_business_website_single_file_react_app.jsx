import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Leaf, Phone, Mail, Instagram, Facebook, Youtube, Sparkles, Check, ChevronRight, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// ---------- THEME ---------- //
const brand = {
  name: "Melissa's Wreaths & Giggles",
  tagline: "Ridiculously delightful wreaths, centerpieces, and memorial florals",

  phone: "(555) 867‑5309",
  email: "hello@wreathandwarmth.com",
  socials: {
    instagram: "https://instagram.com/yourwreathshop",
    facebook: "https://facebook.com/yourwreathshop",
    youtube: "https://youtube.com/@yourwreathshop"
  }
};

const nav = [
  { href: "#shop", label: "Shop" },
  { href: "#custom", label: "Custom Order" },
  { href: "#tutorials", label: "Tutorials" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" }
];

// ---------- HELPERS ---------- //
const currency = (n) => n.toLocaleString(undefined, { style: "currency", currency: "USD" });

// Simple price model you can tweak later or wire to a CMS/shop backend
const BASE_PRICES = {
  wreath: { small: 45, medium: 65, large: 95 },
  centerpiece: { small: 35, medium: 55, large: 85 },
  memorial: { small: 40, medium: 70, large: 110 }
};
const MATERIAL_MULT = { faux: 1.0, dried: 1.15, fresh: 1.25 };
const ADDONS = {
  lights: 12,
  ribbon: 8,
  personalization: 10
};

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
            <a key={n.href} href={n.href} className="text-sm font-medium text-neutral-700 hover:text-neutral-900">
              {n.label}
            </a>
          ))}
          <Button className="gap-2"><ShoppingCart className="h-4 w-4"/> Shop</Button>
        </nav>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open menu">
          <span className="i-lucide-menu"/>
          <ChevronRight className="h-5 w-5 rotate-90"/>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2"><Leaf className="h-5 w-5"/>{brand.name}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-base" >{n.label}</a>
          ))}
          <Button className="mt-2 gap-2"><ShoppingCart className="h-4 w-4"/> Shop</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ---------- HERO ---------- //
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-50 via-lime-50 to-amber-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight md:text-5xl"
          >
            Welcome to <span className="text-emerald-700">{brand.name}</span>
          </motion.h1>
          <p className="mt-4 text-lg text-neutral-700">{brand.tagline}. Custom work available for every season and occasion, with accessible at‑home craftsmanship at our core.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="gap-2">
              <a href="#shop"><ShoppingCart className="h-4 w-4"/> Shop featured</a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href="#custom"><Sparkles className="h-4 w-4"/> Build your own</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-neutral-600">Hand‑made in small batches, powered by snacks. Disability‑friendly studio practices.</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="aspect-square w-full rounded-3xl bg-[url('https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center shadow-2xl"
          aria-label="Photo of a decorative wreath"
        />
      </div>
    </section>
  );
}

// ---------- PRODUCTS / SHOP GRID ---------- //
function Products() {
  const items = [
    {
      id: "spring-bloom",
      title: "Spring Bloom Wreath",
      price: 75,
      img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1200&auto=format&fit=crop",
      tags: ["Faux", "18\""],
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
      tags: ["Fresh", "24\""],
    },
  ];

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured designs</h2>
          <p className="mt-1 text-neutral-600">Seasonal favorites ready to ship or pick up locally.</p>
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
            <div className="aspect-square w-full bg-cover bg-center" style={{ backgroundImage: `url(${it.img})` }} />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{it.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between pb-6">
              <div>
                <div className="font-semibold">{currency(it.price)}</div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-neutral-600">
                  {it.tags.map((t) => (
                    <span key={t} className="rounded-full bg-neutral-100 px-2 py-1">{t}</span>
                  ))}
                </div>
              </div>
              <Button className="gap-2"><ShoppingCart className="h-4 w-4"/> Add</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" className="gap-2" asChild>
          <a href="#custom"><Sparkles className="h-4 w-4"/> Start a custom order</a>
        </Button>
      </div>
    </section>
  );
}

// ---------- CUSTOM ORDER BUILDER ---------- //
function CustomBuilder() {
  const [category, setCategory] = useState("wreath");
  const [size, setSize] = useState("medium");
  const [material, setMaterial] = useState("faux");
  const [qty, setQty] = useState(1);
  const [addons, setAddons] = useState({ lights: false, ribbon: true, personalization: false });
  const [palette, setPalette] = useState("Evergreen + Gold");

  const estimate = useMemo(() => {
    const base = BASE_PRICES[category][size];
    const mult = MATERIAL_MULT[material];
    const add = Object.entries(addons).reduce((sum, [k, v]) => (v ? sum + ADDONS[k] : sum), 0);
    return Math.max(0, (base * mult + add) * qty);
  }, [category, size, material, qty, addons]);

  return (
    <section id="custom" className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Design your custom piece</h2>
          <p className="mt-2 text-neutral-600">Get an instant estimate, then submit your request. We'll confirm details within 24 hours.</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Select label="Category" value={category} onChange={setCategory} options={[
              { label: "Wreath", value: "wreath" },
              { label: "Centerpiece", value: "centerpiece" },
              { label: "Memorial", value: "memorial" }
            ]} />

            <Select label="Size" value={size} onChange={setSize} options={[
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" }
            ]} />

            <Select label="Material" value={material} onChange={setMaterial} options={[
              { label: "Faux/Silk", value: "faux" },
              { label: "Dried", value: "dried" },
              { label: "Fresh", value: "fresh" }
            ]} />

            <Number label="Quantity" value={qty} onChange={setQty} min={1} max={20} />

            <Checkbox label={`LED Micro‑lights (+${currency(ADDONS.lights)})`} checked={addons.lights} onChange={(v) => setAddons(a => ({ ...a, lights: v }))} />
            <Checkbox label={`Premium ribbon (+${currency(ADDONS.ribbon)})`} checked={addons.ribbon} onChange={(v) => setAddons(a => ({ ...a, ribbon: v }))} />
            <Checkbox label={`Personalization tag (+${currency(ADDONS.personalization)})`} checked={addons.personalization} onChange={(v) => setAddons(a => ({ ...a, personalization: v }))} />

            <div className="col-span-2">
              <Label>Color palette</Label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {["Evergreen + Gold", "Berry + Pine", "Neutrals + Pampas", "Sunset Citrus", "Pastel Spring", "Custom"].map((p) => (
                  <button key={p} onClick={() => setPalette(p)} className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${palette === p ? "border-emerald-600 bg-emerald-50" : "border-neutral-200"}`}>
                    <span className="flex items-center gap-2"><Palette className="h-4 w-4"/>{p}</span>
                    {palette === p && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Card className="h-max self-start">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">Your estimate <span className="text-xl">{currency(estimate)}</span></CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3">
              <Input aria-label="Full name" placeholder="Full name" required />
              <Input aria-label="Email" type="email" placeholder="Email" required />
              <Input aria-label="Phone" placeholder="Phone (optional)" />
              <Textarea aria-label="Notes" placeholder="Share inspiration links, dates, delivery notes…" rows={5} />
              <input type="hidden" name="estimate" value={estimate} />
              <Button type="submit" className="w-full">Request quote</Button>
              <p className="text-xs text-neutral-500">Submitting shares your selections with us. No payment required yet.</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ---------- TUTORIALS ---------- //
function Tutorials() {
  const vids = [
    { id: "vid1", title: "Beginner: 30‑min Faux Wreath", dur: "30:12", thumb: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1200&auto=format&fit=crop" },
    { id: "vid2", title: "Dried Florals Centerpiece", dur: "18:47", thumb: "https://images.unsplash.com/photo-1501447108233-4a8d6d83dfdf?q=80&w=1200&auto=format&fit=crop" },
    { id: "vid3", title: "Memorial Arrangement Basics", dur: "22:03", thumb: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1200&auto=format&fit=crop" },
  ];

  return (
    <section id="tutorials" className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Free tutorials \& mildly chaotic maker resources</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">Learn at your own pace. All videos include captions and seated‑position variations for low‑energy days.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vids.map((v) => (
            <Card key={v.id} className="overflow-hidden">
              <div className="relative aspect-video w-full bg-cover bg-center" style={{ backgroundImage: `url(${v.thumb})` }}>
                <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">{v.dur}</span>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{v.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Watch</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border bg-white p-6">
          <h3 className="font-semibold">The Giggle Gazette</h3>
          <p className="mt-1 text-sm text-neutral-600">Monthly tips, tool lists, and printable guides—with occasional terrible puns. Unsubscribe anytime.</p>
          <form className="mt-3 flex flex-col gap-3 sm:flex-row">
            <Input placeholder="you@example.com" type="email" aria-label="Email" required />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ---------- ABOUT ---------- //
function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Our story \& shenanigans</h2>
          <p className="mt-3 text-neutral-700">We craft decor that feels like home—and sometimes makes you snort‑laugh. Founded by a professional floral designer named Melissa, our studio runs on joy, gentle pacing, and a strategically placed snack drawer. Every purchase supports fair pay, flexible workflows, and captioned tutorials for the community.</p>
          <ul className="mt-4 space-y-2 text-neutral-700">
            <li className="flex items-start gap-2"><Check className="mt-0.5 h-5 w-5 text-emerald-600"/> Seated‑friendly processes, adjustable work heights, and zero ladder drama</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5 h-5 w-5 text-emerald-600"/> Lightweight tools to reduce strain, fatigue, and grumpy elbows</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5 h-5 w-5 text-emerald-600"/> Clear pricing, custom options, and fast confirmations (slightly slower during cookie breaks)</li>
          </ul>
        </div>
        <div className="rounded-3xl bg-[url('https://images.unsplash.com/photo-1482304513936-8c79aa2fb2a1?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center shadow-xl min-h-80"/>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Stat number="1–3 days" label="Typical build time"/>
        <Stat number="500+" label="Happy customers"/>
        <Stat number="4.9/5" label="Average review score"/>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="text-3xl font-extrabold tracking-tight">{number}</div>
        <div className="mt-1 text-sm text-neutral-600">{label}</div>
      </CardContent>
    </Card>
  );
}

// ---------- FAQ ---------- //
function FAQ() {
  const faqs = [
    { q: "How do you price customs?", a: "By category, size, and materials. The builder shows a live estimate; we confirm by email before payment—no surprises, just sparkles." },
    { q: "Do you ship?", a: "Yep! Wreaths and dried pieces ship across the U.S. Fresh items are local delivery or pickup because we do not trust the postal system with moist foliage." },
    { q: "Do you offer memorial/gravesite pieces?", a: "We create tasteful memorial wreaths and saddle arrangements. Share cemetery regulations in the notes, and we’ll tailor the design—respectful first, fancy second." },
    { q: "Are tutorials beginner‑friendly?", a: "Absolutely. Captions, tool lists, and seated alternatives included. If you can wield scissors and a good pun, you’re in." },
  ];
  return (
    <section id="faq" className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">FAQ</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map((f, i) => (
            <Card key={i}>
              <CardHeader className="pb-2"><CardTitle className="text-base">{f.q}</CardTitle></CardHeader>
              <CardContent><p className="text-neutral-700">{f.a}</p></CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- CONTACT ---------- //
function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Get in touch</h2>
          <p className="mt-2 text-neutral-700">Have a question or a big idea? We’re here to help.</p>

          <div className="mt-6 space-y-3 text-neutral-700">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4"/> {brand.phone}</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4"/> {brand.email}</p>
            <div className="flex items-center gap-3">
              <a href={brand.socials.instagram} className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-900"><Instagram className="h-4 w-4"/> Instagram</a>
              <a href={brand.socials.facebook} className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-900"><Facebook className="h-4 w-4"/> Facebook</a>
              <a href={brand.socials.youtube} className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-900"><Youtube className="h-4 w-4"/> YouTube</a>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" method="POST" action="#">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input aria-label="First name" placeholder="First name" required />
                <Input aria-label="Last name" placeholder="Last name" required />
              </div>
              <Input aria-label="Email" type="email" placeholder="Email" required />
              <Textarea aria-label="How can we help?" placeholder="How can we help?" rows={5} required />
              <Button type="submit" className="w-full">Send</Button>
              <p className="text-xs text-neutral-500">We reply within 1 business day.</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ---------- FOOTER ---------- //
function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5"/>
            <span className="font-semibold">{brand.name}</span>
          </div>
          <p className="mt-2 text-sm text-neutral-600">{brand.tagline}.</p>
        </div>
        <div>
          <h4 className="font-semibold">Shop</h4>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            <li><a href="#shop">Wreaths</a></li>
            <li><a href="#shop">Centerpieces</a></li>
            <li><a href="#shop">Memorial</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Learn</h4>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            <li><a href="#tutorials">Tutorials</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#custom">Custom orders</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> {brand.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> {brand.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-neutral-500">© {new Date().getFullYear()} {brand.name}. All rights reserved.</div>
    </footer>
  );
}

// ---------- UI PRIMITIVES (local) ---------- //
function Label({ children }) {
  return <label className="text-sm font-medium text-neutral-700">{children}</label>;
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <Label>{label}</Label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function Number({ label, value, onChange, min=1, max=99 }) {
  return (
    <div>
      <Label>{label}</Label>
      <input type="number" min={min} max={max} value={value} onChange={(e) => onChange(parseInt(e.target.value || "1", 10))} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"/>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"/>
      <span className="text-sm text-neutral-700">{label}</span>
    </label>
  );
}
