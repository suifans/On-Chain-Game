import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import "../css/font-awesome.css"
import {EthosConnectProvider} from "ethos-connect";
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <EthosConnectProvider>
      <Component {...pageProps} />
      </EthosConnectProvider>
  )
}

export default  MyApp
