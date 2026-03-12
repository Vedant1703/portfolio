"use client"
import React from 'react'
import WebcamPixelGridDemo from '@/components/hero'
import About from '@/components/about'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import CPStats from '@/components/cp-stats'
import GitHubStats from '@/components/github-stats'
import Contact from '@/components/contact'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-[#030303] min-h-screen">
      <Navbar/>
      <WebcamPixelGridDemo/>
      <About/>
      <Projects/>
      <Skills/>
      <CPStats/>
      <GitHubStats/>
      <Contact/>
      <Footer/>
    </main>
  )
}

