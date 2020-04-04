<template>
    <div class="container-cards" ref="capture">
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
  import html2canvas from 'html2canvas'
  import firebase from 'firebase'
  import crypto from 'crypto'

  const firebaseConfig = {
    apiKey: "AIzaSyDalM_-xpT3Pj2f697TlgAa6PQwKPSIL10",
    authDomain: "gojo-b7add.firebaseapp.com",
    databaseURL: "https://gojo-b7add.firebaseio.com",
    projectId: "gojo-b7add",
    storageBucket: "gojo-b7add.appspot.com",
    messagingSenderId: "203667529337",
    appId: "1:203667529337:web:8f07a968be5a4efd14bea8"
  };

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
        const text = this.normals.toString() + this.specials.toString();
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
        const filename = `${uuid}.png`;
        html2canvas(this.$refs.capture).then(canvas => {
          const sRef = firebase.storage().ref();
          const fileRef = sRef.child(filename);

          return fileRef.putString(canvas.toDataURL(), 'data_url')
        }).then(() => {
          const deck = firebase.firestore().collection('decks').doc(uuid);
          return deck.set({
            normals: this.normals,
            specials: this.specials
          }, { merge: false })
        }).then(() => {
          alert('構築を保存しました')
        }).catch((error) => {
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