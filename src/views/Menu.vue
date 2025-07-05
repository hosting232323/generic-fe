<template>
  <v-row>
    <v-col cols="3">
      <div class="icons-container">
        <br />
        <v-btn
          v-for="element in data.menu"
          :icon="element.icon"
          :color="data.info.primaryColor"
        />
        <br />
      </div>
    </v-col>
    <v-col cols="9">
      <div :class="{
        'pb-10': true,
        'menu-container-desktop': !isMobile,
        'menu-container-mobile': isMobile
      }">
        <div v-for="element in data.menu">
          <v-sheet
            class="mt-10 mr-8 mb-3 category-sheet"
            :style="{ backgroundImage: `url(${element.image})` }"
          >
            <h2>{{ element.name }}</h2>
          </v-sheet>
          <v-sheet
            v-for="item in element.items"
            color="transparent"
            class="mt-2 mr-10 ml-2"
          >
            <h4>
              {{ item.name }}
              <span style="float: right;">{{ item.price }} €</span>
            </h4>
            <p>{{ item.description }}</p>
          </v-sheet>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useMobileUtils } from '@/utils/mobile';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);
const { isMobile } = useMobileUtils();
</script>

<style scoped>
.icons-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.menu-container-desktop {
  height: 80vh;
  overflow-y: auto;
}

.menu-container-mobile {
  height: 90vh;
  overflow-y: auto;
}

.category-sheet {
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  background-position: center;
  color: white
}
</style>
