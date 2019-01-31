router.get('/form1',(req,res)=>{
  
  var userId = req._passport.session.user
  Form1.find({userId},(err,docs)=>{
  
    if(docs)
    {   
          res.redirect('/form1Edit')
    }
    else
    {
          res.render('form1')
    }

  })