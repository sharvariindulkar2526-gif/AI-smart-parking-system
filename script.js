/* =====================================================
   SMARTPARK - FINAL JAVASCRIPT
===================================================== */


/* ================= VARIABLES ================= */

let currentUser = null;

let vehicle = {
    number: "",
    model: "",
    type: ""
};

let selectedLocation = "";

let selectedParking = null;

let selectedSlot = null;

let selectedDuration = 0;

let selectedPayment = "";

let currentLatitude = null;

let currentLongitude = null;


/* =====================================================
   LOGIN / SIGNUP
===================================================== */

function showSignup() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("signupPage")
        .classList.remove("hidden");
}


function showLogin() {

    document
        .getElementById("signupPage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");
}


/* ================= SIGNUP ================= */

document
    .getElementById("signupForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document
                .getElementById("signupName")
                .value
                .trim();

        const email =
            document
                .getElementById("signupEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("signupPassword")
                .value;


        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;
        }


        const existingUser =
            JSON.parse(
                localStorage.getItem("smartparkUser")
            );


        if (
            existingUser &&
            existingUser.email === email
        ) {

            alert(
                "Account already exists. Please login."
            );

            return;
        }


        const user = {

            name: name,

            email: email,

            password: password
        };


        localStorage.setItem(
            "smartparkUser",
            JSON.stringify(user)
        );


        alert(
            "Account created successfully!"
        );


        document
            .getElementById("loginEmail")
            .value = email;


        showLogin();

    });


/* ================= LOGIN ================= */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("loginPassword")
                .value;


        /* DEMO ACCOUNT */

        if (
            email === "demo@smartpark.com" &&
            password === "123456"
        ) {

            currentUser = {

                name: "Demo User",

                email: email
            };


            openApp();

            return;
        }


        /* SAVED ACCOUNT */

        const savedUser =
            JSON.parse(
                localStorage.getItem("smartparkUser")
            );


        if (
            savedUser &&
            savedUser.email === email &&
            savedUser.password === password
        ) {

            currentUser = savedUser;

            openApp();

        } else {

            alert(
                "Invalid email or password."
            );
        }

    });


/* =====================================================
   OPEN APP
===================================================== */

function openApp() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("signupPage")
        .classList.add("hidden");

    document
        .getElementById("appPage")
        .classList.remove("hidden");


    showPage("vehiclePage");
}


/* ================= LOGOUT ================= */

function logout() {

    currentUser = null;

    document
        .getElementById("appPage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    showPage("vehiclePage");
}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(function(page) {

            page.classList.remove("active");

        });


    document
        .getElementById(pageId)
        .classList.add("active");


    window.scrollTo(0, 0);
}


/* =====================================================
   VEHICLE
===================================================== */

function saveVehicle() {

    const number =
        document
            .getElementById("carNumber")
            .value
            .trim();

    const model =
        document
            .getElementById("carModel")
            .value
            .trim();

    const type =
        document
            .getElementById("vehicleType")
            .value;


    if (!number || !model || !type) {

        alert(
            "Please enter all vehicle details."
        );

        return;
    }


    vehicle.number = number;

    vehicle.model = model;

    vehicle.type = type;


    showPage("locationPage");
}


/* =====================================================
   CURRENT LOCATION
===================================================== */

function useCurrentLocation() {

    const status =
        document.getElementById(
            "currentLocationStatus"
        );


    if (!navigator.geolocation) {

        status.innerText =
            "❌ Geolocation is not supported by this browser.";

        return;
    }


    status.innerText =
        "📍 Detecting your current location...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            currentLatitude =
                position.coords.latitude;

            currentLongitude =
                position.coords.longitude;


            status.innerHTML =
                `✅ Current location detected.<br>
                Latitude: ${currentLatitude.toFixed(5)}
                <br>
                Longitude: ${currentLongitude.toFixed(5)}`;


            /*
             * Demo behavior:
             * Current GPS location is detected.
             *
             * In this prototype, it opens the City
             * parking list. A real application can
             * connect these coordinates to a live
             * parking database/API.
             */

            selectLocation("City");

        },


        function(error) {

            if (
                error.code ===
                error.PERMISSION_DENIED
            ) {

                status.innerText =
                    "❌ Location permission was denied. Please allow location access.";

            }

            else if (
                error.code ===
                error.POSITION_UNAVAILABLE
            ) {

                status.innerText =
                    "❌ Current location is unavailable.";

            }

            else {

                status.innerText =
                    "❌ Unable to detect your location.";
            }

        },


        {
            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0
        }

    );
}


/* =====================================================
   LOCATION
===================================================== */

