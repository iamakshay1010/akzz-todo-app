const router = require("express").Router();
const List = require("../models/List");
const User = require("../models/User");

//create a post

//    http://localhost:3000/api/lists/
// {     
//     "title":"akz",
//     "desc":"here we go" 
// }

router.post("/", async (req, res) => {
    const newPost = new List(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a post
// DELETE
// http://localhost:3000/api/posts/61bb534191231dfcb36d52b3

router.delete("/:id", async (req, res) => {
    try {
        console.log("delte route")
        const post = await List.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL POSTS
//http://localhost:4000/api/posts/
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await List.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await List.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });







module.exports = router;