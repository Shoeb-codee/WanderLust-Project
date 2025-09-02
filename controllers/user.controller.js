const User = require("../models/user");



module.exports.signupUser = async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser,((err)=>{
        if(err){
          return next(err);
        }
        console.log(registeredUser);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
      }))
      
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

module.exports.loginUser =  async (req, res) => {
    req.flash("success","Welcome back to Wanderlust :) ");
    let redirectURl = res.locals.redirectUrl || "/listings";
    delete res.locals.redirectURl;
    res.redirect(redirectURl);
  }
  
  module.exports.logoutUser = (req,res,next)=>{
 if(req.user){
   req.logout((err)=>{
    if(err){
     return next(err);
    }
    req.flash("success","You are logged out!!");
    res.redirect('/listings');
  })
 }else{
   req.flash("error","You are already logged out!!");
    res.redirect('/login');
 }
}