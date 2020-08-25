  
// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// addressBook.updateContact(1, 0, 0, 555-666-1212)
// addressBook.updateContact(1, Ada, Lovelace, 555-666-1212)
// addressBook.updateCOntact(1, property, info)

AddressBook.prototype.updateContact = function(id, firstName, lastName, phoneNumber, email, address) {
  for (let i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        if (firstName != "") {
          this.contacts[i].firstName = firstName;
        }
        if (lastName != "") {
          this.contacts[i].lastName = lastName;
        }
        if (phoneNumber != "") {
          this.contacts[i].phoneNumber = phoneNumber;
        }
        if (email != "") {
          this.contacts[i].email = email;
        }
        if (address != "") {
          this.contacts[i].address = address;
        }
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(array) {
  // let addArray = [this.firstName, this.lastName, this.phoneNumber, this.email.email1, this.email.email2, this.email.email3, this.address.address1, this.address.address2, this.address.address3];
  // for (let i = 0; i < array.lenght; i++) {
  //   if(array[i] !== "") {
  //     addArray[i] = array[i];
  //   }
  // }

  this.firstName = array[0],
  this.lastName = array[1],
  this.phoneNumber = array[2],
  this.email = { email1: array[3] , email2: array[4] , email3: array[5] };
  this.address = { address1: array[6] , address2: array[7] , address3: array[8] }
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address1").html(contact.email.email1);
  if (contact.email.email2 !== "") {
    $(".email-address2").html(contact.email.email2);
    $("#second-email").toggle();
  }
  if (contact.email.email3 !== "") {
    $(".email-address3").html(contact.email.email3);
    $("#third-email").toggle();
  }
  $(".address1").html(contact.address.address1);
  if (contact.address.address2 !== "") {
    $(".address2").html(contact.address.address2);
    $("#work-address").toggle();
  } 
  if (contact.address.address3 !== "") {
    $(".address3").html(contact.address.address3);
    $("#vacation-address").toggle();
  }

  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};



$(document).ready(function() {
  attachContactListeners();
  $("#new-contact").submit(function(event) {
    event.preventDefault();
    let contactArrayId = ["first-name", "last-name", "phone-number", "email-address1", "email-address2", "email-address3", "address1", "address2", "address3"]
    let contactArray = [];
    for (let i = 0; i < contactArrayId.length; i++) {
      contactArray.push($("input#new-" + contactArrayId[i]).val());
      $("input#new-" + contactArrayId[i]).val("");
    }
    // const inputtedFirstName = $("input#new-first-name").val();
    // const inputtedLastName = $("input#new-last-name").val();
    // const inputtedPhoneNumber = $("input#new-phone-number").val();
    // const inputtedEmail = $("input#new-email-address1").val();
    // const inputtedAddress = $("input#new-address1").val();

    // $("input#new-first-name").val("");
    // $("input#new-last-name").val("");
    // $("input#new-phone-number").val("");
    // $("input#new-email-address1").val("");
    // $("input#new-address1").val("");

    let newContact = new Contact(contactArray);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});

//

// new-email-address1
// email-type1
// function addMore(type, number) {
//   let id1;
//   let id2;
//   number++;
//   alert("more");
//   if (type === "email") {
//     id1 = "new-email-address" + number;
//     id2 = "email-type" + number;
//   }
//   if (type === "address") {
//     id1 = "new-address" + number;
//     id2 = "address-type" + number;
//   }
//   let result = "<div class=row><div class=ml-1><div class=col-8><input type=text class=form-control id=" + id1 + "><div class=col-3><select class=form-control id=" + id2 + "><option>Primary</option><option>Secondary</option><option>Work</option></select><button onClick=addMore(" + type + "," + number + ") class=btn-info>+</button></div></div></div></div><div id=" + type + number + "</div>";

//   $("#" + type + number).html(result);
// }