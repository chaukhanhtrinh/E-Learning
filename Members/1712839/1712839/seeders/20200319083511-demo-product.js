'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var products = [];
    var i = 1;

    for (i=1; i<10; i++) {
      var product = {
        name: `Book ${i}`,
        imagepath: `public/images/${i}.jpg`,
        summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, vel?',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae dolor tenetur neque itaque et reprehenderit autem odit nesciunt, aut repellendus nisi sapiente nam ipsa vero excepturi perspiciatis, reiciendis ipsam, quo id consequatur. Delectus officiis explicabo sit quia, maiores nesciunt rem esse hic molestias velit illum in nulla modi quo officia.',
        price: Math.random() * 100,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      products.push(product);
    }
    console.log(products);
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {}); 
  }
};
