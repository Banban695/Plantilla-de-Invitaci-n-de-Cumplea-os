/* ------------------------------------------------------
   VARIABLES PRINCIPALES
------------------------------------------------------ */
const portada = document.getElementById("portada");
const invitacion = document.getElementById("invitacion");
const entrarBtn = document.getElementById("entrarBtn");

const copyLinkBtn = document.getElementById("copyLinkBtn");

const music = document.getElementById("bgMusic");

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

const btnMusic = document.getElementById("musicToggle");
let isPlaying = false;



/* ------------------------------------------------------
   1. ENTRAR (transición elegante)
------------------------------------------------------ */
entrarBtn.addEventListener("click", () => {
    portada.style.opacity = "0";
    portada.style.transition = "opacity 1s ease";

    setTimeout(() => {
        portada.style.display = "none";
        invitacion.classList.remove("oculto");
        window.scrollTo(0, 0);

        // Intentar reproducir música
        music.play().then(() => {
            isPlaying = true;
            btnMusic.classList.remove("off");
        }).catch(() => { /* Autoplay bloqueado */ });

    }, 900);
});



/* ------------------------------------------------------
   2. COPIAR LINK
------------------------------------------------------ */
copyLinkBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Enlace copiado ✔"))
        .catch(() => alert("Error al copiar el enlace"));
});



/* ------------------------------------------------------
   3. MODAL DE IMÁGENES
------------------------------------------------------ */
/* 
   Se corrige: ahora selecciona TODAS las imágenes del swiper,
   ya que no tienen clase .gal-img.
*/
document.querySelectorAll(".swiper-slide img").forEach(img => {
    img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.classList.remove("oculto");
    });
});

closeModal.addEventListener("click", () => modal.classList.add("oculto"));

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("oculto");
});



/* ------------------------------------------------------
   CUENTA REGRESIVA
------------------------------------------------------ */
function iniciarCuentaRegresiva() {
    // Cambia aquí la fecha de tu evento
    const fechaEvento = new Date("December 14, 2026 19:00:00").getTime();

    const intervalo = setInterval(() => {
        const ahora = Date.now();
        const diferencia = fechaEvento - ahora;

        if (diferencia <= 0) {
            clearInterval(intervalo);
            const container = document.getElementById("countdownContainer");
            if (container) {
                container.innerHTML = `
                    <p class="subtitulo-destacado">¡El gran día ha llegado! 🎉</p>
                `;
            }
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");
        const elSegundos = document.getElementById("segundos");

        if (elDias) elDias.textContent = dias.toString().padStart(2, "0");
        if (elHoras) elHoras.textContent = horas.toString().padStart(2, "0");
        if (elMinutos) elMinutos.textContent = minutos.toString().padStart(2, "0");
        if (elSegundos) elSegundos.textContent = segundos.toString().padStart(2, "0");
    }, 1000);
}

// Iniciar contador
iniciarCuentaRegresiva();



/* ------------------------------------------------------
   5. GALERÍA SWIPER (1 sola instancia)
------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Swiper === "undefined") {
        console.error("Swiper no encontrado.");
        return;
    }

    new Swiper(".galeria-swiper", {
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 20,
        speed: 600,

        navigation: {
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });
});



/* ------------------------------------------------------
   6. BOTÓN DE MÚSICA
------------------------------------------------------ */
btnMusic.classList.add("off"); // empieza apagado

btnMusic.addEventListener("click", () => {
    if (music.paused) {
        music.play().then(() => {
            isPlaying = true;
            btnMusic.classList.remove("off");
        });
    } else {
        music.pause();
        isPlaying = false;
        btnMusic.classList.add("off");
    }
});


