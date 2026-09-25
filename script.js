// ================================
// BASIS VAN HET SPEL
// ================================

let som = 0;

let cocksperclick = 1;
let persecond = 0;

let multiplier = 1;
let evolution = 0;
let runEarned = 0;
let evolutionCost = 5000;

let click_upgrade_cost = 50;

let aantal_grandmas = 0;
let aantal_factorys = 0;
let aantal_laboratorys = 0;

let grandma_cost = 100;
let factory_cost = 1000;
let laboratory_cost = 10000;


// Namen van de evoluties
const evolutionNames = [
    "🐣 Chick",
    "🐓 Rooster",
    "✨ Golden Rooster",
    "🔥 Phoenix Rooster",
    "👑 Ultimate Rooster"
];

function getEvolutionName() {
    if (evolution < evolutionNames.length) {
        return evolutionNames[evolution];
    }

    return "👑 Ultimate Rooster " + (evolution + 1);
}


// ================================
// KLIKKEN
// ================================

function counter() {
    let earned = cocksperclick * multiplier;

    som += earned;
    runEarned += earned;

    updateScreen();
}


// ================================
// CLICK UPGRADE
// ================================

function buyclickupgrade() {
    if (som >= click_upgrade_cost) {
        som -= click_upgrade_cost;

        cocksperclick += 1;

        click_upgrade_cost = Math.floor(
            click_upgrade_cost * 1.12
        );

        updateScreen();
    } else {
        alert("Not enough cocks!");
    }
}


// ================================
// GRANDMA
// ================================

function buygrandma() {
    if (som >= grandma_cost) {
        som -= grandma_cost;

        persecond += 1;
        aantal_grandmas++;

        grandma_cost = Math.floor(
            100 * Math.pow(1.12, aantal_grandmas)
        );

        updateScreen();
    } else {
        alert("Not enough cocks!");
    }
}


// ================================
// FACTORY
// ================================

function buyfactory() {
    if (som >= factory_cost) {
        som -= factory_cost;

        persecond += 15;
        aantal_factorys++;

        factory_cost = Math.floor(
            1000 * Math.pow(1.12, aantal_factorys)
        );

        updateScreen();
    } else {
        alert("Not enough cocks!");
    }
}


// ================================
// LABORATORY
// ================================

function buylaboratory() {
    if (som >= laboratory_cost) {
        som -= laboratory_cost;

        persecond += 100;
        aantal_laboratorys++;

        laboratory_cost = Math.floor(
            10000 * Math.pow(1.12, aantal_laboratorys)
        );

        updateScreen();
    } else {
        alert("Not enough cocks!");
    }
}


// ================================
// EVOLUTIE
// ================================

function evolve() {
    if (runEarned < evolutionCost) {
        alert("You need more cocks to evolve!");
        return;
    }

    let confirmEvolution = confirm(
        "Evolve to the next stage?\n\n" +
        "You will lose your current cocks and buildings, " +
        "but your production multiplier will double!"
    );

    if (!confirmEvolution) {
        return;
    }

    // Nieuwe evolutiefase
    evolution++;

    // Permanente productievermenigvuldiger
    multiplier *= 2;

    // Volgende evolutie vraagt meer
    evolutionCost *= 10;

    // Reset de huidige run
    som = 0;
    runEarned = 0;

    cocksperclick = 1;
    persecond = 0;

    aantal_grandmas = 0;
    aantal_factorys = 0;
    aantal_laboratorys = 0;

    // Prijzen opnieuw naar de startwaarden
    click_upgrade_cost = 50;
    grandma_cost = 100;
    factory_cost = 1000;
    laboratory_cost = 10000;

    updateScreen();
}


// ================================
// PASSIEVE INKOMSTEN
// ================================

setInterval(function () {
    let earned = persecond * multiplier;

    som += earned;
    runEarned += earned;

    updateScreen();
}, 1000);


// ================================
// SCHERM UPDATEN
// ================================

function updateScreen() {
    document.getElementById("demo").textContent = Math.floor(som).toLocaleString();

    document.getElementById("cocks_per_click").textContent = (cocksperclick * multiplier).toLocaleString();

    document.getElementById("cocks-per-seconde").textContent = (persecond * multiplier).toLocaleString();

    document.getElementById("grandma-count").textContent = aantal_grandmas;

    document.getElementById("factory-count").textContent = aantal_factorys;

    document.getElementById("laboratory-count").textContent = aantal_laboratorys;

    document.getElementById("grandma_cost").textContent = grandma_cost.toLocaleString();

    document.getElementById("factory_cost").textContent = factory_cost.toLocaleString();

    document.getElementById("laboratory_cost").textContent = laboratory_cost.toLocaleString();

    document.getElementById("click-upgrade-cost").textContent = click_upgrade_cost.toLocaleString();

    // Evolutie-informatie
    document.getElementById("evolution-name").textContent = getEvolutionName();

    document.getElementById("evolution-multiplier").textContent = "x" + multiplier;

    document.getElementById("evolution-progress").textContent = Math.floor(runEarned).toLocaleString() + " / " + evolutionCost.toLocaleString();

    document.getElementById("evolution-button").textContent = "Evolve (" + evolutionCost.toLocaleString() + " cocks)";
}


updateScreen();