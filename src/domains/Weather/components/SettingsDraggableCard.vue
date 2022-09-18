<script setup lang="ts">
import {defineProps} from "vue";
import type {CardWeatherSet} from "../store/storeTypes"
import hamburger from '../assets/imgs/hamburger.png'
import trash from '../assets/imgs/trash.jpg'
import {useWeatherStore} from "@/domains/Weather/store/weatherStore"

const props = defineProps<{
  weatherSet: CardWeatherSet
}>()

const weatherStore = useWeatherStore()

function delItem(id: string): void {
  weatherStore.DEL_WEATHER(id)
}

</script>

<template>
  <div class="settings-dr-card-wrapper">
    <div class="dr-card__icon">
      <img :src="hamburger" alt="hamburger" class="dr-card__icon-img">
    </div>
    <div class="dr-card__body">
      <span>lon &nbsp;{{ weatherSet.lon }}</span>
      <span>lat &nbsp;{{ weatherSet.lat }}</span>
    </div>
    <div @click="delItem(weatherSet.id)"
         class="dr-card__trash dr-card__icon"
    >
      <img :src="trash" alt="trash" class="dr-card__icon-img">
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>