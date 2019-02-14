const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const pdf = require('pdfkit')
var _ = require('lodash')
const {
  ensureAuthenticated,
  ensureAuthenticatedAdmin
} = require('../config/auth'); // Welcome Page
const PDFDocument = require('pdfkit');

// const Form1 = require('../models/Form1')
const nodemailer = require('nodemailer')

const Form1 = require('../models/form1')
const Form2 = require('../models/form2')
const Form3 = require('../models/form3')
const Expert = require('../models/expert')

const UserDetail = require('../models/userDetail')

router.get('/', (req, res) => res.render('welcome')); // Dashboard 

// router.get('/dashboard', ensureAuthenticated, (req, res) =>
// {
//   console.log(req._passport.session.user)
//   Form1.find({userId: req._passport.session.user}, (err, docs) => {
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
//   Form1.find({userId: req._passport.session.user}, (err, docs) => {
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


router.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

router.get('/data', ensureAuthenticated, (req, res) => {

  var userId = req._passport.session.user
  Form1.findOne({
    userId
  }, (err, details) => {
    res.send(details)
  })
})

var clickedForm1 = false
var clickedForm2 = false
var clickedForm3 = false
var clickedForm4 = false

router.get('/instructions', ensureAuthenticated, (req, res) => {

  var userId = req._passport.session.user

  UserDetail.find({userId}, (err, doc) => {
    if (err) console.log(err)
    console.log('Userdetail is: ',doc)

    if (doc.length === 0) {

      res.render('instructions')
    } else {
      res.redirect('/pdfdownload')
    }
  })
})


  router.get('/form1', ensureAuthenticated, (req, res) => {

    var userId = req._passport.session.user

    UserDetail.find({userId}, (err, doc) => {
      if (err) console.log(err)
      console.log('Userdetail is: ',doc)

        Form1.find({
          userId
        }, (err, docs) => {
      
          if (docs.length === 0) {
            res.render('form1')
          } else {
            res.redirect('/form1Edit')
          }
      
        })
     
    })
  })
 


  router.post('/form1', ensureAuthenticated, (req, res) => {


    var userId = req.user._id

    var body = _.pick(req.body, ['advNo', 'transactionId', 'bankName', 'branchName', 'date', 'ifsc', 'amount', "name", "motherName", "fatherName", "houseNoResidential", "streetResidential", "streetResidential1", "cityResidential", "landmarkResidential", "districtResidential", "postResidential", "policeResidential", "stateResidential", "countryResidential", "pincodeResidential", "houseNoPermanent", "streetPermanent", "streetPermanent1", "cityPermanent", "districtPermanent", "postPermanent", "policePermanent","statePermanent", "countryPermanent", "landmarkPermanent", "pincodePermanent", "email", "mobileNo", "mobileNo1", "gender", "DOB", "age", "maritalStatus", "category", "pwd", "disability"])
    body.userId = userId
    clickedForm1 = true
    body.clickedForm1 = true
    var form1 = new Form1(body)

    form1.save((err) => {
      if (err) {
        res.redirect('/form1')
      } else {
        res.redirect('/form2')
      }

    })
  })

  router.get('/form1Edit', ensureAuthenticated, (req, res) => {


    var userId = req._passport.session.user
    Form1.find({
      userId
    }, (err, docs) => {
      console.log("The Requested Docs are,", docs)
      res.render('form1Edit', {
        docs: docs
      })
    })

  })

  router.post('/form1Edit', ensureAuthenticated, (req, res) => {

    var userId = req.user._id

    var body = _.pick(req.body, ['advNo', 'transactionId', 'bankName', 'branchName', 'date', 'ifsc', 'amount', "name", "motherName", "fatherName", "houseNoResidential", "streetResidential", "streetResidential1", "cityResidential", "landmarkResidential", "districtResidential", "postResidential", "policeResidential", "stateResidential", "countryResidential", "pincodeResidential", "houseNoPermanent", "streetPermanent", "streetPermanent1", "cityPermanent", "districtPermanent", "postPermanent", "policePermanent","statePermanent", "countryPermanent", "landmarkPermanent", "pincodePermanent", "email", "mobileNo", "mobileNo1", "gender", "DOB", "age", "maritalStatus", "category", "pwd", "disability"])
    console.log(JSON.stringify(body, undefined, 3))
    Form1.update({
      userId
    }, {
      $set: {
        advNo: body.advNo,
        transactionId: body.transactionId,
        bankName: body.bankName,
        branchName: body.branchName,
        date: body.date,
        ifsc: body.ifsc,
        amount: body.amount,
        date: body.date,
        name: body.name,
        motherName: body.motherName,
        fatherName: body.fatherName,
        houseNoResidential: body.houseNoResidential,
        streetResidential: body.streetResidential,
        landmarkResidential: body.landmarkResidential,
        streetResidential1: body.streetResidential1,
        cityResidential: body.cityResidential,
        districtResidential: body.districtResidential,
        stateResidential: body.stateResidential,
        countryResidential: body.countryResidential,
        postResidential: body.policeResidential,
        policeResidential: body.policeResidential,
        pincodeResidential: body.pincodeResidential,
        houseNoPermanent: body.houseNoPermanent,
        streetPermanent: body.streetPermanent,
        streetPermanent1: body.streetPermanent1,
        landmarkPermanent: body.landmarkPermanent,
        cityPermanent: body.cityPermanent,
        districtPermanent: body.districtPermanent,
        policePermanent: body.policePermanent,
        postPermanent: body.postPermanent,
        statePermanent: body.statePermanent,
        countryPermanent: body.countryPermanent,
        pincodePermanent: body.pincodePermanent,
        email: body.email,
        mobileNo: body.mobileNo,
        mobileNo1: body.mobileNo1,
        gender: body.gender,
        DOB: body.DOB,
        age: body.age,
        maritalStatus: body.maritalStatus,
        category: body.category,
        pwd: body.pwd,
        disability: body.disablity
      },
    }, (err) => {
      if (err) {
        res.redirect('/form1Edit')
      } else {
        res.redirect('/form2')
      }
    })

  })






