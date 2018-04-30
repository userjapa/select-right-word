import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exercise: {
      questions: [],
      src: `https://r6---sn-bg07dnss.googlevideo.com/videoplayback?requiressl=yes&id=c55baa6a3a1305fd&itag=18&source=blogger&app=blogger&ip=0.0.0.0&ipbits=0&expire=1527252410&sparams=expire,id,ip,ipbits,itag,mip,mm,mn,ms,mv,pl,requiressl,sc,source&signature=7C24220B9E2AA552E75565CC8B2A12B2406A5F2F.BFF541F4130A46419936EC391789AD5602E3EB&key=cms1&cms_redirect=yes&mip=2001:1284:f013:1673:cc72:891c:55dc:b6ae&mm=30&mn=sn-bg07dnss&ms=nxu&mt=1525104864&mv=m&pl=33&sc=yes`
    },
    toUpdate: null,
    error: null
  },
  getters: {
    getExercise ({ exercise }) {
      return Object.assign(exercise)
    },
    isToUpdate ({ toUpdate }) {
      if (toUpdate !== null) return true
      else return false
    },
    hasError ({ error }) {
      if (error) return true
      else return false
    }
  },
  mutations: {
    setExercise (state, exercise) {
      state.exercise = exercise
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    },
    update (state, question) {
      state.exercise.questions[state.toUpdate] = question
    },
    setError (state, error) {
      state.error = error
    }
  }
})
