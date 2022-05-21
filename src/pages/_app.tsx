import { AppProps } from 'next/app';

import '@/assets/main.css';
import '@/assets/chrome-bug.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
