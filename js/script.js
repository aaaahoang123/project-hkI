function removeproduct() {
        var tbody = document.getElementById("product");
        tbody.parentNode.removeChild(tbody);
      }

function toggle(source) {
  checkboxes = document.getElementsByName('checkbox');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}