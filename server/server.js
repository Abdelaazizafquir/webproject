const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());
const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true if your app is served over HTTPS
}));

(async()=>{
  try{
  await mongoose.connect('mongodb://127.0.0.1/quizz');
  console.log("connected to database");
}catch(err){
console.log("error connection to database");
}
})();


const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const resultRoutes = require('./routes/resultRoutes');
const UserRoutes = require('./routes/UserRoutes');

app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/result',resultRoutes);
app.use('/User',UserRoutes);
app.listen(3001, () => {
  console.log(`Server is running on port 3000`);
});
