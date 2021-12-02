
import express, { Response } from 'express';
import axios from 'axios';

const app: express.Express = express();

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen('4000', () => {
  console.log('Server listening to port 4000');
});

const sendData = async (id: number, res: Response) => {
  const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/' + id
      );
    const dataString = JSON.stringify(data);

  await sleep(1000);

  res.write('event: message\n');

    res.write('data: ' + dataString);
    res.write('\n\n');
};

const sleep = async (ms: number) => {
  return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
};

app.get('/events', async (_, res) => {
  res.writeHead(200, {
      'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });
    for (let i = 1; i < 10; i++) {
        await sendData(i, res);
      }
  res.end();
});
