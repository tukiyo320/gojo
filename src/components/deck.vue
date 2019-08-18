<template>
    <div class="container-cards">
        <draggable
                v-model="normals"
                :group="normalOptions">
                <drop v-for="(card, index) in normals"
                     class="item"
                     :key="card.no"
                    @drop="onDrop($event, index, normals, `normal`)">
                    <img class="listed_card" :src="card.src">
                </drop>
        </draggable>
        <draggable
                v-model="specials"
                :group="specialOptions">
            <drop v-for="(card, index) in specials"
                  class="item"
                  :key="card.no"
                @drop="onDrop($event, index, specials, `special`)">
                <img class="listed_card" :src="card.src">
            </drop>
        </draggable>
    </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import eventHub from '../eventHub'

  const normalEmptyCard = {
    cardNo: "",
    megamiId: "",
    originName: "",
    src: require(`@/assets/cards/cardback_normal.webp`),
  };
  const specialEmptyCard = {
    cardNo: "",
    megamiId: "",
    originName: "",
    src: require(`@/assets/cards/cardback_special.webp`),
  };

  export default {
    name: "deck",

    components: {draggable},

    mounted: function () {
      eventHub.$on('megamiChanged', this.onMegamiChanged)
    },
    data() {
      const normals = Array(7).fill(normalEmptyCard);
      const specials = Array(3).fill(specialEmptyCard);

      return {
        normalOptions: {
          name: 'deck-normals',
          animation: 200,
          put: false,
          pull: false
        },
        specialOptions: {
          name: 'deck-specials',
          animation: 200,
          put: false,
          pull: false
        },
        normals: normals,
        specials: specials
      }
    },
    methods: {
      onMegamiChanged(val, oldVal) {
        this.normals.forEach((normal, index) => {
          if (normal.ownerMegamiId === oldVal.value) {
            this.normals.splice(index, 1, normalEmptyCard)
          }
        });
        this.specials.forEach((special, index) => {
          if (special.ownerMegamiId === oldVal.value) {
            this.specials.splice(index, 1, specialEmptyCard)
          }
        })
      },
      onDrop(data, index, list, type) {
        if (data && data.card.type === type) {
            list.splice(index, 1, data.card)
        }
      }
    }
  }
</script>

<style scoped>
    .item {
        display: inline-flex;
    }

    .item:hover {
        cursor: grab;
    }

    .item:active {
        cursor: grabbing;
    }

    img.listed_card {
        max-width: 200px;
        flex: 0 0 auto;
    }

    .container-cards {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>