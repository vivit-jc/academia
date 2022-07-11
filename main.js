const app = {
  el: '#app',

  data() {
    return {
      viewStatus: "game",
      gameStatus: "make_potion",
      onMaterial: "",
      onCommand: "",
      onNote: "",
      commands: ["調合","外出","ノート","論文","素材","薬棚・使い魔","ヘルプ"],
      cauldron: [],
      materials: [
        //f,t,e,w,s,d
        {name: "キノコ",src: "mushroom", known: "?", num: 4, ele: ["t","w"]},
        {name: "カエル",src: "frog", known: "?", num: 4, ele: ["f","d"]},
        {name: "枝",src: "branches", known: "?", num: 4, ele: ["e","f"]},
        {name: "葉っぱ",src: "leaves", known: "?", num: 4, ele: ["e","s"]},
        {name: "ミミズ",src: "worm", known: "?", num: 5, ele: ["e","d"]},
        {name: "ベリー",src: "berries", known: "?", num: 5, ele: ["e","d"]}

      ],
      notes: [
        {materials:["キノコ","カエル"]},
        {materials:["キノコ","枝"]},
        {materials:["キノコ","ミミズ"]},
        {materials:["ベリー","カエル"]}
      ],
      msg: [],
      noteMsg: []
    }
  },

  computed: {
    search_notes(){
      return this.notes.filter(n => {
        let c = this.get_cauldron_mat_name;
        if(!c) return false;
        return c.join() === n.materials.sort().join();
      }).length > 0
    },
    get_cauldron_mat_name(){
      if(this.cauldron.length != 2) return false;
      return [this.cauldron[0].name, this.cauldron[1].name].sort();
    }
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
    clickCommand(c){
      this.cauldron = []
      this.msg = []
      if(c === "調合"){
        this.gameStatus = "make_potion"
        this.msg = ["調合中・・・"]
      } else if(c === "ノート"){
        this.gameStatus = "notes"
        this.msg = ["見直すノートを選んでください"]
      }

    },
    clickNote(note){
      this.noteMsg = this.show_report(this.calc_potion(note.materials))
    },
    clickMaterialCommand(m) {
      if(!this.settable(m)){return false}
      this.cauldron.push(m)
    },
    deleteCauldron(m){
      this.cauldron = this.cauldron.filter(e => e!=m)
    },
    make_potion(){
      this.cauldron.forEach(e => {e.num -= 1})
      let potion = this.calc_potion([this.cauldron[0].name,this.cauldron[1].name])
      this.msg = this.show_report(potion)
      if(!this.search_notes) {
        this.add_note();
        this.msg.push("結果をノートに書き残した")
      }
      this.cauldron = []
    },
    calc_potion(mats){
      let elements = [].concat(this.get_ele_from_name(mats[0]),this.get_ele_from_name(mats[1]))
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
    add_note(){
      this.notes.push({
        materials: this.get_cauldron_mat_name
      })
    },
    show_report(result){
      let mal = result.join().replace(/,/g,"").length
      let crystall = false
      let same = false
      let msg = []
      if(result.length == 1 && result.filter(e => e.length == 2).length == 1){
        crystall = true;
      } else if(result.filter(e => e.length == 2).length == 2){
        same = true
      }
      msg = [result.join(),`魔力量: ${mal}mal`]
      if(crystall) msg.push("結晶が析出した")
      if(same) msg.push("反応は起きなかった")

      return msg;
    },
    settable(m) {
      if(this.cauldron.length === 1 && this.cauldron[0] === m){return false}
      if(this.cauldron.length === 2){return false}
      return true
    },
    get_ele_from_name(name){
      return this.materials.filter(e => e.name === name)[0].ele
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
    get_m_from_name(name){
      return this.materials.filter(m => m.name === name)[0]
    }
  }
}

Vue.createApp(app).mount('#app')
