let credits = 0;

const coinBtn = document.getElementById("coinBtn");
const creditCount = document.getElementById("creditCount");

coinBtn.addEventListener("click", () => {
    credits++;

    creditCount.textContent = credits;

    coinBtn.textContent = "COIN INSERTED!";

    setTimeout(() => {
        coinBtn.textContent = "INSERT COIN";
    }, 600);

    flashScreen();
});

function flashScreen() {
    document.body.animate(
        [
            { filter: "brightness(1)" },
            { filter: "brightness(1.4)" },
            { filter: "brightness(1)" }
        ],
        {
            duration: 250
        }
    );
}
