const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
const natural = require('natural')

const Quote = require('./models/quote_cookies')
const Profile = require('./models/profile')
const Key = require('./models/key')

const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

// Create server to serve index.html
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const port = process.env.PORT || 3000;


// Start server listening process.
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
})

// Connect to mongo
mongoose.connect('mongodb+srv://shihyun:0000@cluster0-w423m.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
db = mongoose.connection

// Routing
app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// post profile to database
app.post('/profile', (req, res) => {
    
    console.log('this is post /post');
    
    const body = req.body;
    console.log(body);
    db.on('error', error => {
        console.log(error);
    });

    let user_id = body.user_id;
    let user_password = body.user_password;
    
    const profile = new Profile({ user_id, user_password });
    profile.save(err => {
      if(err) console.error(err);
      res.send('post');
    });
    console.log("post profile succecfully");
});

// update collection to profiles
app.post('/collect', (req, res) => {
    
  console.log('this is post /collect');
  
  const body = req.body;
  console.log(body);
  db.on('error', error => {
      console.log(error);
  });

  let user_id = body.user_id;
  let quote = body.quote;
  let author = body.author;
  let category = body.category;

  const profile = db.collection("profiles");
  profile.updateOne(
    { "user_id": user_id },
    { "$push": { "collected" :{ quote, author, category }}}
  );
  console.log("post profile succecfully");
  res.send('post collection in profile sucessfully');
});

// post quote to database, the least important
app.post('/quote', (req, res) => {
    const body = req.body;
    console.log('this is quote body', body);
    res.send('quote successfully posted!');
    
    db.on('error', error => {
        console.log(error);
    });

    let Quote_context = body.Quote;
    let Author = body.Author;
	  // let Tags = body.Tags;
	  // let Popularity = body.Popularity;
    let Category = body.Category;
    
    const quote = new Quote({ Quote: Quote_context, Author, Category });
    quote.save( err => {
        if (err) console.error(err);
    });
});

// get data from keys
app.get('/key', (req, res) => {
  db.on('error', error => {
      console.log(error);
  });
  // const query = req.query;
  const key = db.collection("keys");
  console.log('query', req.body.query);

  // get data keys 
  key.find({}).toArray(function(err, result) {
    if (err) throw err;
    // return the random all key in recent records
    console.log("keys:", result);
    res.send(result); 
  });
});

// get data from profiles (including collections)
app.get('/profile', (req, res) => {
    db.on('error', error => {
        console.log(error);
    });
    // const query = req.query;
    const profile = db.collection("profiles");
    console.log('query', req.body.query);
    profile.findOne(req.body.query, function(err, result) {
        if (err) throw err;
        // console.log(result);
        // before send back the result, you have to check whether they are corresponding to your constraints
        res.send(result);       
    });
});

// post key to database and get data from quote_cookies
app.get('/quote', (req, res) => {
  // post key to database
  const body = req.body;
  console.log('this is quote body', body);
  
  db.on('error', error => {
      console.log(error);
  });

  let key = body.key;
  let time = body.time;

  if(key !== undefined){
    const keys = new Key({ key, time });
    keys.save( err => {
        if (err) console.error(err);
    });
  }

  db.on('error', error => {
      console.log(error);
  });
  // find the nearest category using natural
  const categories = ['', 'arts', 'books', 'death', 'education', 'faith', 'friendship', 'funny', 'god',
                'happiness', 'hope', 'humor', 'inspiration', 'knowledge', 'life', 'love', 'mind',
                'motivation', 'philosophy', 'poetry', 'positive', 'purpose', 'quotes',
                'relationship', 'religion', 'romance', 'science', 'soul', 'success', 'truth',
                'wisdom', 'writing'];
  let nearest_cat = []
  let nearest_dis = natural.HammingDistance(key, categories[0]);
  for(var i = 0; i < categories.length; i++){
      this_dis = natural.HammingDistance(key, categories[i]);
      if(this_dis < nearest_dis){
        nearest_dis = this_dis;
        nearest_cat = [categories[i]];
      }
      else if(this_dis == nearest_dis)
        nearest_cat.push(categories[i]);
  }
  // console.log("nearest categories:", nearest_cat);
  // random a category from the nearest categories
  const rand_num = Math.floor(Math.random()*(nearest_cat.length));
  const rand_category = nearest_cat[rand_num];
  // console.log('rand_category:', rand_category);
  // natural.HammingDistance("karolin", "kathrin", false)
  const quote = db.collection("quote_cookies");
  
  // find all quotes that is correspond to the constraints
  quote.find({Category: rand_category}).toArray(function(err, result) {
    if (err) throw err;
    // random a quote from the category
    const rand_num = Math.floor(Math.random()*(result.length));
    //console.log("rand_num:", rand_num);
    const rand_quote = result[rand_num];
    //console.log("rand_quote:", rand_quote);
    res.send(rand_quote); 
  });
});

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);


app.get('*', (req, res)=>{
    res.sendFile('index.html', {root: './public'})
})