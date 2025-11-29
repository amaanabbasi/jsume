'use client'

import { useState, FormEvent } from 'react'
import { FiSend, FiCheckCircle } from 'react-icons/fi'
import { useInView } from '@/hooks/useInView'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { ref, isInView } = useInView({ threshold: 0.1 })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formDataToSend = new FormData(form)

    try {
      const encoded = new URLSearchParams(formDataToSend as any).toString()
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        alert('There was an error submitting the form. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
        <FiCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">
          Thank you!
        </h3>
        <p className="text-green-600">
          Your message has been sent. I'll get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <section id="contact" ref={ref as any} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900">
          Let's Build Together
        </h2>
        <p className="text-xl text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Have a project in mind? Let's discuss how we can bring it to life.
        </p>

        <div className="max-w-2xl mx-auto">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6"
          >
            {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="contact" />
            <div className="hidden">
              <label>
                Don't fill this out if you're human:{' '}
                <input name="bot-field" />
              </label>
            </div>

            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <FiSend className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

