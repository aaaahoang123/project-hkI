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
    }
    else if (new RegExp('#register').test(location.hash)) {
        callPage('pages/register.html');
    }
    else if (new RegExp('#products').test(location.hash)) {
        callPage('pages/products.html');
    }
    else if (new RegExp('#productDetail').test(location.hash)) {
        callPage('pages/product-detail.html')
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