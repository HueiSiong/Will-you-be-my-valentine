
(async function verifyIntegrity() {
    try {
        let response = await fetch("version.json");
        let data = await response.json();
        let latest = data.version;
        let enforceUpdate = data.require_update;
        let alertMsg = data.message;
        let buildVersion = "1.0";
        if (buildVersion !== latest && enforceUpdate) {
            let warnBox = document.createElement("div");
            warnBox.style.position = "fixed";
            warnBox.style.bottom = "10px";
            warnBox.style.left = "50%";
            warnBox.style.transform = "translateX(-50%)";
            warnBox.style.backgroundColor = "red";
            warnBox.style.color = "white";
            warnBox.style.padding = "10px";
            warnBox.style.fontSize = "14px";
            warnBox.style.borderRadius = "5px";
            warnBox.innerHTML = `🚨 ${alertMsg}`;
            document.body.appendChild(warnBox);
        }
    } catch (err) {
        console.warn("⚠ Integrity check failed, but forks should still update.");
    }
})();

const prompts = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let promptIndex = 0;

window.handleNoClick = function () {
    const btnNo = document.querySelector('.no-button');
    const btnYes = document.querySelector('.yes-button');
    if (btnNo && btnYes) {
        btnNo.textContent = prompts[promptIndex];
        promptIndex = (promptIndex + 1) % prompts.length;

        const currentSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
        btnYes.style.fontSize = `${Math.min(currentSize * 1.2, 50)}px`; // Limit font size to 50px
    }
};

window.handleYesClick = function () {
    window.location.href = "yes_page.html";
};
