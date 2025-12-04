"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"

export default function LoginComponent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login attempt with:", { email })
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold tracking-[0.3em] uppercase text-black hover:text-[#d4a574] transition-colors">
              Luis Carlos Gago
            </h1>
          </Link>
          <h2 className="text-2xl font-bold tracking-widest uppercase text-black mb-2">Iniciar Sesión</h2>
          <p className="text-gray-600">Accede a tu cuenta</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold tracking-wider uppercase text-black mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-[#d4a574] focus:outline-none transition-colors"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold tracking-wider uppercase text-black mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-[#d4a574] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">Recordarme</span>
            </label>
            <Link href="/reset-password" className="text-[#d4a574] hover:text-black transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 font-bold tracking-widest uppercase hover:bg-[#d4a574] hover:text-black transition-colors duration-300"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-[#d4a574] hover:text-black font-bold transition-colors">
              Regístrate
            </Link>
          </p>
        </div>

        {/* Back to Store */}
        <div className="mt-6 text-center">
          <Link href="/tienda" className="text-gray-600 hover:text-black text-sm transition-colors">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