//Form2

router.get('/form2', ensureAuthenticated, (req, res) => {

  var userId = req._passport.session.user
  Form2.find({
    userId
  }, (err, docs) => {

    console.log("Form 2 get Docs are as follows", docs)

    if (docs.length === 0) {
      res.render('form2')
    } else {
      res.redirect('/form2Edit')
    }

  })
})

router.post('/form2', ensureAuthenticated, (req, res) => {


  var userId = req.user._id

  var body = _.pick(req.body, ["Xboard", "Xyear", "Xdivision", "Xpercentage", "Xcgpa", "XIIboard", "XIIbranch", "XIIyear", "XIIdivision", "XIIpercentage", "XIIcgpa", "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "dboard", "dbranch", "dyear", "ddivision", "dpercentage", "dcgpa", "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "pgboard", "pgbranch", "pgyear", "pgdivision", "pgpercentage", "pgcgpa", "phdboard", "phdbranch", "phdyear", "oboard", "obranch", "oyear", "odivision", "opercentage", "ocgpa", "tophd",
    "exorganization1", "exdesignation1", "exfrom1", "exto1", "duryear1", "durmonth1", "payScale1", "reason1",
    "exorganization2", "exdesignation2", "exfrom2", "exto2", "duryear2", "durmonth2", "payScale2", "reason2",
    "exorganization3", "exdesignation3", "exfrom3", "exto3", "duryear3", "durmonth3", "payScale3", "reason3",
    "exorganization4", "exdesignation4", "exfrom4", "exto4", "duryear4", "durmonth4", "payScale4", "reason4",
    "exorganization5", "exdesignation5", "exfrom5", "exto5", "duryear5", "durmonth5", "payScale5", "reason5",
    "exorganization6", "exdesignation6", "exfrom6", "exto6", "duryear6", "durmonth6", "payScale6", "reason6",
    "exorganization7", "exdesignation7", "exfrom7", "exto7", "duryear7", "durmonth7", "payScale7", "reason7",
    "exorganization8", "exdesignation8", "exfrom8", "exto8", "duryear8", "durmonth8", "payScale8", "reason8",
    "exorganization9", "exdesignation9", "exfrom9", "exto9", "duryear9", "durmonth9", "payScale9", "reason9",
    "exorganization10", "exdesignation10", "exfrom10", "exto10", "duryear10", "durmonth10", "payScale10", "reason10",
    "oExperience1", "oExperience2", "oExperience3", "oExperience4", "oExperience5",
    "annexureNo1", "annexureDetails1", "annexureNo2", "annexureDetails2", "annexureNo3", "annexureDetails3", "annexureNo3", "annexureDetails3", "annexureNo4", "annexureDetails4", "annexureNo5", "annexureDetails5", "annexureNo6", "annexureDetails6", "annexureNo7", "annexureDetails7", "annexureNo8", "annexureDetails8", "annexureNo9", "annexureDetails9", "annexureNo10", "annexureDetails10"
  ])
  body.userId = userId
  clickedForm2 = true
  body.clickedForm2 = true
  var form2 = new Form2(body)

  console.log("Form 2 Body is as follows:", body)

  form2.save((err) => {
    if (err) {
      console.log("Error in form 2 is: ", err)
      res.redirect('/form2')
    }
    res.redirect('/form3')
  })

})

router.get('/form2Edit', ensureAuthenticated, (req, res) => {

  console.log("Error is :")
  var userId = req._passport.session.user
  Form2.find({
    userId
  }, (err, docs) => {
    console.log("THe Form2Edit docs are:", docs)
    res.render('form2Edit', {
      docs: docs
    })
  })

})

