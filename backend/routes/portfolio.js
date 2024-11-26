const express = require('express');
const router = express.Router();
const { Portfolio } = require('../models/Portfolio');
const auth = require('../middleware/middleware');

router.post('/create', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    const portfolioData = {
      user: req.user.id,
      ...req.body
    };

    if (portfolio) {
      portfolio = await Portfolio.findOneAndUpdate(
        { user: req.user.id },
        { $set: portfolioData },
        { new: true, runValidators: true }
      );
    } else {
      portfolio = new Portfolio(portfolioData);
      await portfolio.save();
    }

    res.json(portfolio);
  } catch (err) {
    console.log(err)
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).send('Server Error');
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Portfolio removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.params.userId });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.post('/projects', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    portfolio.projects.unshift(req.body);
    await portfolio.save();
    res.json(portfolio.projects);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).send('Server Error');
  }
});

router.post('/experiences', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    portfolio.experiences.unshift(req.body);
    await portfolio.save();
    res.json(portfolio.experiences);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).send('Server Error');
  }
});

// Add work to portfolio
router.post('/works', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    portfolio.works.unshift(req.body);
    await portfolio.save();
    res.json(portfolio.works);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).send('Server Error');
  }
});

// Add service to portfolio
router.post('/services', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    portfolio.services.unshift(req.body);
    await portfolio.save();
    res.json(portfolio.services);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).send('Server Error');
  }
});

// Add testimonial to portfolio
router.post('/testimonials', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    portfolio.testimonials.unshift(req.body);
    await portfolio.save();
    res.json(portfolio.testimonials);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).send('Server Error');
  }
});

// Add achievement to portfolio
router.post('/achievements', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    portfolio.achievements.unshift(req.body);
    await portfolio.save();
    res.json(portfolio.achievements);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: Object.values(err.errors).map(e => e.message) });
    }
    res.status(500).send('Server Error');
  }
});

// Delete routes for each section
['projects', 'experiences', 'works', 'services', 'testimonials', 'achievements'].forEach(section => {
  router.delete(`/${section}/:id`, auth, async (req, res) => {
    try {
      const portfolio = await Portfolio.findOne({ user: req.user.id });
      if (!portfolio) {
        return res.status(404).json({ msg: 'Portfolio not found' });
      }

      // Find the item index
      const removeIndex = portfolio[section].findIndex(item => item.id === req.params.id);
      if (removeIndex === -1) {
        return res.status(404).json({ msg: `${section.slice(0, -1)} not found` });
      }

      // Remove the item
      portfolio[section].splice(removeIndex, 1);
      await portfolio.save();
      res.json(portfolio[section]);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: `${section.slice(0, -1)} not found` });
      }
      res.status(500).send('Server Error');
    }
  });
});

module.exports = router;