$(document).ready(function() {
    let prodId = location.search.split("=")[1];
    let currentObj = null
    //Getting data of particular product id

    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+prodId, function(data,status){
        prodDetails(data)
        currentObj = data;
    });

    


    //Embeding data to html
    function prodDetails(data){
        let prodTitle = $(".product-title").html(data.name);

        let prodBrand = $(".product-brands").html(data.brand);

        let prodPrice = $(".product-price span").html(data.price)

        let prodDescription = $(".product-description-para").html(data.description);

        let prodImage = data.photos
        for(let i = 0; i < prodImage.length; i++){
            $(".product-images-preview").append(previewImg(data.photos[i], i))
        }
        
        
        $(".product-image-big").attr("src", prodImage[0])
    }

    function previewImg(url, pos){
        let img = $('<img>').attr("src", url);
        if(pos === 0){
            img.addClass("active-image");
        }

        img.click(function(){
            $(".product-images-preview img").removeClass("active-image");
            img.addClass("active-image");
            $(".product-image-big").attr("src",url);
        })
        return img;
    }




     $(".add-to-cart").click(function () {
       $(".add-to-cart").addClass("bigger");
       setTimeout(function () {
         $("#btn-add-to-cart").removeClass("bigger");
       }, 200);

       var productList = window.localStorage.getItem("product-list");
       productList =
         productList === null || productList === "" ? [] : productList;
       productList = productList.length > 0 ? JSON.parse(productList) : [];

       // productList.push(currentObj);
       // window.localStorage.setItem('product-list', JSON.stringify(productList));
       console.log(productList);

       var foundAtPos = -1;
       for (var i = 0; i < productList.length; i++) {
         // console.log(productList[i].id);
         if (parseInt(productList[i].id) == parseInt(currentObj.id)) {
           foundAtPos = i;
         }
       }

       if (foundAtPos > -1) {
         productList[foundAtPos].count = productList[foundAtPos].count + 1;
         console.log(productList[foundAtPos].count);
         window.localStorage.setItem(
           "product-list",
           JSON.stringify(productList)
         );
       } else {
         currentObj.count = 1;
         productList.push(currentObj);
         console.log(productList);
         window.localStorage.setItem(
           "product-list",
           JSON.stringify(productList)
         );
       }

       var totalCount = 0;
       for (var i = 0; i < productList.length; i++) {
         totalCount = totalCount + productList[i].count;
       }

       $(".cart-count").html(totalCount);
     });

    var productList = window.localStorage.getItem("product-list");
     productList =
       productList === null || productList === "" ? [] : productList;
     productList = productList.length > 0 ? JSON.parse(productList) : [];

     var totalCount = 0;
     for (var i = 0; i < productList.length; i++) {
       totalCount = totalCount + productList[i].count;
     }

     $(".cart-count").html(totalCount);

    
    

})