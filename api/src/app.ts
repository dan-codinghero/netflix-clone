import express, { Request, Response, Express, NextFunction } from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import accountRoute from './routes/account-route';
import authRoute from './routes/auth-route';
import planRoute from './routes/plan-route';
import profileRoute from './routes/profile-route';
import subscriptionRoute from './routes/subscription-route';
import HttpError from './http/errors/http-error';
import { HttpStatusCode } from './http/status-codes';
import Plan, { Device } from './entities/plan';
import cookieParser from 'cookie-parser';
import shortUUID from 'short-uuid';
import path from 'path';
import { ApiError } from './http/errors/api-error';
import { MONGODB_URI, PORT } from './utils/constants';

dotenv.config();

const app: Express = express();

// Allow CORS
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

//  Serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use((req: Request, res: Response, next: NextFunction) => {
    express.json()(req, res, (err) => {
        if (err) {
            const error = new HttpError(
                'Request parse failed.',
                'There was an error while processing request.',
                err.statusCode || HttpStatusCode.BAD_REQUEST
            );
            next(error);
        }

        next();
    });
});

// Remove default response headers
app.disable('x-powered-by');

// Handle routes
app.use('/account', accountRoute);
app.use('/auth', authRoute);
app.use('/plans', planRoute);
app.use('/profile', profileRoute);
app.use('/subscription', subscriptionRoute);

app.use((error: HttpError | ApiError, req: Request, res: Response, next: NextFunction) => {
    const traceId = shortUUID.uuid();
    if (error instanceof ApiError) {
        res.status(error.httpResponse.code).json(error.toObject());
    } else {
        const unknownError = new HttpError('Internal Server Error.', 'There was an error while processing request.', HttpStatusCode.INTERNAL_SERVER);
        res.status(HttpStatusCode.INTERNAL_SERVER).json({ traceId, ...unknownError });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

async function start(): Promise<void> {
    try {
        await connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        const plan = await Plan.findOne();
        if (!plan) {
            await Plan.create(
                {
                    name: 'Basic',
                    videoQuality: 'Good',
                    resolution: '480p',
                    description: 'Good video quality in SD (480p). Watch on any phone, tablet, computer or TV. ',
                    price: 'US$7.99',
                    supportedDevices: [Device.TV, Device.Computer, Device.Mobile, Device.Tablet],
                    maxScreenCount: 1,
                },
                {
                    name: 'Standard',
                    videoQuality: 'Better',
                    resolution: '1080p',
                    description: 'Great video quality in Full HD (1080p). Watch on any phone, tablet, computer or TV.',
                    price: 'US$10.99',
                    supportedDevices: [Device.TV, Device.Computer, Device.Mobile, Device.Tablet],
                    maxScreenCount: 2,
                },
                {
                    name: 'Premium',
                    videoQuality: 'Best',
                    resolution: '4K+HDR',
                    description: 'Our best video quality in Ultra HD (4K) and HDR. Watch on any phone, tablet, computer or TV.',
                    price: 'US$13.99',
                    supportedDevices: [Device.TV, Device.Computer, Device.Mobile, Device.Tablet],
                    maxScreenCount: 5,
                }
            );
        }
    } catch (err) {
        throw err;
    }
}

start();
