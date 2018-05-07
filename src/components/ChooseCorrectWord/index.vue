<template>
  <div class="container">
    <PlyrVideo poster="" :videos="[ { src: exercise.src, format: 'mp4' }]" ref="video" :emit="['timeupdate', 'play']" @timeupdate="timeUpdated" @play="play"/>
  </div>
</template>
<script>
import { PlyrVideo } from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

export default {
  name: "ChooseCorrectWord",
  data () {
    return {
      loaded: false,
      isPlaying: false,
      duration: 0,
      currentTime: 0,
      oldTime: null,
      volume: 1,
      ended: false,
      interruption: 0,
      answered: false,
      first: true,
      ended: false
    }
  },
  methods: {
    play (ev) {
      if (!this.first) {
        if (!this.ended) {
          if (!this.answered) {
            this.pause()
            alert('Answer first!')
          }
        }
      }
    },
    end () {
      this.ended = true
    },
    answer () {
      this.answered = true
      this.first = true
    },
    setInterruption (time) {
      this.answered = false
      this.interruption = parseFloat(time)
    },
    timeUpdated () {
      const time = this.$refs['video']._data.player.currentTime
      if (this.oldTime === null) this.oldTime = time
      else this.oldTime = this.currentTime
      this.currentTime = time
      console.log(this.oldTime, this.currentTime);
      if (this.interruption >= 0) {
        // if (this.oldTime <= this.interruption && this.currentTime >= this.interruption) console.log('pause')
        if ((this.interruption >= this.oldTime) && (this.interruption <= this.currentTime)) {
          if (this.first) this.first = false
          this.pause()
        }
      }
    },
    getCurrentTime () {
      return this.$refs['video']._data.player.currentTime
    },
    pause () {
      this.$refs['video']._data.player.pause()
    }
  },
  props: [
    `exercise`
  ],
  components: {
    PlyrVideo
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
