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
        // Only 2020, refill afterwards:
        // Or request https://feiertage-api.de/
        // https://feiertage-api.de/api/?jahr=2021&nur_land=BY
        "20201223",
        "20201224",
        "20201225",
        "20201226",
        "20201227",
        "20201228",
        "20201229",
        "20201230",
        "20201231",
        "20210101",
        "20210102",
        "20210103",
        "20210104",
        "20210105",
        "20210106",
        "20210107",
        "20210108",
        "20210109",
        "20210110",
        "20210402",
        "20210405",
        "20210501",
        "20210513",
        "20210524",
        "20210603",
        "20210815",
        "20211003",
        "20211101",
        "20211225",
        "20211226",
        "20211227",
        "20211228",
        "20211229",
        "20211230",
        "20211231"
    ]
};
