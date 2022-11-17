import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { GoogleOAuthProvider } from '@react-oauth/google'
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false)
  }, [])
  if (isSSR) return null
  return (
    <GoogleOAuthProvider clientId='590298810877-r6emr5dhvg2rsqjcg7el57lrug0at0og.apps.googleusercontent.com'>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
        <NavBar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <SideBar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      </div>

    </GoogleOAuthProvider>
  )
}

export default MyApp
