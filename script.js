document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours...";
    
    try {
      // Envoi via FormSubmit avec mode no-cors
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        mode: "no-cors" // ← Ajout crucial
      });
      
      // Avec no-cors, on ne peut pas vérifier response.ok
      // On suppose que ça a marché si pas d'erreur
      submitBtn.textContent = "✅ Envoyé";
      showMessage("Merci ! Votre message a bien été envoyé.", "success");
      form.reset();
      
    } catch (error) {
      showMessage("❌ Une erreur est survenue. Réessayez plus tard.", "error");
      console.error(error);
      submitBtn.textContent = "Envoyer";
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer";
      }, 2000);
    }
  });
  
  // Fonction d'affichage du message visuel
  function showMessage(text, type) {
    const msg = document.createElement("div");
    msg.textContent = text;
    msg.className = `form-message ${type}`;
    form.appendChild(msg);
    
    // Animation + disparition douce
    setTimeout(() => {
      msg.classList.add("fade");
      setTimeout(() => msg.remove(), 1000);
    }, 3000);
  }
});