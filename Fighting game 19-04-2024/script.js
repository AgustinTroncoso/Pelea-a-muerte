document.addEventListener("DOMContentLoaded", function () {
  const imagen1 = document.getElementById("jorge");
  let posX1 = 0;
  let posY1 = 300;
  let direccionX1 = 0;
  let direccionY1 = 0;

  const imagen2 = document.getElementById("juan");
  let posX2 = 1000;
  let posY2 = 300;
  let direccionX2 = 0;
  let direccionY2 = 0;

  const paso = 10; // Tamaño del paso de movimiento
  const limiteMinX = 0;
  const limiteMaxX = container.clientWidth - imagen1.offsetWidth;
  const limiteMinY = 0;
  const limiteMaxY = container.clientHeight - imagen1.offsetHeight;

  // Función para mover las imágenes
  function moverImagenes() {
    // Mover la primera imagen
    let nuevaPosX1 = posX1 + direccionX1 * paso;
    let nuevaPosY1 = posY1 + direccionY1 * paso;

    // Verificar límites horizontales para la primera imagen
    if (nuevaPosX1 < limiteMinX) {
      nuevaPosX1 = limiteMinX;
    } else if (nuevaPosX1 > limiteMaxX) {
      nuevaPosX1 = limiteMaxX;
    }

    // Verificar límites verticales para la primera imagen
    if (nuevaPosY1 < limiteMinY) {
      nuevaPosY1 = limiteMinY;
    } else if (nuevaPosY1 > limiteMaxY) {
      nuevaPosY1 = limiteMaxY;
    }

    posX1 = nuevaPosX1;
    posY1 = nuevaPosY1;

    imagen1.style.left = posX1 + "px";
    imagen1.style.top = posY1 + "px";

    // Mover la segunda imagen
    let nuevaPosX2 = posX2 + direccionX2 * paso;
    let nuevaPosY2 = posY2 + direccionY2 * paso;

    // Verificar límites horizontales para la segunda imagen
    if (nuevaPosX2 < limiteMinX) {
      nuevaPosX2 = limiteMinX;
    } else if (nuevaPosX2 > limiteMaxX) {
      nuevaPosX2 = limiteMaxX;
    }

    // Verificar límites verticales para la segunda imagen
    if (nuevaPosY2 < limiteMinY) {
      nuevaPosY2 = limiteMinY;
    } else if (nuevaPosY2 > limiteMaxY) {
      nuevaPosY2 = limiteMaxY;
    }

    posX2 = nuevaPosX2;
    posY2 = nuevaPosY2;

    imagen2.style.left = posX2 + "px";
    imagen2.style.top = posY2 + "px";
  }

  // Detectar las teclas presionadas
  document.addEventListener("keydown", function (event) {
    const tecla = event.key.toLowerCase();
    switch (tecla) {
      case "w":
        direccionY1 = -1; // Arriba para la primera imagen
        break;
      case "a":
        direccionX1 = -1; // Izquierda para la primera imagen
        break;
      case "s":
        direccionY1 = 1; // Abajo para la primera imagen
        break;
      case "d":
        direccionX1 = 1; // Derecha para la primera imagen
        break;
      case "i":
        direccionY2 = -1; // Arriba para la segunda imagen
        break;
      case "j":
        direccionX2 = -1; // Izquierda para la segunda imagen
        break;
      case "k":
        direccionY2 = 1; // Abajo para la segunda imagen
        break;
      case "l":
        direccionX2 = 1; // Derecha para la segunda imagen
        break;
      default:
        break;
    }
  });



  // Actualizar la posición de las imágenes en intervalos regulares
  setInterval(moverImagenes, 50);
  class Character {
    constructor(name, health, damage) {
      //Atributos
      this.name = name;
      this.health = health;
      this.maxhealth = health;
      this.damage = damage;
    }
    //Verifica si el personaje esta vivo
    isAlive() {
      return this.health > 0;
    }

    //Ataca a otro personaje seleccionado
    attack(target) {
      var attack;
      var numeroAleatorio = Math.floor(Math.random() * 100);
      if (90 > numeroAleatorio) {
        attack = this.damage * 2;
      } else {
        attack = this.damage;
      }

      console.log(`${this.name} deals ${attack} DMG to ${target.name}`);
      target.health -= attack;
    }

    //Retorna la información actual del personaje
    status() {
      return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }
  }
  //Creación de personajes
  const hero = new Character(
    "Heroe",
    Math.floor(Math.random() * 100) + 1,
    Math.floor(Math.random() * 10) + 5
  );
  const enemy = new Character(
    "enemy",
    Math.floor(Math.random() * 100) + 1,
    Math.floor(Math.random() * 10) + 5
  );

  alert(
    "Pelea a muerte con cuchillos " +
      "\n Hp del heroe: " +
      hero.health +
      " \nHp del enemigo: " +
      enemy.health
  );
  fight(hero, enemy);
  //Función para combatir
  async function fight(firstCharacter, secondCharacter) {
    console.log("Empieza el combate!");
    updateHealthBars();
    while (true) {
      if (firstCharacter.isAlive()) {
        await delay(1000); // Delay for 1 second
        updateHealthBars();
      } else {
        console.log(`${firstCharacter.name} died!`);
        displayWinner(secondCharacter);
        break;
      }

      // Segundo personaje ataca si está vivo
      if (secondCharacter.isAlive()) {
        await delay(1000); // Delay for 1 second
        updateHealthBars();
      } else {
        console.log(`${secondCharacter.name} died!`);
        displayWinner(firstCharacter);
        break;
      }
    }
  }
  //Comenzar combate

  fight(hero, enemy);

  document.addEventListener("keydown", function (event) {
    // Verificar si la tecla presionada es "x"
    if (event.key === "x") {
      // Ataque del primer personaje
      hero.attack(enemy);
    } else if (event.key === "n") {
      // Ataque del segundo personaje
      enemy.attack(hero);
    }
  });

  //Función para actualizar las barras de salud en la interfaz
  function updateHealthBars() {
    // Update hero's health bar
    const heroHealthBar = document
      .getElementById("hero-health-bar")
      .querySelector(".health");
    const heroHealthPercent = (hero.health / hero.maxhealth) * 100;
    heroHealthBar.style.width = `${
      heroHealthPercent < 0 ? 0 : heroHealthPercent
    }%`;

    // Update enemy's health bar
    const enemyHealthBar = document
      .getElementById("enemy-health-bar")
      .querySelector(".health");
    const enemyHealthPercent = (enemy.health / enemy.maxhealth) * 100;
    enemyHealthBar.style.width = `${
      enemyHealthPercent < 0 ? 0 : enemyHealthPercent
    }%`;

    // Update hero's health text
    document.getElementById("hero-health").innerText = `${hero.name} - HP ${
      hero.health < 0 ? 0 : hero.health
    }/${hero.maxhealth}`;

    // Update enemy's health text
    document.getElementById("enemy-health").innerText = `${enemy.name} - HP ${
      enemy.health < 0 ? 0 : enemy.health
    }/${enemy.maxhealth}`;
  }

  //Función para mostrar al ganador
  function displayWinner(winner) {
    const winnerText = document.createElement("p");
    winnerText.textContent = `${winner.name} won the fight!`;
    document.body.appendChild(winnerText);
  }

  //Función para introducir un retraso
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});

