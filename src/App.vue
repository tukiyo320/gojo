<template>
    <div id="app">
        <ribbon text="fork me on github!!" url="https://github.com/TukiyoIgarashi/gojo" ></ribbon>
        <b-navbar variant="primary" type="dark">
            <b-navbar-brand href="#">双掌撩乱＆眼前構築シミュレーター</b-navbar-brand>

            <b-navbar-nav>
                <b-nav-item @click="$bvModal.show('about')">about</b-nav-item>
                <b-nav-item>
                    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a>
                </b-nav-item>
                <b-nav-item>
                    <b-button @click="onStoreClicked">
                        保存する
                    </b-button>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <div>
            <section id="deck">
                <Deck></Deck>
            </section>
            <section id="card-list">
                <CardList></CardList>
            </section>
        </div>
        <b-modal id="about" title="このサイトについて" ok-only>
            <p>
                Author<br>
                <a href="https://twitter.com/tukiyo320">@tukiyo320</a>
            </p>
            <p>
                ライセンス<br>
                <br>
                画像：ふるよにコモンズ/BakaFire,TOKIAME<br>
                <a href="https://main-bakafire.ssl-lolipop.jp/furuyoni/na/rule.html" target="_blank">https://main-bakafire.ssl-lolipop.jp/furuyoni/na/rule.html</a>
            </p>
        </b-modal>
    </div>
</template>

<script>
  import Deck from './components/deck.vue'
  import CardList from './components/cardList.vue'
  import Ribbon from 'vue-ribbon'
  import eventHub from './eventHub'

  export default {
    name: 'app',
    components: {
      Deck: Deck,
      CardList: CardList,
      Ribbon: Ribbon
    },
    methods: {
      onStoreClicked() {
        eventHub.$emit("storeDeck")
      }
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        height: 100%;
    }

    #card-list {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 20px 20px 0;
    }

    #deck {
        width: 98%;
        margin: 20px auto;
    }

    #about {
        text-align: center;
    }
</style>
