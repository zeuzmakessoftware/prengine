'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Navbar } from '@/components/Nav'

type BlogPost = {
  title: string;
  markdown: string;
  excerpt: string;
  tags: string[];
  categories: string[];
  metaTitle: string;
  metaDescription: string;
  theme: string;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default function BlogPage({ params }: Props) {
  const { slug } = React.use<{ slug: string }>(params);
  
  const [blogData, setBlogData] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/preapi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: slug,
          }),
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const data = await response.json()
        
        setBlogData({
          title: data.title,
          markdown: data.content.markdown,
          excerpt: data.excerpt,
          tags: data.tags,
          categories: data.categories,
          metaTitle: data.meta.title,
          metaDescription: data.meta.description,
          theme: data.theme,
        })
      } catch (err) {
        console.error('Error fetching blog data:', err)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug]) // Changed from params.slug to slug

  if (!slug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900">
        <Navbar />
        <section className="container mx-auto px-4 py-32 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6">Missing Slug Parameter</h1>
            <p className="text-xl text-white/80 mb-8">
              Please add a slug to the URL to view a blog post. For example: <code className="bg-white/10 px-2 py-1 rounded">/pre/example-post</code>
            </p>
            <Button 
              onClick={() => window.location.href = '/pre/example'}
              className="bg-gradient-to-r from-neutral-600 to-neutral-600 hover:from-neutral-700 hover:to-neutral-700"
            >
              View Example Post
            </Button>
          </div>
        </section>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900">
        <Navbar />
        <section className="container mx-auto px-4 py-32 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-neutral-600 border-t-white rounded-full mx-auto mb-8"
          />
          <h2 className="text-2xl font-bold text-white">Loading Post...</h2>
        </section>
      </div>
    )
  }

  if (error || !blogData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900">
        <Navbar />
        <section className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Error Loading Post</h1>
          <p className="text-xl text-white/80 mb-8">
            {error || 'Unable to load the requested blog post.'}
          </p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-neutral-600 to-neutral-600 hover:from-neutral-700 hover:to-neutral-700"
          >
            Try Again
          </Button>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900">
      <Navbar />
      
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

      <article className="relative container mx-auto px-4 py-32 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {blogData.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300 leading-tight mb-6">
              {blogData.title}
            </h1>
            
            <p className="text-xl text-white/80 italic border-l-4 border-neutral-600 pl-4 py-2">
              {blogData.excerpt}
            </p>
          </header>

          <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-neutral-400 hover:prose-a:text-white prose-strong:text-white prose-blockquote:text-white/80 prose-code:bg-white/10 prose-pre:bg-white/10 prose-pre:rounded-xl prose-pre:p-4 prose-img:rounded-xl prose-img:border prose-img:border-white/10">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => <h1 className="text-4xl font-bold my-8 text-white" {...props} />,
                h2: ({ ...props }) => <h2 className="text-3xl font-bold my-6 text-white" {...props} />,
                h3: ({ ...props }) => <h3 className="text-2xl font-bold my-5 text-white" {...props} />,
                h4: ({ ...props }) => <h4 className="text-xl font-bold my-4 text-white" {...props} />,
                p: ({ ...props }) => <p className="my-4 text-white/80" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
                li: ({ ...props }) => <li className="my-2 text-white/80" {...props} />,
                blockquote: ({ ...props }) => (
                  <blockquote className="border-l-4 border-neutral-600 pl-4 italic my-6" {...props} />
                ),
                code: ({ ...props }) => (
                  <code
                    className={`bg-white/10 p-1 rounded text-sm font-mono`}
                    {...props}
                  />
                ),
                pre: ({ ...props }) => (
                  <pre
                    className={`bg-white/10 p-4 rounded-xl my-4 overflow-x-auto`}
                    {...props}
                  />
                ),
                a: ({ ...props }) => (
                  <a className="text-neutral-400 hover:text-white transition-colors underline underline-offset-4" {...props} />
                ),
                table: ({ ...props }) => (
                  <table className="border-collapse border border-white/20 my-6 w-full" {...props} />
                ),
                th: ({ ...props }) => (
                  <th className="border border-white/20 px-4 py-2 bg-white/10 font-bold text-left" {...props} />
                ),
                td: ({ ...props }) => (
                  <td className="border border-white/20 px-4 py-2 text-white/80" {...props} />
                ),
                img: ({ src, ...props }) => (
                  <img className="max-w-full h-auto my-6 rounded-lg border border-white/10" src={src} alt={props.alt || "Blog post image"} {...props} />
                ),
              }}
            >
              {blogData.markdown}
            </ReactMarkdown>
          </div>

          <footer className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <span className="font-semibold text-white/80">Categories:</span>
              {blogData.categories.map((category) => (
                <Badge 
                  key={category} 
                  variant="outline" 
                  className="bg-white/10 text-white border-white/20"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white/80">Theme:</span>
              <Badge className="bg-neutral-600 text-white">
                {blogData.theme}
              </Badge>
            </div>
          </footer>
        </motion.div>
      </article>
    </div>
  )
}