router.post('/form2Edit', ensureAuthenticated, (req, res) => {

  var userId = req.user._id



  var body = _.pick(req.body, ["Xboard", "Xyear", "Xdivision", "Xpercentage", "Xcgpa", "XIIboard", "XIIbranch", "XIIyear", "XIIdivision", "XIIpercentage", "XIIcgpa", "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "dboard", "dbranch", "dyear", "ddivision", "dpercentage", "dcgpa", "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "pgboard", "pgbranch", "pgyear", "pgdivision", "pgpercentage", "pgcgpa", "phdboard", "phdbranch", "phdyear", "oboard", "obranch", "oyear", "odivision", "opercentage", "ocgpa", "tophd",
    "exorganization1", "exdesignation1", "exfrom1", "exto1", "duryear1", "durmonth1", "payScale1", "reason1",
    "exorganization2", "exdesignation2", "exfrom2", "exto2", "duryear2", "durmonth2", "payScale2", "reason2",
    "exorganization3", "exdesignation3", "exfrom3", "exto3", "duryear3", "durmonth3", "payScale3", "reason3",
    "exorganization4", "exdesignation4", "exfrom4", "exto4", "duryear4", "durmonth4", "payScale4", "reason4",
    "exorganization5", "exdesignation5", "exfrom5", "exto5", "duryear5", "durmonth5", "payScale5", "reason5",
    "exorganization6", "exdesignation6", "exfrom6", "exto6", "duryear6", "durmonth6", "payScale6", "reason6",
    "exorganization7", "exdesignation7", "exfrom7", "exto7", "duryear7", "durmonth7", "payScale7", "reason7",
    "exorganization8", "exdesignation8", "exfrom8", "exto8", "duryear8", "durmonth8", "payScale8", "reason8",
    "exorganization9", "exdesignation9", "exfrom9", "exto9", "duryear9", "durmonth9", "payScale9", "reason9",
    "exorganization10", "exdesignation10", "exfrom10", "exto10", "duryear10", "durmonth10", "payScale10", "reason10",
    "oExperience1", "oExperience2", "oExperience3", "oExperience4", "oExperience5",
    "annexureNo1", "annexureDetails1", "annexureNo2", "annexureDetails2", "annexureNo3", "annexureDetails3", "annexureNo3", "annexureDetails3", "annexureNo4", "annexureDetails4", "annexureNo5", "annexureDetails5", "annexureNo6", "annexureDetails6", "annexureNo7", "annexureDetails7", "annexureNo8", "annexureDetails8", "annexureNo9", "annexureDetails9", "annexureNo10", "annexureDetails10"
  ])


  console.log(JSON.stringify(body, undefined, 3))

  Form2.update({
    userId
  }, {
    $set: {
      Xboard: body.Xboard,
      Xbranch: body.Xbranch,
      Xyear: body.Xyear,
      Xdivision: body.Xdivision,
      Xpercentage: body.Xpercentage,
      Xcgpa: body.Xcgpa,
      XIIboard: body.XIIboard,
      XIIbranch: body.XIIbranch,
      XIIyear: body.XIIyear,
      XIIdivision: body.XIIdivision,
      XIIpercentage: body.XIIpercentage,
      XIIcgpa: body.XIIcgpa,
      gboard: body.XIIgboard,
      gbranch: body.gbranch,
      gyear: body.gyear,
      gdivision: body.gdivision,
      gpercentage: body.gpercentage,
      gcgpa: body.gcgpa,
      dboard: body.dboard,
      dbranch: body.dbranch,
      dyear: body.dyear,
      ddivision: body.ddivision,
      dpercentage: body.dpercentage,
      dcgpa: body.dcgpa,
      pgboard: body.pgboard,
      pgbranch: body.pgbranch,
      pgyear: body.pgyear,
      pgdivision: body.pgdivision,
      pgpercentage: body.pgpercentage,
      pgcgpa: body.pgcgpa,
      phdboard: body.phdboard,
      phdbranch: body.phdbranch,
      phdyear: body.phdyear,
      phddivision: body.phddivision,
      phdpercentage: body.phdpercentage,
      phdcgpa: body.phdcgpa,
      oboard: body.oboard,
      obranch: body.obranch,
      oyear: body.oyear,
      odivision: body.odivision,
      opercentage: body.opercentage,
      ocgpa: body.ocgpa,
      tophd: body.tophd,
      exorganization1: body.exorganization1,
      exdesignation1: body.exdesignation1,
      exfrom1: body.exfrom1,
      exto1: body.exto1,
      duryear1: body.duryear1,
      durmonth1: body.durmonth1,
      payScale1: body.payScale1,
      reason1: body.reason1,
      exorganization2: body.exorganization2,
      exdesignation2: body.exdesignation2,
      exfrom2: body.exfrom2,
      exto2: body.exto2,
      duryear2: body.duryear2,
      durmonth2: body.durmonth2,
      payScale2: body.payScale2,
      reason2: body.reason2,
      exorganization3: body.exorganization3,
      exdesignation3: body.exdesignation3,
      exfrom3: body.exfrom3,
      exto3: body.exto3,
      duryear3: body.duryear3,
      durmonth3: body.durmonth3,
      payScale3: body.payScale3,
      reason3: body.reason3,
      exorganization4: body.exorganization4,
      exdesignation4: body.exdesignation4,
      exfrom4: body.exfrom4,
      exto4: body.exto4,
      duryear4: body.duryear4,
      durmonth4: body.durmonth4,
      payScale4: body.payScale4,
      reason4: body.reason4,
      exorganization5: body.exorganization5,
      exdesignation5: body.exdesignation5,
      exfrom5: body.exfrom5,
      exto5: body.exto5,
      duryear5: body.duryear5,
      durmonth5: body.durmonth5,
      payScale5: body.payScale5,
      reason5: body.reason5,
      exorganization6: body.exorganization6,
      exdesignation6: body.exorganization6,
      exfrom6: body.exfrom6,
      exto6: body.exto6,
      duryear6: body.duryear6,
      durmonth6: body.durmonth6,
      payScale6: body.payScale6,
      reason6: body.reason6,
      exorganization7: body.exorganization7,
      exdesignation7: body.exdesignation7,
      exfrom7: body.exfrom7,
      exto7: body.exto7,
      duryear7: body.duryear7,
      durmonth7: body.durmonth7,
      payScale7: body.payScale7,
      reason7: body.reason7,
      exorganization8: body.exorganization7,
      exdesignation8: body.exdesignation8,
      exfrom8: body.exfrom8,
      exto8: body.exto8,
      duryear8: body.duryear8,
      durmonth8: body.durmonth8,
      payScale8: body.payScale8,
      reason8: body.reason8,
      exorganization9: body.exorganization9,
      exdesignation9: body.exdesignation9,
      exfrom9: body.exfrom9,
      exto9: body.exto9,
      duryear9: body.duryear9,
      durmonth9: body.durmonth9,
      payScale9: body.payScale9,
      reason9: body.reason9,
      exorganization10: body.exorganization9,
      exdesignation10: body.exorganization10,
      exfrom10: body.exfrom10,
      exto10: body.exto10,
      duryear10: body.duryear10,
      durmonth10: body.durmonth10,
      payScale10: body.payScale10,
      reason10: body.reason10,
      oExperience1: body.oExperience1,
      oExperience2: body.oExperience2,
      oExperience3: body.oExperience3,
      oExperience4: body.oExperience4,
      oExperience5: body.oExperience5,
      annexureNo1: body.annexureNo1,
      annexureDetails1: body.annexureDetails1,
      annexureNo2: body.annexureNo2,
      annexureDetails2: body.annexureDetails2,
      annexureNo3: body.annexureNo3,
      annexureDetails3: body.annexureDetails3,
      annexureNo3: body.annexureNo3,
      annexureDetails3: body.annexureDetails3,
      anbonexureNo4: body.annexureNo4,
      annexureDetails4: body.annexureDetails4,
      annexureNo5: body.annexureNo5,
      annexureDetails5: body.annexureDetails5,
      annexureNo6: body.annexureNo6,
      annexureDetails6: body.annexureDetails6,
      annexureNo7: body.annexureNo7,
      annexureDetails7: body.annexureDetails7,
      annexureNo8: body.annexureNo7,
      annexureDetails8: body.annexureDetails8,
      annexureNo9: body.annexureNo9,
      annexureDetails9: body.annexureDetails9,
      annexureNo10: body.annexureNo10,
      annexureDetails10: body.annexureDetails10
    },
  }, (err) => {
    if (err) {
      res.redirect('/form2Edit')
    } else {
      res.redirect('/form3')
    }
  })

})

