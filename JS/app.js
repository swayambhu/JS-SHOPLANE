$(document).ready(function(){

  //Navbar
  let hamburger = $(".fa-bars");
  let mobNav = $(".nav-items-ham");
  hamburger.click(function () {
    mobNav.animate({
      // display:toggle,
      width: "toggle",
    });
  });




  //Banner Images Carousel
  $(".image-container").slick({
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 1,
        },
      },
    ],
  });

  



  //RENDERING THE DATA

  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function(data, status){
    let response = data;
    for (let i = 0; i < response.length; i++) {
      createCards(response[i]);
    }
  });




  //CREATING CARDS
  function createCards(data) {
    //Creating Product Card Body
    let card = $('<a href="./product-details.html?p='+data.id+'" class="card"></a>');
    //Creating Product Image
    let thumbnail = $('<img src='+data.preview+' alt='+data.brand+' class="thumbnail">');
    card.append(thumbnail);

    //Creating Product details section
    let details = $('<div class="details"></div>');
    card.append(details);

    //Creating Product Title
    let prodTitle = $('<h3 class="product-title"></h3>').html(data.name);
    details.append(prodTitle);

    //product brand
    let prodBrand = $('<h4 class="product-brand"></h4>').html(data.brand);
    details.append(prodBrand);

    //product price
    let prodPrice = $('<p class="product-price"></p>').html("Rs "+data.price);
    details.append(prodPrice);

    if (data.isAccessory === false) {
      let category = $("#clothing-wrapper");
      category.append(card);
      return card;
    } else {
      let category = $("#accessories-wrapper");
      category.append(card);
    }
  }



    
  
    
})



    


