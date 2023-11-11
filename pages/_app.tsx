import React from "react";
import "../styles/globals.css";

function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default App;
