var orderDataToSend = {
   customerName: "",
   email: "",
   phone: "",
   address: "",
   products: [],  // đây là một array, bao gồm các object biểu diễn sản phẩm trong order
   totalPrice: Number
}; 

function changetab(param) {
	if (param === 'cartTab') {
		$('#myTab a[href="#cart-tab"]').tab('show')
	}
	else if (param === 'delivery') {
		$('#myTab a[href="#delivery"]').tab('show')
	}
    else if (param === 'confirm') {
        $('#myTab a[href="#confirm"]').tab('show')
    }
	
}
function checkCart() {
    var productId = localStorage.getItem('cart');
    if(localStorage.getItem('cart') === null) {
        document.querySelectorAll('main')[0].style.display = '';
    }
    else {
        document.querySelectorAll('main')[1].style.display = '';
        $.ajax({
            url: productApi,
            type: 'GET',
            data: {itemIds: productId},
            success: function(res) {
                 for (var i=0; i<res.items.length; i++) {
                    cartTable(res.items[i], document.querySelector('table > tbody'));
                 }
            },
            error: function(res) {
                console.log(res)
            }
        });    
    }
}

$(document).ready(function(){
    checkCart()
});

function cartTable(data,element) {
    var checkInput = document.createElement('input');
    checkInput.className = "custom-control-input product-selector";
    checkInput.type = "checkbox";
    checkInput.onchange = function(e) {
        if (e.target.checked) {
            quantity.setAttribute("readonly", 'true');
            bindToConfirm(data,document.querySelector('#confirmProduct'));
        }
        else {
            quantity.removeAttribute("readonly");
            orderDataToSend.products = orderDataToSend.products.filter(function(e){
                return e.productId !== data._id;
            });
            try {
                var eId = "#checked" + data._id;
                var element = $(eId);
                removeConfirm(element);
            } catch(err) {
                // statements
                console.log(err);
            }
        }
        countTotalAll();
    };

    var checkSpan = document.createElement('span');
    checkSpan.className = "custom-control-indicator";

    var checkLabel = document.createElement('label');
    checkLabel.className = "custom-control mr-0 custom-checkbox";

    checkLabel.appendChild(checkInput);
    checkLabel.appendChild(checkSpan);

    var textCenter = document.createElement('td');
    textCenter.className = "text-center";

    textCenter.appendChild(checkLabel);

    var img = document.createElement('img');
    img.src = data.images.smallImgs[0];

    var tdImg = document.createElement('td');

    tdImg.appendChild(img);

    var productName = document.createElement('a');
    productName.innerHTML = data.name;
    productName.href="#productDetail/" + data._id;
    productName.target = "_blank";

    var tdA = document.createElement('td');
    tdA.appendChild(productName);

    var quantity = document.createElement('input');
    quantity.className = "form-control quantity";
    quantity.id = "quantity" + data._id;
    quantity.style.width = '80px';
    quantity.type = "number";
    quantity.min = 1;
    quantity.value = 1;

    var tdQuantity = document.createElement('td');
    tdQuantity.appendChild(quantity);

    var price = document.createElement('td');
    price.innerHTML = data.price;
    price.style.color = "red";

    var priceInFunction = data.price;

    var total = document.createElement('td');
    total.id = "total" + data._id;
    total.innerHTML = data.price;
    total.style.color = 'red';
    quantity.onchange = function(e) {
        countTotalPrice(priceInFunction,e.target,total);
    };

    var remove = document.createElement('button');
    remove.className = "close float-none";
    remove.type = "button";
    remove.innerHTML = "&times;";
    remove.onclick = function(e){
        removeproduct(e.target, data._id);
    };
    
    var tdRemove = document.createElement('td');
    tdRemove.className = "text-center";

    tdRemove.appendChild(remove);

    var tr = document.createElement('tr');
    tr.appendChild(textCenter);
    tr.appendChild(tdImg);
    tr.appendChild(tdA);
    tr.appendChild(price);
    tr.appendChild(tdQuantity);
    tr.appendChild(total);
    tr.appendChild(tdRemove);

    element.appendChild(tr);
}

function countTotalPrice (price,inputElement,totalPriceElement) {
    price = price.replace('$','');
    price = new Number(price);
    var quantity = Number(inputElement.value);
    var totalPrice = quantity*price;
    totalPrice += "$";
    totalPriceElement.innerHTML = totalPrice;    
}

$(document).ready(function(){
    countTotalPrice()
});

function isValidName() {
    var customerName = document.querySelector('#cus-name').value; 
    if (customerName === '' || customerName.length < 1)  {
        toastr["warning"]("Please enter your name");
        return false
    }
    else {
        return true
    }     
}

function isValidAddress() {
    var address = document.querySelector('#cus-address').value;
    if (address === '' || address.length < 1) {
        toastr["warning"]("Please enter your address");
        return false
    }
    else {
        return true
    }     
}

function alertProduct() {
    if (document.querySelector('#confirm-total').innerHTML === '') {
        toastr["warning"]("You did not pick any product")
        return false
    }
    else {
        return true
    }
}

