// 404 page
import Link from "next/link";
import Image from "next/image";
import utilStyles from '../styles/utils.module.css';

export default function Custom404() {
    return (
        <>
        <h1> 404 - Page not found bitch</h1>
        <Image
            src="/images/404.gif"
            width={1000}
            height={1000}
        />
        <Link href='/'>Back to Home</Link>
        </>
    )
}