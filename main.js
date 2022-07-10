const app = {
  el: '#app',

  data() {
    return {
      viewStatus: "game",
      onMaterial: "",
      commands: ["調合","外出","ノート","論文","素材","薬棚・使い魔","ヘルプ"],
      materials: [
        {name: "キノコ",src: "mushroom", known: "?", num: 2},
        {name: "カエル",src: "frog", known: "?", num: 4},
        {name: "枝",src: "branches", known: "水-風?", num: 1},
        {name: "葉っぱ",src: "leaves", known: "土-光", num: 3}],
      msg: "調合する素材を選んでください。"
    }
  },

  computed: {
  },

  watch: {
  },

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    console.log("錬金術アカデミーのやつ ver 0.01")
    this.initGame()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      if (window.innerWidth <= 1000) {
          this.small = true
      } else {
          this.small = false
      }
    },
    initGame() {

    },
    mat_img(src) {
      return "img/"+src+".png"
    },
  }
}

Vue.createApp(app).mount('#app')
