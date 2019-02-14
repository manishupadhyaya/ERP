const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path')
// const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const multer = require('multer')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpeg") {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

mongoose.Promise = global.Promise;

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db, {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//set public folder
app.use(express.static(path.join(__dirname, 'public')))

//set view engine
app.use(expressLayouts);
app.set('view engine', 'ejs')

//bodyparser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).any())
// parse application/json
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// app.use(expressValidator({
//   customValidators: {
//       isImage: (value, filename) => {
//           var extension = (path.extname(filename)).toLowerCase();
//           switch (extension) {
//               case '.jpg':
//                   return '.jpg';
//               case '.jpeg':
//                   return '.jpeg';
//               case '.png':
//                   return '.png';
//               case '':
//                   return '.jpg';
//               default:
//                   return false;
//           }
//       }
//   }
// }))

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/admins', require('./routes/admins'))
// app.use('/admins/superAdmin', require('./routes/superAdmin'))
// app.use('/admins/departmentAdmin',require('./routes/departmentAdmin'))
// app.use('/admins/establishmentAdmin', require('./routes/establishmentAdmin'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));