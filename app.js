'use strict';

const keywordArr = [];
const animalCollection = [];
const showLessImages = [];


function Animal (obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  animalCollection.push(this);
}

Animal.prototype.render = function() {
  let template = $('#photo-template').html();
  let renderTemplate = Handlebars.compile(template);
  let html = renderTemplate(this)

  $('#photos').append(html);
  if(!keywordArr.includes(this.keyword)) {
    keywordArr.push(this.keyword)
  }
};

function dropMenu () {
  keywordArr.sort().forEach(keyword => {
    let $option = $(`<option value=${keyword}></option>`)
    $option.text(keyword)
    $('select').append($option);
  })

}


function showLess (event) {
  const id = event.target.value
  for (let i = 0; i < 9 ; i++) {
    showLessImages.push(animalCollection[i])
   
  }
  showLessImages.forEach(animal => {

    if(id !== animal.keyword) {
      $(`div[id=${animal.keyword}]`).hide();
    }
  })
}

function filter(event) {
  let id = event.target.value;

  animalCollection.forEach(animal => {
    $(`div[id=${animal.keyword}]`).show();
    if(id !== animal.keyword) {
      $(`div[id=${animal.keyword}]`).hide();
    }
  })
}

$.ajax('data/page-1.json' , {METHOD:'GET' , DATATYPE:'JSON'})
  .then(data => {
    data.forEach(animal => {
      new Animal(animal).render();
    }); 
    dropMenu();
  });

$('select').on('change', filter )
$('button').on( 'click', showLess )






