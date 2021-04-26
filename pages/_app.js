import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../utils/theme";
import NavigationBar from "../components/NavigationBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <NavigationBar /> */}
        <Component {...pageProps} />;
      </ThemeProvider>
    </>
  );
}

export default MyApp;
