const express = require('express');
const cors = require('cors');
const serviceRouter = require('./routers/service.routers');
const typeRouter = require('./routers/type.routers');
const establishmentRouter = require('./routers/establishment.routers');
const cuisineRouter = require('./routers/cuisine.routers');
const phoneRouter = require('./routers/phone.routers');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', serviceRouter);
app.use('/api', typeRouter);
app.use('/api', establishmentRouter);
app.use('/api', cuisineRouter);
app.use('/api', phoneRouter);
let whitelist = ['http://localhost:4200'];
app.use(cors(
  {
    origin: (origin, callback) => {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        const message = 'The CORS policy for this origin doesnt allow access from the particular origin.';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  }
));

app.listen(PORT, () => console.log(`server started on post ${PORT}`));

