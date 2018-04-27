<template>
  <div class="container col">
    <div class="item">
      <h3>Answers</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "Answers",
  props: [
    'exercise'
  ]
}
</script>
<style lang="scss" scoped>
.item {
  flex-grow: 1;
}
</style>
