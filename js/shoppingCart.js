function removeproduct(el) {
            el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
        }
        function selectAll(el) {
            var productSelector = document.getElementsByClassName("product-selector");
            if (el.checked) {
                for (var i=0; i<productSelector.length; i++) {
                    productSelector[i].checked = true;
                }
            }
            else {
                for (var i=0; i<productSelector.length; i++) {
                    productSelector[i].checked = false;
                }
            }
        }
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