//Form3

router.get('/form3', ensureAuthenticated, (req, res) => {
  var userId = req._passport.session.user
  Form3.find({
    userId
  }, (err, docs) => {
    if (docs.length === 0) {
      res.render('form3')
    } else {
      res.redirect('/form3Edit')
    }
  })
})
router.post('/form3', ensureAuthenticated, (req, res) => {
  var userId = req.user._id
  console.log(req.files);
  var body = {

    photo: req.files[0]? (req.files[0].path).substr(6, (req.files[0].path.length) - 1):'',
    signature: req.files[1]?(req.files[1].path).substr(6, (req.files[1].path.length) - 1):'',
    casteC:req.files[2]? (req.files[2].path).substr(6, (req.files[2].path.length) - 1):'',
    ageC: req.files[3]?(req.files[3].path).substr(6, (req.files[3].path.length) - 1):'',
    XMarksheet: req.files[4]?(req.files[4].path).substr(6, (req.files[4].path.length) - 1):'',
    XCertificate: req.files[5]?(req.files[5].path).substr(6, (req.files[5].path.length) - 1):'',
     XIIMarksheet: req.files[6]?(req.files[6].path).substr(6, (req.files[6].path.length) - 1):'',
     XIICertificate:req.files[7]? (req.files[7].path).substr(6, (req.files[7].path.length) - 1):'',
     diplomaMarksheet: req.files[8]?(req.files[8].path).substr(6, (req.files[8].path.length) - 1):'',
     diplomaCertificate: req.files[9]?(req.files[9].path).substr(6, (req.files[9].path.length) - 1):'',
     gradMarksheet:req.files[10]? (req.files[10].path).substr(6, (req.files[10].path.length) - 1):'',
     gradCertificate: req.files[11]?(req.files[11].path).substr(6, (req.files[11].path.length) - 1):'',
     postGradMarksheet: req.files[12]?(req.files[12].path).substr(6, (req.files[12].path.length) - 1):'',
     postGradCertificate: req.files[13]?(req.files[13].path).substr(6, (req.files[13].path.length) - 1):'',
     phdMarksheet: req.files[14]?(req.files[14].path).substr(6, (req.files[14].path.length) - 1):'',
     phdCertificate: req.files[15]?(req.files[15].path).substr(6, (req.files[15].path.length) - 1):'',
     experience1: req.files[16]?(req.files[16].path).substr(6, (req.files[16].path.length) - 1):'',
     experience2: req.files[17]?(req.files[17].path).substr(6, (req.files[17].path.length) - 1):'',
     experience3: req.files[18]?(req.files[18].path).substr(6, (req.files[18].path.length) - 1):'',
     experience4: req.files[19]?(req.files[19].path).substr(6, (req.files[19].path.length) - 1):'',
     experience5: req.files[20]?(req.files[20].path).substr(6, (req.files[20].path.length) - 1):'',
     experience6:req.files[21]? (req.files[21].path).substr(6, (req.files[21].path.length) - 1):'',
     userId: userId
}
  clickedForm1 = true
  body.clickedForm1 = true
  var form3 = new Form3(body)
  form3.save((err) => {
    if (err) {
      res.redirect('/form3Edit')
    }
    res.redirect('/formFinal')
  })
})
router.get('/form3Edit', ensureAuthenticated, (req, res) => {
  var userId = req._passport.session.user
  Form3.find({
    userId
  }, (err, docs) => {
    console.log("Form3 Edit DOcs are", docs)
    res.render('form3Edit', {
      docs: docs
    })
  })
})
router.post('/form3Edit', ensureAuthenticated, (req, res) => {
  var userId = req.user._id
  var body = {

    photo: req.files[0]? (req.files[0].path).substr(6, (req.files[0].path.length) - 1):'',
    signature: req.files[1]?(req.files[1].path).substr(6, (req.files[1].path.length) - 1):'',
    casteC:req.files[2]? (req.files[2].path).substr(6, (req.files[2].path.length) - 1):'',
    ageC: req.files[3]?(req.files[3].path).substr(6, (req.files[3].path.length) - 1):'',
    XMarksheet: req.files[4]?(req.files[4].path).substr(6, (req.files[4].path.length) - 1):'',
    XCertificate: req.files[5]?(req.files[5].path).substr(6, (req.files[5].path.length) - 1):'',
     XIIMarksheet: req.files[6]?(req.files[6].path).substr(6, (req.files[6].path.length) - 1):'',
     XIICertificate:req.files[7]? (req.files[7].path).substr(6, (req.files[7].path.length) - 1):'',
     diplomaMarksheet: req.files[8]?(req.files[8].path).substr(6, (req.files[8].path.length) - 1):'',
     diplomaCertificate: req.files[9]?(req.files[9].path).substr(6, (req.files[9].path.length) - 1):'',
     gradMarksheet:req.files[10]? (req.files[10].path).substr(6, (req.files[10].path.length) - 1):'',
     gradCertificate: req.files[11]?(req.files[11].path).substr(6, (req.files[11].path.length) - 1):'',
     postGradMarksheet: req.files[12]?(req.files[12].path).substr(6, (req.files[12].path.length) - 1):'',
     postGradCertificate: req.files[13]?(req.files[13].path).substr(6, (req.files[13].path.length) - 1):'',
     phdMarksheet: req.files[14]?(req.files[14].path).substr(6, (req.files[14].path.length) - 1):'',
     phdCertificate: req.files[15]?(req.files[15].path).substr(6, (req.files[15].path.length) - 1):'',
     experience1: req.files[16]?(req.files[16].path).substr(6, (req.files[16].path.length) - 1):'',
     experience2: req.files[17]?(req.files[17].path).substr(6, (req.files[17].path.length) - 1):'',
     experience3: req.files[18]?(req.files[18].path).substr(6, (req.files[18].path.length) - 1):'',
     experience4: req.files[19]?(req.files[19].path).substr(6, (req.files[19].path.length) - 1):'',
     experience5: req.files[20]?(req.files[20].path).substr(6, (req.files[20].path.length) - 1):'',
     experience6:req.files[21]? (req.files[21].path).substr(6, (req.files[21].path.length) - 1):'',
     userId: userId
}
  console.log(JSON.stringify(body, undefined, 3))
  Form3.update({
    userId
  }, {
    $set: {
      photo: body.photo,
      signature: body.signature,
      casteC: body.casteC,
      ageC: body.ageC,
      Xmarksheet: body.XMarksheet,
      Xcertificate: body.XCertificate,
      XIIMarksheet: body.XIIMarksheet,
      XIICertificate: body.XIICertificate,
      diplomaMarksheet: body.diplomaMarksheet,
      diplomaCertificate: body.diplomaCertificate,
      gradMarksheet: body.gradMarksheet,
      gradCertificate: body.gradCertificate,
      postGradMarksheet: body.postGradMarksheet,
      postGradCertificate: body.postGradCertificate,
      phdMarksheet: body.phdMarksheet,
      phdCertificate: body.phdCertificate,
      experience1: body.experience1,
      experience2: body.experience2,
      experience3: body.experience3,
      experience4: body.experience4,
      experience5: body.experience5,
      experience6: body.experience6,
      declareDate: body.declareDate,
      declarePlace: body.declarePlace,
      userId: body.userId
    },
  }, (err) => {
    if (err) {
      res.redirect('/form3Edit')
    } else {
      res.redirect('/formFinal')
    }
  })
})

