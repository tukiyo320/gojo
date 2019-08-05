<template>
    <b-form-select v-model="selected" size="sm">
        <option v-for="megami in megamis"
                :value="megami"
                :key="megami.value"
                :disabled="megami.isSelected">
            {{ megami.name }}
        </option>
    </b-form-select>
</template>

<script>
  import eventHub from '../eventHub'

  const megamiInfo = require('@/assets/megami_list.json');

  export default {
    name: "megamiSelector",

    props: {
      value: String,
      other: String
    },
    watch: {
      selected: function (val, oldVal) {
        this.onMegamiSelected(val, oldVal);
        this.$emit("input", val.value);
        eventHub.$emit("megamiChanged", val, oldVal);
      },
      other: function (val, oldVal) {
        this.onMegamiSelected(val, oldVal)
      }
    },
    data() {
      const megamis = megamiInfo.map(it => ({
        name: it.name,
        value: it.id,
        originName: it.origin_name,
        isSelected: it.id === this.value || it.id === this.other
      }));

      return {
        selected: megamis.find(it => it.value === this.value),
        megamis: megamis
      }
    },
    methods: {
      onMegamiSelected(after, before) {
        this.megamis.forEach(megami => {
          if (megami.value === after.value) {
            megami.isSelected = true
          }
          if (megami.value === before.value) {
            megami.isSelected = false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>