// Particles.js configuration (inchangé)
particlesJS("particles-js", {
    particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#000" },
        shape: { type: "circle", stroke: { width: 2, color: "#fff" }, polygon: { nb_sides: 5 }, image: { src: "img/github.svg", width: 100, height: 100 } },
        opacity: { value: 0.08, random: true, anim: { enable: true, speed: 50, opacity_min: 0.8, sync: false } },
        size: { value: 1, random: true, anim: { enable: true, speed: 3, size_min: 0.1, sync: false } },
        line_linked: { enable: true, distance: 150, color: "#000", opacity: 0.4, width: 0 },
        move: { enable: true, speed: 1, direction: "random", random: true, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});

async function fetchCitation() {
    try {
        // Charger le fichier JSON localement
        const response = await fetch('citations.json');

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Réponse reçue :", data);

        const citations = data.data;

        if (citations && citations.length > 0) {
            const randomIndex = Math.floor(Math.random() * citations.length);
            const citation = citations[randomIndex];

            // Accès direct à "Texte" et "Auteur"
            const texte = citation?.Texte || "Texte manquant";
            const auteur = citation?.Auteur || "Auteur inconnu";
            
            // Sélectionner l'élément contenant la popup
            const popupContainer = document.querySelector('.popup-container');
            const popup = document.querySelector('.popup');

            // Étape 1 : Appliquer la classe "disappear" pour faire disparaître la popup en douceur
            popup.classList.add('disappear');

            // Étape 2 : Attendre la fin de la transition (0.8s) avant de changer le texte
            setTimeout(() => {
                // Mettre à jour le texte de la citation et l'auteur séparément
                document.getElementById('citation-texte').innerText = `${texte}`;
                document.getElementById('citation-auteur').innerText = `- ${auteur}`;
                
                // Étape 3 : Retirer la classe "disappear" et appliquer "appear" pour réafficher la popup avec animation
                popup.classList.remove('disappear');
                popup.classList.add('appear');
            }, 800); // Temps correspondant à la durée de la transition CSS (0.8s)
        } else {
            document.getElementById('citation-texte').innerText = "Aucune citation disponible.";
            document.getElementById('citation-auteur').innerText = "";
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des citations :', error);
        document.getElementById('citation-texte').innerText = "Impossible de charger les citations.";
        document.getElementById('citation-auteur').innerText = "";
    }
}

// Appel initial et répétition toutes les 10 secondes
fetchCitation();
setInterval(fetchCitation, 10000);

// Optional: Stats.js config si nécessaire pour les performances (facultatif)
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
var update = function () {
    stats.begin();
    stats.end();
    requestAnimationFrame(update);
};
requestAnimationFrame(update);