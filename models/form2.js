const mongoose = require('mongoose')

var Form2 = mongoose.Schema({
    userId: String,
    Xboard: String,
    Xyear: Number,
    Xdivision: Number,
    Xpercentage: Number,
    Xcgpa: Number,
    XIIboard: String,
    XIIbranch: String,
    XIIyear: Number,
    XIIdivision: Number,
    XIIpercentage: Number,
    XIIcgpa: Number,
    dboard: String,
    dbranch: String,
    dyear: Number,
    ddivision: Number,
    dpercentage: Number,
    dcgpa: Number,
    gboard: String,
    gbranch: String,
    gyear: Number,
    gdivision: Number,
    gpercentage: Number,
    gcgpa: Number,
    pgboard: String,
    pgbranch: String,
    pgyear: Number,
    pgdivision: Number,
    pgpercentage: Number,
    pgcgpa: Number,
    phdboard: String,
    phdbranch: String,
    phdyear: Number,
    oboard: String,
    obranch: String,
    oyear: Number,
    odivision: Number,
    opercentage: Number,
    ocgpa: Number,
    tophd: String,
    exorganization1: String,
    exdesignation1: String,
    exfrom1: Date,
    exto1: Date,
    duryear1: Number,
    durmonth1: String,
    payScale1: Number,
    reason1: String,
    exorganization2: String,
    exdesignation2: String,
    exfrom2: Date,
    exto2: Date,
    duryear2: Number,
    durmonth2: String,
    payScale2: Number,
    reason2: String,
    exorganization3: String,
    exdesignation3: String,
    exfrom3: Date,
    exto3: Date,
    duryear3: Number,
    durmonth3: String,
    payScale3: Number,
    reason3: String,
    exorganization4: String,
    exdesignation4: String,
    exfrom4: Date,
    exto4: Date,
    duryear4: Number,
    durmonth4: String,
    payScale4: Number,
    reason4: String,
    exorganization5: String,
    exdesignation5: String,
    exfrom5: Date,
    exto5: Date,
    duryear5: Number,
    durmonth5: String,
    payScale5: Number,
    reason5: String,
    exorganization6: String,
    exdesignation6: String,
    exfrom6: Date,
    exto6: Date,
    duryear6: Number,
    durmonth6: String,
    payScale6: Number,
    reason6: String,
    exorganization7: String,
    exdesignation7: String,
    exfrom7: Date,
    exto7: Date,
    duryear7: Number,
    durmonth7: String,
    payScale7: Number,
    reason7: String,
    exorganization8: String,
    exdesignation8: String,
    exfrom8: Date,
    exto8: Date,
    duryear8: Number,
    durmonth8: String,
    payScale8: Number,
    reason8: String,
    exorganization9: String,
    exdesignation9: String,
    exfrom9: Date,
    exto9: Date,
    duryear9: Number,
    durmonth9: String,
    payScale9: Number,
    reason9: String,
    exorganization10: String,
    exdesignation10: String,
    exfrom10: Date,
    exto10: Date,
    duryear10: Number,
    durmonth10: String,
    payScale10: Number,
    reason10: String,
    oExperience1:String,
    oExperience2:String,
    oExperience3:String,
    oExperience4: String,
    oExperience5: String,
    annexureNo1: String,
    annexureDetail1:String,
    annexureNo2: String,
    annexureDetail2:String,
    annexureNo3: String,
    annexureDetail3:String,
    annexureNo4: String,
    annexureDetail4:String,
    annexureNo5: String,
    annexureDetail5:String,
    annexureNo6: String,
    annexureDetail6:String,
    annexureNo7: String,
    annexureDetail7:String,
    annexureNo8: String,
    annexureDetail8:String,
    annexureNo9: String,
    annexureDetail9:String,
    annexureNo10: String,
    annexureDetail10:String
})

var Form2 = module.exports = mongoose.model('Form2',Form2)