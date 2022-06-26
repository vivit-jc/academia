const app = {
  el: '#app',

  data() {
    return {
      viewStatus: "game",
      commands: ["a","b","c","d"]
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

    }
  }
}

Vue.createApp(app).mount('#app')
