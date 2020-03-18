var shoppingCart = localStorage.getItem('cart');
if (JSON.parse(shoppingCart)) {
  shoppingCart = JSON.parse(shoppingCart);
} else {
  shoppingCart = [];
  localStorage.setItem('cart', JSON.stringify(shoppingCart));
}

$(document).ready(function () {

  $('#customize_cart_list').append(shoppingCartDetail(shoppingCart));

  $('.cart_icon').children('.cart_count').children('span').text(shoppingCart.length);
  var total = shoppingCart.reduce((item1, item2) => item1 + item2.total * parseInt(item2.price), 0);

  $('.cart_icon').next().children('.cart_price').text(total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));

  // Compute total price of product in shopping
  $('.order_total_amount').text(total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));

  $('.product_cart_button').click(function (e) {
    var parentElement = $(this)
      .parent()
      .parent();

    var nameProduct = parentElement
      .children('.product_name')
      .children('div')
      .children('a')
      .text();

    var priceProduct = parentElement.children('.product_price').text();

    var pathImg = parentElement
      .prev()
      .children('img')
      .attr('src');

    var idProduct = parentElement.prev().attr('data-id');

    // id of supplier
    var idSupplier = parentElement.parent().attr('data-id-user');

    var foundItem = shoppingCart.find(item => item.id == idProduct);

    if (foundItem) {
      foundItem.total++;
    } else {
      shoppingCart.push({
        id: idProduct,
        idSupplier,
        name: nameProduct,
        price: priceProduct.replace(/\,|đ$/g, ''),
        path: pathImg,
        total: 1,
      });
    }

    $('.cart_icon').children('.cart_count').children('span').text(shoppingCart.length);

    localStorage.setItem('cart', JSON.stringify(shoppingCart));
  });
});

function renderItem(idProduct, nameProduct, priceProduct, totalProduct, pathImg) {
  return `<li class="cart_item clearfix" data-target="${idProduct}">
            <div class="float-right customize-cancel-icon">
              <i class="far fa-window-close text-secondary" style="font-size: 20px; cursor: pointer;"></i>
            </div>
            <div class="cart_item_image"><img src="${pathImg}" alt=""></div>
            <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
              <div class="cart_item_name cart_info_col">
                <div class="cart_item_title">Tên</div>
                <div style="width: 100px;" class="cart_item_text text-truncate">${nameProduct}</div>
              </div>
              <div class="cart_item_quantity cart_info_col">
                <div class="cart_item_title">Số lượng</div>
                <div class="cart_item_text d-flex">
                  <button data-target="${idProduct}" class="btn btn-primary mr-2 btn-minus">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input style="height: 40px; width: 100px" class="form-control px-2" value="${totalProduct}" />
                  <button data-target="${idProduct}" class="btn btn-primary ml-2 btn-plus">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div class="cart_item_price cart_info_col">
                <div class="cart_item_title">Giá</div>
                <div class="cart_item_text">${priceProduct.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>
              </div>
              <div class="cart_item_total cart_info_col">
                <div class="cart_item_title">Tổng</div>
                <div class="cart_item_text">${(totalProduct * parseInt(priceProduct)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>
              </div>
            </div>
          </li>`;
}

function shoppingCartDetail(shoppingCart) {
  var result = shoppingCart.map(item => renderItem(item.id, item.name, item.price, item.total, item.path));
  return result.join('');
}
