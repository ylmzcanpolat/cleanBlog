const Post = require("../models/Post")

//Veri tabanından tüm postları almak için.
exports.getAllPosts = async (req, res) => {
    //Pagination
    const page = req.query.page || 1;
    const postPerPage = 2;

    const totalPost = await Post.find().countDocuments();

    const posts = await Post.find({})
        .sort("-dateCreated")
        .skip((page - 1) * postPerPage)
        .limit(postPerPage)

    res.render("index", {
        posts: posts,
        current: page,
        pages: Math.ceil(totalPost / postPerPage)
    });

};

//Veri tabanından post almak için.
exports.getPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("post", {
        post
    });
}

//Veri tabanında yeni post oluşturmak için.
exports.createPost = async (req, res) => {
    await Post.create(req.body);
    res.redirect("/");
}

//Veri tabanında post güncellemek için.
exports.updatePost = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id })
    post.title = req.body.title
    post.detail = req.body.detail
    post.save()

    res.redirect(`/posts/${req.params.id}`)
};

//Veri tabanından post silmek için.
exports.deletePost = async (req, res) => {
    await Post.findByIdAndRemove(req.params.id)
    res.redirect("/")
}