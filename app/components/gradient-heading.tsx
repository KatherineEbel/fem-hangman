import React from 'react'

export default function GradientHeading({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <h1 className="heading-xl text-stroke text-nowrap bg-gradient-to-b from-[#67b6ff] to-white bg-clip-text text-transparent">
      {children}
    </h1>
  )
}
