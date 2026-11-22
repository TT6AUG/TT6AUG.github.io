let credits = 0;

const coinBtn = document.getElementById("coinBtn");
const creditCount = document.getElementById("creditCount");

const canvas = document.getElementById("spaceGame");
const ctx = canvas.getContext("2d");

let player = {
    x: 370,
    y: 450,
    width: 60,
    height: 20
};

let bullets = [];
let enemies = [];
let score = 0;
let keys = {};

for (let i = 0; i < 8; i++) {
    enemies.push({
        x: 80 * i + 50,
        y: 50
    });
}

document.addEventListener("keydown", e => {
    keys[e.key] = true;

    if (e.code === "Space") {
        bullets.push({
            x: player.x + 28,
            y: player.y
        });
    }
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

function gameLoop() {

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if (keys["ArrowLeft"]) player.x -= 6;
    if (keys["ArrowRight"]) player.x += 6;

    ctx.fillStyle="#00ffff";
    ctx.fillRect(player.x,player.y,
        player.width,player.height);

    bullets.forEach((bullet,bIndex)=>{

        bullet.y -= 8;

        ctx.fillStyle="#ffff00";
        ctx.fillRect(
            bullet.x,
            bullet.y,
            4,
            12
        );

        enemies.forEach((enemy,eIndex)=>{

            if(
                bullet.x < enemy.x + 40 &&
                bullet.x > enemy.x &&
                bullet.y < enemy.y + 30 &&
                bullet.y > enemy.y
            ){
                enemies.splice(eIndex,1);
                bullets.splice(bIndex,1);
                score += 100;
            }
        });
    });

    enemies.forEach(enemy=>{
        enemy.y += 0.1;

        ctx.fillStyle="#ff00ff";
        ctx.fillRect(enemy.x,enemy.y,40,30);
    });

    ctx.fillStyle="white";
    ctx.font="20px Arial";
    ctx.fillText(
        "Score: "+score,
        20,
        30
    );

    requestAnimationFrame(gameLoop);
}

gameLoop();

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