function selectLocation(location) {

    selectedLocation = location;


    document
        .getElementById(
            "selectedLocationText"
        )
        .innerText =
        "Selected Location: " + location;


    displayParkingLocations();


    showPage("parkingPage");
}


/* =====================================================
   PARKING DATA
===================================================== */

const parkingLocations = {


    City: [

        {
            name: "City Open Ground",

            address: "Main Road",

            type: "Free",

            fee: 0,

            slots: 20
        },


        {
            name: "City Municipal Parking",

            address: "City Center",

            type: "Paid",

            fee: 20,

            slots: 30
        }

    ],


    College: [

        {
            name: "College Ground",

            address: "College Road",

            type: "Free",

            fee: 0,

            slots: 15
        },


        {
            name: "College Paid Parking",

            address: "Near College Gate",

            type: "Paid",

            fee: 10,

            slots: 20
        }

    ],


    Market: [

        {
            name: "Market Open Area",

            address: "Market Road",

            type: "Free",

            fee: 0,

            slots: 12
        },


        {
            name: "Market Parking Zone",

            address: "Main Market",

            type: "Paid",

            fee: 15,

            slots: 25
        }

    ],


    Mall: [

        {
            name: "Mall Parking",

            address: "Central Mall",

            type: "Paid",

            fee: 30,

            slots: 40
        },


        {
            name: "Mall Open Ground",

            address: "Outside Mall",

            type: "Free",

            fee: 0,

            slots: 10
        }

    ]

};


/* =====================================================
   DISPLAY PARKING
===================================================== */

function displayParkingLocations() {

    const parkingList =
        document.getElementById(
            "parkingList"
        );


    parkingList.innerHTML = "";


    const locations =
        parkingLocations[selectedLocation];


    locations.forEach(
        function(parking, index) {


            const badge =
                parking.type === "Free"

                ?

                `<span class="free-badge">
                    FREE
                 </span>`

                :

                `<span class="paid-badge">
                    PAID - ₹${parking.fee}/hour
                 </span>`;


            parkingList.innerHTML += `

                <div class="parking-card">

                    <h3>
                        🅿️ ${parking.name}
                    </h3>

                    <p>
                        📍 ${parking.address}
                    </p>

                    <p>
                        Available Slots:
                        ${parking.slots}
                    </p>

                    <p>
                        ${badge}
                    </p>

                    <button
                        onclick="selectParking(${index})"
                    >
                        Select Parking
                    </button>

                </div>

            `;
        }
    );
}


/* =====================================================
   SELECT PARKING
===================================================== */

function selectParking(index) {

    selectedParking =
        parkingLocations[
            selectedLocation
        ][index];


    selectedSlot = null;


    document
        .getElementById(
            "selectedParkingText"
        )
        .innerHTML =

        `Parking:
        <strong>
            ${selectedParking.name}
        </strong>
        <br>

        Type:
        <strong>
            ${selectedParking.type}
        </strong>`;


    displaySlots();


    showPage("slotPage");
}


/* =====================================================
   PARKING SLOTS
===================================================== */

function displaySlots() {

    const slotList =
        document.getElementById(
            "slotList"
        );


    slotList.innerHTML = "";


    for (
        let i = 1;
        i <= selectedParking.slots;
        i++
    ) {


        /*
         * Demo occupied slots.
         * Every 7th slot is shown as occupied.
         */

        const occupied =
            i % 7 === 0;


        slotList.innerHTML += `

            <div

                class="slot
                ${occupied ? "occupied" : ""}"

                ${
                    occupied
                    ?
                    ""
                    :
                    `onclick="selectSlot(${i}, this)"`
                }

            >

                P-${i}

                <br>

                ${
                    occupied
                    ?
                    "Occupied"
                    :
                    "Available"
                }

            </div>

        `;
    }
}


/* =====================================================
   SELECT SLOT
===================================================== */

function selectSlot(
    slotNumber,
    element
) {

    document
        .querySelectorAll(".slot")
        .forEach(function(slot) {

            slot.classList.remove(
                "selected"
            );

        });


    element.classList.add(
        "selected"
    );


    selectedSlot =
        slotNumber;
}


/* =====================================================
   DURATION
===================================================== */

function goToDuration() {

    if (!selectedSlot) {

        alert(
            "Please select an available parking slot."
        );

        return;
    }


    showPage("durationPage");
}


function selectDuration(hours) {

    selectedDuration = hours;


    showPaymentPage();
}


/* =====================================================
   FEE CALCULATION
===================================================== */

function calculateParkingFee() {

    if (!selectedParking) {

        return 0;
    }


    /* FREE PARKING */

    if (
        selectedParking.type ===
        "Free"
    ) {

        return 0;
    }


    /* PAID PARKING */

    return (
        selectedParking.fee *
        selectedDuration
    );
}


