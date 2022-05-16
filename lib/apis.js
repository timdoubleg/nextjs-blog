import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Note: In Next.js, the lib folder does not have an assigned name like the pages folder, so you can name it anything. It's usually convention to use lib or utils.

const apiDirectory = path.join(process.cwd(), 'pages/api');

export function getSortedApiData() {
    const fileNames = fs.readdirSync(apiDirectory);
    const allApiData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName;

        // Remove ".md" from file name to get id
        const fullPath = path.join(apiDirectory, fileName);

        return {
            id,
        };
    })

    return {
        allApiData
    }
}
