const Datas = require('../resources/data.json');
const express = require('express');
const router = express.Router();

const seller = Datas.seller;
const goods = Datas.goods;
const ratings = Datas.ratings;

router.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

router.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

router.get('/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

module.exports = router;
