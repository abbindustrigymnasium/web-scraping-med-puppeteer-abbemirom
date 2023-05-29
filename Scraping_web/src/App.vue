<template>
  <div class="bg-cover bg-center"
    style="background-image: url(https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-8/couple-hiking-mountain-climbing-1296x728-header.jpg?w=1155&h=1528)">
    <div class="flex flex-col items-center h-screen">
      <input placeholder="Sök..." class="flex items-center bg-neutral-200 w-4/5 h-10 my-4 px-10 rounded-lg mt-16"
        v-model="input" type="text" />
      <div
        class="grid grid-cols-3 gap-5 mx-8  overflow-auto bg-neutral-800 bg-opacity-75 rounded-xl p-6 w-11/12 h-5/6 mb-12">
        <div v-for="([outerKey, outerValue]) in filteredData" :key="outerKey"
          class="rounded-xl bg-stone-950 text-lg text-stone-200 px-4" @click="Expand(outerKey)">
          <h2 class="text-xl text-stone-200 flex justify-center my-5">{{ outerKey }}</h2>
          <div class="mb-5" v-show="expandedKey === outerKey">
            <div v-for="(_, index) in outerValue.etapper" :key="index" class="my-3 ">
              <p>{{ outerValue.etapper[index] }}</p>
              <p>{{ outerValue.info[index] }}</p>
            </div>
            <p class="text-stone-200">För mer information klicka på länken: <a :href="outerValue.link" class="text-blue-500">{{ outerValue.link
            }}</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../Scraping_code/Data.json"
export default {
  data () {
    return {
      data: json,
      expandedKey: null,
      input: "",
    }
  },
  methods: {
    Expand (outerKey) {
      this.expandedKey = this.expandedKey === outerKey ? null : outerKey
    }
  },
  computed: {
    filteredData () {
      const title = this.input.toLowerCase()
      return Object.entries(this.data).filter(([outerKey, outerValue]) =>
        outerKey.toLowerCase().includes(title) ||
        outerValue.etapper.some(etapper => etapper.toLowerCase().includes(title)) ||
        outerValue.info.some(info => info.toLowerCase().includes(title))
      )
    }
  }

}
</script>

<style></style>