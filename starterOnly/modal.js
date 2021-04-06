function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn= document.getElementById("close-modal");
const btnSubmit= document.getElementById("submit");
const form = document.getElementById("form");

//selection de tous les inputs

const inputFirst = document.querySelector('input[name=first]');
const inputLast = document.querySelector('input[name=last]');
const inputEmail = document.querySelector('input[name=email]');
const inputDate = document.querySelector('input[name=birthdate]');
const inputQuant = document.querySelector('input[name=quantity]');
const inputLocation = document.querySelector('input[name=location]');
const inputConditions = document.querySelector('input[name=conditions]');

//selection de la id de la div validation 
let resultFirst = document.getElementById("first-validation");
let resultLast = document.getElementById("last-validation");
let resultEmail = document.getElementById("email-validation"); 
let resultBirth = document.getElementById("date-validation");
let resultQuant = document.getElementById("quant-validation");
let resultLocation = document.getElementById("location-validation");
let resultConditions = document.getElementById("conditions-validation");
let resultDate = document.getElementById("date-validation");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click",closeModal);
  
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
function closeModal(){
  modalbg.style.display='none';
}

function displayNone(e) {
  // passer les id 
  e.style.display = "none";
}


// function afficher message d'erreur
function afficherMessage(inputdiv){
  inputdiv.style.display='inline-block';
}


/* mets une bordure rouge sur chaque champs */
const textC = document.querySelectorAll('.text-control');
textC.forEach(items=> {
items.style.border= '2px solid #FF4E60'});

// passe la bordure en vert si le champs est bien rempli
function borderGreen (indexDuChamp){
  indexDuChamp.style.border='2px solid green';
}

//regex
let regPrenomNom = /[a-zA-Z]{2,64}/;
let regEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,16})(\.[a-z]{2,16})?$/;

/* ecoute la touche relaché et affiche message en consequence */


inputFirst.addEventListener('keyup', function(e) {
  // écouter touche relaché
    let value = e.target.value;
    if (value.match(regPrenomNom)){
      // correspondance  
      borderGreen(textC[0]);
      displayNone(resultFirst);
    } else {
      afficherMessage(resultFirst);
      resultFirst.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    }
});

inputLast.addEventListener('keyup', function(e) {
     let value = e.target.value;
    if (value.match(regPrenomNom)) {
      displayNone(resultLast);
      borderGreen(textC[1]);
    } else {
      afficherMessage(resultLast);
      resultLast.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    }
});
 
inputEmail.addEventListener('keyup', function(e) {
   let value = e.target.value;
    if (value.match(regEmail)) {
      displayNone(resultEmail);
      borderGreen(textC[2]);
    } else {
      afficherMessage(resultEmail);
      resultEmail.innerHTML = "Vous devez choisir une adresse électronique valide.";
    }
});


inputDate.addEventListener('change', function(e) {
  if (inputDate.value.length > 0) {
    // sup à 0 pas d'alerte
      displayNone(resultBirth);
      borderGreen(textC[3]);
     } else {
      afficherMessage(resultBirth);
      resultBirth.innerHTML = "Vous devez entrer votre date de naissance.";
     }
 });

 inputQuant.addEventListener('change', function(e) {
   // écouter changement d'état
  if (inputQuant.value.length > 0) {
    displayNone(resultQuant);
    borderGreen(textC[4]);
     } else {
      afficherMessage(resultQuant);
      resultQuant.innerHTML = "Merci renseigner le nombre de tournoi";
     }
 });

 inputConditions.addEventListener('change', e => {
  if(e.target.checked){
    displayNone(resultConditions);
  }
});



// acceptation des CGV 
document.getElementById("checkbox1").attributes["required"] = "";


// montrer une notification 
function notification () {
document.getElementById("note").style.display = "block";

}

let count=0;

//funontion vider message d'erreur de saisie et remplacer par autre message
function caseVide (input){
  input.style.display='block'
  input.innerHTML= 'Merci de completer ce champ'
};

function caseErrorPrenomNom(messageDiv){
  messageDiv.style.display='block';
  messageDiv.innerHTML='Merci de renseigner au moins deux caractères'
};

// function nom et prenom mail message quand c'est vide
function nomPrenomMail(input,divError,){

if(input.value.length == 0){
  afficherMessage(divError);
  caseVide(divError);
  count++; 
  }};



//verification regex nom/prenom/

  function verifRegexNom(input,regex,divError){
  if (regex.test(input.value)==false){
        caseErrorPrenomNom(divError);
   count++
   }};

  
//verification regex mail 
 function verifRegexMail (input,regex){
  if (regex.test(input.value)==false){
    afficherMessage(resultEmail);
    resultEmail.innerHTML='veuillez saisir une adresse Email valide';
    count++;
 }};



// date

function date() {

if (inputDate.value.length==0) {
  afficherMessage(resultDate);
resultDate.innerHTML='Veuillez saisir votre date de naissance'
count++;
}
};


//tournoi
function tournoi(){
if (inputQuant.value.length == 0) {
  afficherMessage(resultQuant);
  resultQuant.innerHTML = "Vous devez renseigner le nombre de tournoi";
  count++
  } 
};


// la ville 
function countLocations(){
  let theLocation = document.getElementsByClassName("location"),
      i,
    villeCount = 0;
  for (i = 0; i < theLocation.length; i++){
    // vérifier chacune des villes
      if (theLocation[i].checked){
          villeCount++;
      } 
  }
  return villeCount;
  // fin de l'exécution, valeur à renvoyer à la fonction appelante
};

document.querySelectorAll('.location').forEach(item => {
  // tableau location -> écoute item -> état de e 
  item.addEventListener('change', e => {
    if(e.target.checked){
      displayNone(resultLocation);
    }
  })
});

function ville () {
  if (countLocations() == 0){
  // fonction appelante count 
   afficherMessage(resultLocation);
  resultLocation.innerHTML = "Vous devez choisir une option.";
  count++;
}
};


  //conditions generales
function boutonCgv () {


  if (inputConditions.checked==false){
  afficherMessage(resultConditions);
  resultConditions.innerHTML='Vous devez accepter les conditions générales';
  count++
  }
  };

// fonction pour verifier que tout est ok avant envoie du formulaire
function validation(){
  nomPrenomMail(inputFirst,resultFirst);
  nomPrenomMail(inputLast,resultLast);
  nomPrenomMail(inputEmail,resultEmail);
  
  verifRegexNom(inputFirst,regPrenomNom,resultFirst);
  verifRegexNom(inputLast,regPrenomNom, resultLast);
  verifRegexMail (inputEmail,regEmail,resultEmail);
  date();
  tournoi();
  ville();
  boutonCgv();
  };
  
  
// ecoute du bouton submit et envoie notification 
form.addEventListener("submit", e=> {
  e.preventDefault();
  validation();
  if (count==0){
modalbg.style.display = "none";
notification();
form.reset();}
});



// fermer la notification de reservation bien recue

const croixNotification = document.getElementById("croix-notification");
const btnNotification = document.getElementById('btn-notification');
const notificationClose = document.getElementById('note')

btnNotification.addEventListener('click', function(){
  notificationClose.style.display='none';
  
});


croixNotification.addEventListener('click',function(){
  notificationClose.style.display='none';
});

