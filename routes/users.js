const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/user');

var nodemailer = require('nodemailer')

//
const request = require('request')

// // Login Page
router.get('/login', (req, res) => res.render('login'));

// // Register Page
router.get('/register', (req, res) => res.render('register'));

// // Register
// router.post('/register', (req, res) => {
//   const { name, email, password, password2 } = req.body;
//   let errors = [];

//   if (!name || !email || !password || !password2) {
//     errors.push({ msg: 'Please enter all fields' });
//   }

//   if (password != password2) {
//     errors.push({ msg: 'Passwords do not match' });
//   }

//   if (password.length < 6) {
//     errors.push({ msg: 'Password must be at least 6 characters' });
//   }

//   if (errors.length > 0) {
//     res.render('register', {
//       errors,
//       name,
//       email,
//       password,
//       password2
//     });
//   } else {
//     User.findOne({ email: email }).then(user => {
//       if (user) {
//         errors.push({ msg: 'Email already exists' });
//         res.render('register', {
//           errors,
//           name,
//           email,
//           password,
//           password2
//         });
//       } else {
//         const newUser = new User({
//           name,
//           email,
//           password
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 req.flash(
//                   'success_msg',
//                   'You are now registered and can log in'
//                 );
//                 res.redirect('/users/login');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   }
// });

// Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/form1',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

var rand="123456"
console.log(rand)
// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        //
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "tedxnits2019@gmail.com",
            pass: "tedx@2019"
          }
        })
        var link="http://"+req.get('host')+"/users/verify?id="+rand + '&email=' + newUser.email;
        console.log("THe link is :",link)
        var HelperOptions={
        to : newUser.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        }


        transporter.sendMail(HelperOptions, (error, info) => {
          if (error) {
            console.log(error)
          }
          console.log("The message was sent!");
          console.log(info);
          res.redirect('/users/login')
        })
        //

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.get('/verify',function(req,res){
  console.log(req.protocol+"://"+req.get('host'));
  if((req.protocol+"://"+req.get('host'))==("http://"+req.get('host')))
  {
      console.log("Domain is matched. Information is from Authentic email");
      console.log(req.query.id)
      if(req.query.id==123456)
      {
          var email = req.query.email
          console.log("EMail is",email)
          console.log("email is verified");
          User.findOneAndUpdate({email},{
            $set:{
              isVerified: true
            }
          },
            {new: true},
            (err,doc)=>{
              if(err)
              {
                console.log("The error is ",err);
              }
              else
              {
                res.redirect('/users/login')
              }
            }
          )
      }
      else
      {
          console.log("email is not verified");
          res.end("<h1>Bad Request</h1>");
      }
  }
  else
  {
      res.end("<h1>Request is from unknown source");
  }
  });

//
router.post('/login', function(req, res, next) {
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    return res.json({"responseError" : "Please select captcha first"});
  }
  const secretKey = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body) {

    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      return res.json({"responseError" : "Failed captcha verification"});
    }
    // res.json({"responseSuccess" : "Sucess"});
    passport.authenticate('local', {
      successRedirect: '/instructions',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
