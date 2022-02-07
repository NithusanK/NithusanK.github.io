(function()
{

    // function to change "Product" in navbar to "Projects"
    function changeProduct()
    {
        document.getElementById("ProjectID").innerHTML = `<i class="fas fa-th"></i> Projects`;
    }

    function changeBottomNav()
    {
        document.getElementById("bottomNav").innerHTML =`© CopyRight ` + new Date().getFullYear();
    }

    function DisplayHomePage()
    {
        console.log("Home Page");

        // insert text using append
        $("main").append(`<p id="MainParagraph" class="mt-3">
            This is our Lab 1 home page, thank you for viewing!</p>`);

        changeProduct();

        changeBottomNav();
    }

    function DisplayProjectsPage()
    {
        console.log("Projects Page");
        changeProduct();

        changeBottomNav()
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
        changeProduct();

        changeBottomNav()
    }

    function DisplayAboutPage()
    {
        console.log("About Us Page");
        changeProduct();

        changeBottomNav()
    }

    function DisplayContactPage()
    {
        console.log("Contact Page");
        changeProduct();

        changeBottomNav()

        let sendButton = document.getElementById("sendButton");

        sendButton.addEventListener("click", function(event)
        {
            location.href = "index.html";
        });
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
            case "Our Projects":
                DisplayProjectsPage();
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
        }

    }

    window.addEventListener("load", Start);
})();