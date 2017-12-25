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
}
// call page data
function callPage(url) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "text",
        success: function (res) {
            $("#red-cards-view").html(res);
        },
        error: function (res) {
            console.log(res);
        }
    })
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
        callPage('pages/home.html');
        loadController("js/home.js");
    }
    else if (new RegExp('#register').test(location.hash)) {
        callPage('pages/register.html');
        loadController("js/register.js");
    }
    else if (new RegExp('#products').test(location.hash)) {
        callPage('pages/products.html');
        loadController('js/products.js');
    }
    else if (new RegExp('#productDetail').test(location.hash)) {
        callPage('pages/product-detail.html');
        loadController("js/product-detail.js");
    }
    else if (new RegExp('#cart').test(location.hash)) {
        callPage('pages/shoppingCart.html');
        loadController('js/shoppingCart.js');
    }
    else if (new RegExp('#contact').test(location.hash)) {
        callPage('pages/contact.html')
    }
    else if (new RegExp('#orderStatus').test(location.hash)) {
        callPage('pages/orderStatus.html')
    }
}

// Load page when hash change
$(document).ready(function () {
    pageRouter();
});
window.addEventListener('hashchange', function () {
    $('.modal').modal('hide');
    setTimeout(function () {
        pageRouter();
    }, 300);
});