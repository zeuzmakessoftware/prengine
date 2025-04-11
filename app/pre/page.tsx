'use client'

import { Navbar } from '@/components/Nav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PreHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900">
      <Navbar />

      <section className="container mx-auto px-4 py-32 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">Preview Mode</h1>
          <p className="text-xl text-white/80 mb-8">
            Please specify a slug to preview a blog post. <br/> For example: <code className="bg-white/10 px-2 py-1 rounded">/pre/what-is-programmatic-route-engine</code>
          </p>
          <Button asChild className="bg-gradient-to-r from-neutral-600 to-neutral-600 hover:from-neutral-700 hover:to-neutral-700">
            <Link href="/pre/what-is-programmatic-route-engine">
              View Example Post
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}