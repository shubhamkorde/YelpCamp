var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middlewareObj ={

};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                console.log(err);
                res.redirect("back");
            }
            else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("You need to be logged in to do that!")
        res.redirect("back");
    }    
}

middlewareObj.checkCommentOwnership = function (req, res, next){

    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else{
                if(foundComment.author.username==req.user.username){
                    next();
                }
                else{
                    req.flash("error", "You do not have permission to do that!!");
                    res.redirect("back");
                }
            }
        })
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }    
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to that");
    res.redirect("/login");
}

module.exports = middlewareObj;