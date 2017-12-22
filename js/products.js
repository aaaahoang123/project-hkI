function loadData() {
	// em replace cái string #products/ chứ đâu phải #product?? nếu muốn đề phòng sai thì thế này!1 đó Tức là giờ có / thì nó bỏ cả /, ko có thì thôi
	// phương thức là k có "/" đúng k!! Đúng r, cái location.hash này đơn giản là cái param em nhận trên địa chỉ, còn em xử lý tn là việc của em
	// Miễn sao lấy ra dc cái cần lấy để gửi request là dc
	// bên nav ở index thì e add href bằng cái link có ?categoryId luôn dc k!! thử liền đi là biết!!!
	var search = location.hash.replace('#products/', '').replace('#products', '');
	// console.log(search);
	var url = 'https://rlcapi.herokuapp.com/api/products' + search;
	console.log(url);
	$.ajax({
		url: url,
		type:'GET',
		success: function(res){
			var page = Number(getURLParameter('page'));
			var totalPage = Number(res.totalPage);
			if (page === 0) {
				document.querySelector("#next-btn").href = location.hash + '?page=2';
			}
			if (page === 1) {
				document.querySelector("#next-btn").href = location.hash.replace('page=1', 'page=2');
			}
			if (page > 1) {
				document.querySelector("#next-btn").href = location.hash.replace('page=' + page, 'page=' + (page + 1))
				document.querySelector("#prev-btn").parentElement.classList.remove('disabled');
				document.querySelector("#prev-btn").href = location.hash.replace('page=' + page, 'page=' + (page - 1))
			}
			if (page === totalPage) {
				document.querySelector("#next-btn").parentElement.classList.add('disabled');
			}
			for(var i = totalPage-1; i >= 0; i--) {
				createPagination(i, document.querySelectorAll("#pagination > li")[0], page);
			}

			// <div class="col-md-6 col-sm-6 col-lg-3 margin-block add-cart-tag-control">
	  //           <div class="card border-0 w-100">
	  //               <a data-target="#modal-product-detail" data-toggle="modal" class="hover-pointer">
	  //                   <img class="card-img-top" src="img/retirement1.jpg" alt="Card image cap">
	  //               </a>
	  //               <div class="card-body text-center">
	  //                   <h5 class="card-title">Trust dream card</h5>
	  //                   <p>$.100</p>
	  //               </div>
	  //           </div>
	  //           <div class="text-white text-center add-cart-tag">
	  //               <i class="fa fa-cart-plus" aria-hidden="true"></i> Add to Cart
	  //           </div>
	  //       </div>

		  	for(var i = 0; i < res.items.length; i++){

		  		bindCard(res.items[i], document.getElementById('products-view'));
		  	}
	  		
		},
		error: function(res){
			console.log(res);
		}
	});
}

$(document).ready(function(){
	loadData();
})

function openDetailModal(data){
	console.log(data);
	document.querySelector('#bodyProductDetail > div > div > div > a > img').src = data.images.bigImgs[0];
	document.querySelector('#bodyProductDetail > div > div.col-md-7 > div > h4 ').innerHTML = data.name;
	var brandName;
	if(data.brandId == '5a3a282cd7ea3a2046d2683c'){
		brandName = 'Archies';
	}
	else if (data.brandId == '5a3b717a286d242000b05096') {
		brandName = 'Hallmark';
	}
	else if(data.brandId == '5a3b728c286d242000b05097') {
		brandName = 'Blue Mountain';
	}
	else if(data.brandId == '5a3b730e286d242000b05098') {
		brandName = 'American Greetings';
	}
	else if(data.brandId == '5a3b7365286d242000b05099') {
		brandName = 'Galison';
	}
	else if(data.brandId == '5a3b73c8286d242000b0509a') {
		brandName = 'Moo';
	}
	else if(data.brandId == '5a3b7474286d242000b0509b') {
		brandName = 'Cardstore';
	}
	else if(data.brandId == '5a3bac5c45982320000f99f6') {
		brandName = 'Garlanna';
	}
	document.getElementById('brand').innerHTML = 'Brand: ' + brandName;
	document.getElementById('code').innerHTML = 'CODE: ' + data.productCode;
	document.querySelector('#bodyProductDetail > div > div.col-md-7 > div > p > strong').innerHTML = data.price;
	document.getElementById('descriptionBody').innerHTML = data.shortDetail;
	// document.getElementById('cardName').innerHTML = data.name;

	$('#modal-product-detail').modal('show');
}


function searchProducts(){
	var brandId = document.getElementById('selectBrand').value;
	var categoryId = document.getElementById('selectCategory').value;
	if(brandId !== 'Brands' && categoryId !== 'Categories'){
		location.hash = '#products/?brandId=' + brandId + '&categoryId=' + categoryId;
	}
	else if(brandId !== 'Brands'){
		location.hash = '#products/?brandId=' + brandId;
	}
	else if(categoryId !== 'Categories'){
		location.hash = '#products/?categoryId=' + categoryId;
	}
	console.log(brandId);
	console.log(categoryId);
	
}

function bindCard(data, element) {
	var img = document.createElement('img');
	img.className = 'card-img-top';
	img.src = data.images.bigImgs[0];
	img.alt = data.name;
	var display = data;
	var anchor = document.createElement('a');
	anchor.className = 'hover-pointer';
	anchor.onclick = function(){
		openDetailModal(display);
	};

	anchor.appendChild(img);

	var cardTitle = document.createElement('h5');
	cardTitle.className = 'card-title';
	cardTitle.innerHTML = data.name;
	var price = document.createElement('p');
	price.innerHTML = data.price;

	var cardBody = document.createElement('div');
	cardBody.className = 'card-body text-center';

	cardBody.appendChild(cardTitle);
	cardBody.appendChild(price);

	var card = document.createElement('div');
	card.className = 'card border-0 w-100';

	card.appendChild(anchor);
	card.appendChild(cardBody);

	var cartIcon = document.createElement('i');
	cartIcon.className = 'fa fa-cart-plus';
	cartIcon.setAttribute('aria-hidden', 'true');

	var cartTag = document.createElement('div');
	cartTag.className = 'text-white text-center add-cart-tag';

	cartTag.appendChild(cartIcon);
	cartTag.appendChild(document.createTextNode(' Add to Cart'));

	var column = document.createElement('div');
	column.className = 'col-md-6 col-sm-6 col-lg-3 margin-block add-cart-tag-control';

	column.appendChild(card);
	column.appendChild(cartTag);

	element.appendChild(column);
}
if(new RegExp('page=1').test(location.hash) || !RegExp('page=').test(location.hash)){

}

var getURLParameter = function (name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[undefined,""])[1].replace(/\+/g, '%20'))||null;
};
function createPagination(i, element, page) {
	if (page === 0) {
		page = 1;
		var backupPage = 0;
	}
	
	var pageLink = document.createElement('span');
	pageLink.className = 'page-link';
	pageLink.innerHTML = i +1;

	var anchor = document.createElement('a');
	console.log('page=' + page);
	anchor.href = location.hash.replace('page=' + page, 'page=' + (i + 1));
	if (backupPage === 0) {
		anchor.href = location.hash + '?page=' + (i + 1);
	}
	anchor.appendChild(pageLink);
	var pageItem = document.createElement('li');
	pageItem.className = 'page-item';
	if(i === (page - 1)) {
		pageItem.className += ' active';
	}


	pageItem.appendChild(anchor);
	element.after(pageItem);
}