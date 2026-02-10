document.getElementById('akan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Get input values
    const dateValue = document.getElementById('birthdate').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    // 2. Validate input
    if (!dateValue || !gender) {
        alert("Please select both your birth date and gender!");
        return;
    }

    const birthDate = new Date(dateValue);
    const DD = birthDate.getDate();
    const MM = birthDate.getMonth() + 1; 
    const fullYear = birthDate.getFullYear();


    if (DD <= 0 || DD > 31) { alert("Invalid day entered!"); return; }
    if (MM <= 0 || MM > 12) { alert("Invalid month entered!"); return; }

    // 3. Formula Calculation
    // CC is century (first 2 digits), YY is year (last 2 digits)
    const CC = parseInt(fullYear.toString().slice(0, 2));
    const YY = parseInt(fullYear.toString().slice(2, 4));

    // formula: d = ( ( (CC/4) -2*CC-1) + ((5*YY/4) ) + ((26*(MM+1)/10)) + DD ) mod 7
    let dayOfWeek = Math.floor(((CC/4) - 2*CC - 1) + (5*YY/4) + (26*(MM+1)/10) + DD) % 7;
    
    // Adjust for JavaScript's modulo behavior with negative numbers
    if (dayOfWeek < 0) { dayOfWeek += 7; }

    // 4. Name Matching
    const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
    const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

    const akanName = (gender === "male") ? maleNames[dayOfWeek] : femaleNames[dayOfWeek];

    // 5. Display Result
    const resultBox = document.getElementById('result-box');
    const displayP = document.getElementById('display-name');
    
    displayP.innerHTML = `You were born on a <strong>${getDayName(dayOfWeek)}</strong>. <br> Your Akan name is <strong>${akanName}</strong>!`;
    resultBox.classList.remove('hidden');
});

// Helper function to get day string
function getDayName(index) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[index];
}
