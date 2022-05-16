import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

// Note: In Next.js, the lib folder does not have an assigned name like the pages folder, so you can name it anything. It's usually convention to use lib or utils.

const postDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Remove ".md" from file name to get id
        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Use gray-matter to parse the post metadata section
        return {
            id, 
            ...matterResult.data, 
        };
    })

    // Sort posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}


// This returns an array of objects, not strings. The objects must contain 'params' in order for [id].js to work dynamically
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postDirectory);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

// // FETCH FROM API
// export async function getAllPostIds() {
//     // Instead of the file system,
//     // fetch post data from an external API endpoint
//     const res = await fetch('..');
//     const posts = await res.json();
//     return posts.map((post) => {
//         return {
//             params: {
//                 id: post.id,
//             },
//         };
//     });
// }

// fetch necessary data to render the post with the given id
export async function getPostData(id) {
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // use remarkt to convert markdown into HTML string
    // add 'async' to make the await possible
    const porcessedContent = await remark()
        .use(html)
        .process(matterResult.content);

    // use package to read HTML content from Markdown
    const contentHtml = porcessedContent.toString();

    // combine data with the id
    return {
        id, 
        contentHtml,
        ...matterResult.data,
    };
}