import '../public/style.css';  // Import your global CSS file
import React from 'react';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
