<template>
  <div class="container">
    <div class="item">
      <div class="container col">
        <div class="item">
          <video
            :src="exercise.src"
            ref="video"
            @loadeddata="loadedData($event.target)"
            @playing="isPlaying = true"
            @pause="isPlaying = false"
            @timeupdate="timeUpdated($event.target)"
          />
        </div>
        <div class="item">
          <button @click="play()" v-if="!isPlaying" :disabled="!loaded">Play</button>
          <button @click="pause()" v-else :disabled="!loaded">Pause</button>
          <input type="range" v-model="currentTime" step="0.000001" :max="duration">
          <input type="range" v-model="volume" step="0.0001" max="1">
        </div>
      </div>
    </div>
    <div class="item">
      <Answers :exercise="exercise"/>
    </div>
  </div>
</template>
<script>
import Answers from '../Answers'

export default {
  name: "ChooseCorrectWord",
  data () {
    return {
      exercise: {},
      loaded: false,
      isPlaying: false,
      duration: 0,
      currentTime: 0
    }
  },
  methods: {
    play () {
      this.$refs['video'].play()
    },
    pause () {
      this.$refs['video'].pause()
    },
    loadedData (video) {
      this.duration = video.duration
      this.loaded = true
    },
    timeUpdated (video) {
      this.currentTime = video.currentTime
    }
  },
  props: [
    `exercises`
  ],
  components: {
    Answers
  },
  watch: {
    'exercise.src': function () {
      this.duration = 0
      this.loaded = false
      this.$refs['video'].load()
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  flex-grow: 1;
}
</style>
