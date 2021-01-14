var express = require("express");
var router = express.Router({mergeParams: true});
var Campground= require("../models/campgrounds");
var Comment= require("../models/comments");
var middleware = require("../middleware");


router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req, res){
    //render the form to create a new comment
    Campground.findById(req.params.id, function(err, campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("./Comments/new", {campground:campground});
        }
    })

});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundcamp){
        if(err)
        {
            console.log(err);
        }
        else
        {
           Comment.create(req.body.comment,function(err, comment){
            if(err)
            {
                req.flash("error", "Something went wrong");
                console.log(err);
                res.redirect("/campground");
            }
            else
            {
                comment.author._id= req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                foundcamp.comments = foundcamp.comments.concat(comment);
                foundcamp.save();
                req.flash("success", "Successfully added comment");
                res.redirect("/campgrounds/"+ foundcamp._id);
            }
           });
        }
    })
})

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    //res.send("Edit form");
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("Comments/edit", {campground_id:req.params.id, comment:foundComment});
        }
    });
    
});

router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err)
        {
            console.log(err);
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
})

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


module.exports = router;
