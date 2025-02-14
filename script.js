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
            bgMusic.volume = 0; // Start muted
            bgMusic.play().then(() => {
                console.log("Music started successfully!");
                fadeInMusic();
            }).catch(() => {
                console.log("Autoplay blocked. Waiting for user interaction...");
                document.addEventListener("click", playOnInteraction, { once: true });
                document.addEventListener("touchstart", playOnInteraction, { once: true });
            });
        }

        /* Fade in music gradually */
        function fadeInMusic() {
            let volume = 0;
            bgMusic.muted = false; // Unmute
            const fadeInterval = setInterval(() => {
                if (volume < 1) {
                    volume += 0.1;
                    bgMusic.volume = volume.toFixed(1);
                } else {
                    clearInterval(fadeInterval);
                }
            }, 300); // Increases volume every 300ms
        }

        /* Play music if user interacts */
        function playOnInteraction() {
            bgMusic.muted = false;
            bgMusic.play().then(() => {
                console.log("Music playing after user interaction.");
                fadeInMusic();
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
