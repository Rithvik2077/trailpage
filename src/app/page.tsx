import RootLayout from "./(landing-page)/layout";
import DefaultLayout from "./(main)/layout";

const isLoggedIn = true;

export default function Home() {
  return <h1>hello</h1>;
}

Home.getLayout = (page) => (isLoggedIn ? DefaultLayout : RootLayout)(page);
