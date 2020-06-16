'use strict';

//=============================Global Variables===================================
var productCollection = [];
var totalClicks = 0;
var maxClicks = 5;

//=============================Contructor=========================================
function Product(imageSrc, caption){
  this.imageSrc = imageSrc;
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

