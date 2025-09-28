import React from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const brand = { name: "Melissa's Wreaths & Giggles", tagline: "Ridiculously delightful wreaths" };
const nav = [ {href:"#shop",label:"Shop"},{href:"#custom",label:"Custom Order"},{href:"#tutorials",label:"Tutorials"},{href:"#about",label:"About"},{href:"#faq",label:"FAQ"},{href:"#contact",label:"Contact"} ];

export default function App(){
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header/>
      <main className="p-10">Demo content here...</main>
    </div>
  );
}

function Header(){
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <Leaf className="h-6 w-6"/><span className="font-semibold">{brand.name}</span>
        </a>
        <nav className="hidden md:flex gap-6">
          {nav.map(n=><a key={n.href} href={n.href} className="text-sm">{n.label}</a>)}
          <Button className="gap-2"><ShoppingCart className="h-4 w-4"/> Shop</Button>
        </nav>
      </div>
      <div className="border-t bg-white/90 md:hidden">
        <div className="mx-auto max-w-7xl px-2 py-2 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-2">
            {nav.map(n=><a key={n.href} href={n.href} className="whitespace-nowrap rounded-full border px-3 py-2 text-sm">{n.label}</a>)}
            <a href="#shop" className="whitespace-nowrap rounded-full bg-emerald-600 px-3 py-2 text-sm font-medium text-white">Shop</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
