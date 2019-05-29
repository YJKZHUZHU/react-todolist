const PlayerAPI = {
  players: [
    { number: 1, name: "叶俊宽", position: "1" },
    { number: 2, name: "ES6", position: "2" },
    { number: 3, name: "Jquery", position: "3" },
    { number: 4, name: "React", position: "4" },
    { number: 5, name: "Vue", position: "5" },
    { number: 6, name: "Javascript", position: "6" }
  ],
  all: function() {
    return this.players
  },
  get: function(id) {
    const isPlayer = p => p.number === id
    return this.players.find(isPlayer)
  }
}
export default PlayerAPI