const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Tag, through: ProductTag, as: "tags_product"
        },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get individual product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
        },
        {
          model: Tag, through: ProductTag, as: "tags_product"
        },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
    try {
      const productData = await Product.update( 
      {
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
