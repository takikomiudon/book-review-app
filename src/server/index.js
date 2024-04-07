import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import { StaticRouter } from 'react-router-dom/server';

const app = express();
const port = 8000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  const app = renderToString(<App />);
  const html = `
    <html>
      <head>
        <title>React SSR</title>
      </head>
      <body>
        <div id="app">${app}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
