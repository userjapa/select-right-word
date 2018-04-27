<template>
  <div>
    <div>
      <h1>Listen the Dialogs and Choose the Correct Word</h1>
    </div>
    <div>
      <ul>
        <li><router-link :to="{ name: 'Create' }">Create</router-link></li>
        <li><router-link :to="{ name: 'Preview' }">Preview</router-link></li>
      </ul>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: "Main"
}
</script>
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
