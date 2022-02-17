const router = require('express').Router();
const { Category, Product } = require('../../models');

//get all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {model: Product}
      ]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {model: Product}
      ]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update category by ID
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update( 
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete category
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
