//Verbergen alerts

hideAlerts();

//aanmaken array voor de errors

let errors = [];

// Verbergen van de alerts

function hideAlerts() {
    document.getElementById("fouten").style.display = "none";
    document.getElementById("betalingsbericht").style.display = "none";
    document.getElementById("succes").style.display = "none";
}

// Oproepen van succes alerts
function showSucces() {
    document.getElementById("betalingsbericht").style.display = "block";
    document.getElementById("succes").style.display = "block";
}


// Na het drukken op de knop

function validateForm() {

    // Alerts verbergen
    hideAlerts();

    //variabelen
    let betaling = document.querySelector('input[name="betaling"]:checked');


    //lege velden controleren
    checkEmptyField("voornaam", "Het veld voornaam is vereist.");
    checkEmptyField("familienaam", "Het veld familienaam is vereist.");
    checkEmptyField("gebruikersnaam", "Het veld gebruikersnaam is vereist.");
    checkEmptyField("adres", "Het veld adres is vereist.");
    checkEmptyField("landen", "Het veld land is vereist.");
    checkEmptyField("provincie", "Het veld provincie is vereist.");


    //wachtwoord controleren
    validateWachtwoorden();

    //controle email
    if (!validateEmail(document.getElementById("email").value)) {
        errors.push("E-mailadres is niet correct");
    }


    // controleren betalingswijze
    validatePayment(betaling);

    // controleren postcode
    checkPC("postcode");

    //controle acceptatie voorwaarden

    if (!document.getElementById("voorwaarden").checked) {
        errors.push("Gelieve de algemene voorwaarden te accepteren.");
        document.getElementById("fouten").style.display = "none";
    }

    //errors loggen
    console.log("errors:", errors);

    // al dan niet tonen van errors

    if (errors.length > 0) {

        showErrors(errors);
        errors = [];
    } else {

        showSucces();
    }



}

// Lege velden controleren

function checkEmptyField(veld, melding) {
    let ingave = document.getElementById(veld).value;

    if (ingave == "") {
        errors.push(melding);
    }

}

// Controle e-mailadres; gebruikersnaam en domein

function validateEmail(emailadres) {
    //https://regexr.com/
    //https://www.youtube.com/watch?v=rhzKDrUiJVk
    //http://www.regular-expressions.info/quickstart.html
    //https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
    //https://www.w3resource.com/javascript/form/email-validation.php



    if (/^[a-zA-Z0-9_]+[a-zA-Z0-9_.-]*@[a-zA-Z0-9]+[a-zA-Z0-9-]*\.[a-zA-Z0-9]+$/.test(emailadres)) {
        return (true);
    }
    return (false);
}


// Controle betalingswijze

function validatePayment(veld) {
    document.getElementById("soortBetaling").innerHTML = "<p>Je betalingswijze is " + veld.value + "</p>";
}

// Controle postcode

function checkPC(veld) {

    let pc = document.getElementById(veld).value;

    if (pc.length == 0) {
        errors.push("Het veld postcode is vereist.");
        return;
    }
    if (pc < 1000 || pc > 9999) {
        errors.push("De waarde van de postcode moet tussen 1000 en 9999 liggen.");
    }
}

// Controle wachtwoord

function validateWachtwoorden() {
    let wachtwoord1 = document.getElementById("wachtwoord1").value;
    let wachtwoord2 = document.getElementById("wachtwoord2").value;

    if (wachtwoord1 == "") {
        errors.push("Het veld wachtwoord is vereist.");

    }
    if (wachtwoord2 == "") {
        errors.push("Het veld herhaal wachtwoord is vereist.");
        return;
    }
    if (wachtwoord1.length < 8) {
        errors.push("Het wachtwoord is te kort.");
        return;
    }
    if (wachtwoord1 != wachtwoord2) {
        errors.push("Wachtwoorden komen niet overeen.")
    }

}


function showErrors(fouten) {
    let strHtml = "";

    fouten.forEach(fout => {
        strHtml += fout + "<br />";
    });

    document.getElementById("errors").innerHTML = strHtml;
    document.getElementById("fouten").style.display = "block";
}