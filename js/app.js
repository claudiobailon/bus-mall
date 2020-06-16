'use strict';

//=============================Global Variables & Functions===================================
// var productCollection = [];
Product.collection = [];
var totalClicks = 0;
var maxClicks = 5 ;

function pickRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}
//=============================Contructor=========================================
function Product(imageSource, caption){
  this.imageSrc = imageSource;
  this.imageCaption = caption;
  this.clicked = 0;
  this.shown = 0;

  Product.collection.push(this);
}

//==============================Contructed Products===============================

new Product('img/bag.jpg', 'R2D2 Suitcase');
new Product('img/banana.jpg', 'Banana Slicer');
new Product('img/bathroom.jpg', 'Bathroom Stand');
new Product('img/boots.jpg', 'Open-Toed Rain boots');
new Product('img/breakfast.jpg', 'All-In-One Breakfast Maker');
new Product('img/bubblegum.jpg', 'Bubblegum Flavored Meatballs');
new Product('img/chair.jpg', 'Mounded Chair');
new Product('img/cthulhu.jpg', 'Cthulhu Action Figure');
new Product('img/dog-duck.jpg', 'Duck Dog Mask');
new Product('img/dragon.jpg', 'Canned Dragon Meat');
new Product('img/pen.jpg', 'Utensil-Capped Pen');
new Product('img/pet-sweep.jpg', 'Pet Sweep');
new Product('img/scissors.jpg', 'Pizza Scissors');
new Product('img/shark.jpg', 'Shark Sleeping Bag');
new Product('img/sweep.png', 'Baby Sweeper');
new Product('img/tauntaun.jpg', 'Tauntaun Sleeping bag');
new Product('img/unicorn.jpg', 'Canned Unicorn Meat');
new Product('img/usb.gif', 'Tentacle Flash Drive');
new Product('img/water-can.jpg', 'Unique Watering-Can');
new Product('img/wine-glass.jpg', 'Special Wine Glass');

//==============================Create Event Listener=============================

var catalogImageSection = document.getElementById('catalog-images');
catalogImageSection.addEventListener('click', handleClickOnProduct);

//===============================Callback Funtion==================================
function handleClickOnProduct(event){
  if(event.target.tagName === 'IMG'){
    totalClicks++;
    // console.log(totalClicks);
    //From demo,  uses src to find correct product that has been clicked, then adds one to that product's clicked count
    var targetSrc = event.target.getAttribute('src');
    for (var i = 0; i < Product.collection.length; i++){
      if (Product.collection[i].imageSrc === targetSrc){
        Product.collection[i].clicked++;
      }
    }
    //When totatClicks === maxClicks, this removes event listener
    if(totalClicks === maxClicks){
      catalogImageSection.removeEventListener('click',handleClickOnProduct);//stops event listener
    }
    reRenderRandomImages();
  }
}
//=========================Choose Random Images function==============================
var randomImageArray = [];
function chooseRandomImages(){

  var firstRandomImage = pickRandom(0, Product.collection.length);
  var secondRandomImage = pickRandom(0, Product.collection.length);
  var thirdRandomImage = pickRandom(0, Product.collection.length);

  while(secondRandomImage === firstRandomImage){
    secondRandomImage = pickRandom(0, Product.collection.length);
  }
  while(thirdRandomImage === firstRandomImage || thirdRandomImage === secondRandomImage){
    thirdRandomImage = pickRandom(0, Product.collection.length); 
  }
  randomImageArray.push(firstRandomImage,secondRandomImage,thirdRandomImage);
}
//===============================ReRender Images after the click=====================
function reRenderRandomImages(){
  randomImageArray = [];
  chooseRandomImages();

  var leftImage = document.getElementById('left-image');
  var leftText = document.getElementById('left-caption');
  var centerImage = document.getElementById('center-image');
  var centerText = document.getElementById('center-caption');
  var rightImage = document.getElementById('right-image');
  var rightText = document.getElementById('right-caption');

  var randomNumber1 = randomImageArray[0];
  var firstProduct = Product.collection[randomNumber1];
  leftImage.src= firstProduct.imageSrc;
  leftText.textContent = firstProduct.imageCaption;
  firstProduct.shown++;

  var randomNumber2 = randomImageArray[1];
  var secondProduct = Product.collection[randomNumber2];
  centerImage.src= secondProduct.imageSrc;
  centerText.textContent = secondProduct.imageCaption;
  secondProduct.shown++;

  var randomNumber3 = randomImageArray[2];
  var thirdProduct = Product.collection[randomNumber3];
  rightImage.src= thirdProduct.imageSrc;
  rightText.textContent = thirdProduct.imageCaption;
  thirdProduct.shown++;

  //Should be ablt to put lines 89-102 in a loop
  if(totalClicks === maxClicks){
    //the below section hides the images to display the list. Learned from https://stackoverflow.com/questions/6802683/js-how-to-remove-image-with-javascript
    document.getElementById('left').style.display='none';
    document.getElementById('center').style.display='none';
    document.getElementById('right').style.display='none';
    document.getElementById('intro').style.display='none';

    var resultsList = document.getElementById('list-location');
    var listHeader = document.createElement('h3');
    var listContent = document.createElement('li');

    listHeader.textContent = 'Survey Results';
    resultsList.appendChild(listHeader);

    for(var i = 0; i < Product.collection.length; i++){

      listContent = document.createElement('li');
      listContent.textContent = 'The image "' + Product.collection[i].imageCaption + '" recieved ' + Product.collection[i].clicked + ' votes out of ' + Product.collection[i].shown + ' times shown.';
      // console.log(listContent);
      resultsList.appendChild(listContent);

      //this if statement is just to make it read better if a product recieved one vote. Vote vs votes.
      if(Product.collection[i].clicked === 1){
        listContent.textContent = 'The image "' + Product.collection[i].imageCaption + '" recieved ' + Product.collection[i].clicked + ' vote out of ' + Product.collection[i].shown + ' times shown.';
        resultsList.appendChild(listContent);
      }
    }
  }
}
//try using shown atrribute to make sure same image isn't used twice in a row


