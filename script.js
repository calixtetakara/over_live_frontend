// ⚠️ Remplacer par l'URL Render obtenue à l'étape A.5
const API_URL = "https://over-live.onrender.com";

async function chargerMessages() {
  try {
    const reponse = await fetch(API_URL + "/messages");
    const messages = await reponse.json();
    
    const liste = document.getElementById("liste-messages");
    liste.innerHTML = ""; // Vider la liste avant de recharger
    
    messages.forEach(msg => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${msg.nom}</strong> : ${msg.texte}`;
      liste.appendChild(li);
    });
  } catch (error) {
    console.error("Erreur lors du chargement:", error);
  }
}

// Écouter la soumission du formulaire
document.getElementById("formulaire").addEventListener("submit", async (e) => {
  e.preventDefault(); // Empêcher le rechargement de la page
  
  const nom = document.getElementById("nom").value;
  const texte = document.getElementById("texte").value;

  await fetch(API_URL + "/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, texte })
  });

  // Réinitialiser le formulaire et recharger la liste
  document.getElementById("formulaire").reset();
  chargerMessages();
});

// Charger les messages au démarrage
chargerMessages();