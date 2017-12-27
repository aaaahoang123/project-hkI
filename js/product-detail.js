function loadDetail() {
	console.log(location.hash);
	// Lấy ra id từ Url, cụ thể là location.hash, bằng cách bỏ đi hash template của nó
	var productId = location.hash.replace('#productDetail/', '').replace('#productDetail', '');
	$.ajax({
		url: 'https://rlcapi.herokuapp.com/api/products/' + productId,
		type: 'GET',
		success: function(res) {
			console.log(res);
	    	document.getElementById('zoom_01').src = res.item.images.bigImgs[0];
	    	$("#zoom_01").elevateZoom();
	    	document.getElementById('zoom_02').src = res.item.images.bigImgs[1];
	    	$("#zoom_02").elevateZoom();
	    	document.getElementById('mini_01').src = res.item.images.smallImgs[0];
	    	document.getElementById('mini_02').src = res.item.images.smallImgs[1];
	    	document.querySelector("h4").innerHTML = res.item.name;
	    	document.querySelector("span > a").innerHTML = ' ' + res.brandName;
	    	document.querySelector("span > a").href = '#products/?brandId=' + res.item.brandId,
	    	document.querySelector("span.ml-5").innerHTML = 'Code: ' + res.item.productCode;
	    	document.querySelector("strong.text-danger").innerHTML = 'Price: ' + res.item.price;
	    	document.querySelector("#productDescription").innerHTML = res.item.description;

	    	var idPage = res.item._id;

 //load phan related product.
	    	function loadHint1() {
				$.ajax({
			  	url:'https://rlcapi.herokuapp.com/api/products?brandId=' + res.item.brandId,
			  	type:'GET',
			  	success: function(res) {
			  		console.log(res);
				    for (var i=0; i<res.items.length && i<4; i++) {	
				    	if (res.items[i]._id != idPage) {			    	
				    		createHint(res.items[i], document.getElementById('relatedProduct'));
				    		}	    	
				    }
			  	},
			  	error: function(res) {
			  		console.log(res)
			  	}
			  })
			}

			$(location).ready(function(){
				loadHint1();
			});

 //load phan you may like.
 			function loadHint2() {
				$.ajax({
			  	url:'https://rlcapi.herokuapp.com/api/products?categoryId=' + res.item.categoryId,
			  	type:'GET',
			  	success: function(res) {
			  		console.log(res);
				    for (var i=0; i<res.items.length && i<4; i++) {
				    	if (res.items[i]._id != idPage) {
					    	createHint(res.items[i], document.getElementById('youLike'));
					    }
				    }
			  	},
			  	error: function(res) {
			  		console.log(res)
			  	}
			  })
			}

			$(location).ready(function(){
				loadHint2();
			});


	    },
		error: function(res) {
			console.log(res)
		}
	})
}

$(location).ready(function(){
	loadDetail();
});

function createHint(data,element) {
	var productName = document.createElement('div');
	productName.className = 'col-xs-7 col-md-7 text-danger';
	productName.innerHTML = data.name;
	productName.style.fontSize = '14px';

	var productPrice = document.createElement('div');
	productPrice.className = 'col-xs-5 col-md-5 text-danger';
	productPrice.innerHTML = data.price;

	var textCenter = document.createElement('div');
	textCenter.className = 'row text-center';

	textCenter.appendChild(productName);
	textCenter.appendChild(productPrice);

	var anchorImg = document.createElement('a');
	anchorImg.href = '#productDetail/' + data._id;

	var img = document.createElement('img');
	img.src = data.images.bigImgs[0];
	img.className = 'w-100';

	anchorImg.appendChild(img);

	var divReponsive = document.createElement('div');
	divReponsive.className = 'col-sm-6 col-md-3';

	divReponsive.appendChild(anchorImg);
	divReponsive.appendChild(textCenter);

	element.appendChild(divReponsive)
}

