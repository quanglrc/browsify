const express = require ('express');
const router = express.Router();
const {renderHomepage} = require ('./renderController');

router.get('/', renderHomepage)

module.exports = router;