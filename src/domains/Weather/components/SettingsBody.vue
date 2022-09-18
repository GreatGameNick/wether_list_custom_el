<script setup lang="ts">
import {computed, onMounted, reactive, ref, inject} from "vue"
import useVuelidate from "@vuelidate/core"
import {numeric} from '@vuelidate/validators'

import {drugStart, drugEnd, dragOver} from "../features/dragAndDrop/drugEndDrop"
import {saveRefreshedLineToLS} from '../features/saveRefreshedLineToLS'
import {useWeatherStore} from "../store/weatherStore"
import SettingsDraggableCard from './SettingsDraggableCard.vue'

const weatherStore = useWeatherStore()
let weatherSets = computed(() => weatherStore.GET_WEATHER_SETS)
const emit = defineEmits(['reloadHimSelf'])

let weatherListEl: any = reactive({})

function vnodeMountedHandler(ev: any) {
  weatherListEl = ev.el
}

//1
function dragstartHandler(ev: any) {
  drugStart(ev.target)
}

//2
let refreshedItemLine_id: string[] = reactive([])

function dragendHandler(ev: any) {
  let refreshedItemLine_id = drugEnd(ev, weatherListEl, `.weather-list__item`)
  
  saveRefreshedLineToLS(refreshedItemLine_id, weatherSets.value)
  weatherStore.REFRESH_WEATHER_LINE(refreshedItemLine_id)
  
  emit('reloadHimSelf')
}

//3
function dragoverHandler(ev: any) {
  dragOver(ev, weatherListEl, 'weather-list__item')
}


const state = reactive({
  coordinates: {
    longitude: {
      name: 'longitude',
      val: ''
    },
    latitude: {
      name: 'latitude',
      val: ''
    }
  }
})

const validators = {
  coordinates: {
    longitude: {
      val: {numeric}
    },
    latitude: {
      val: {numeric}
    },
  }
}

const v$ = useVuelidate(validators, state, {$autoDirty: true})

function isGoAllowed(ind: number): boolean {
  return (ind + 1) === Object.keys(state.coordinates).length
}

const isValid = computed(() => {
  return !v$.value.coordinates['longitude'].val.$invalid && !!v$.value.coordinates['longitude'].val.$model &&
    !v$.value.coordinates['latitude'].val.$invalid && !!v$.value.coordinates['latitude'].val.$model
})

async function addWeather() {
  await weatherStore.FETCH_WEATHER([[state.coordinates.longitude.val, state.coordinates.latitude.val]])
    .then(() => {
      state.coordinates.longitude.val = ''
      state.coordinates.latitude.val = ''
      v$.value.$reset()
    })
}


</script>


<template>
  <div>
    <div class="weather-list"
         @vnodeMounted="vnodeMountedHandler"
         @vnodeUpdated="vnodeMountedHandler"
    >
      <SettingsDraggableCard v-for="(weatherSet, ind) of weatherSets"
                             :key="'sdc' + ind"
                             :weatherSet="weatherSet"
                             :id="weatherSet.id"
                             class="weather-list__item"
                             draggable="true"
                             @dragstart="dragstartHandler"
                             @dragover="dragoverHandler"
                             @dragend="dragendHandler"
      />
    </div>
    
    <div class="weather-search">
      <div class="weather-search__title">
        Add Location
      </div>
      <div v-for="(field, key, ind) in state.coordinates"
           :key="'coord' + ind"
           class="weather-search__input-block"
      >
        
        <div class="input-block__title">{{ field.name }}</div>
        <input v-model="field.val"
               type="text"
               :class="{'input-error': v$.coordinates[key].val.$error,
                        'input-valid': !v$.coordinates[key].val.$invalid && v$.coordinates[key].val.$model
                       }"
        >
        <div v-if="isGoAllowed(ind) && isValid"
             @click="addWeather"
             class="input-block__btn"
        >
          GO
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>