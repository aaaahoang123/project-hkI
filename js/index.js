const orderApi = "https://rlcapi.herokuapp.com/api/orders/",
    productApi = 'https://rlcapi.herokuapp.com/api/products/',
    userApi = 'https://rlcapi.herokuapp.com/api/user/',
    brandApi = 'https://rlcapi.herokuapp.com/api/brands/',
    categoryApi = 'https://rlcapi.herokuapp.com/api/categories/',
    authenticationApi = 'https://rlcapi.herokuapp.com/api/authentication/';

// config toastr
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-left",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};
// call page data
function callPage(url, controller) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function () {
        if (this.readyState === 1) {
            document.querySelector("#nav-progress-bar > div").style.width = "25%";
            document.querySelector("#nav-progress-bar").style.opacity = "1";
        }
        if (this.readyState === 2) {
            document.querySelector("#nav-progress-bar").style.opacity = "1";
            document.querySelector("#nav-progress-bar > div").style.width = "50%";
        }
        if (this.readyState === 3) {
            document.querySelector("#nav-progress-bar").style.opacity = "1";
            document.querySelector("#nav-progress-bar > div").style.width = "75%";
        }
        if (this.readyState === 4) {
            document.querySelector("#nav-progress-bar").style.opacity = "1";
            document.querySelector("#nav-progress-bar > div").style.width = "100%";
            setTimeout(function () {
                document.querySelector("#nav-progress-bar").style.opacity = "0";
            }, 800);
        }
    };
    req.onload = function () {
        var res = this.responseText;
        $("#red-cards-view").html(res);
        if (controller !== '' && controller !== undefined) loadController(controller);
    };
    req.onerror = function () {
        var res = this.responseText;
        console.log(res);
    };
    req.send();
}

// create a script function
function newScript(scriptSrc) {
    var script = document.createElement('script');
    script.id = 'routerScript';
    script.src = scriptSrc;
    document.body.appendChild(script);
}
// load controller script for page
function loadController(scriptSrc) {
    try {
        $('#routerScript').remove();
        newScript(scriptSrc)
    }
    catch (err) {
        newScript(scriptSrc)
    }
}

// router of page
function pageRouter() {
    if (location.hash === '#' || location.hash === '') {
        callPage('pages/home.html',"js/home.js");
        //loadController("js/home.js");
    }
    else if (new RegExp('#register').test(location.hash)) {
        callPage('pages/register.html',"js/register.js");
        //loadController("js/register.js");
    }
    else if (new RegExp('#products').test(location.hash)) {
        callPage('pages/products.html','js/products.js');
        //loadController('js/products.js');
    }
    else if (new RegExp('#productDetail').test(location.hash)) {
        callPage('pages/product-detail.html',"js/product-detail.js");
        //loadController("js/product-detail.js");
    }
    else if (new RegExp('#cart').test(location.hash)) {
        callPage('pages/shoppingCart.html','js/shoppingCart.js');
        //loadController('js/shoppingCart.js');
    }
    else if (new RegExp('#contact').test(location.hash)) {
        callPage('pages/contact.html')
    }
    else if (new RegExp('#orderStatus').test(location.hash)) {
        callPage('pages/orderStatus.html','js/orderStatus.js');
        //loadController('js/orderStatus.js');
    }
}

// Load page when hash change
$(document).ready(function () {
    pageRouter();
});
window.addEventListener('hashchange', function () {
    $(document).find('.zoomContainer').remove();
    $('.modal').modal('hide');
    setTimeout(function () {
        pageRouter();
    }, 300);
});
function addToCart(id) {

  if(localStorage.getItem('cart') === null) {
    var idArray = new Array(id);
    localStorage.setItem('cart', JSON.stringify(idArray));
    toastr["success"]('<strong>Add to cart success.</strong>');
  }
  else {
      var isExistP = checkExistInCart(id);

      if (isExistP === false) {
        idArray = JSON.parse(localStorage.getItem('cart'));
        idArray.push(id);
        localStorage.setItem('cart', JSON.stringify(idArray));
        toastr["success"]('<strong>Add to cart success.</strong>');
      }
  }
}
function checkExistInCart(id){
  var isExist = false;
  for(var i = 0; i < JSON.parse(localStorage.getItem('cart')).length; i++){
    if((JSON.parse(localStorage.getItem('cart')))[i] === id){
      toastr["warning"]('<strong>Products already in the cart.</strong>');
      isExist = true;
      break;
    }
    isExist = false;
  }
  return isExist;
}