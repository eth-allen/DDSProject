/*
const submitTabButtons = [...document.querySelectorAll("[data-submit-tab]")];
const submitTabPanels = {
    logAction: document.querySelector('[data-submit-panel="log-action"]'),
    addType: document.querySelector('[data-submit-panel="add-action"]')
};

function setActiveSubmitTab(tabName) {
    Object.entries(submitTabPanels).forEach(([name, panel]) => panel?.classList.toggle("is-active", name === tabName));
    submitTabButtons.forEach((button) => {
        const isActive = button.dataset.submitTab === tabName;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = isActive ? 0 : -1;
    });
}

if (submitTabButtons.length) {
    submitTabButtons.forEach((button) => button.addEventListener("click", () => setActiveSubmitTab(button.dataset.submitTab)));
};

*/