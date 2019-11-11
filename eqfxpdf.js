// Define JSON File
 var fs = require("fs");
 const PDFDocument = require('pdfkit');
 console.log("\n *STARTING* \n");
// Get content from file
 var contents = fs.readFileSync("response.json");
// Define to JSON type
 var jsonContent = JSON.parse(contents);
// Get Value from JSON
var CIRReportDataLst = jsonContent.CCRResponse.CIRReportDataLst;
var IDAndContactInfo = CIRReportDataLst[0].CIRReportData.IDAndContactInfo;

var PersonalInfo = IDAndContactInfo.PersonalInfo;
var alias = PersonalInfo.AliasName;
var placeOfBirth = PersonalInfo.PlaceOfBirthInfo[0];

if(alias == null ){
	alias = "Empty";

}else{
	console.log("alias not null"+alias);
}

if(placeOfBirth == null){
	placeOfBirth = "Empty";
}else{
	console.log("placeOfBirth not null"+placeOfBirth);
}

var Name = PersonalInfo.Name.FullName;
var DOB = PersonalInfo.DateOfBirth;
var Gender = PersonalInfo.Gender;
var Age = PersonalInfo.Age.Age;

console.log(alias);
console.log(placeOfBirth);

var email = IDAndContactInfo.EmailAddressInfo[0].EmailAddress;

var ScoreDetails = CIRReportDataLst[0].CIRReportData.ScoreDetails[0].Value;


 //console.log("Email:", jsonContent.email);
 //console.log("Password:", jsonContent.password);
 //console.log("\n *EXIT* \n");


 // Create a document
const doc = new PDFDocument;

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Embed a font, set the font size, and render some text
//doc.font('fonts/PalatinoBold.ttf')
  // .fontSize(25)
   //.text('Some text with an embedded font!', 100, 100);

// Add some text with annotations
doc.fillColor("black")
   .text(`Name: ${Name}`)
   .moveDown()
   .text(`Alias: ${alias}`)
   .moveDown()
   .text(`DOB: ${DOB}`)
   .moveDown()
   .text(`Age: ${Age}`)
   .moveDown()
   .text(`Gender: ${Gender}`)
   .moveDown()
   .text(`EmailAddress: ${email}`)
   .moveDown()
   .text(`Score: ${ScoreDetails}`)
   .moveDown()
   
  
   //.underline(100, 100, 160, 27, {color: "#0000FF"})
   //.link(100, 100, 160, 27, 'http://google.com/');

// Finalize PDF file
doc.end();