//set /formFinal route
router.get('/formFinal',ensureAuthenticated,  (req, res) => {
  var userId = req._passport.session.user
  var body = {}
  Form1.findOne({userId}, (err, doc) => {
    body = _.pick(doc, ['advNo', 'transactionId', 'bankName', 'branchName', 'date', 'ifsc', 'amount', "name", "motherName", "fatherName", "houseNoResidential", "streetResidential", "streetResidential1", "cityResidential", "districtResidential", "stateResidential", "countryResidential", "pincodeResidential", "houseNoPermanent", "streetPermanent", "streetPermanent1", "cityPermanent", "districtPermanent", "statePermanent", "countryPermanent", "pincodePermanent", "email", "mobileNo", "gender", "DOB", "age", "maritalStatus", "category", "pwd", "disability"])
    // console.log('inside body',body)
  })

  Form2.findOne({userId}, (err,doc) => {
    var bodyForm2 = _.pick(doc, ["Xboard", "Xyear", "Xdivision", "Xpercentage", "Xcgpa", "XIIboard", "XIIbranch", "XIIyear", "XIIdivision", "XIIpercentage", "XIIcgpa", "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "dboard", "dbranch", "dyear", "ddivision", "dpercentage", "dcgpa", "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "pgboard", "pgbranch", "pgyear", "pgdivision", "pgpercentage", "pgcgpa", "phdboard", "phdbranch", "phdyear", "oboard", "obranch", "oyear", "odivision", "opercentage", "ocgpa", "tophd",
    "exorganization1", "exdesignation1", "exfrom1", "exto1", "duryear1", "durmonth1", "payScale1", "reason1",
    "exorganization2", "exdesignation2", "exfrom2", "exto2", "duryear2", "durmonth2", "payScale2", "reason2",
    "exorganization3", "exdesignation3", "exfrom3", "exto3", "duryear3", "durmonth3", "payScale3", "reason3",
    "exorganization4", "exdesignation4", "exfrom4", "exto4", "duryear4", "durmonth4", "payScale4", "reason4",
    "exorganization5", "exdesignation5", "exfrom5", "exto5", "duryear5", "durmonth5", "payScale5", "reason5",
    "exorganization6", "exdesignation6", "exfrom6", "exto6", "duryear6", "durmonth6", "payScale6", "reason6",
    "exorganization7", "exdesignation7", "exfrom7", "exto7", "duryear7", "durmonth7", "payScale7", "reason7",
    "exorganization8", "exdesignation8", "exfrom8", "exto8", "duryear8", "durmonth8", "payScale8", "reason8",
    "exorganization9", "exdesignation9", "exfrom9", "exto9", "duryear9", "durmonth9", "payScale9", "reason9",
    "exorganization10", "exdesignation10", "exfrom10", "exto10", "duryear10", "durmonth10", "payScale10", "reason10",
    "oExperience1", "oExperience2", "oExperience3", "oExperience4", "oExperience5",
    "annexureNo1", "annexureDetails1", "annexureNo2", "annexureDetails2", "annexureNo3", "annexureDetails3", "annexureNo3", "annexureDetails3", "annexureNo4", "annexureDetails4", "annexureNo5", "annexureDetails5", "annexureNo6", "annexureDetails6", "annexureNo7", "annexureDetails7", "annexureNo8", "annexureDetails8", "annexureNo9", "annexureDetails9", "annexureNo10", "annexureDetails10"
  ])
  body = Object.assign(body, bodyForm2)
  })

  Form3.findOne({userId}, (err,doc) => {
    var bodyForm3 = _.pick(doc, [ "photo", "signature", "casteC", "ageC", "XMarksheet", "XCertificate", "XIIMarksheet", "XIICertificate", "diplomaMarksheet", "diplomaCertificate", "gradMarksheet", "gradCertificate", "postGradMarksheet","postGradCertificate", "phdMarksheet", "phdCertificate", "experience1", "experience2", "experience3", "experience4", "experience5", "experience6"])

    body = Object.assign(body, bodyForm3)
  })

  setTimeout(() => {
     console.log('outside body',body)
     res.render('confirm_submission', {
      body
    })}, 100)
  
})

