<template>
    <div id="app">
        <b-navbar variant="primary" type="dark">
            <b-navbar-brand href="#">双掌撩乱＆眼前構築シミュレーター</b-navbar-brand>

            <b-navbar-nav>
                <b-nav-item @click="$bvModal.show('about')">about</b-nav-item>
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
                ライセンス
            </p>
            <p>
                画像：ふるよにコモンズ/BakaFire,TOKIAME<br>
                <a href="https://main-bakafire.ssl-lolipop.jp/furuyoni/na/rule.html" target="_blank">https://main-bakafire.ssl-lolipop.jp/furuyoni/na/rule.html</a>
            </p>
        </b-modal>
    </div>
</template>

<script>
  import Deck from './components/deck.vue'
  import CardList from './components/cardList.vue'

  export default {
    name: 'app',
    components: {
      Deck: Deck,
      CardList: CardList
    },
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
