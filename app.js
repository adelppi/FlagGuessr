const { createApp } = Vue

createApp({
    data() {
        return {
            countryInfos: [],
            userInput: ""
        }
    },
    methods: {
        randCountry() {
            axios.get("./countries.json").then(response => (this.countryInfos = response.data[Math.floor(Math.random() * 250)]))
        }
    },
    computed: {
        flagURL: function() {
            return "https://flagcdn.com/" + `${this.countryInfos.alpha2}`.toLowerCase() + ".svg"
        },
        answer: function() {
            return this.countryInfos.countryJA
        }
    },
    mounted: function() {
        this.randCountry()
    },
    watch: {
        userInput: function(userInput) {
            if(userInput == this.answer){
                this.userInput = ""
                this.randCountry()
            }
        }
    }
}).mount("#app")