function placeOrder() {
    orderDataToSend.customerName = document.querySelector("#confirmName").innerHTML;
    orderDataToSend.address = document.querySelector("#confirmAddress").innerHTML;
    orderDataToSend.email = document.querySelector("#confirmEmail").innerHTML;
    orderDataToSend.phone = document.querySelector("#confirmPhone").innerHTML;  

    var req = new XMLHttpRequest();
    req.open('POST', orderApi, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('token', localStorage.getItem('token') );
    req.onload = function() {
        var res = JSON.parse(this.responseText);
        $('#order-done').modal('show');
        $('#confirm-alert').modal('hide');
        console.log(res)
    };
    req.onerror = function() {
        var res = JSON.parse(this.responseText);
        toastr["warning"]("Place order fail for some reasons....");
        console.log(res)
    };
    req.send(JSON.stringify(orderDataToSend));
}

function sendOrder() {
    var validCustomerName = isValidName();
    var validCustomerAddress = isValidAddress();
    var validProduct = alertProduct();

    if (validCustomerName && validCustomerAddress && validProduct) {
        placeOrder();
    }  
}

function confirmCustomer() {
    document.querySelector('#confirmName').innerHTML = document.querySelector('#cus-name').value;
    document.querySelector('#confirmEmail').innerHTML = document.querySelector('#cus-email').value;
    document.querySelector('#confirmPhone').innerHTML = document.querySelector('#cus-phone').value;
    document.querySelector('#confirmAddress').innerHTML = document.querySelector('#cus-address').value;
}

function bindToConfirm(data,element) {
    var product = {
        productId: data._id,
        quantity: Number(document.querySelector('#quantity' + data._id).value),
        unitPrice: Number(data.price.replace('$',''))
    };
    orderDataToSend.products.push(product);

    var img = document.createElement('img');
    img.src = data.images.smallImgs[0];

    var tdImg = document.createElement('td');
    tdImg.appendChild(img);

    var productName = document.createElement('a');
    productName.innerHTML = data.name;
    productName.href="#productDetail/" + data._id;
    productName.target = "_blank";

    var tdA = document.createElement('td');
    tdA.appendChild(productName);

    var quantity = document.createElement('td');
    quantity.id = "confirmQuantity" + data._id;
    quantity.innerHTML = document.querySelector('#quantity' + data._id).value;
  
    var total = document.createElement('td');
    total.id = "confirmTotal" + data._id;
    total.innerHTML = document.querySelector('#total' + data._id).innerHTML;
    total.style.color = 'red';
    // total = total.replace('$','');
    // total = new Number(total);
    total.className = "toCountTotal";

    var tr = document.createElement('tr');
    tr.id = "checked" + data._id;

    tr.appendChild(tdImg);
    tr.appendChild(tdA);
    tr.appendChild(quantity);
    tr.appendChild(total);

    element.appendChild(tr)
}

function removeConfirm(element) {
    element.remove()
}

function countTotalAll() { 
    var sum=0; var num;
    var array = document.getElementsByClassName('toCountTotal');
    for (var i=0; i<array.length; i++) {
           num = array[i].innerHTML.replace('$','');
           num = new Number(num);
           sum += num;
    }
    orderDataToSend.totalPrice = sum;
    document.querySelector('#total-all').innerHTML = 'Total: ' + sum + '$';
    document.querySelector('#confirm-total').innerHTML = 'Total: ' + sum + '$';
}

function removeproduct(el, id) {
    el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
    var cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(function(e){
        return e !== id;
    });
    localStorage.setItem('cart', JSON.stringify(cart));

}

function selectAll(el) {
    var productSelector = document.getElementsByClassName("custom-control-input product-selector");
    if (el.checked) {
        for (var i=0; i<productSelector.length; i++) {
            if (!productSelector[i].checked){
                productSelector[i].checked = true;
                var event = new Event('change');
                productSelector[i].dispatchEvent(event);
            }   
        }
    }
    else {
        for (var i=0; i<productSelector.length; i++) {
            productSelector[i].checked = false;
            var event = new Event('change');
            productSelector[i].dispatchEvent(event);
        }
    }
}

function deliveryTab() {
    if (document.querySelector('#confirm-total').innerHTML === '' || document.querySelector('#confirm-total').innerHTML === 'Total: 0$') {
        toastr["warning"]("You did not pick any product!");
        document.querySelector('#deliveryTab').style.display = 'none';
    }
    else {
        document.querySelector('#deliveryTab').style.display = '';
        changetab('delivery');
        document.querySelectorAll('div.bs-wizard-step')[0].classList.add('complete');
        document.querySelectorAll('div.bs-wizard-step')[1].classList.add('active');
        return true
    }
}

function confirmTab() {
    console.log(document.querySelector('#confirmName').innerHTML);
    if (deliveryTab() === true && document.querySelector('#cus-name').value != '' && document.querySelector('#cus-address').value != '') {
        document.querySelector('#confirmTab').style.display = '';
        changetab('confirm');
        document.querySelectorAll('div.bs-wizard-step')[1].classList.remove('active');
        document.querySelectorAll('div.bs-wizard-step')[1].classList.add('complete');
        document.querySelectorAll('div.bs-wizard-step')[2].classList.add('complete');
    }
    else {
        document.querySelector('#confirmTab').style.display = 'none';
        toastr["warning"]("Your name and address can't be blank!")
    }
}

function confirmLogin() {
    if (localStorage.getItem('token') === null) {
        $('#confirm-login').modal('show');
    }
    else {
        $('#confirm-alert').modal('show');
    }
}