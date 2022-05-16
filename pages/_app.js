// To load global CSS files, create a file called pages/_app.js with the following content:
// you cannot import global CSS anywhere else. This is because global CSS affects all elements on the page
import '../styles/global.css'

export default function App({ Component, pageProps}) {
    return <Component {...pageProps}/>;
}