//post /formFinal
router.post('/formFinal', ensureAuthenticated, (req, res) => {
  var userId = req.user._id
  var body = {}
  Form1.findOne({userId}, (err, doc) => {
    body = _.pick(doc, ['advNo', 'transactionId', 'bankName', 'branchName', 'date', 'ifsc', 'amount', "name", "motherName", "fatherName", "houseNoResidential", "streetResidential", "streetResidential1", "cityResidential", "districtResidential", "stateResidential", "countryResidential", "pincodeResidential", "houseNoPermanent", "streetPermanent", "streetPermanent1", "cityPermanent", "districtPermanent", "statePermanent", "countryPermanent", "pincodePermanent", "email", "mobileNo", "gender", "DOB", "age", "maritalStatus", "category", "pwd", "disability"])
    // console.log('inside body',body)
  })

  Form2.findOne({userId}, (err,doc) => {
    var bodyForm2 = _.pick(doc, ["Xboard", "Xyear", "Xdivision", "Xpercentage", "Xcgpa", "XIIboard", "XIIbranch", "XIIyear", "XIIdivision", "XIIpercentage", "XIIcgpa", "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "dboard", "dbranch", "dyear", "ddivision", "dpercentage", "dcgpa", "gboard", "gbranch", "gyear", "gdivision", "gpercentage", "gcgpa", "pgboard", "pgbranch", "pgyear", "pgdivision", "pgpercentage", "pgcgpa", "phdboard", "phdbranch", "phdyear", "oboard", "obranch", "oyear", "odivision", "opercentage", "ocgpa", "tophd",
    "exorganization1", "exdesignation1", "exfrom1", "exto1", "duryear1", "durmonth1", "payScale1", "reason1",
    "exorganization2", "exdesignation2", "exfrom2", "exto2", "duryear2", "durmonth2", "payScale2", "reason2",
    "exorganization3", "exdesignation3", "exfrom3", "exto3", "duryear3", "durmonth3", "payScale3", "reason3",
    "exorganization4", "exdesignation4", "exfrom4", "exto4", "duryear4", "durmonth4", "payScale4", "reason4",
    "exorganization5", "exdesignation5", "exfrom5", "exto5", "duryear5", "durmonth5", "payScale5", "reason5",
    "exorganization6", "exdesignation6", "exfrom6", "exto6", "duryear6", "durmonth6", "payScale6", "reason6",
    "exorganization7", "exdesignation7", "exfrom7", "exto7", "duryear7", "durmonth7", "payScale7", "reason7",
    "exorganization8", "exdesignation8", "exfrom8", "exto8", "duryear8", "durmonth8", "payScale8", "reason8",
    "exorganization9", "exdesignation9", "exfrom9", "exto9", "duryear9", "durmonth9", "payScale9", "reason9",
    "exorganization10", "exdesignation10", "exfrom10", "exto10", "duryear10", "durmonth10", "payScale10", "reason10",
    "oExperience1", "oExperience2", "oExperience3", "oExperience4", "oExperience5",
    "annexureNo1", "annexureDetails1", "annexureNo2", "annexureDetails2", "annexureNo3", "annexureDetails3", "annexureNo3", "annexureDetails3", "annexureNo4", "annexureDetails4", "annexureNo5", "annexureDetails5", "annexureNo6", "annexureDetails6", "annexureNo7", "annexureDetails7", "annexureNo8", "annexureDetails8", "annexureNo9", "annexureDetails9", "annexureNo10", "annexureDetails10"
  ])
  body = Object.assign(body, bodyForm2)
  })

  Form3.findOne({userId}, (err,doc) => {
    var bodyForm3 = _.pick(doc, [ "photo", "signature", "casteC", "ageC", "XMarksheet", "XCertificate", "XIIMarksheet", "XIICertificate", "diplomaMarksheet", "diplomaCertificate", "gradMarksheet", "gradCertificate", "postGradMarksheet","postGradCertificate", "phdMarksheet", "phdCertificate", "experience1", "experience2", "experience3", "experience4", "experience5", "experience6"])

    body = Object.assign(body, bodyForm3)
  })

  setTimeout(() => {
    body.userId = userId
    UserDetail.find({userId}, (err, docs) => {
      if (err) console.log(err) 

      if(docs.length===0){
        var userDetail = new UserDetail(body)
        userDetail.save(err => {
          if(err) console.log(err)
          else {
            console.log('outside body',body)
          res.redirect('/pdfdownload')
          }
        })
      }
      //  else {
      //   res.send('Form once submitted can\'t be changed')
      // }
    })
    }, 100)
})

