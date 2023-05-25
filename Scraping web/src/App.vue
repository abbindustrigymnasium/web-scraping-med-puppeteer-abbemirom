<template>
  <div class="flex flecflex-wrap">
    <div v-for="(outerValue, outerKey) in data" :key="outerKey" class="outline w-96 my-8">
      <h2 class="text-xl">{{ outerKey }}</h2>
      <div v-for="(_, index) in outerValue.etapper" :key="index" class="my-3">
        <p class="">{{ outerValue.etapper[index] }}</p>
        <p>{{ outerValue.info[index] }}</p>
      </div>
       <a :href="outerValue.link">{{ outerValue.link }}</a>
    </div>
  </div>
</template>

<script>
import json from "../Scraping code/Data.json"
export default {
  data () {
    return {
      data: json
    }
  }

}
</script>

<style>

</style>