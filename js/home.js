function loadHallMarkProduct() {
  $.ajax({
  	url:'https://rlcapi.herokuapp.com/api/products?brandId=5a3b717a286d242000b05096',
  	type:'GET',
  	success: function(res) {
	    for (var i=0;i<res.length && i<4;i++) {
	    	createProductTag(res[i], document.getElementById('hallmark-cards'));

	    }
  	},
  	error: function(res) {
  		console.log(res)
  	}
  })
}

$(location).ready(function(){
	loadHallMarkProduct();
});

function loadBirthdayProduct() {
  $.ajax({
  	url:'https://rlcapi.herokuapp.com/api/products?categoryId=5a3bc84c60738a2000ebca1d',
  	type:'GET',
  	success: function(res) {
	    for (var i=0;i<res.length && i<4;i++) {
	    	createProductTag(res[i], document.getElementById('birthday-cards'));

	    }
  	},
  	error: function(res) {
  		console.log(res)
  	}
  })
}

$(location).ready(function(){
	loadBirthdayProduct();
});

function createProductTag(data,element) {
	var img = document.createElement('img');
	img.className = 'card-img-top';
	img.src = data.images.bigImgs[0];
	img.alt = data.name;

	var anchorImg = document.createElement('a');

	anchorImg.appendChild(img);

	var cardTitle = document.createElement('h6');
	cardTitle.className = 'card-title';
	cardTitle.innerHTML = data.name;

	var price = document.createElement('p');
	price.innerHTML = data.price;

	var cardBody = document.createElement('div');
	cardBody.className = 'card-body text-center';
	//nhung cardTitle va price vao cardBody
	cardBody.appendChild(cardTitle);
	cardBody.appendChild(price);

	var card = document.createElement('div');
	card.className = 'card border-0 w-100';

	card.appendChild(anchorImg);
	card.appendChild(cardBody);

	var cardIcon = document.createElement('i');
	cardIcon.className = 'fa fa-cart-plus';
	cardIcon.setAttribute('aria-hidden','true');

	var addToCart = document.createElement('div');
	addToCart.className = 'text-white text-center add-cart-tag';

	addToCart.appendChild(cardIcon);
	addToCart.appendChild(document.createTextNode(' Add to Cart'));

	var column = document.createElement('div');
	column.className = 'col-md-6 col-sm-6 col-lg-3 margin-block add-cart-tag-control';

	column.appendChild(card);
	column.appendChild(addToCart);

	element.appendChild(column);
}

