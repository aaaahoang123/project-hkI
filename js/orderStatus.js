function loadOrder () {
	var req = new XMLHttpRequest();
	req.open('GET', orderApi);
	req.setRequestHeader('Content-Type', 'application/json');
	req.setRequestHeader('token', localStorage.getItem('token'));

       				

	req.onload = function() {
		var res = JSON.parse(this.responseText);
		var index = indexOfChosen(res);
		console.log(res[index]);
				document.getElementById('totalPrice').innerHTML = 'TOTAL($): ' + res[index].totalPrice;
		var idArray = new Array();
		for (var j = 0; j < res[index].products.length; j ++) {
			idArray.push(res[index].products[j].productId);
			createProductsInOrder(res[index].products[j], j);
		}
		loadProducts(idArray);

		displayOrder(res[index]);
		res.splice(index, 1);
		for(var i = 0; i < res.length; i ++) {
			displayOtherOrder(res[i]);
	}



	};
	req.onerror = function() {
		var res = JSON.parse(this.responseText);
		console.log(res);
	};
	req.send();
}
$(document).ready(function(){
	loadOrder();
});
var getURLParameter = function (name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[undefined,""])[1].replace(/\+/g, '%20'))||null;
};
function indexOfChosen(res) {
	var idURL = location.hash.replace('#orderStatus/', '').replace('#orderStatus', '');
	var index = res.length - 1;
	for(var i = 0; i < res.length; i ++) {
		if(idURL === res[i]._id) {
			index = i;
			break;
		}
	}
	return index;
}
function displayOrder(data) {
	var tdName = document.createElement('td');
	tdName.innerHTML = data.customerName;

	var tdEmail = document.createElement('td');
	tdEmail.innerHTML = data.email;

	var tdPhone = document.createElement('td');
	tdPhone.innerHTML = data.phone;

	var tdAddress = document.createElement('td');
	tdAddress.innerHTML = data.address;

	var tdStatus = document.createElement('td');
	if(data.status === 0) {
		tdStatus.innerHTML = 'Unpaid';
	}
	else if(data.status === 1) {
		tdStatus.innerHTML = 'Shipping';
	}
	else if(data.status === 2) {
		tdStatus.innerHTML = 'Done';
	}

	var trCustomer = document.createElement('tr');
	trCustomer.appendChild(tdName);
	trCustomer.appendChild(tdEmail);
	trCustomer.appendChild(tdPhone);
	trCustomer.appendChild(tdAddress);
	trCustomer.appendChild(tdStatus);

	document.getElementById('tb-customer').appendChild(trCustomer);

}
					// <tr>
           //              <td><a href="#">5a40acff42b4861821bd8117</a></td>
           //              <td>12-08-2017</td>
           //              <td>Ebook</td>
           //              <td>5000$</td>
           //              <td>Done</td>
           //          </tr>

function displayOtherOrder(data) {
	var linkId = document.createElement('a');
	linkId.href = '#orderStatus' + data._id;
	linkId.innerHTML = data._id;

	var tdLink = document.createElement('td');
	tdLink.appendChild(linkId);

	var tdDate = document.createElement('td');
	tdDate.innerHTML = new Date(data.createdAt).toLocaleDateString();

	var tdMoney = document.createElement('td');
	tdMoney.innerHTML = data.totalPrice;

	var tdStatus = document.createElement('td');
	tdStatus.innerHTML = data.status;

	var trOtherOrder = document.createElement('tr');
	trOtherOrder.appendChild(tdLink);
	trOtherOrder.appendChild(tdDate);
	trOtherOrder.appendChild(tdMoney);
	trOtherOrder.appendChild(tdStatus);

	document.getElementById('tb-otherOrder').appendChild(trOtherOrder);
}

						// <tr>
//                             <td>1</td> 
//                             <td><img src="img/mini2.jpg" alt=""></td>
//                             <td><a href="#productDetail/" target="_blank">HUSBAND`S BIRTHDAY GREETING CARD</a></td>
//                             <td>N</td>
//                             <td>$</td>
//                         </tr>

	function createProductsInOrder(data,i) {
		var tdOrdinarilyProduct = document.createElement('td');
		tdOrdinarilyProduct.innerHTML = i + 1;

		var imgProduct = document.createElement('img');
		imgProduct.id = 'thumbnail' + data.productId;

		var tdImg = document.createElement('td');
		tdImg.appendChild(imgProduct);

		var anchor = document.createElement('a');
		anchor.id = 'productname' + data.productId;

		var tdName = document.createElement('td');
		tdName.appendChild(anchor);

		var tdQuantity = document.createElement('td');
		tdQuantity.innerHTML = data.quantity;

		var tdUnitPrice = document.createElement('td');
		tdUnitPrice.innerHTML = data.unitPrice;

		var trProduct = document.createElement('tr');
		trProduct.appendChild(tdOrdinarilyProduct);
		trProduct.appendChild(tdImg);
		trProduct.appendChild(tdName);
		trProduct.appendChild(tdQuantity);
		trProduct.appendChild(tdUnitPrice);

		document.getElementById('tb-productsInOrder').appendChild(trProduct);





	}


function loadProducts(idArray) {
	$.ajax({
	    url: productApi,
	    type: "GET",
	    data: {
	    	itemIds: JSON.stringify(idArray)
	    },
	    success: function (res) {
	        for (var i=0; i<res.items.length; i++) {
	        	document.querySelector("#thumbnail" + res.items[i]._id).src = res.items[i].images.smallImgs[0];
	        	document.querySelector("#productname" + res.items[i]._id).innerHTML = res.items[i].name;
	        	document.querySelector("#productname" + res.items[i]._id).href = '#productDetail/' + res.items[i]._id;

	        }
	    },
	    error: function (res) {
	        console.log(res)
	    }
	});
}
