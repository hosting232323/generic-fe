<template class="app-bar">
  <v-navigation-drawer v-model="drawer" location="bottom" temporary touchless>
    <v-list>
      <v-list-item v-for="item in items" :key="item.path">
        <div @click="link(item)">
          {{ item.title }}
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  
  <v-app-bar :elevation="2" :color="info.primaryColor" v-if="isMobile">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-app-bar-title>
      <div class="d-flex align-center">
        <img  v-if="info.logo && (info.logoMode === 'logo' || info.logoMode === 'both')" :src="info.logo" alt="Logo" class="app-logo">
        <b v-if="info.logoMode === 'text' || info.logoMode === 'both' || !info.logoMode" style="margin-left: 10px;">{{ info.name }}</b>
      </div>
    </v-app-bar-title>
    <Cart v-if="cartActive && getCartQuantity != 0"></Cart>
    <Language v-if="multilingualActive" />
  </v-app-bar>

  <v-app-bar :elevation="2" :color="info.primaryColor" v-if="!isMobile">
    <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
    <v-app-bar-title>
      <div class="d-flex align-center">
        <img v-if="info.logo && (info.logoMode === 'logo' || info.logoMode === 'both')" :src="info.logo" alt="Logo" class="app-logo">
        <b v-if="info.logoMode === 'text' || info.logoMode === 'both' || !info.logoMode" style="margin-left: 10px;">{{ info.name }}</b>
      </div>
    </v-app-bar-title>

    <div class="desktop-menu d-flex justify-center align-center" >
      <v-btn v-for="item in items" :key="item.path" variant="text" @click="link(item)">
        {{ item.title }}
      </v-btn>
      <Cart v-if="cartActive && getCartQuantity != 0"></Cart>
      <Language v-if="multilingualActive" />
    </div>

  </v-app-bar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useOrderStore } from '@/stores/order';
import { setupMobileUtils } from '@/utils/mobile';

import Cart from './Cart.vue';
import Language from '@/components/sections/Language.vue';
import { useLanguageStore } from '@/stores/language';

const { getText, getAncor } = useLanguageStore();
const orderStore = useOrderStore();

const drawer = ref(null);
const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const info = data.value.info;
const content = data.value.components;
const addOn = data.value.addOn;

const cartActive = addOn && addOn.includes('Shop');
const multilingualActive = addOn && addOn.includes('Multilingual') && info.locales.length > 1;
const isMobile = setupMobileUtils();

const link = (item) => {
  if (item.type === 'ancor') {
    const id = getAncor(item.path).toLowerCase();
    const target = document.getElementById(id);
    if (target) {
      const offset = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  } else if (item.type === 'externalLink') {
    window.open(item.path, '_blank');
  } else if (item.type === 'internalLink') {
    window.location.href = item.path;
  }
}

const items = computed(() => {
  let menuItems = [];
  if (addOn && addOn.includes('VirtualTour'))
    menuItems.push({
      title: 'Virtual Tour',
      path: 'https://test-virtual-tour.replit.app/',
      type: 'externalLink'
    });
  if (addOn && addOn.includes('Blog'))
    menuItems.push({
      title: 'Blog',
      path: '/blog',
      type: 'internalLink'
    });
  menuItems = menuItems.concat(content
    .filter(section => section.menu)
    .map(section => ({
      title: getText(section.menu),
      path: getAncor(section.menu).toLowerCase(),
      type: 'ancor'
    })));
  return info.menuHomeLink ? [{ title: 'Home', path: '/', type: 'internalLink' }, ...menuItems] : menuItems;
});

const getCartQuantity = computed(() => {
  return orderStore.products.reduce((total, product) => total + product.quantity, 0);
});
</script>

<style scoped>
.app-logo {
  height: 40px;
  max-width: 150px;
}
</style>
