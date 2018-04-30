<template>
  <div>
    <div>
      <h2>Preview</h2>
    </div>
    <div>
      <ChooseCorrectWord :exercise="exercise"/>
    </div>
  </div>
</template>
<script>
import ChooseCorrectWord from '../../components/ChooseCorrectWord'

export default {
  name: "Preview",
  computed: {
    exercise () {
      return this.$store.getters['getExercise']
    }
  },
  components: {
    ChooseCorrectWord
  }
}
</script>
<style lang="scss" scoped>
</style>