router.get('/pdfdownload', ensureAuthenticated, (req, res) => {
  var userId = req._passport.session.user
  UserDetail.findOne({userId}, (err, body) => {
    res.render('form_submitted', {
      body
    })
  })
})

router.get('/pdf', ensureAuthenticated, (req, res) => {
  var userId = req._passport.session.user
  UserDetail.findOne({userId}, (err, body) => {
    var myDoc = new pdf


    myDoc.pipe(fs.createWriteStream('form.pdf'))
    myDoc.pipe(res)

    myDoc.image('images/nitbanner.png', 0,15,  {width: 600, height: 100})
        
    myDoc.font('Times-Roman')
         .fontSize(34)
         .text('node js pdf doc',15, 120,{
           align: 'left'
         })
         
    myDoc.fontSize(24)
         .text(`Name: ${body.name}`)

  
    myDoc.end()

    })

    //nodemailer code

})

var approveEstablishmentAdmin = false
var sendToEstablishmentAdmin = false
var hodToEstablishmentAdmin = false
var waitForDirector = false


router.get('/admins/superAdmin/read', ensureAuthenticatedAdmin, (req, res, next) => {

  const doc = new PDFDocument()
  doc.pipe(fs.createWriteStream(path.join('hello.pdf')))
  //     Form1.find({},(err,result)=>{
  doc.pipe(res)

  doc.text("Hello WOrld")
  doc.end()

  // })
})

