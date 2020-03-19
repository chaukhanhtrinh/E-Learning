'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data =[{name: "Điện thoại", immagepath: 'https://cdn.tgdd.vn/Products/Images/42/198150/oppo-find-x2-blue-600x600-400x400.jpg'}
  ,{name: "Máy tính", immagepath: 'https://cdn.tgdd.vn/Products/Images/44/106875/apple-macbook-air-mqd32sa-a-i5-5350u-600x600.jpg'},
  {name: "Máy tính bảng", immagepath:'https://cdn.tgdd.vn/Products/Images/522/213096/ipad-10-2-inch-wifi-32gb-2019-gold-200x200.jpg'},
  {name: "Phụ kiện", immagepath:'https://cdn.tgdd.vn/Products/Images/54/219433/tai-nghe-gaming-rapoo-vh500-71-den-600x600.jpg'}];
  data.map(item=>{
    item.createdAt = Sequelize.literal('NOW()');
    item.updatedAt = Sequelize.literal('NOW()');
    return item;
  });
      return queryInterface.bulkInsert('Categories', data, {});
  
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
