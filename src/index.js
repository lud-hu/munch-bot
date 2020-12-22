"use strict";

const nfetch = require("node-fetch");
const config = require("./config");

exports.handler = function () {
    console.log(`start munch-bot`);

    // Use this for sending a broadcast to a channel:
    // var card = createNormalMessageCard("Title here", "Text here")
    // sendToTeams(card, config.konrad.teamsHook);

    if (!isHoliday() && !isWeekend()) {
        try {
            // Fetch, parse and send Konrad menu
            var konradRes = nfetch(config.konrad.url, { headers: { Referer: config.konrad.refererUrl } })
                .then((res) => res.json())
                .then((json) => {
                    const konradCard = createTeamsCard(
                        config.konrad.title,
                        extractMenueMessage(json),
                        config.konrad.niceUrl
                    );
                    sendToTeams(konradCard, config.konrad.teamsHook);
                })
                .catch((e) => tryToSendError(e));

            // Fetch, parse and send Nemetschek menu
            var nemetschekRes = nfetch(config.nemetschek.url, { headers: { Referer: config.nemetschek.refererUrl } })
                .then((res) => res.json())
                .then((json) => {
                    const nemetschekCard = createTeamsCard(
                        config.nemetschek.title,
                        extractMenueMessage(json),
                        config.nemetschek.niceUrl
                    );
                    sendToTeams(nemetschekCard, config.nemetschek.teamsHook);
                })
                .catch((e) => tryToSendError(e));
        } catch (e) {
            tryToSendError(e);
        }
    }

    console.log("finish munch-bot");
};

function tryToSendError(e) {
    sendToTeams(createTeamsCard("ERROR", e.toString(), ""), config.debug.teamsHook);
    console.log("Error! Sent to debug teams channel.", e);
}

function isHoliday() {
    const today = new Date();
    const todayString = today.getFullYear() + "" + fmt(today.getMonth() + 1) + "" + fmt(today.getDate());

    if (config.holidayMap.includes(todayString)) {
        console.log("Found holiday. See you tomorrow!");
        return true;
    }

    return false;
}

function isWeekend() {
    const weekday = new Date().getDay();
    if (weekday < 1 || weekday > 5) {
        console.log("Today is no workday! I will enjoy the weekend!");
        return true;
    }
    return false;
}

function extractMenueMessage(json) {
    console.log("extract menu and create slack json");
    const today = new Date();
    const dayKey = `${today.getFullYear()}-${fmt(today.getMonth() + 1)}-${fmt(today.getDate())}`;

    console.log("extract menu with day -> " + dayKey);
    // We might have meals from the Kaffebar as well, but we don't want these:
    // TODO: Is there a better way for this? The id seems to change.
    const filteredResponse = json.content.filter((item) => !item.speiseplanAdvanced.titel.includes("Kaffeebar"));

    const gerichte = filteredResponse
        .map((item) => {
            if (item && item.speiseplanGerichtData) {
                return item.speiseplanGerichtData.filter((gerichtData) =>
                    gerichtData.speiseplanAdvancedGericht.datum.startsWith(dayKey)
                );
            }
        })
        .filter((array) => {
            if (array) return array.length !== 0;
        });

    if (!gerichte || gerichte.length === 0) {
        // Send info if there are no meals available for today.
        return "Hmm, it seems like there is no meal plan available for today. &#x1F61E;";
    }

    const formattedMeals = formatMeal(gerichte);

    // Sort meal categories for more comfortable output
    formattedMeals.sort((a, b) => {
        var aOrder = config.mealCategories[a.kategorie];
        var bOrder = config.mealCategories[b.kategorie];

        // Make sure not configured categories are sorted to the end
        if (typeof aOrder === "undefined") aOrder = { order: Number.MAX_SAFE_INTEGER };
        if (typeof bOrder === "undefined") bOrder = { order: Number.MAX_SAFE_INTEGER };

        return aOrder.order - bOrder.order;
    });

    return formattedMeals
        .map((item) => {
            const categoryName =
                typeof config.mealCategories[item.kategorie] !== "undefined"
                    ? config.mealCategories[item.kategorie].title
                    : `missingCategory(${item.kategorie})`;
            const kategorie = `\n\n\n **${categoryName}** \n\n`;
            const meals = item.meals
                .filter((meal) => typeof meal.name !== "undefined" && meal.name !== "0")
                .map((meal) => ` ${meal.name} ${typeof meal.price !== "undefined" ? "_" + meal.price + "_" : ""}`)
                .join("\n\n");
            return `${kategorie} ${meals}`;
        })
        .join("<br><br>");
}

function printPrice(price) {
    return `${price}€`;
}

function formatMeal(gerichte) {
    let formattedMeals = [];
    for (const gericht of gerichte[0]) {
        const info = gericht.zusatzinformationen;
        let price;
        if (typeof info !== "undefined") {
            if (info.mitarbeiterpreisDecimal2) {
                price = printPrice(info.mitarbeiterpreisDecimal2);
                if (info.gaestepreisDecimal2) {
                    price += ` / Menü: ` + printPrice(info.gaestepreisDecimal2);
                }
            } else if (info.price3Decimal2 && info.price4Decimal2) {
                price = `klein: ` + printPrice(info.price3Decimal2) + ` / groß: ` + printPrice(info.price4Decimal2);
            }
        }

        const kategorieID = gericht.speiseplanAdvancedGericht.gerichtkategorieID;
        if (!formattedMeals.some((meal) => meal.kategorie === kategorieID)) {
            formattedMeals.push({ kategorie: kategorieID, meals: [] });
        }
        formattedMeals
            .find((meal) => meal.kategorie === kategorieID)
            .meals.push({
                name: removeLinebreak(fixDoubleQuotes(gericht.speiseplanAdvancedGericht.gerichtname)),
                id: gericht.speiseplanAdvancedGericht.id,
                price,
            });
    }

    return formattedMeals;
}

function fixDoubleQuotes(gericht) {
    return gericht.replace(/"/g, '\\"');
}

function removeLinebreak(gericht) {
    return gericht.replace(/\r?\n|\r/g, " ");
}

function fmt(str) {
    return ("0" + str).slice(-2);
}

function createTeamsCard(title, body, actionUrl) {
    const today = new Date();
    const todayString = fmt(today.getDate()) + "." + fmt(today.getMonth() + 1) + ".";

    return {
        "@context": "https://schema.org/extensions",
        "@type": "MessageCard",
        themeColor: "0072C6",
        title: `${title} - ${todayString}`,
        text: body,
        potentialAction: [
            {
                "@type": "OpenUri",
                name: "Online ansehen",
                targets: [{ os: "default", uri: actionUrl }],
            },
        ],
    };
}

function sendToTeams(card, teamsHook) {
    nfetch(teamsHook, {
        method: "post",
        body: JSON.stringify(card),
        headers: { "Content-Type": "application/json" },
    })
        .then(function (res) {
            if (!res.ok) {
                res.text().then((text) => {
                    console.log("Response from Teams not ok", res.status, res.statusText, text);
                });
                throw Error(res.statusText);
            }
            console.log("Successfully sent to Teams");
        })
        .catch((err) => console.log("Error talking to Teams", err, err.stack));
}

function createNormalMessageCard(title, message) {
    return {
        "@context": "https://schema.org/extensions",
        "@type": "MessageCard",
        themeColor: "0072C6",
        title: `${title}`,
        text: message,
    };
}
