const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
var _ = require('lodash')
const {
    ensureAuthenticated,
    ensureAuthenticatedAdmin
} = require('../config/auth'); // Welcome Page
const PDFDocument = require('pdfkit');

const UserDetail = require('../models/userDetail')
const nodemailer = require('nodemailer')

const Form1 = require('../models/form1')


router.get('/', (req, res) => res.render('welcome')); // Dashboard 

// router.get('/dashboard', ensureAuthenticated, (req, res) =>
// {
//   console.log(req._passport.session.user)
//   UserDetail.find({userID: req._passport.session.user}, (err, docs) => {
//       if (err)  return console.log(err)
//       console.log(docs)

//       if(docs.length === 0) {
//         res.render('form', {
//         user: req.user
//       })
//       } else {
//         res.send('Form submitted')
//       }
//   })

// })

// router.get('/dashboard', ensureAuthenticated, (req, res) =>
// {
//   console.log(req._passport.session.user)
//   Form1.find({userID: req._passport.session.user}, (err, docs) => {
//       if (err)  return console.log(err)
//       console.log(docs)

//       if(docs.length === 0) {
//         res.render('form1', {
//         user: req.user
//       })
//       } else {
//         res.send('Form submitted')
//       }
//   })

// })


router.get('/data', ensureAuthenticated, (req, res) => {

    var userId = req._passport.session.user
    UserDetail.findOne({
        userId
    }, (err, details) => {
        res.send(details)
    })
})

var clickedForm1 = false
var clickedForm2 = false
var clickedForm3 = false
var clickedForm4 = false

router.get('/form1', ensureAuthenticated , (req,res)=>{
  
  var userId = req._passport.session.user
  Form1.find({userId},(err,docs)=>{
  
    if(docs.length===0)
    {   
          res.render('form1')     
    }
    else
    {
          res.redirect('/form1Edit')
    }

  })

router.post('/form1',ensureAuthenticated, (req,res)=>{


      var userId = req.user._id

    var body = _.pick(req.body,['advNo','transactionId','bankName','branchName','amount'])
    body.userId = userId
    clickedForm1 = true
    body.clickedForm1 = true
    var form1 = new Form1(body)

    form1.save((err)=>{
      if (err) {
                res.redirect('/form1')
            }
            res.redirect('/form1Edit')
        })

})

router.get('/form1Edit',ensureAuthenticated,(req,res)=>{


  var userId = req._passport.session.user
  Form1.find({userId},(err,docs)=>{
    console.log(docs)
    res.render('form1Edit',{docs: docs})
  })

})

router.post('/form1Edit',ensureAuthenticated,(req,res)=>{

  var userId = req.user._id

  var body = _.pick(req.body,['advNo','transactionId','bankName','branchName','amount'])
  console.log(JSON.stringify(body,undefined,3))
  Form1.update({userId},{
    $set:{
      advNo: body.advNo,
      transactionId: body.transactionId,
      bankName: body.bankName,
      branchName: body.branchName,
      amount: body.amount,
    },
   },(err)=>{
     if(err)
     {
       res.redirect('/form1Edit')
     }
     else
     {
        res.redirect('/form1Edit')
     }
   }
  )

})




})

//Form2

// router.get('/form2',(req,res)=>{
  
//   var userId = req._passport.session.user
//   Form1.find({userId},(err,docs)=>{
  
//     if(docs)
//     {   
//           res.redirect('/form2Edit')
//     }
//     else
//     {
//           res.render('form1')
//     }

//   })

// router.post('/form2',ensureAuthenticated, (req,res)=>{


//       var userId = req.user._id

//     var body = _.pick(req.body,['advNo','transactionId','bankName','branchName','amount'])
//     body.userId = userId
//     clickedForm1 = true
//     body.clickedForm1 = true
//     var form1 = new Form1(body)

//     form1.save((err)=>{
//       if (err) {
//                 res.redirect('/form2')
//             }
//             res.redirect('/form2Edit')
//         })

// })

// router.get('/form2Edit',ensureAuthenticated,(req,res)=>{


//   var userId = req._passport.session.user
//   Form1.find({userId},(err,docs)=>{
//     console.log(docs)
//     res.render('form1Edit',{docs: docs})
//   })

// })

// router.post('/form2Edit',ensureAuthenticated,(req,res)=>{

//   var userId = req.user._id

  

//   var body = _.pick(req.body,['advNo','transactionId','bankName','branchName','amount'])
//   console.log(JSON.stringify(body,undefined,3))
//   Form1.update({userId},{
//     $set:{
//       advNo: body.advNo,
//       transactionId: body.transactionId,
//       bankName: body.bankName,
//       branchName: body.branchName,
//       amount: body.amount,
//     },
//    },(err,res)=>{
//      if(err)
//      {
//        res.redirect('/form1edit')
//      }
//      else
//      {
//        res.redirect('/form2Edit')
//      }
//    }
//   )

