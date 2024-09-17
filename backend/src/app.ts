import express from 'express';
import cors from 'cors';
import routes from './routes';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import path from 'path';
import { errorHandler } from './middlewares/error';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use(
	cors({
		origin: '*',
		credentials: true
	})
);

// PARSE URLENCODED REQUEST BODY
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// PARSE JSON EXPRESS BODY
app.use(express.json());

// SET SECURITY HTTP# HEADERS
app.use(helmet());

app.use(errorHandler);

// ROUTES
app.use(routes);

app.listen(3000, () => {
	console.log('Server is running on port 3000 --> http://localhost:3000');
});
