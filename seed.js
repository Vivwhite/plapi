var db = require('./models');

var lego_list = [
  {
    title: 'test code',
    language: 'html',
    type: 'code snippet',
    content: 'nav bar',
    tag: 'html, nav',
  },
  {
    title: 'contact form',
    language: 'html/css',
    type: 'form',
    content: 'contact form code here',
    tag: 'html, css, form',
  }
]

db.Lego.create(lego_list, function(err, legos){
  if(err){return console.log(err);}
  console.log(legos);
  process.exit();
});
