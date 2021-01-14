var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    Campground  = require("./models/campgrounds"),
    Comment     = require("./models/comments"),
    seedDB      = require("./seeds"),
    passport    = require ("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride= require("method-override"),
    User        = require("./models/user");
    app.use(flash());
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes   = require("./routes/campgrounds"),
    indexRoutes   = require("./routes/index");
    //seedDB();

    mongoose.connect(process.env.DATABASEURL,{useNewUrlParser: true, useUnifiedTopology: true });

    //mongoose.connect("mongodb+srv://YelpCamp:helloworld@cluster0-gjac1.mongodb.net/test?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));



//======================================
//PASSPORT CONFIGURATION
//======================================
app.use(require("express-session")({
    secret: "Rusty is the cutest dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error     = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use("/campgrounds",campgroundRoutes);
//INDEX - show all campgrounds

console.log(process.env.DATABASEURL);
app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});

