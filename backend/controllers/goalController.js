const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })

  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    //using the builtin express error handle, it will give us html page
    //but we have overriden the default error handler
    throw new Error('Please add a text field')
  }

  if(req.body.priority.priority <= 0){
    res.status(400)
    throw new Error("Please set a positive priority");
  }

  if(new Date(req.body.completeTime.completeTime) < (new Date())){
    res.status(400)
    throw new Error("Please set a completion date later than the current date");
  }

  // console.log(req.body);

  const goal = await Goal.create({
    completeTime: req.body.completeTime.completeTime,
    priority: req.body.priority.priority,
    text: req.body.text.text,
    user: req.user.id,
  })

  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  if(req.body.priority.priority <= 0){
    res.status(400)
    throw new Error("Please set a positive priority");
  }

  if(new Date(req.body.completeTime.completeTime) < (new Date())){
    res.status(400)
    throw new Error("Please set a completion date later than the current date");
  }

  // console.log(req.body);

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {text : req.body.text.text, completeTime : req.body.completeTime.completeTime, priority : req.body.priority.priority}, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}