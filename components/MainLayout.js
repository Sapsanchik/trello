import Head from "next/head";
import Link from "next/link";

export function MainLayout({ children, title = 'Next App' }) {
  return (
    <>
      <Head>
        <title> {title} | Trello analog</title>
        <meta name="keywords" content="next, js, react" />
        <meta name="discription" content="this trollo analog" />
        <meta charSet="utf-8" />
      </Head>
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/posts'>Posts</Link>
      </nav>
      <main>
        {children}
      </main>
    </>
  )
}