/* =====================================================
   PAYMENT PAGE
===================================================== */

function showPaymentPage() {

    const amount =
        calculateParkingFee();


    const paymentAmount =
        document.getElementById(
            "paymentAmount"
        );


    const paymentOptions =
        document.getElementById(
            "paymentOptions"
        );


    const freeParkingBox =
        document.getElementById(
            "freeParkingBox"
        );


    if (amount === 0) {


        paymentAmount.innerHTML = `

            <h2>
                FREE PARKING
            </h2>

            <p>
                Parking at this location
                is free.
            </p>

            <h3>
                Amount: ₹0
            </h3>

        `;


        paymentOptions
            .classList
            .add("hidden");


        freeParkingBox
            .classList
            .remove("hidden");

    }


    else {


        paymentAmount.innerHTML = `

            <h2>
                Parking Fee
            </h2>

            <p>
                ${selectedParking.name}
            </p>

            <p>
                Rate:
                ₹${selectedParking.fee}/hour
            </p>

            <p>
                Duration:
                ${selectedDuration}
                hours
            </p>

            <h2>
                Total:
                ₹${amount}
            </h2>

        `;


        paymentOptions
            .classList
            .remove("hidden");


        freeParkingBox
            .classList
            .add("hidden");
    }


    showPage(
        "paymentPage"
    );
}


/* =====================================================
   PAYMENT METHOD
===================================================== */

function selectPayment(method) {

    selectedPayment = method;


    document
        .querySelectorAll(
            ".payment-methods button"
        )
        .forEach(function(button) {

            button.classList.remove(
                "selected"
            );

        });


    /*
     * Highlight selected payment button.
     */

    const buttons =
        document.querySelectorAll(
            ".payment-methods button"
        );


    buttons.forEach(function(button) {

        if (
            button.innerText
                .toLowerCase()
                .includes(
                    method.toLowerCase()
                )
        ) {

            button.classList.add(
                "selected"
            );
        }

    });
}


/* =====================================================
   PAID PAYMENT
===================================================== */

function confirmPayment() {

    if (!selectedPayment) {

        alert(
            "Please select a payment method."
        );

        return;
    }


    const amount =
        calculateParkingFee();


    alert(
        `Payment of ₹${amount} successful!`
    );


    showConfirmation(
        amount
    );
}


/* =====================================================
   FREE PAYMENT
===================================================== */

function confirmFreeParking() {

    showConfirmation(0);
}


/* =====================================================
   BOOKING CONFIRMATION
===================================================== */

function showConfirmation(
    amount
) {


    const paymentText =

        amount === 0

        ?

        "No Payment Required"

        :

        `${selectedPayment} - ₹${amount}`;


    document
        .getElementById(
            "bookingDetails"
        )
        .innerHTML = `

        <strong>
            Vehicle:
        </strong>

        ${vehicle.number}
        -
        ${vehicle.model}

        <br>


        <strong>
            Vehicle Type:
        </strong>

        ${vehicle.type}

        <br>


        <strong>
            Parking:
        </strong>

        ${selectedParking.name}

        <br>


        <strong>
            Parking Type:
        </strong>

        ${selectedParking.type}

        <br>


        <strong>
            Slot:
        </strong>

        P-${selectedSlot}

        <br>


        <strong>
            Duration:
        </strong>

        ${selectedDuration}
        hours

        <br>


        <strong>
            Payment:
        </strong>

        ${paymentText}

        <br>


        <strong>
            Status:
        </strong>

        Confirmed

    `;


    showPage(
        "confirmationPage"
    );
}


/* =====================================================
   NAVIGATION
===================================================== */

function goToNavigation() {

    document
        .getElementById(
            "navigationText"
        )
        .innerHTML = `

        Navigate to
        <strong>
            ${selectedParking.name}
        </strong>

        at
        ${selectedParking.address}.

        <br><br>

        Your parking slot is
        <strong>
            P-${selectedSlot}
        </strong>.

    `;


    showPage(
        "navigationPage"
    );
}


/* =====================================================
   GOOGLE MAPS
===================================================== */

function openMaps() {

    if (
        currentLatitude !== null &&
        currentLongitude !== null
    ) {

        const mapsURL =
            `https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${encodeURIComponent(selectedParking.address)}`;

        window.open(
            mapsURL,
            "_blank"
        );

    }

    else {

        const mapsURL =
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedParking.address)}`;

        window.open(
            mapsURL,
            "_blank"
        );
    }
}


/* =====================================================
   NEW SEARCH
===================================================== */

function newSearch() {

    selectedParking = null;

    selectedSlot = null;

    selectedDuration = 0;

    selectedPayment = "";

    showPage(
        "locationPage"
    );
}