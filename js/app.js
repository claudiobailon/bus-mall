'use strict';

//=============================Global Variables & Functions===================================
var productCollection = [];
var totalClicks = 0;
var maxClicks = 25 ;

function pickRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}
//=============================Contructor=========================================
function Product(imageSource, caption){
  this.imageSrc = imageSource;
  this.imageCaption = caption;
  this.clicked = 0;
  this.shown = 0;

  productCollection.push(this);
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
    for (var i = 0; i < productCollection.length; i++){
      if (productCollection[i].imageSrc === targetSrc){
        productCollection[i].clicked++;
      }
    }
    //When totatClicks === maxClicks, this removes event listener
    if(totalClicks === maxClicks){
      catalogImageSection.removeEventListener('click',handleClickOnProduct);//stops event listener
    }
    reRenderRandomImages();
  }
}

//===============================ReRender Images after the click=====================
function reRenderRandomImages(){
  var firstRandomImage = pickRandom(0, productCollection.length);
  var secondRandomImage = pickRandom(0, productCollection.length);
  var thirdRandomImage = pickRandom(0, productCollection.length);

  while(secondRandomImage === firstRandomImage){
    secondRandomImage = pickRandom(0, productCollection.length);
  }
  while(thirdRandomImage === firstRandomImage || thirdRandomImage === secondRandomImage){//Makes certain no images are repeated on this render
    thirdRandomImage = pickRandom(0, productCollection.length);

    //ToDO: Make it so pictures are different each time
  }

  var leftImage = document.getElementById('left-image');
  var leftText = document.getElementById('left-caption');
  var centerImage = document.getElementById('center-image');
  var centerText = document.getElementById('center-caption');
  var rightImage = document.getElementById('right-image');
  var rightText = document.getElementById('right-caption');

  var firstProduct = productCollection[firstRandomImage];
  leftImage.src= firstProduct.imageSrc;
  leftText.textContent = firstProduct.imageCaption;
  firstProduct.shown++;

  var secondProduct = productCollection[secondRandomImage];
  centerImage.src= secondProduct.imageSrc;
  centerText.textContent = secondProduct.imageCaption;
  secondProduct.shown++;

  var thirdProduct = productCollection[thirdRandomImage];
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

    var resultsList = document.getElementById('catalog-images');
    var listHeader = document.createElement('h3');
    var listContent = document.createElement('li');

    listHeader.textContent = 'Survey Results';
    resultsList.appendChild(listHeader);

    for(var i = 0; i < productCollection.length; i++){

      listContent = document.createElement('li');
      listContent.textContent = 'The image "' + productCollection[i].imageCaption + '" recieved ' + productCollection[i].clicked + ' votes out of ' + productCollection[i].shown + ' times shown.';
      // console.log(listContent);
      resultsList.appendChild(listContent);

      //this if statement is just to make it read better if a product recieved one vote. Vote vs votes.
      if(productCollection[i].clicked === 1){
        listContent.textContent = 'The image "' + productCollection[i].imageCaption + '" recieved ' + productCollection[i].clicked + ' vote out of ' + productCollection[i].shown + ' times shown.';
        resultsList.appendChild(listContent);
      }
    }
  }
}
//try using shown atrribute to make sure same image isn't used twice in a row


