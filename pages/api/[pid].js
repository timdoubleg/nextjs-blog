// req = HTTP incoming message, res = HTTP server response
// never fetch an API from getStaticProps or getStaticPaths as this runs on server side, it will result in no request sent
// instead

export default function handler(req, res) {
    // res.status(200).json({text: 'Hello'});
    const {pid} = req.query
    res.end(`Post: ${pid}`)
}