// })




// })


// router.post('/dashboard',(req, res) => {
//     console.log(req.files)
//     // console.log(req.user)
//     // console.log(req.body)
//     var userID = req.user._id
//     // console.log(userID)
//     // if(!req.file)
//     // {

//     // }

//     var body = _.pick(req.body,['transactionId','bankName','branchName','amount'])
//     body.userId = userID
//     var form1 = new Form1(body)

//     form1.save((err)=>{
//       if (err) {
//                 res.redirect('/form1')
//             }
//             res.redirect('/form1/edit')
//         })

    // var body = _.pick(req.body, ["advNo",
    // "email", "mobileNo", "gender", "DOB", "age", "maritalStatus", "category", "pwd", "percentage", "transactionId", "bankName", "branchName", "amount", "transactionDate", "name", "motherName", "fatherName", "houseNoResidential", "streetResidential", "streetResidential1", "cityResidential", "districtResidential", "stateResidential", "countryResidential", "pincodeResidential", "houseNoPermanent", "streetPermanent", "streetPermanent1", "cityPermanent", "districtPermanent", "statePermanent", "countryPermanent", "pincodePermanent", 'filler', "Xboard", "Xbranch", "Xyear", "Xdivision", "Xpercentage", "Xcgpa", "Xboard", "Xbranch", "Xyear", "Xdivision", "Xpercentage", "Xcgpa", "XIIboard", "XIIbranch", "XIIyear", "XIIdivision", "XIIpercentage", "XIIcgpa", "XIIboard", "XIIbranch", "XIIyear", "XIIdivision", "XIIpercentage", "XIIcgpa",
    //     "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "dboard", "dbranch", "dyear", "ddivision", "dpercentage", "dcgpa", "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "pgboard", "pgbranch", "pgyear", "pgdivision", "pgpercentage", "pgcgpa", , "phdboard", "phdbranch", "phdyear", "phddivision", "phdpercentage", "phdcgpa", "oboard", "obranch", "oyear", "odivision", "opercentage", "ocgpa", "tophdboard", "tophdbranch", "tophdyear", "tophddivision", "tophdpercentage", "tophdcgpa", 
    //     "exorganization1","exdesignation1", "exfrom1", "exto1", "duryear1", "durmonth1", "payScale1","reason1",
    //     "exorganization2","exdesignation2", "exfrom2", "exto2", "duryear2", "durmonth2", "payScale2","reason2",
    //     "exorganization3","exdesignation3", "exfrom3", "exto3", "duryear3", "durmonth3", "payScale3","reason3",
    //     "exorganization4","exdesignation4", "exfrom4", "exto4", "duryear4", "durmonth4", "payScale4","reason4",
    //     "exorganization5","exdesignation5", "exfrom5", "exto5", "duryear5", "durmonth5", "payScale5","reason5",
    //     "exorganization6","exdesignation6", "exfrom6", "exto6", "duryear6", "durmonth6", "payScale6","reason6"
    // ])
    // body.eligibility = false
    // body.userID = userID
    // body.photo = req.files[0].path;
    // body.signature=req.files[1].path;
    // body.casteC= req.files[2].path;
    // body.ageC=req.files[3].path;
    // body.XMarksheet=req.files[4].path;
    // body.XCertificate=req.files[5].path;
    // body.XIIMarksheet=req.files[6].path;
    // body.XIICertificate=req.files[7].path;
    // body.diplomaMarksheet=req.files[8].path;
    // body.diplomaCertificate=req.files[9].path;
    // body.gradMarksheet=req.files[10].path;
    // body.gradCertificate= req.files[11].path;
    // body.postGradMarksheet=req.files[12].path;
    // body.postGradCertificate=req.files[13].path;
    // body.phdMarksheet=req.files[14].path;
    // body.phdCertificate=req.files[15].path;
    // //console.log(files)
    // // console.log(userID)
    // var userDetails = new UserDetail(body)
    // // console.log(userDetails)
    // userDetails.save((err) => {
    //     if (err) {
    //         res.redirect('dashboard')
    //     }
    //     res.redirect('/dashboard/edit')
    // })




// })

var approveEstablishmentAdmin = false
var sendToEstablishmentAdmin = false
var hodToEstablishmentAdmin = false
var waitForDirector = false

   

