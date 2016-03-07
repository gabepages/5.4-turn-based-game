var $ = require('jquery');
global.jQuery = $;
require('bootstrap');
var _ = require('underscore');
var handlebars = require('handlebars');
var home = require('./home');


home.then(function(hero, enemy){
console.log(hero, enemy);
$('.hero-name').css({'background-color': hero.theme});
$('.enemy-name').css({'background-color': enemy.theme});
$('#start').click(function(){
  attackSound();
  $('#powerModal').modal('show');
  setTimeout(function(){
    $('#powerModal').modal('hide');
    $('#start').trigger('hero:attacked');
  },2500);
  bindIt();
});

function bindIt(){
  $('#start').on('hero:attacked', heroAttack);
}

function unbindIt(){
  $('#start').unbind('hero:attacked');
}

function heroAttack(){
  unbindIt();
  disableBtn();
  var randomNum = _.random(0,10);
  $('.content-section-enemy').append('<p>"BAHHHHH! You attacked me!!!"</p>' + '( -' + randomNum + '%)');
  var progBarStat = $('#enemy-prog-bar').html();
  var ProgBarInt = parseFloat(progBarStat);
  var newProgBarStat = ProgBarInt - randomNum;
  var enemysBar =$('#enemy-prog-bar').html(newProgBarStat + "%");
  $('#enemy-prog-bar').css({"width": newProgBarStat + '%'})
  if (parseFloat(enemysBar[0].textContent) <= 0){
    alert("Congradulations!!! You've won!!!");
  }else{
    setTimeout(enemyAttack, 2000);
  }
}

function enemyAttack(){
  var randomNum = _.random(0, 10);
  $('.content-section-hero').append('<p>"AHHHHH! The Enemy attacked you with a random move!!!"</p>' + '( -' + randomNum + '%)');
  var progBarStat = $('#hero-prog-bar').html();
  var ProgBarInt = parseFloat(progBarStat);
  var newProgBarStat = ProgBarInt - randomNum;
  var herosBar = $('#hero-prog-bar').html(newProgBarStat + "%");
  $('#hero-prog-bar').css({"width": newProgBarStat + '%'})
  if (parseFloat(herosBar[0].textContent) <= 0){
    alert("Rats!!! You've been beaten!!!");
  }else{
    setTimeout(clearFields, 4000);
  }

}

function clearFields(){
  $('.content-section-enemy').html('');
  $('.content-section-hero').html('');
  activeBtn();
}

function attackSound(){
  $('#attack')[0].play();
}

function disableBtn(){
  $('#start').addClass('disabled');
}


function activeBtn(){
  $('#start').removeClass('disabled');
}



});