router.get('/admins/superAdmin', ensureAuthenticatedAdmin, (req, res) => {

  if (approveEstablishmentAdmin) {
      UserDetail.find({}, (err, docs) => {
        if (err) return console.log(err)
  
        res.render('super_admin', {
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
  sentFinalList = true

  console.log('req.body is:',req.body)

  for (let id of Object.entries(req.body)) {
    console.log('id:', id)
    if (id[1] === 'false') {
      UserDetail.findOneAndUpdate({
        userId: id[0]
      }, {
        $set: {
          eligibility: false
        }
      }, {
        new: true
      }, (err, doc) => {
        if (err) console.log(err)
      })
    } else if (id[1] === 'true') {
      UserDetail.findOneAndUpdate({
        userId: id[0]
      }, {
        $set: {
          eligibility: true
        }
      }, {
        new: true
      }, (err, doc) => {
        if (err) console.log(err)
      })
    }
  }

  UserDetail.find({}, (err, docs) => {
    if (err) console.log(err)

    docs.forEach((doc) => {
      if (doc.eligibility === true) {
        UserDetail.findOneAndUpdate({
          userId: doc.userId
        }, {
          $set: {
            sendMail: true
          }
        }, {
          new: true
        }, (err, doc) => {
          if (err) console.log(err)
        })
      }
    })
  })

  res.send('list sent to establishment admin')
});


// get expert section 
router.get('/admins/superAdmin/panel', ensureAuthenticatedAdmin, (req, res) => {

  Expert.find({}, (err, docs) => {
    if (docs.length === 0) {
      res.render('expert', {
        docs
      })
    } else {
      res.redirect('/admins/superAdmin/showPanel')
    }
  })
});

router.get('/admins/superAdmin/showPanel', ensureAuthenticatedAdmin, (req, res) => {
  Expert.find({}, (err, docs) => {
    res.render('expert', {
      docs
     })
  })
})

// get add expert section 
router.get('/admins/superAdmin/addPanel', ensureAuthenticatedAdmin, (req, res) => {
  res.render('add-panel')
});

// post add expert section 
router.post('/admins/superAdmin/addPanel', ensureAuthenticatedAdmin, (req, res) => {
  var body = _.pick(req.body, [ "advNo", "postFor", "date", "place", "name1","designation1","affiliation1","contactNo1","email1","name2","designation2","affiliation2","contactNo2","email2","name3","designation3","affiliation3","contactNo3","email3","name4","designation4","affiliation4","contactNo4","email4","name5","designation5","affiliation5","contactNo5","email5","name6","designation6","affiliation6","contactNo6","email6"])
  var expert = new Expert (
    body
  )

  expert.save(err => {
    if (err) return console.log(err)

    res.send('expert data saved!')
  })
});

router.post('/admins/superAdmin/mail', ensureAuthenticatedAdmin, (req, res) => {
  res.send('mail sent!')
})

//get final list section 
router.get('/admins/superAdmin/finalList', ensureAuthenticatedAdmin, (req, res) => {

    UserDetail.find({sendMail: true}, (err, docs) => {
      if (err) return console.log(err)
      
      res.render('final_list', {
        docs
      })
    })
});

//post final list section 
router.post('/admins/superAdmin/finalList', ensureAuthenticatedAdmin, (req, res) => {


  for (let id of Object.keys(req.body)) {
    console.log('id:',id);
    console.log('req.body',req.body)
    UserDetail.findOneAndUpdate({
      userId: id
    }, {
      $set: {
        finallySelected: true
      }
    }, {
      new: true
    }, (err, doc) => {
      if (err) console.log(err)

      console.log("Updated docs are,", doc)
      // console.log(doc)
    })
  }

  res.send('sent!')
});





// get establishment admin
router.get('/admins/establishmentAdmin', ensureAuthenticatedAdmin, (req, res) => {

  if (hodToEstablishmentAdmin) {
    if (!waitForDirector) {
      if (sendToEstablishmentAdmin) {
        res.redirect('/admins/establishmentAdmin/sendMail')
      } else {
        UserDetail.find({}, (err, docs) => {
          if (err) return console.log(err)

          res.render('establishment_admin1', {
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

//post establishment admin
router.post('/admins/establishmentAdmin', ensureAuthenticatedAdmin, (req, res) => {
  res.send('sent to the director')
  approveEstablishmentAdmin = true
  waitForDirector = true
})

//get sendMail
router.get('/admins/establishmentAdmin/sendMail',ensureAuthenticatedAdmin, (req, res) => {

  UserDetail.find({
    sendMail: true
  }, (err, docs) => {
    if (err) return console.log(err)
    res.render('establishment_admin', {
      docs: docs,
      user: req.user
    })
  })
})

router.post('/admins/establishmentAdmin/sendMail',ensureAuthenticatedAdmin, (req, res) => {
  UserDetail.find({
    sendMail: true
  }, (err, docs) => {
    if (err) return console.log(err)

    console.log('The User is :', JSON.stringify(req.user, undefined, 3), "Yo YO")

    console.log("The docs are as follows: ", JSON.stringify(docs, undefined, 2))
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

    transporter.verify(function (error, success) {
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

//get sendMail
router.get('/admins/establishmentAdmin/mail',ensureAuthenticatedAdmin, (req, res) => {

  // UserDetail.find({
  //   sendMail: true
  // }, (err, docs) => {
  //   if (err) return console.log(err)
  //   res.render('establishment_admin', {
  //     docs: docs,
  //     user: req.user
  //   })
  // })
  UserDetail.find({finallySelected:true}, (err, docs) => {
    if (err) return console.log(err)

    res.render('mail_final', {
      docs
    })
  })
})

//get sendMail
router.post('/admins/establishmentAdmin/mail',ensureAuthenticatedAdmin, (req, res) => {

  //see for finallySelected: true
})


// get department admin
router.get('/admins/hodAdmin', ensureAuthenticatedAdmin, (req, res) => {

  UserDetail.find({}, (err, docs) => {
    console.log("The hod docs are: ", docs)
    if (err) return console.log(err)

    res.render('hod_admin', {
      docs: docs,
      user: req.user
    })
  })
});

// get department admin


// post department admin
router.post('/admins/hodAdmin', ensureAuthenticatedAdmin, (req, res) => {
  console.log('req body is: ', req.body)

  hodToEstablishmentAdmin = true

  res.send('ok')
  for (let id of Object.keys(req.body)) {
    console.log('id:',id);
    console.log('req.body',req.body)
    UserDetail.findOneAndUpdate({
      userId: id
    }, {
      $set: {
        eligibility: true
      }
    }, {
      new: true
    }, (err, doc) => {
      if (err) console.log(err)

      console.log("Updated docs are,", doc)
      // console.log(doc)
    })
  }


  for (let id of Object.entries(req.body)) {
    console.log('id:',id);
    console.log('req.body',req.body)
    UserDetail.findOneAndUpdate({
      _id: id[0]
    }, {
      $set: {
        Remarks: id[1]
      }
    }, {
      new: true
    }, (err, doc) => {
      if (err) console.log(err)

      console.log("Updated docs are,", doc)
      // console.log(doc)
    })
  }

  
  // UserDetail.find({}, (err, docs) => {
  //   docs.forEach(doc => {
  //     UserDetail.findByIdAndUpdate( doc._id,
  //       {
  //         $set: {
  //           Remarks: 'try1'
  //         }}, {
  //           new: true
  //       }, (err, doc1) => {
  //         if(err) console.log(err)

  //         console.log("Remarks docs are,", doc1)
  //       })
  //   })
  // })

});

//user detail page
router.get('/admins/userdetail/:id', ensureAuthenticatedAdmin, (req, res) => {

    var id = req.params.id

    UserDetail.findById(id, (err, body) => {
      if (err)  return console.log(err)

        res.render('user_detail',{
            body
        })
        console.log('user detail:',body)
    })
  });

  //csv file download
  router.get('/csv', (req, res) => {
    const Json2csvParser = require('json2csv').Parser;
    const fields = ['userId','name', 'stateResidential', 'gender', 'email', 'mobileNo', 'age', 'maritalStatus', 'category', 'pwd' ];
  
     UserDetail.find({}, (err, docs) => {
      if (err)  return console.log(err)
    
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(docs);
        
        res.send(new Buffer(csv))
    })
  })

module.exports = router