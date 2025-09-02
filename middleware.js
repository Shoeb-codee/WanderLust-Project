const { model } = require("mongoose");
const Listing = require('./models/listing');
const ExpressError = require("./utils/ExpressError");
const { listingSchema,reviewSchema } = require("./schema");
const Review = require("./models/review");

module.exports.isLoggedIn = (req,res,next)=>{
  if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","you must be logged In");
    return res.redirect('/login');
  }
  next();
}

module.exports.saveRedirectUrl = (req,res,next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async(req,res,next)=>{
   let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","You are not the Owner of this Listing");
      return res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports.validateListing = (req, res, next) => {
   const {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(',');
    console.log(`This is :${errMsg}`);
    throw new ExpressError(400,errMsg);
  }else{
  next();
  }
}

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isAuthor = async(req,res,next)=>{
   let {reviewId} = req.params;
   let {id} = req.params;
    let reviews = await Review.findById(reviewId);
    if(!reviews.author.equals(res.locals.currUser._id)){
      req.flash("error","You are not the Author of this Review");
      return res.redirect(`/listings/${id}`)
    }
    next()
}