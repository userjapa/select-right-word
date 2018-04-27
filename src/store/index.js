import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exercises: [],
    toUpdate: null,
    error: null
  },
  getters: {
    getExercises ({ exercises }) {
      return exercises
    },
    isToUpdate ({ toUpdate }) {
      if (toUpdate) return true
      else return false
    },
    hasError ({ error }) {
      if (error) return true
      else return false
    }
  },
  mutations: {
    setExercises (state, exercises) {
      state.exercises = exercises
    },
    addExercise (state, exercise) {
      state.exercises.push(exercise)
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    },
    setError (state, error) {
      state.error = error
    }
  }
})
