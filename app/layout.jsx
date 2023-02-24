// ! This file is named jsx and not tsx because there is some
// ! kind of trouble rendering server side components with
// ! typescript enabled as in right now with Next 13

import Nav from './auth/Nav'
import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export const metadata = {
  title: 'Sent it',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-neutral-900 mx-4 md:mx-48 xl:mx-96} ${roboto.variable}`}
      >
        <Nav />
        {children}
      </body>
    </html>
  )
}