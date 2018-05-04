<template>
  <div class="container">
    <div class="item flex-basis-500">
      <div class="container column">
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
          <div class="container">
            <div class="item flex-basis-100">
              <button @click="play()" v-if="!isPlaying" :disabled="!loaded">Play</button>
              <button @click="pause()" v-else :disabled="!loaded">Pause</button>
            </div>
            <div class="item flex-basis-500">
              <input
                type="range"
                v-model="currentTime"
                step="0.000001"
                :max="duration"
                @change="durationChanged(currentTime)"
                @input="durationChanged(currentTime)"
              />
            </div>
            <div class="item flex-basis-200">
              <input
                type="range"
                v-model="volume"
                step="0.0001" max="1"
                @change="volumeChanged(volume)"
                @input="volumeChanged(volume)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item flex-basis-500">
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
      loaded: false,
      isPlaying: false,
      duration: 0,
      currentTime: 0,
      volume: 1,
      ended: false
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
    },
    durationChanged (time) {
      this.$refs['video'].currentTime = time
    },
    volumeChanged (volume) {
      this.$refs['video'].volume = volume
    }
  },
  props: [
    `exercise`
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
video {
  width: 100%;
}

input[type="range"] {
  width: 100%;
}
</style>
