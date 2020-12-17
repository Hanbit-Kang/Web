var server = require('./server');
var obj_login;

alert('dd');
$( document ).ready(function(){
  alert('dd');
  obj_login = document.getElementsByClassName('btn_login')[0];
  alert('dd');
  obj_login.addEventListener('click',function(){
    alert('dd');
    printID();
  });
});
