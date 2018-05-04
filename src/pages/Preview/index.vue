<template>
  <div>
    <div>
      <h2>Preview</h2>
    </div>
    <div>
      <Answers :exercise="exercise"/>
    </div>
  </div>
</template>
<script>
import Answers from '../../components/Answers'

export default {
  name: "Preview",
  computed: {
    exercise () {
      return this.$store.getters['getExercise']
    }
  },
  components: {
    Answers
  }
}
</script>
<style lang="scss" scoped>
</style>
