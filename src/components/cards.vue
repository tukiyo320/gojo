<template>
    <div class="container-cards">
        <div class="cards">
            <drag v-for="card in normals"
                  class="item"
                  :key="card.no"
                  :transfer-data="{ card }">
                <img class="listed_card" :src="card.src">
            </drag>
        </div>
        <div class="cards">
            <drag v-for="card in specials"
                  class="item"
                  :transfer-data="{ card }"
                  :key="card.no">
                <img class="listed_card" :src="card.src">
            </drag>
        </div>
    </div>
</template>

<script>

  export default {
    name: "cards",

    props: {
      name: String
    },
    data() {
      const [normals, specials] = this.loadCards(this.name);

      return {
        normals: normals,
        specials: specials
      }
    },
    watch: {
      name: function (newVal) {
        const [normals, specials] = this.loadCards(newVal);
        this.normals = normals;
        this.specials = specials;
      }
    },
    methods: {
      loadCards(id) {
        const meta = require(`@/assets/megami/${id}.json`);

        const normals = meta.cards.normal.map(it => ({
          no: it.id,
          originName: meta.origin_name,
          ownerMegamiId: it.owner,
          megamiId: id,
          src: require(`@/assets/cards/${it.id}.png`),
          type: "normal"
        }));
        const specials = meta.cards.special.map(it => ({
          no: it.id,
          origin_name: meta.origin_name,
          ownerMegamiId: it.owner,
          megamiId: id,
          src: require(`@/assets/cards/${it.id}.png`),
          type: "special"
        }));

        return [normals, specials]
      }
    }
  }
</script>

<style scoped>
    .cards {
        display: inline-block;
    }

    .item {
        display: inline-block;
    }

    .item:hover {
        cursor: grab;
    }

    .item:active {
        cursor: grabbing;
    }

    img.listed_card {
        max-width: 150px;
        flex: 0 0 auto;
    }

    .container-cards {

    }
</style>