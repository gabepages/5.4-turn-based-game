//var $ = require('jquery');
var $ = global.jQuery;
var _ = require('underscore');
require('bootstrap');
var handlebars = require('handlebars');

var deferred = $.Deferred();

$('#startGame')[0].play();

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


var limit = 2;
$('input.single-checkbox').on('change', function(evt) {
   if($('input[name = "powerbox"]:checked').length >= limit) {
       this.checked = false;
   }
});

$('#rick').on('change', function(){
  var newUrl =window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
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

var powerData ={
  headButt: '../app/images/attacks/headbut.gif',
  superSpit: '../app/images/attacks/superspit.gif',
  lowerBodyAttack: '../app/images/attacks/lowerbodyattack.gif',
  crippler: '../app/images/attacks/crippler.gif',
  headshot: '../app/images/attacks/headshot.gif'
};


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
    $('.choose-hero').removeClass('open');
  });
  $('#ss').click( function(){
    characterChosen(characterData, 1)
    $('.choose-hero').removeClass('open');
  });
  $('#hh').click( function(){
    characterChosen(characterData, 2)
    $('.choose-hero').removeClass('open');
  });
  $('#ff').click( function(){
    characterChosen(characterData, 3)
    $('.choose-hero').removeClass('open');
  });
}

function chooseEnemyList(){
  $('#bb-e').click( function(){
    enemyCharacterChosen(characterData, 0);
    $('.choose-enemy').removeClass('open');
  });
  $('#ss-e').click( function(){
    enemyCharacterChosen(characterData, 1);
    $('.choose-enemy').removeClass('open');
  });
  $('#hh-e').click( function(){
    enemyCharacterChosen(characterData, 2);
    $('.choose-enemy').removeClass('open');
  });
  $('#ff-e').click( function(){
    enemyCharacterChosen(characterData, 3);
    $('.choose-enemy').removeClass('open');
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
  var source = $('#heroAndVs-template').html();
  var templateSource = handlebars.compile(source);
  var compiled = templateSource(data);
  $('.filter').replaceWith(compiled);
}

function enemyBattleTemplate(data){
  var source = $('#enemy-template').html();
  var templateSource = handlebars.compile(source);
  var compiled = templateSource(data);
  $('.battle-ground').append(compiled);

}

//function to get battle info

  $('#battle-btn').click(function(){
      var hero = fetchHeroData();
      var enemy = fetchEnemyData();
      console.log($('#heroAndVs-template').length);
      heroBattleTemplate(hero);
      enemyBattleTemplate(enemy);
      deferred.resolve(hero, enemy);
    });


function fetchHeroData(){
  var heroName = $('.replace-with-hero-pic h3').html();
  var heroImage = $('.replace-with-hero-pic img').attr('src');
  var power = $('input[name = "powerbox"]:checked').next('label').text();
  var powerUrl = getPowerUrl(power);
  var heroTheme = $('.colors li').css('background-color');
  var heroObject = {'name': heroName, 'image': heroImage, 'powers': power, 'powerUrl': powerUrl, 'theme': heroTheme};
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

function getPowerUrl(power){
  var powerUrl;
  if(power == 'Head Butt'){
    powerUrl = powerData.headButt;
    return powerUrl;
  }else if (power == 'Super Spit') {
    powerUrl = powerData.superSpit;
      return powerUrl;
  }else if (power == 'Lower Body Attack') {
    powerUrl = powerData.lowerBodyAttack;
      return powerUrl;
  }else if (power = 'The Crippler') {
      powerUrl =powerData.crippler;
      return powerUrl;
  }else if (power == 'Head Shot'){
    powerUrl = powerData.headshot;
    return powerUrl;
  }
}

//battle data
function Goat(data){
  this.name = true;
  if (data && data.name != undefined){
    this.name = data.name;
    this.image = data.image;
    this.powers = data.powers;
    this.powerUrl = data.powerUrl;
    this.theme = data.theme;
 }else{
   this.name= 'Blazzing Bernie'
   this.image = '../app/images/characters/bb.gif';
 }
}
Goat.prototype.name = 'Goat Name';
Goat.prototype.image = '../app/images/characters/bb.gif';
Goat.prototype.powers = 'Random Attack';
Goat.prototype.theme = 'rgba(255,255,255,1)';


module.exports = deferred.promise();
