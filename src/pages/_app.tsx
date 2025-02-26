// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import LoadingWrapper from '../components/LoadingWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingWrapper>
      <Component {...pageProps} />
    </LoadingWrapper>
  );
}

export default MyApp;