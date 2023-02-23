const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')
const User = require('../models/User')
const Post = require('../models/Post')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

// @route   GET /profile/me
// @desc    Get current profile
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name'])
    // .populate() adds the name and avatar to the user collection model
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user.' })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

})

// @route   GET /profile/:profile_id
// @desc    Get profile by id
// @access  Private

router.get('/:profile_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profile_id)
    console.log('profile ' + profile)
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST /profile
// @desc    Create or update profile
// @access  Private

router.post('/', [
  check('lastn', 'Last name is required').not().isEmpty(),
  check('mobileno', 'Mobile number is required').not().isEmpty().isLength(6),
  check('role', 'Role is required').not().isEmpty()
], auth, async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { lastn, mobileno, role } = req.body

  const newProfile = {}
  newProfile.user = req.user.id
  if (lastn) newProfile.lastn = lastn
  if (mobileno) newProfile.mobileno = mobileno
  if (role) newProfile.role = role

  try {
    let profile = await Profile.findOne({ user: req.user.id })
    if(profile) {
      // If profile exists, update it
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: newProfile },
        { new: true }
      )
      return res.json(profile)
    }
    profile = new Profile(newProfile)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   DELETE /profile
// @desc    Delete profile, posts & user
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.user.id })
    await Profile.findOneAndRemove({ user: req.user.id })
    await Post.findOneAndRemove({ user: req.user.id })
    res.json({ msg: 'User, Profile & Posts deteled' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
