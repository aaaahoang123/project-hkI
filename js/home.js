function loadHallMarkProduct() {
  $.ajax({
  	url: productApi + '?brandId=5a3b717a286d242000b05096',
  	type:'GET',
  	success: function(res) {
	    for (var i=0; i<res.items.length && i<4; i++) {
	    	createProductTag(res.items[i], document.getElementById('hallmark-cards'));
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
  	url: productApi + '?categoryId=5a3bc84c60738a2000ebca1d',
  	type:'GET',
  	success: function(res) {
	    for (var i=0; i<res.items.length && i<4; i++) {
	    	createProductTag(res.items[i], document.getElementById('birthday-cards'));
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
	anchorImg.href = '#productDetail/' + data._id;

	anchorImg.appendChild(img);

	var cardTitle = document.createElement('h6');
	cardTitle.className = 'card-title text-danger';
	cardTitle.innerHTML = data.name;

	var price = document.createElement('b');
	price.className = "text-dark";
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

	var cartTag = document.createElement('div');
	cartTag.className = 'text-white text-center add-cart-tag';

	var cartAnchor = document.createElement('a');
	cartAnchor.onclick = function() {
		addToCart(data._id);
	};
	cartAnchor.className = 'hover-pointer';

	cartAnchor.appendChild(cardIcon);
	cartAnchor.appendChild(document.createTextNode(' Add to Cart'));

	cartTag.appendChild(cartAnchor);

	var column = document.createElement('div');
	column.className = 'col-md-6 col-sm-6 col-lg-3 margin-block add-cart-tag-control';

	column.appendChild(card);
	column.appendChild(cartTag);

	element.appendChild(column);
}

