'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, Database, Rocket, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Mock data for blog examples
const blogExamples = [
  {
    id: 1,
    title: 'Dynamic Routing in Modern Web Apps',
    excerpt: 'How Programmatic Route Engine handles dynamic content generation with near-instant load times.',
    category: 'Technology',
    cached: true
  },
  {
    id: 2,
    title: 'Optimizing Database Performance',
    excerpt: 'Our caching strategy reduces database queries by 90% for frequently accessed content.',
    category: 'Performance',
    cached: true
  },
  {
    id: 3,
    title: 'SEO Benefits of Dynamic Routing',
    excerpt: 'How our system automatically creates SEO-friendly URLs for all generated content.',
    category: 'Marketing',
    cached: true
  }
]

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [activeFeature, setActiveFeature] = useState(0)
  const controls = useAnimation()

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Sub-100ms response times for cached content"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Smart Caching",
      description: "Intelligent cache invalidation strategies"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Scalable",
      description: "Handles millions of requests with ease"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
      controls.start({
        opacity: [0, 1, 0],
        y: [20, 0, -20],
        transition: { duration: 3 }
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [controls, features.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-neutral-600/20 to-neutral-600/20"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              opacity: 0.1
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-8 relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge variant="secondary" className="text-sm text-white px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
              <span className="mr-2">✨</span> Take Over SEO Today
            </Badge>
          </motion.div>
          
          <h1 className="text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300 leading-tight">
            Programmatic Route Engine
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl">
            Revolutionizing content delivery with <span className="font-semibold text-white">AI-powered dynamic routing</span> and <span className="font-semibold text-white">intelligent caching</span>.
          </p>
          
          <div className="flex gap-4 mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/pre/">
                <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-neutral-600 to-neutral-600 hover:from-neutral-700 hover:to-neutral-700 cursor-pointer">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-white/20 bg-white/5 hover:bg-white/10 hover:text-white text-white cursor-pointer">
                Contact Us
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated feature showcase */}
        <div className="mt-24 max-w-4xl mx-auto relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-neutral-600 to-neutral-600 rounded-2xl blur opacity-30"></div>
          <div className="relative bg-neutral-900/80 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="p-3 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-600">
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{features[activeFeature].title}</h3>
                <p className="text-white/80">{features[activeFeature].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              title: "Dynamic Route Generation",
              description: "Automatic creation of SEO-friendly routes for all content types",
              highlight: "90% faster content publishing"
            },
            {
              title: "Intelligent Caching",
              description: "Multi-layer caching strategy with smart invalidation",
              highlight: "99.9% cache hit ratio"
            },
            {
              title: "Database Optimization",
              description: "Reduced load on your primary database with read replicas",
              highlight: "60% lower DB costs"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-neutral-500/30 transition-colors h-full">
                <CardHeader>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-white/70">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{feature.highlight}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Examples Section */}
      <section className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">See It In Action</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Our engine powers thousands of dynamic routes with blazing performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {blogExamples.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-neutral-500/30 transition-colors h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-white/10 text-white">
                      {blog.category}
                    </Badge>
                    {blog.cached && (
                      <Badge variant="secondary" className="bg-neutral-600 text-white">
                        Cached
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-white mt-4">{blog.title}</CardTitle>
                  <CardDescription className="text-white/70">{blog.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="link" className="text-white p-0 flex items-center gap-1">
                    View example <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your content strategy?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of businesses using our engine to deliver dynamic content at scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 max-w-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="bg-gradient-to-r from-neutral-600 to-neutral-600 hover:from-neutral-700 hover:to-neutral-700">
              Request Demo
            </Button>
          </div>
          
          <p className="text-white/60 text-sm">
            No credit card required. Start your free trial today.
          </p>
        </div>
      </section>
    </div>
  )
}