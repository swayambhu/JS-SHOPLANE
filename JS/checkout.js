$(document).ready(function() {



  function cartCards(data){
      let card = $('<div class="checkout-card"></div>');
      let imgDiv = $('<div></div>');
      let img = $('<img class="checkout-product-img"/>').attr("src", data.preview);
      imgDiv.append(img);
      let prodDetailDiv = $('<div></div>');
      let prodTitle = $('<h4></h4>').html(data.name);
      let prodCount = $('<p></p>').html("x"+data.count);
      let totalAmt = $('<p></p>').html("Amount: Rs ")
      let amt = $('<span></span>').html(parseInt(data.count) * parseInt(data.price))
      totalAmt.append(amt);
      prodDetailDiv.append(prodTitle, prodCount, totalAmt);

      card.append(imgDiv);
      card.append(prodDetailDiv);
      return card;
  }


  var productList = window.localStorage.getItem('product-list');
  productList = productList === null || productList === '' ? [] : productList;
  productList = productList.length > 0 ? JSON.parse(productList) : [];


  let grandTotal = 0;
  for(let i=0; i<productList.length; i++) {
      $('#card-list').append(cartCards(productList[i]));


      var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);
      grandTotal = grandTotal + totalForCurrentProduct;
  }


  $("#item-count").html(productList.length);
  $("#total-amount").html(grandTotal);


   $("#place-order").click(function () {
     var orderItemArr = [];
     for (var i = 0; i < productList.length; i++) {
       var prodObj = {
         id: productList[i].id,
         brand: productList[i].brand,
         name: productList[i].name,
         price: productList[i].price,
         preview: productList[i].preview,
         isAccessory: productList[i].isAccessory,
       };

       orderItemArr.push(prodObj);
     }


     var dataObj = {
       amount: grandTotal,
       products: orderItemArr,
     };
     $.post(
       "https://5d76bf96515d1a0014085cf9.mockapi.io/order",
       dataObj,
       function () {
         alert("Order Placed Successfully");
         localStorage.setItem("product-list", []);

         location.assign("./thankyou.html");
       }
     );
   });
})


    
