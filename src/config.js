module.exports = {
    debug: {
        teamsHook: process.env.TEAMS_HOOK_DEBUG
    },
    konrad: {
        title: "Konrad",
        baseUrl: "http://leonardi.webspeiseplan.de",
        url: "https://leonardi.webspeiseplan.de/index.php?token=1b5a8259d1c8b53ce87c5720adab9e4b&model=menu&location=2110&languagetype=1",
        refererUrl: "https://leonardi.webspeiseplan.de/Menu",
        niceUrl: "https://leonardi.webspeiseplan.de/1566422533394",
        teamsHook: process.env.TEAMS_HOOK_KONRAD
    },
    nemetschek: {
        title: "Nemetschek",
        baseUrl: "http://leonardi.webspeiseplan.de",
        url: "https://leonardi.webspeiseplan.de/index.php?token=1b5a8259d1c8b53ce87c5720adab9e4b&model=menu&location=2111&languagetype=1",
        refererUrl: "https://leonardi.webspeiseplan.de/Menu",
        niceUrl: "https://leonardi.webspeiseplan.de/1567009364342",
        teamsHook: process.env.TEAMS_HOOK_NEMETSCHEK
    },
    mealCategories: {
        // "order" represents the order in which the categories are printed
        // Konrad
        4: {title: 'Hauptgericht', order: 1},
        34: {title: 'Grill', order: 2},
        36: {title: 'Pasta', order: 3},
        35: {title: 'Pizza', order: 4},
        30: {title: 'Toppings', order: 5},
        29: {title: 'Salatbar', order: 6},
        32: {title: 'Dessert', order: 7},
        40: {title: 'Brot', order: 7},
        // Nemetschek
        44: {title: 'Hauptgericht', order: 8},
        43: {title: 'Toppings', order: 9},
        42: {title: 'Suppe', order: 11},
        41: {title: 'Salatbar', order: 12},
        46: {title: 'Dessert', order: 13},
        45: {title: 'Beilagen', order: 14},
    },
    holidayMap: [
        // Only 2019 + 2020, refill afterwards:
        // Or request https://feiertage-api.de/
        "20190101",
        "20190106",
        "20190419",
        "20190422",
        "20190501",
        "20190530",
        "20190610",
        "20190620",
        "20190815",
        "20191003",
        "20191101",
        "20191120",
        "20191225",
        "20191226",
        "20200101",
        "20200106",
        "20200410",
        "20200413",
        "20200501",
        "20200521",
        "20200601",
        "20200611",
        "20200815",
        "20201003",
        "20201101",
        "20201118",
        "20201225",
        "20201226"
    ]
};