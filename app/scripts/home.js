var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');





$('#dropdownMenuHero').click( function(){
$('.choose-hero').toggleClass('open');
$('.choose-enemy').removeClass('open');
chooseHeroList();
});


$('#dropdownMenuEnemy').click(function(){
$('.choose-enemy').toggleClass('open');
$('.choose-hero').removeClass('open');
chooseEnemyList();
});


var limit = 3;
$('input.single-checkbox').on('change', function(evt) {
   if($('input[name = "powerbox"]:checked').length >= limit) {
       this.checked = false;
   }
});

$('#rick').on('change', function(){
  var newUrl =window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  return newUrl;
})


var characterData = [
  {
   name: 'Blazzing Bernie',
   imageUrl: '../app/images/characters/bb.gif'
  },
  {
    name: 'Starring Suzzie',
    imageUrl: '../app/images/characters/ss.gif'
  },
  {
    name: 'Hungry Henry',
    imageUrl: '../app/images/characters/hh.gif'
  },
  {
    name: 'Frozen Fiona',
    imageUrl: '../app/images/characters/ff.gif'
  }
];

var themeData =[
  {
    name: 'color1',
    color: 'yellow'
  },
  {
    name: 'color2',
    color: 'blue'
  },
  {
    name: 'color3',
    color: 'purple'
  },
  {
    name: 'color4',
    color: 'red'
  },
];



//Functions for choosing theme

function chooseTheme(){
    $('#color1').click(function(){
      themeTemplate(themeData, 0);
    });
    $('#color2').click(function(){
      themeTemplate(themeData, 1);
    });
    $('#color3').click(function(){
      themeTemplate(themeData, 2);
    });
    $('#color4').click(function(){
      themeTemplate(themeData, 3);
    });
}

chooseTheme();
chooseThemeE();

function chooseThemeE(){
    $('#color1-e').click(function(){
      themeTemplateE(themeData, 0);
    });
    $('#color2-e').click(function(){
      themeTemplateE(themeData, 1);
    });
    $('#color3-e').click(function(){
      themeTemplateE(themeData, 2);
    });
    $('#color4-e').click(function(){
      themeTemplateE(themeData, 3);
    });
}


function themeTemplate(data, i){
  var source = $('#themeChosen').html();
  var templateSource = handlebars.compile(source);
  var compiled = templateSource(data[i]);
  $('.colors').append().html(compiled);
}

function themeTemplateE(data, i){
  var source = $('#themeChosen').html();
  var templateSource = handlebars.compile(source);
  var compiled = templateSource(data[i]);
  $('.colors-e').append().html(compiled);
}



//Functions for choosing character

function chooseHeroList(){
  $('#bb').click( function(){
    characterChosen(characterData, 0)
    $('.choose-hero').toggleClass('open');
  });
  $('#ss').click( function(){
    characterChosen(characterData, 1)
    $('.choose-hero').toggleClass('open');
  });
  $('#hh').click( function(){
    characterChosen(characterData, 2)
    $('.choose-hero').toggleClass('open');
  });
  $('#ff').click( function(){
    characterChosen(characterData, 3)
    $('.choose-hero').toggleClass('open');
  });
}

function chooseEnemyList(){
  $('#bb-e').click( function(){
    enemyCharacterChosen(characterData, 0);
    $('.choose-enemy').toggleClass('open');
  });
  $('#ss-e').click( function(){
    enemyCharacterChosen(characterData, 1);
    $('.choose-enemy').toggleClass('open');
  });
  $('#hh-e').click( function(){
    enemyCharacterChosen(characterData, 2);
    $('.choose-enemy').toggleClass('open');
  });
  $('#ff-e').click( function(){
    enemyCharacterChosen(characterData, 3);
    $('.choose-enemy').toggleClass('open');
  });
}


function characterChosen(data, i){
  var source = $('#CharacterChosen').html();
  var templateSource = handlebars.compile(source);
  var compiled = templateSource(data[i]);
  $('.replace-with-hero-pic').html(compiled);
}

function enemyCharacterChosen(data, i){
  var source = $('#CharacterChosen').html();
  var templateSource = handlebars.compile(source);
  var compiled = templateSource(data[i]);
  $('.replace-with-enemy-pic').html(compiled);
}

function heroBattleTemplate(data){
  var source = $('#hero-template').html();
  var templateSource = handlebars.compile(source);
  var compiled = templateSource(data);
  $('.hero-template').html(compiled);
}

function enemyBattleTemplate(data){
  var source = $('#enemy-template').html();
  var templateSource = handlebars.compile(source);
  var compiled = templateSource(data);
  $('.enemy-template').html(compiled);
}


//function to get battle info

  $('#battle-btn').click(function(){
      fetchHeroData();
      fetchEnemyData();
      heroBattleTemplate(hero);
      enemyBattleTemplate(enemy);
    });


function fetchHeroData(){
  var heroName = $('.replace-with-hero-pic h3').html();
  var heroImage = $('.replace-with-hero-pic img').attr('src');
  var powers = $('input[name = "powerbox"]:checked').next('label').text();
  var heroTheme = $('.colors li').css('background-color');
  var heroObject = {'name': heroName, 'image': heroImage, 'powers': powers, 'theme': heroTheme};
  var hero = new Goat(heroObject);
 console.log(hero);
 return hero;
}

function fetchEnemyData(){
  var enemyName = $('.replace-with-enemy-pic h3').html();
  var enemyImage = $('.replace-with-enemy-pic img').attr('src');
  var enemyTheme = $('.colors-e li').css('background-color');
  var enemyObject = {'name': enemyName, 'image': enemyImage, 'theme': enemyTheme};
  var enemy = new Goat(enemyObject);
  console.log(enemy);
  return enemy;
}




//battle data
function Goat(data){
  this.name = true;
  if (data && data.name != undefined){
    this.name = data.name;
    this.image = data.image;
    this.powers = data.powers;
    this.theme = data.theme;
  }
}
Goat.prototype.name = 'Goat Name';
Goat.prototype.image = '../app/images/characters/bb.gif';
Goat.prototype.powers = 'Random Attack';
Goat.prototype.theme = 'rgba(255,255,255,1)';
