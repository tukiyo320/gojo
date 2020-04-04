<template>
    <div class="container-cards">
        <div ref="capture">
            <draggable
                    :group="normalOptions"
                    v-model="normals">
                <drop :key="card.no"
                      @drop="onDrop($event, index, normals, `normal`)"
                      class="item"
                      v-for="(card, index) in normals">
                    <img :src="card.src" class="listed_card">
                </drop>
            </draggable>
            <draggable
                    :group="specialOptions"
                    v-model="specials">
                <drop :key="card.no"
                      @drop="onDrop($event, index, specials, `special`)"
                      class="item"
                      v-for="(card, index) in specials">
                    <img :src="card.src" class="listed_card">
                </drop>
            </draggable>
        </div>
    </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import eventHub from '../eventHub'
  import html2canvas from 'html2canvas'
  import firebase from 'firebase'
  import crypto from 'crypto'

  const firebaseConfig = require('../../firebase.config');

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
      eventHub.$on('megamiChanged', this.onMegamiChanged);
      eventHub.$on('storeDeck', this.toImage);
      firebase.initializeApp(firebaseConfig)
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
    computed: {
      uuid() {
        const text = this.normals.map((it) => it.no).toString() + this.specials.map(it => it.no).toString();
        return crypto.createHash('sha1').update(text).digest('hex')
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
      },
      toImage() {
        const uuid = this.uuid;
        const filename = `${uuid}.jpg`;
        const option = {
          height: 600,
          scale: 1200 / this.$refs.capture.clientWidth
        };

        html2canvas(this.$refs.capture, option).then(canvas => {
          const sRef = firebase.storage().ref();
          const fileRef = sRef.child(filename);

          return fileRef.putString(canvas.toDataURL('image/jpeg'), 'data_url')
        }).then(() => {
          const deck = firebase.firestore().collection('decks').doc(uuid);
          return deck.set({
            normals: this.normals,
            specials: this.specials
          }, {merge: false})
        }).then(() => {
          eventHub.$emit('onSaveCompleted', uuid)
        }).catch((error) => {
          eventHub.$emit('onSaveCompleted', null);
          alert(`画像の保存に失敗しました`);
          console.log(error)
        })
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