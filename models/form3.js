var mongoose = require('mongoose')

var Form3 = mongoose.Schema({
    userId: String,
    signature: String,
    photo: String,
    casteC: String,
    ageC: String,
    XMarksheet: String,
    XCertificate: String,
    XIIMarksheet: String,
    XIICertificate: String,
    diplomaMarksheet: String,
    diplomaCertificate: String,
    gradMarksheet: String,
    gradCertificate: String,
    postGradMarksheet: String,
    postGradCertificate: String,
    phdMarksheet: String,
    phdCertificate: String,
    experience1: String,
    experience2: String,
    experience3: String,
    experience4: String,
    experience5: String,
    experience6: String,
    declareDate: String,
    declarePlace: String
})

var Form3 = module.exports = mongoose.model('Form3', Form3)