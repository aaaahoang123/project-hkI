function loadData() {
	var url = 'https://rlcapi.herokuapp.com/api/products' + location.search;
	console.log(url);
	$.ajax({
		url: url,
		type:'GET',
		success: function(res){
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
		  	for(var i = 0; i < res.length; i++){
		  		var img = document.createElement('img');
		  		img.className = 'card-img-top';
		  		img.src = res[i].images.bigImgs[0];
		  		img.alt = res[i].name;

		  		var anchor = document.createElement('a');
		  		anchor.className = 'hover-pointer';
		  		anchor.onclick = function(){
		  			openDetailModal();
		  		};

		  		anchor.appendChild(img);

		  		var cardTitle = document.createElement('h5');
		  		cardTitle.className = 'card-title';
		  		cardTitle.innerHTML = res[i].name;
		  		var price = document.createElement('p');
		  		price.innerHTML = res[i].price;

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

		  		document.getElementById('products-view').appendChild(column);
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

function openDetailModal(){
	$('#modal-product-detail').modal('show');
}

console.log(location.search)