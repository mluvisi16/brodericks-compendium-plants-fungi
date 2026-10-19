Hooks.once("init", function () {
    CONFIG.DND5E.itemRarity.veryCommon = "very common";
});

const MODULE_ID = "brodericks-compendium-plants-fungi";

Hooks.once("init", () => {
    game.settings.register(MODULE_ID, "hideWelcomePopup", {
        name: "Hide Welcome Popup",
        hint: "Determines whether the welcome popup dialog should be suppressed.",
        scope: "client",     
        config: false,       
        type: Boolean,
        default: false
    });
});

Hooks.once("ready", async () => {
    if(game.modules.get("compendium-themer")?.active) {
        game.modules.get("compendium-themer").api.addModule(MODULE_ID, [
            {
                dataPack: `${MODULE_ID}.monsters`,
                colorText: `#136b00`,
                iconText: `fa-solid fa-ghost`,
                bannerImage: `modules/${MODULE_ID}/images/banner-monsters.webp`,
                backgroundColorText: `#D3B683`,
            },
            {
                dataPack: `${MODULE_ID}.plants`,
                colorText: `#136b00`,
                iconText: `fa-solid fa-hand-holding-seedling`,
                bannerImage: `modules/${MODULE_ID}/images/banner-plants.webp`,
                backgroundColorText: `#D3B683`,
            },
            {
                dataPack: `${MODULE_ID}.books`,
                colorText: `#136b00`,
                iconText: `fa-solid fa-book-section`,
                bannerImage: `modules/${MODULE_ID}/images/banner-books.webp`,
                backgroundColorText: `#D3B683`,
            },
            {
                dataPack: `${MODULE_ID}.planttables`,
                colorText: `#136b00`,
                iconText: `fa-solid fa-bag-seedling`,
                bannerImage: `modules/${MODULE_ID}/images/banner-planttables.webp`,
                backgroundColorText: `#D3B683`,
            },
        ]);
    }

    if (!game.user.isGM) return;

    const shouldHide = game.settings.get(MODULE_ID, "hideWelcomePopup");
    if (!shouldHide) {
        const dialogContent = `
            <p>To align with the FoundryVTT AI policy, I have removed all AI generated plant images in the 4.0.0 update. AI was unfortunately the only solution I had for creating art for the hundreds of plants in this module as I cannot feasibly commission that much art. Since most of the plants are back to default icon images, if you (or someone you know) want to create art for any of them, please reach out to me and I'd be happy to work with you and provide credit in both the module and my repo. If you have artwork of a plant already that you'd like to get added to the module I am open to it now that development of existing plants is winding down. Thanks again for using my module, I greatly appreciate the support!</p>
            <hr>
            <div class="form-group">
                <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" id="dont-show-again"/>
                    <span>Don't show this message again</span>
                </label>
            </div>
        `;

        new Dialog({
            title: "Broderick's Compendium of Plants and Fungi - Important Notice",
            content: dialogContent,
            buttons: {
                close: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Blah blah blah, I wanna roll dice now.",
                    callback: (html) => {
                        const isChecked = html.find("#dont-show-again").prop("checked");
                        if (isChecked) {
                            game.settings.set(MODULE_ID, "hideWelcomePopup", true);
                            ui.notifications.info("Preference saved. This popup won't appear again. Thanks again for using the module! :)");
                        }
                    }
                }
            },
            default: "close"
        }).render(true);
    }
});
