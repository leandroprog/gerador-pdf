import app from './app';

//const PORT = process.env.APP_PORT;

app.listen(8180);










return true;
const PORT = process.env.APP_PORT;

const app = express();


app.use(express.json());

app.get("/", (req, res) => {
  console.log('tet')
  res.json({pk:true});
});


