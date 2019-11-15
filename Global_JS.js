// JavaScript source code

// Function that will parse through and display hotels based on the selected location
$(document).ready(function () {

    $("#visiting_location").change(function () {

        var el = $(this);

        if (el.val() === "Seattle, Washington")
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
        else if (el.val() === "Bellingham, Washington")
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
        else if (el.val() === "Portland, Oregon")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Howard Johnson (Portland)</option>");
            $("#hotel").append("   <option>Mark Spencer Hotel (Portland)</option>");
            $("#hotel").append("   <option>Portland Northwest Hotel (Portland)</option>");
            $("#hotel").append("   <option>Ramada (Portland)</option>");
            $("#hotel").append("   <option>Society Hotel (Portland)</option>");
        }
        else if (el.val() === "Los Angeles, California")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Samesun Venice Beach (Los Angeles)</option>");
            $("#hotel").append("   <option>Value Inn (Los Angeles)</option>");
            $("#hotel").append("   <option>Luxe City Center Hotel (Los Angeles)</option>");
            $("#hotel").append("   <option>Motel 6 (Los Angeles)</option>");
            $("#hotel").append("   <option>Hotel Crowne Plaza (Los Angeles)</option>");
        }
        else if (el.val() === "Phoenix, Arizona")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Vacation Inn (Phoenix)</option>");
            $("#hotel").append("   <option>EZ 8 Motel (Phoenix)</option>");
            $("#hotel").append("   <option>Premier Inn (Phoenix)</option>");
            $("#hotel").append("   <option>Lux Uptown Apts. (Phoenix)</option>");
            $("#hotel").append("   <option>Hotel Embassy (Phoenix)</option>");
        }
        else if (el.val() === "San Francisco, California")
        {
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel option:last-child").remove();
            $("#hotel").append("   <option>< Select an option ></option>"); // Used for having a placeholder that matches the other dropdowns
            $("#hotel").append("   <option>Holiday Express Inn Hotel and Suites (San Francisco)</option>");
            $("#hotel").append("   <option>Hyatt Place (San Francisco)</option>");
            $("#hotel").append("   <option>Stanford Court (San Francisco)</option>");
            $("#hotel").append("   <option>Travelodge by Wyndham (San Francisco)</option>");
            $("#hotel").append("   <option>Travelodge (San Francisco)</option>");
        }
        else if (el.val() === "Las Vegas, Nevada")
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
        else if (el.val() === "Reno, Nevada")
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

function email_record()
{
    var choice = document.getElementById('e_r').value;
    window.alert("Succesful");
    console.log("Success!!!");

    window.alert("Your chosen value is: " + choice);
}