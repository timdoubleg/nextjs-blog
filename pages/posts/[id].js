import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
    return (
        <Layout>
            <Head>  
                {/* This is only the title of the tab */}
                <title>{postData.title}</title>
            </Head>
            <article>
                {/* Title */}
                <h1 className={utilStyles.headingXL}>{postData.title}</h1>
                {/* Date */}
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date}/>
                </div>
                {/* Text */}
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )

}

// Dynamic Routing for Static-site generation
// Return a list of possible value for id
// in development getStaticPaths runs on every request, in production 'getStaticPaths' runs at build time
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths, 
        fallback: false, // any paths not returned by 'getStaticpaths' will result in a 404 page
    }
}

// Static-site generation
// Next.js will pre-render this page at build time using the props returned by getStaticProps
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    // we add here the 'await' keywork as getPostData is asynchronous
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}