router.get('/admins/superAdmin/read',ensureAuthenticatedAdmin,(req,res,next)=>{

        const doc = new PDFDocument()
        doc.pipe(fs.createWriteStream(path.join('hello.pdf')))
    //     UserDetail.find({},(err,result)=>{
        doc.pipe(res)

        doc.text("Hello WOrld")
        doc.end()

    // })
})
router.get('/admins/superAdmin', ensureAuthenticatedAdmin, (req, res) => {

    if (approveEstablishmentAdmin) {
      UserDetail.find({}, (err, docs) => {
        if (err)  return console.log(err)
    
          res.render('super_admin',{
            docs: docs,
            user: req.user
          })
      })
    } else {
      res.send('yet to be approved by establishment section')
    }
  });
  
  // post super admin
  router.post('/admins/superAdmin', ensureAuthenticatedAdmin, (req, res) => {
  
    sendToEstablishmentAdmin = true
    waitForDirector = false
    
    for (let id of Object.entries(req.body)) {
      if(id[1] === 'false'){
        UserDetail.findOneAndUpdate({userID: id}, { $set : {
          eligibility: false
        }}, {new:true}, (err, doc) => {
          if(err) console.log(err)
        })
      } else if (id[1] === 'true') {
        UserDetail.findOneAndUpdate({userID: id}, { $set : {
          eligibility: true
        }}, {new:true}, (err, doc) => {
          if(err) console.log(err)
        })
      }
    }
  
    UserDetail.find({}, (err, docs) => {
      if(err) console.log(err)
  
      docs.forEach((doc) => {
        if(doc.eligibility === true) {
          UserDetail.findOneAndUpdate({userID : doc.userID}, { $set: {
            sendMail: true
          }}, {new: true}, (err,doc) => {
            if(err) console.log(err)
          })
        }
      })
    })
  
    res.send('ok')
  });
  
  // get establishment admin
  router.get('/admins/establishmentAdmin', ensureAuthenticatedAdmin, (req, res) => {
  
     if (hodToEstablishmentAdmin) {
      if (!waitForDirector) {
        if (sendToEstablishmentAdmin) {
          res.redirect('/admins/establishmentAdmin/sendMail')
        } else {
          UserDetail.find({}, (err, docs) => {
            if (err)  return console.log(err)
          
              res.render('establishment_admin1',{
                docs: docs,
                user: req.user
              })
          })
        }
      } else {
        res.send('wait for the director to respond')
      }
     } else {
       res.send('List not sent by hod')
     }
  });
  
  //get sendMail
  router.get('/admins/establishmentAdmin/sendMail', (req, res) => {

    UserDetail.find({sendMail: true}, (err, docs) => {
      if (err)  return console.log(err)
        res.render('establishment_admin',{
          docs: docs,
          user: req.user
        })
    })
  })

  router.post('/admins/establishmentAdmin/sendMail',(req,res)=>{
    UserDetail.find({sendMail: true}, (err, docs) => {
      if (err)  return console.log(err)
    
      console.log('The User is :',JSON.ify(req.user,undefined, 3),"Yo YO")

    console.log("The docs are as follows: ",JSON.ify(docs,undefined,2))
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "tedxnits2019@gmail.com",
            pass: "tedx@2019"
        }
    })
    let HelperOptions = {
        from: `"Establishment Admin" <'tedxnits2019@gmail.com'>`,
        to: 'coolmanishupadhyaya@gmail.com',
        subject: 'Contact form mail',
        text: `Email:'coolmanishupadhyaya@gmail.com' Info:  ${docs}`
    };

    transporter.verify(function(error, success) {
        if (error) {
             console.log(error);
        } else {
             console.log('Server is ready to take our messages');
        }
     });

    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            console.log(error)
        }
        console.log("The message was sent!");
        console.log(info);
        res.redirect('/admins/establishmentAdmin/sendMail');
    });


  })
})
  
  //post establishment admin
  router.post('/admins/establishmentAdmin', ensureAuthenticatedAdmin, (req, res) => {
    res.send('sent to the director')
    approveEstablishmentAdmin = true
    waitForDirector = true
  })
  
  // get department admin
  router.get('/admins/hodAdmin', ensureAuthenticatedAdmin, (req, res) => {
  
    UserDetail.find({}, (err, docs) => {
      if (err)  return console.log(err)
  
        res.render('hod_admin',{
          docs: docs,
          user: req.user
        })
    })
  });
  
  // get department admin

  
  // post department admin
  router.post('/admins/hodAdmin', ensureAuthenticatedAdmin, (req, res) => {
  
    hodToEstablishmentAdmin = true
  
    res.send('ok')
    for (let id of Object.keys(req.body)) {
      console.log(id); 
      UserDetail.findOneAndUpdate({userID: id}, { $set : {
        eligibility: true
      }}, {new:true}, (err, doc) => {
        if(err) console.log(err) 
        // console.log(doc)
      }) 
    }
  });
// router.get('/admins/:id', ensureAuthenticatedAdmin, (req, res) => {
  
//     var id = req.params.id
  
//     UserDetail.findById(id, (err, doc) => {
//       if (err)  return console.log(err)
  
//         res.send(doc)
//         console.log(doc)
//     })
//   });
module.exports = router