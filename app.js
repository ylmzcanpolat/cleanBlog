// core modules
const express = require('express');
const mongoose = require('mongoose');

// 3 th party modules
const methodOverride = require('method-override');
const ejs = require('ejs');

//local modules
const postController = require("./controllers/postControllers")
const pageController = require("./controllers/pageControllers")

const app = express();

//connect DB
mongoose.connect('mongodb+srv://yilmaz:x-Jk%23WEuF3ihWs5@cluster0.htdwu.mongodb.net/cleanblog-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log("CONNECTED TO DB...")
}).catch((err) => {
  console.log(err)
});

//temlate engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method', {
  methods: ["POST", "GET"]
}));

//Routes
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post("/posts", postController.createPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/posts/:id", postController.deletePost);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`sunucu ${port} numaralı portta başlatıldı..`);
});
