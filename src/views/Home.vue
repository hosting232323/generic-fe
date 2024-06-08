<template>
  <component v-for="section in sections" :is="componentMap[section.type]" :id="section.menu ? section.menu.toLowerCase() : null" :content="section.content" :info="info" />
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useHead } from '@vueuse/head';
  import { useDataStore } from '@/stores/data';
  
  import Map from '@/components/sections/Map';
  import Gallery from '@/components/sections/Gallery';
  import Services from '@/components/sections/Services';
  import Contacts from '@/components/sections/Contacts';
  import Advantages from '@/components/sections/Advantages';
  import DualSection from '@/components/sections/DualSection';
  import Line from '@/components/sections/Line';
  import IconText from '@/components/sections/IconText';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const componentMap = {
    map: Map,
    gallery: Gallery,
    services: Services,
    advantages: Advantages,
    contacts: Contacts,
    dualSection: DualSection,
    line: Line,
    iconText: IconText
  };

  const sections = data.value.components;
  const info = data.value.info;

  useHead({
  title: "Macelleria Colasanto Luigi - Carne di Qualità a Molfetta | Consegna a Domicilio e Assistenza Speciale",
  meta: [
    {
      name: "description",
      content:
        "Macelleria Colasanto Luigi a Molfetta: carne bovina, suina, pollo e formaggi di alta qualità con servizio di consegna a domicilio. Tradizione e gusto dal 1960.",
    },
    {
      name: "keywords",
      content:
        "macelleria, carne bovina, carne suina, pollo, consegna a domicilio, Molfetta, tradizione, salumi, formaggi, servizio a domicilio, tagli speciali, assistenza culinaria, qualità, artigianato, prodotti freschi",
    },
    { name: "author", content: "Macelleria Colasanto Luigi" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "theme-color", content: "#D33F49" },
    { property: "og:title", content: "Macelleria Colasanto Luigi - Carne di Qualità a Molfetta | Consegna a Domicilio e Assistenza Speciale" },
    {
      property: "og:description",
      content:
        "Scopri la qualità della Macelleria Colasanto Luigi a Molfetta. Offriamo carne bovina, suina, pollo e salumi con un servizio eccellente e consegna a domicilio.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://macelleriacolasanto.it" },
    { property: "og:image", content: "https://macelleriacolasanto.it/advantages2.jpg" },
    { property: "og:locale", content: "it_IT" },
    { property: "og:site_name", content: "Macelleria Colasanto Luigi" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Macelleria Colasanto Luigi - Carne di Qualità a Molfetta | Consegna a Domicilio e Assistenza Speciale",
    },
    {
      name: "twitter:description",
      content:
        "Macelleria Colasanto Luigi: carne fresca e di alta qualità a Molfetta con consegna a domicilio. Scopri il nostro assortimento!",
    },
    { name: "twitter:image", content: "https://macelleriacolasanto.it/advantages2.jpg" },
    { name: "twitter:site", content: "@macelleriacolasanto" },
    { name: "geo.region", content: "IT-BA" }, // Codice della regione per Bari, Puglia
    { name: "geo.placename", content: "Molfetta" }, // Nome del luogo
    { name: "geo.position", content: "41.200482;16.598575" }, // Coordinate della posizione
    { name: "ICBM", content: "41.200482, 16.598575" }, // Obsoleto ma ancora utilizzato da alcuni servizi
    { name: "business:contact_data:street_address", content: "Piazza Principe di Napoli, 7" },
    { name: "business:contact_data:locality", content: "Molfetta" },
    { name: "business:contact_data:region", content: "BA" },
    { name: "business:contact_data:postal_code", content: "70056" },
    { name: "business:contact_data:country_name", content: "Italy" },
    { name: "business:contact_data:email", content: "macelleriacolasanto@libero.it" },
    { name: "business:contact_data:phone_number", content: "+39 080 397 4062" },
    { name: "business:contact_data:website", content: "https://macelleriacolasanto.it" }
  ]
});

</script>
