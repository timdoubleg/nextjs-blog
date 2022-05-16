import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { getSortedApiData } from '../lib/apis';
import useSWR from 'swr'; // client-side rendering
import Link from 'next/link';
import Date from '../components/date';

// Server-Side Rendering. (SSR)
// Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request.
// context is a parameter that contains request specific parameters
export async function getServerSideProps(context) {
  const allPostsData = getSortedPostsData();
  const allApiData = getSortedApiData();

  return {
    props: {
      allPostsData,
      allApiData,
    },
  };
}


// // Static Site Generation
// // This is possible because getStaticProps only runs on the server-side. It will never run on the client-side.
// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

// Fetch data from an API
// we can also fetch data from an API
// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from an external API endpoint
//   const res = await fetch('..');
//   return res.json();
// }

// Client-side rendering
// if you don't need to pre-render data you can statically generate (pre-render) parts of the page that do not require external data
// works well for user dashboard pages

export default function Home({allPostsData, allApiData}) {
  return (
    <Layout home>
      {/* Bio and Introduction */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Finance student getting dirty in Next JS</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      {/* {To display the blog posts, let's update the Home component to add another <section> tag with the data} */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            // show Title and Link to it
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              {/* show Date */}
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      {/* Here are the API links */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>API</h2>
        <ul className={utilStyles.list}>
            {/* {allApiData.map(({id}) => ( */}
              <Link href={`/api/hello`}>
                <a>{allApiData.allApiData[0].id}</a>
              </Link>
            {/* ))} */}
        </ul>
      </section>
    </Layout>
  );
}