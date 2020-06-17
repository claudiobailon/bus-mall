'use strict';

//=============================Global Variables & Functions===================================
// var productCollection = [];
Product.collection = [];
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

//======================These are to make sure proper amount of times shown for starting 3 images is correct=====
Product.collection[0].shown= 1;
Product.collection[1].shown= 1;
Product.collection[2].shown= 1;
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
      renderProductChart();
    }
    reRenderRandomImages();
  }
}
//=========================Choose Random Images function==============================
var randomImageArray = [];
var lastImageArray = [0,1,2];


function chooseRandomImages(){

  var firstRandomImage = pickRandom(0, Product.collection.length);
  var secondRandomImage = pickRandom(0, Product.collection.length);
  var thirdRandomImage = pickRandom(0, Product.collection.length);

  //this is statment checks if any of the images are repeating
  while( firstRandomImage === lastImageArray[0] ||
      secondRandomImage === lastImageArray[0] ||
      thirdRandomImage === lastImageArray[0] ||
      firstRandomImage === lastImageArray[1] ||
      secondRandomImage === lastImageArray[1] ||
      thirdRandomImage === lastImageArray[1] ||
      firstRandomImage === lastImageArray[2] ||
      secondRandomImage === lastImageArray[2] ||
      thirdRandomImage === lastImageArray[2]){
    // console.log(firstRandomImage, secondRandomImage, thirdRandomImage, lastImageArray[0], lastImageArray[1], lastImageArray[2]);
    firstRandomImage = pickRandom(0, Product.collection.length);
    secondRandomImage = pickRandom(0, Product.collection.length);
    thirdRandomImage = pickRandom(0, Product.collection.length);
    // console.log('whooooooops');
  }

  while(secondRandomImage === firstRandomImage){
    secondRandomImage = pickRandom(0, Product.collection.length);
  }
  while(thirdRandomImage === firstRandomImage || thirdRandomImage === secondRandomImage){
    thirdRandomImage = pickRandom(0, Product.collection.length);
  }
  randomImageArray.push(firstRandomImage,secondRandomImage,thirdRandomImage);//populates randomImageArray
  // console.log('these shouldn\'t repeat', firstRandomImage, secondRandomImage,thirdRandomImage);
}
//===============================ReRender Images after the click=====================
function reRenderRandomImages(){
  randomImageArray = [];
  chooseRandomImages();
  lastImageArray =[];//this is to help not repeat img 2x in a row

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

  lastImageArray.push(randomNumber1,randomNumber2,randomNumber3);

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

//======================================Render Results Chart======================================================
function renderProductChart() {

  var productLabels = [];
  for(var i = 0; i < Product.collection.length; i++){
    productLabels.push(Product.collection[i].imageCaption);
  }

  var imgClicks = [];
  for(i = 0; i < Product.collection.length; i++){
    imgClicks.push(Product.collection[i].clicked);
  }
  var imgShown = [];
  for(i = 0; i < Product.collection.length; i++){
    imgShown.push(Product.collection[i].shown);
  }


  var ctx = document.getElementById('productChart').getContext('2d');
  var productChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: productLabels,
      datasets: [{
        label: 'Product Clicks',
        data: imgClicks,
        backgroundColor:'rgba(255, 190, 220, 0.6)',
        borderColor:'rgba(255, 190, 220, 1)',
        hoverBackgroundColor:'rgba(255, 190, 220, 1)',
        borderWidth: 1,
      },
      {
        label: 'Product Shown',
        data: imgShown,
        backgroundColor:'rgba(180, 200, 235, 0.6)',
        borderColor: 'rgba(180, 200, 235, 1)',
        hoverBackgroundColor:'rgba(180, 200, 235, 1)',
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  ctx = document.getElementById('productRadarChart').getContext('2d');
  var productRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: productLabels,
      datasets: [{
        label: 'Product Clicks',
        data: imgClicks,
        backgroundColor:'rgba(255, 190, 220, 0.6)',
        borderColor:'rgba(255, 190, 220, 1)',
        borderWidth: 1,

      },
      {
        label: 'Product Shown',
        data: imgShown,
        backgroundColor:'rgba(180, 200, 235, 0.6)',
        borderColor: 'rgba(180, 200, 235, 1)',
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
