const { createApp } = Vue

createApp({
    data() {
        return {
            countryInfos: [],
            userInput: "",
            score: 0,
            gameOver: false
        }
    },
    methods: {
        randCountry() {
            axios.get("./countries.json").then(response => (this.countryInfos = response.data[Math.floor(Math.random() * 250)]))
        },
        seeAnswer() {
            this.gameOver = true
        },
        restart() {
            this.gameOver = false
            this.score = 0
            this.userInput = ""
            this.randCountry()
        }
    },
    computed: {
        flagURL: function () {
            return "https://flagcdn.com/" + `${this.countryInfos.alpha2}`.toLowerCase() + ".svg"
        },
        answer: function () {
            console.log(this.language)
            if (this.language == "ja") {
                return this.countryInfos.countryJA
            } else if (this.language == "en") {
                return this.countryInfos.countryEN
            } else {
                return this.countryInfos.countryJA
            }
        },
        language: function () {
            return document.head.querySelector('[name=language]').content
        }
    },
    mounted: function () {
        this.randCountry()
    },
    watch: {
        userInput: function (userInput) {
            if (userInput.toLowerCase() == this.answer.toLowerCase()) {
                this.userInput = ""
                this.score++
                this.randCountry()
            }
        }
    }
}).mount("#app")
