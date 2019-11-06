// JavaScript source code

// Function that will parse through and display hotels based on the selected location
$(document).ready(function () {

    $("#visiting_location").change(function () {

        var el = $(this);

        if (el.val() === "1")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Kimpton Hotel (Seattle)</option>");
            $("#hotel").append("   <option>Sheraton Grand Seattle (Seattle)</option>");
            $("#hotel").append("   <option>Grandy Hyatt Seattle (Seattle)</option>");
            $("#hotel").append("   <option>Crowne Plaza (Seattle)</option>");
            $("#hotel").append("   <option>Hyatt at Olive 8 (Seattle)</option>");
        }
        else if (el.val() === "2")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Shamrock Motel (Bellingham)</option>");
            $("#hotel").append("   <option>Motel 6 (Bellingham)</option>");
            $("#hotel").append("   <option>Chrysalis Inn and Spa (Bellingham)</option>");
            $("#hotel").append("   <option>GuestHouse Inn (Bellingham)</option>");
            $("#hotel").append("   <option>Holiday Inn (Bellingham)</option>");
        }
        else if (el.val() === "3")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Holiday Inn (Portland)</option>");
            $("#hotel").append("   <option>Hyatt Place (Portland)</option>");
            $("#hotel").append("   <option>Stanford Court (Portland)</option>");
            $("#hotel").append("   <option>Travelodge (Portland)</option>");
            $("#hotel").append("   <option>Travelodge by Wyndam (Portland)</option>");
        }
        else if (el.val() === "4")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Samesun Venice Beach (San Francisco)</option>");
            $("#hotel").append("   <option>Value Inn (San Francisco)</option>");
            $("#hotel").append("   <option>Luxe City Center Hotel (San Francisco)</option>");
            $("#hotel").append("   <option>Motel 6 (San Francisco)</option>");
            $("#hotel").append("   <option>Hotel Crowne Plaza (San Francisco)</option>");
        }
        else if (el.val() === "5")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Vacation Inn (Los Angeles)</option>");
            $("#hotel").append("   <option>EZ 8 Motel (Los Angeles)</option>");
            $("#hotel").append("   <option>Premier Inn (Los Angeles)</option>");
            $("#hotel").append("   <option>Lux Uptown Apts. (Los Angeles)</option>");
            $("#hotel").append("   <option>Hotel Embassy (Los Angeles)</option>");
        }
        else if (el.val() === "6")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Shamrock Motel (Phoenix)</option>");
            $("#hotel").append("   <option>Motel 6 (Phoenix)</option>");
            $("#hotel").append("   <option>Chrysalis Inn and Spa (Phoenix)</option>");
            $("#hotel").append("   <option>GuestHouse Inn (Phoenix)</option>");
            $("#hotel").append("   <option>Holiday Inn (Phoenix)</option>");
        }
        else if (el.val() === "7")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Tru (Las Vegas)</option>");
            $("#hotel").append("   <option>The LINQ (Las Vegas)</option>");
            $("#hotel").append("   <option>Travelodge (Las Vegas)</option>");
            $("#hotel").append("   <option>Four Queens (Las Vegas)</option>");
            $("#hotel").append("   <option>The Venetian (Las Vegas)</option>");
        }
        else if (el.val() === "8")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Circus Circus (Reno)</option>");
            $("#hotel").append("   <option>Motel 6 (Reno)</option>");
            $("#hotel").append("   <option>Sands Regency (Reno)</option>");
            $("#hotel").append("   <option>Baymont Inn (Reno)</option>");
            $("#hotel").append("   <option>Nugget (Reno)</option>");
        }
        else if (el.val() === "0") {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Please pick a location first ></option>");
        }
    });

});

// Display email from taking in input from the newsletter form
function disp_email()
{
    var x = document.getElementById("email").value;
    window.alert("Your email is: " + x + "!");
}

function fn1()
{
    var str = document.getElementById("text1").value;
    alert("Value inside the textbox is: ", + str);
}