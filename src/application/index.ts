import express from 'express';

const app = express();
const port = 3000;
// app.get('/', (req, res) => {
//   res.send('Hello world !');
// });

app.use(express.static('.'));
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
}).on('error', err => {
    console.error(err);
});