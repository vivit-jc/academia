const app = {
  el: '#app',

  data() {
    return {
      viewStatus: "game",
      onMaterial: "",
      onCommand: "",
      commands: ["調合","外出","ノート","論文","素材","薬棚・使い魔","ヘルプ"],
      cauldron: [],
      materials: [
        //f,t,e,w,s,d
        {name: "キノコ",src: "mushroom", known: "?", num: 2, ele: ["t","w"]},
        {name: "カエル",src: "frog", known: "?", num: 4, ele: ["f","d"]},
        {name: "枝",src: "branches", known: "?", num: 1, ele: ["e","f"]},
        {name: "葉っぱ",src: "leaves", known: "?", num: 3, ele: ["e","s"]},
        {name: "ミミズ",src: "worm", known: "?", num: 5, ele: ["e","d"]}
      ],
      notes: [],
      msg: "調合中・・・"
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
    clickMaterialCommand(m) {
      if(!this.settable(m)){return false}
      this.cauldron.push(m)
    },
    deleteCauldron(m){
      this.cauldron = this.cauldron.filter(e => e!=m)
    },
    make_potion(){
      this.cauldron.forEach(e => {e.num -= 1})
      let potion = this.calc_potion()
      this.msg = potion.join("-")
      this.cauldron = []
    },
    calc_potion(){
      let elements = [].concat(this.cauldron[0].ele,this.cauldron[1].ele)
      let atoms = ["f","t","e","w","s","d"]
      let pairs = [["f","t"],["e","w"],["s","d"]]
      let result = elements.sort()
      
      // 対消滅
      pairs.forEach(pair => {
        if(elements.includes(pair[0]) && elements.includes(pair[1])){
          result = result.filter(e => {
            return (e != pair[0] && e != pair[1])
          })
        }
      })

      // 結晶化
      atoms.forEach(a => {
        if(result.filter(e => e==a).length == 2){
          result = result.filter(e => e!=a)
          result.push(a+a)
        }
      })

      return result
    },
    settable(m) {
      if(this.cauldron.length === 1 && this.cauldron[0] === m){return false}
      if(this.cauldron.length === 2){return false}
      return true
    },

    handleResize() {
      if (window.innerWidth <= 1000) {
          this.small = true
      } else {
          this.small = false
      }
    },
    initGame() {

    },
    ele_j(e) {
      return e[0]+"-"+e[1]
    },
    mat_img(m) {
      return "img/"+m.src+".png"
    },
  }
}

Vue.createApp(app).mount('#app')
