<template>
    <div>
        <div class="selectors">
            <megami-selector v-model="megamiLeft" :other="megamiRight"></megami-selector>
            <megami-selector v-model="megamiRight" :other="megamiLeft"></megami-selector>
        </div>
        <b-container fluid>
            <b-row>
                <b-col class="card-container">
                    <card class="item" :name="megamiLeft"></card>
                </b-col>
                <b-col class="card-container">
                    <card class="item" :name="megamiRight"></card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import card from './cards'
  import megamiSelector from './megamiSelector'

  export default {
    name: "cardList",
    components: {
      card: card,
      megamiSelector: megamiSelector
    },
    data() {
      return {
        megamiLeft: "01_yurina",
        megamiRight: "06_yukihi"
      }
    }
  }
</script>

<style scoped>
    .selectors {
        display: flex;
        margin: 10px 0;
    }

    .card-container {
        width: 48%;
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        padding-left: 10px;
        padding-right: 10px;
    }
</style>