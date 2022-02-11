// IIFE -- Immediately Invoked Function Expression
// AKA - Anonymous Self-Executing Function
(function()
{
    
    function DisplayHomePage()
    {
        //old code
        // console.log("Home Page");
        // let AboutUsButton = document.getElementById("AboutUsButton");
        // AboutUsButton.addEventListener("click", () =>
        // {
        //     location.href = "about.html";
        // });

        // 1) Fattest Memory Footprint
        //jQuery way - get all elements with an id of AboutUsButton and for each element add a "click" event
        $("#AboutUsButton").on("click", () =>
        {
            location.href = "about.html";
        });

        // 2) Second Fattest - because it returns a collection of elements
        //Javascript way - get all elements wuth an id of AboutUsButton for each element, loop...
        // document.querySelectorAll("#AboutUsButton").forEach(element => 
        // {
        //     //for each element, add a "click" event
        //     element.addEventListener("click", () =>
        //     {
        //       location.href = "about.html";  
        //     });
        // });
        
        // 3) Pretty Lean
        //JavaScript way - get an element that matches an id of AboutUsButton and add a "click" event
        // document.querySelector("#AboutUsButton").addEventListener("click", () =>
        // {
        //     location.href = "about.html";  
        // });

        


        // Step 1 - get a reference to an entry point(s) (insertion / deletion)
        //let MainContent = document.getElementsByTagName("main")[0];
        //let DocumentBody = document.body;

        // Step 2 - Create an HTML Element in memory
        // let MainParagraph = document.createElement("p");
        // let Article = document.createElement("article");
        // let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>`;

        // Step 3 - Configure new Element
        // MainParagraph.setAttribute("id", "MainParagraph");
        // MainParagraph.setAttribute("class", "mt-3");
        // let FristString = "This is";
        // let SecondString = `${FristString} the Main Paragraph`;
        // MainParagraph.textContent = SecondString;
        // Article.setAttribute("class", "container");

        // Step 4 - perform insertion / deletion

        // example of insert after (append)
        //MainContent.appendChild(MainParagraph);
        //Article.innerHTML = ArticleParagraph;
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
        </article>`);

        // example of insert before
        //MainContent.before(MainParagraph);

        // example of deletion
        //document.getElementById("AboutUsButton").remove();
        //AboutUsButton.remove();

        // ES6 and HTML5 => Template Strings => "Super Strings"

        //Test new core.Contact Class
        let darryl = new core.Contact("Darryl Olsen", "555-555-5555", "darryl.olsen@example.com");
        console.log(darryl.toString());

    }

    function DisplayProductsPage()
    {
        console.log("Products Page");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    function DisplayAboutPage()
    {
        console.log("About Us Page");
    }

    /**
     * Adds a Contact Object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     *  This method validates a field in the form and displays an error in the message area div element
     *
     * @param {string} fieldID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(fieldID, regular_expression, error_message)
    {
        let messageArea = $("#messageArea").hide();

        $("#" + fieldID).on("blur", function()
        {
            let text_value = $(this).val();
            if(!regular_expression.test(text_value))
            {
                //doesn't pass RegEx test
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                //does pass RegEx test
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name. This must include at least a Capitalized first name and Capitalized last name.");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid Contact Number. Example: (416) 555-5555.");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }

    function DisplayContactPage()
    {
        console.log("Contact Page");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {

            //event.preventDefault(); //for testing only

            if(subscribeCheckbox.checked)
            {
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListPage()
    {
        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage); // returns a list of keys from localStorage

            let index = 1;

            // for every key in the keys string array
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key);    // get localStorage data value

                let contact = new core.Contact();    // creates an empty contact object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click",() =>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function()
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val());
                }
                
                //refresh after deleting
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        // Add Contact
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        // refresh the contact-list page
                        location.href = "contact-list.html"
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html"
                    });
                }
                break;
            default:
                {
                    // get the contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // when editButton is pressed, update the contact
                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();

                        // get any changes from the form
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();


                        // replace the item in localStorage
                        localStorage.setItem(page, contact.serialize());

                        // return to the contact-list
                        location.href = "contact-list.html";
                        
                    });
                    
                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html"
                    });
                }
                break;
        }
    }

    function DisplayLoginPage()
    {
        console.log("Login Page");
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page")
    }

    //named function option
    function Start()
    {
        console.log("App Started!");

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact-List":
                DisplayContactListPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }

    }

    window.addEventListener("load", Start);

})();