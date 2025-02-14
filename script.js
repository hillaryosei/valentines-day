/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password-input");
    const loginScreen = document.getElementById("login-screen");
    const letterScreen = document.getElementById("letter-screen");
    const errorPopup = document.getElementById("error-popup");
    const retryBtn = document.getElementById("retry-btn");
    const envelopeImage = document.getElementById("envelope-image");
    const letterContent = document.getElementById("letter-content");
    const doneReadingBtn = document.getElementById("done-reading-btn");
    const finishPopup = document.getElementById("finish-reading-popup");
    const restartBtn = document.getElementById("restart-btn");
    const bgMusic = document.getElementById("bg-music");
    const pingSound = document.getElementById("ping-sound");

document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bg-music");

    /* Try playing music immediately */
    function tryPlayMusic() {
        bgMusic.play().catch(() => {
            console.log("Autoplay blocked, waiting for user interaction...");
            document.addEventListener("click", playOnInteraction, { once: true });
            document.addEventListener("touchstart", playOnInteraction, { once: true });
        });
    }

    /* Play music on first user interaction */
    function playOnInteraction() {
        bgMusic.play().then(() => {
            console.log("Music playing after user interaction.");
        }).catch(err => console.log("Error playing music:", err));
    }

    tryPlayMusic();
});

    passwordInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const password = passwordInput.value;
            if (password === "2708" || password === "0827") {
                loginScreen.classList.add("hidden");
                letterScreen.classList.remove("hidden");
                pingSound.play();
            } else {
                passwordInput.classList.add("shake");
                errorPopup.classList.remove("hidden");
                setTimeout(() => passwordInput.classList.remove("shake"), 500);
            }
        }
    });

    retryBtn.addEventListener("click", () => {
        errorPopup.classList.add("hidden");
        passwordInput.value = "";
    });

    envelopeImage.addEventListener("click", () => {
        letterContent.classList.remove("hidden");
    });

    doneReadingBtn.addEventListener("click", () => {
        letterContent.classList.add("hidden");
        finishPopup.classList.remove("hidden");
    });

    restartBtn.addEventListener("click", () => {
        finishPopup.classList.add("hidden");
        letterScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");
        passwordInput.value = "";
    });

    /* Generate Floating Hearts */
    function createHearts() {
        const heartContainer = document.getElementById("heart-container");

        setInterval(() => {
            const heart = document.createElement("div");
            heart.classList.add("pixel-heart");
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${3 + Math.random() * 2}s`;
            heartContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, 300);
    }

    createHearts();
});
