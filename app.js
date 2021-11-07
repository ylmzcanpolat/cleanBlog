const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require("./controllers/postControllers")
const pageController = require("./controllers/pageControllers")


const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.set('view engine', 'ejs');


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

const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} numaralı portta başlatıldı..`);
});
