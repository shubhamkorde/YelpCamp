var express = require("express");
var router = express.Router({mergeParams: true});
var Campground= require("../models/campgrounds");
var Comment= require("../models/comments");
var passport = require("passport");
var User= require("../models/user");
router.get("/", function(req, res){
    res.render("landing");
});


router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err)
        {
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("/register");
        }
        else
        {
            passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp "+ user.username);
                res.redirect("/campgrounds");
            });
        }
    })
});


router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req, res){
});


router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;