var express = require("express");
var router = express.Router({mergeParams: true});
var Campground= require("../models/campgrounds");
var Comment= require("../models/comments");
var middleware = require("../middleware");


router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("./Campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
       }
    });
});

//CREATE - add new campground to DB
router.post("/",middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id : req.user._id,
        username: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image,price: price, description: desc, author:author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("./Campgrounds/new.ejs"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            //console.log(foundCampground);
            res.render("./Campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT route

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
            Campground.findById(req.params.id, function(err, foundCampground){
                res.render("Campgrounds/edit", {campground: foundCampground});
            });
        });
router.put("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updatedCampground){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    } )
});
//Destroy Route
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        console.log("Delete Route called");
        if(err)
        {
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;