var $ = require('jquery');
var _ = require('underscore');


$('#start').on('click',function(){
  $('#start').trigger('hero attacked');
  bindIt();
});

function bindIt(){
  $('#start').bind('hero attacked', heroAttack());
}

function unbindIt(){
  $('#start').unbind('hero attacked');
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
    alert("Congradulations!!! You've bet Starring Suzie!");
  }else{
    setTimeout(enemyAttack, 2000);
  }
}

function enemyAttack(){
  var randomNum = _.random(0, 10);
  $('.content-section-hero').append('<p>"AHHHHH! The Enemy attacked you!!!"</p>' + '( -' + randomNum + '%)');
  var progBarStat = $('#hero-prog-bar').html();
  var ProgBarInt = parseFloat(progBarStat);
  var newProgBarStat = ProgBarInt - randomNum;
  var herosBar = $('#hero-prog-bar').html(newProgBarStat + "%");
  $('#hero-prog-bar').css({"width": newProgBarStat + '%'})
  if (parseFloat(herosBar[0].textContent) <= 0){
    alert("Rats!!! You've been beaten by Starring Suzie!");
  }else{
    setTimeout(clearFields, 2000);
  }

}

function clearFields(){
  $('.content-section-enemy').html('');
  $('.content-section-hero').html('');
  activeBtn();
}


function disableBtn(){
  $('#start').addClass('disabled');
}


function activeBtn(){
  $('#start').removeClass('disabled');
}

$('#charactermenu-hero').on('click', function (){
    $('.dropdown-toggle').dropdown();

})
