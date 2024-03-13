// Faire QCM pour deviner des capitales

// 1) On veut afficher aléatoirement le nom du pays + drapeau
// 2) En dessous on veut un input pour insérer le nom de la capitale
// 3) On veut un bouton pour valider
// 4) On veut afficher si la réponse est bonne ou pas
// 5) Une fois validé on veut aussi un bouton qui nous emmène à la question suivante

// Comptabiliser les points et stopper au bout de 10 questions

// Choisir aléatoirement le pays en passant par son code pays

key = "9hN7c0pptKhpSNFXJlcRovXtWHmwcqVFF67kBEil"

const url = `https://countryapi.io/api/all?apikey=${key}`

let countries = []
let currentCountry = {}
let currentQuestion = 0
let score = 0

const input = document.querySelector("input")
const validation = document.querySelector("button")
const pays = document.querySelector(".pays")
const flag = document.querySelector(".flag")
const scoreTotal = document.querySelector(".scoreTotal")

axios.get(url)
    .then(response => response.data)
    .then(data => {
        const countries = Object.keys(data);
        let currentQuestion = 0;
        let score = 0;

        function displayQuestion() {
            const randomIndex = Math.floor(Math.random() * countries.length);
            const randomCode = countries[randomIndex];
            const randomCountry = data[randomCode];

            pays.innerHTML = randomCountry.name;
            flag.src = randomCountry.flag.medium;
            currentCountry = randomCountry;

            validation.addEventListener("click", () => {
                const answer = input.value;
                if (answer === currentCountry.capital) {
                    const verdict = document.createElement("p")
                    verdict.textContent = "Bonne réponse"
                    document.body.appendChild(verdict)

                    score++;
                    scoreTotal.innerHTML = `Tu as ${score} /10`
                } else {
                    const verdict = document.createElement("p")
                    verdict.textContent = `Mauvaise réponse, la capitale est ${currentCountry.capital}`
                    document.body.appendChild(verdict)
                }

                input.value = ""
                currentQuestion++

             
            });
        }

        if (currentQuestion < 10) {
            displayQuestion();
        } else {
            const endMessage = document.createElement("p");
            endMessage.textContent = "Fin du jeu";
            document.body.appendChild(endMessage);
        }
    });
       
    





