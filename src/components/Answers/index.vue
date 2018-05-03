<template>
<div class="container column">
  <div class="item">
    <h3>Answers</h3>
  </div>
  <div class="container column">
    <div class="item">
      <div class="container align-items-center question__item" v-for="(qst, index) in questions" :class="{ disabled: !qst.answered }" :ref="`question-${index}`" @click="viewCurrent(qst)">
        <div class="item">
          <div class="audio-play">
            <audio :src="qst.src" :ref="`audio-${index}`" @playing="qst.playing = true" @pause="qst.playing = false" />
            <button @click="play(`audio-${index}`)" v-if="!qst.playing">Play</button>
            <button @click="pause(`audio-${index}`)" v-if="qst.playing">Pause</button>
          </div>
        </div>
        <div class="flex-basis-100 image">
          <img :src="qst.img">
        </div>
        <p>
          {{ spliceIntoArray(qst).first }} <span class="option" :class="{ right: qst.answered && checkSelected(qst.words), wrong: qst.answered && !checkSelected(qst.words) }"> {{ getSelected(qst.words) }} </span> {{ spliceIntoArray(qst).last }}
        </p>
      </div>
    </div>
  </div>
  <div class="container row">
    <div class="item flex-basis-50" v-for="(word, index) in question.words" @click="select(word, $event.target)">
      <span class="option" :class="{ right: (word.correct && question.answered), wrong: (!word.correct && word.selected && question.answered) }"> {{ word.word }} </span>
    </div>
  </div>
  <div class="container">
    <div class="item">
      <button @click="setCurrent(questions)" :disabled="!question.answered" v-if="!ended">Next</button>
      <p v-if="ended">Finished!</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "Answers",
  data() {
    return {
      question: {
        words: []
      },
      ended: false
    }
  },
  methods: {
    setCurrent(questions) {
      for (const index in questions) {
        if (!questions[index].answered) {
          this.question = questions[index]
          setTimeout(() => {
            this.$refs[`question-${index}`][0].classList.remove(`disabled`)
          }, 0)
          break
        } else {
          if (parseInt(index) === (questions.length - 1)) {
            this.ended = true
            this.question = questions[index]
          }
        }
      }
    },
    viewCurrent(question) {
      if (question.answered) this.question = question
    },
    play(el) {
      this.$refs[el][0].play()
    },
    pause(el) {
      this.$refs[el][0].pause()
    },
    spliceIntoArray(question) {
      const titleArray = question.title.split(` `)
      const correctIndex = question.words.findIndex(x => x.correct)
      const correctWord = question.words[correctIndex].word
      const wordIndex = titleArray.findIndex(x => x.toLowerCase() === correctWord.toLowerCase())

      let firstPart = titleArray.slice(0, wordIndex)
      let lastPart = titleArray.slice(wordIndex + 1, titleArray.length)

      firstPart = firstPart.join(` `)
      lastPart = lastPart.join(` `)
      return {
        first: firstPart,
        last: lastPart,
        word: correctWord
      }
    },
    select(word, el) {
      if (!this.question.answered) {
        word.selected = true
        this.question.answered = true
      }
    },
    checkSelected(words) {
      const index = words.findIndex(x => x.selected)
      if (index >= 0) {
        if (words[index].correct) return true
      }
      return false
    },
    getSelected(words) {
      const index = words.findIndex(x => x.selected)
      if (index >= 0) return words[index].word
      return ``
    }
  },
  props: [
    'questions'
  ],
  watch: {
    'questions': function(questions) {
      this.setCurrent(questions)
    }
  },
  mounted() {
    this.setCurrent(this.questions)
  }
}
</script>
<style lang="scss" scoped>
img {
    width: 100%;
    height: auto;
    vertical-align: middle;
    border-style: none;
}

.option {
    display: inline-block;
    width: 100px;
    background: #ff9c00;
    border-radius: 50px;
    color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    padding: 5px;
    text-align: center;
    min-height: 25px;
    margin-left: 5px;
    margin-right: 5px;
}

.right {
    background-color: green;
}

.wrong {
    background-color: red;
}

.disabled {
    background-color: #ddd;
}

.question__item {
    background: #d5d5d5;
    color: #6f6f6f;
    margin-bottom: 20px;
    border-radius: 10px;
    cursor: pointer;
}

.audio {
    margin: 10px;
}

.audio-play {
    background: #27c6c7;
    background: linear-gradient(56.5deg,#27c6c7,#118ad3);
    height: 35px;
    width: 35px;
    border-radius: 50%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    transition: 0.1s;
    cursor: pointer;
}

.audio-play:hover {
    background: linear-gradient(56.5deg,#8027c7,#118ad3);
}

.image {
    display: inline-block;
    // margin-right: 10px;
    // background: red;
    // width: 60px;
    // min-width: 60px;
    border-radius: 6px;
    overflow: hidden;
}
</style>
