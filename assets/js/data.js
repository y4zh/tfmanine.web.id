window.appData = {
    locations: [
        // School - Blue marker
        { name: "MAN 9 Jakarta", type: "school", coords: [106.910491, -6.241088], desc: "Jl. Hj Dogol No 54, Pondok Bambu" },

        // Transit stations - Orange markers
        { name: "Stasiun Buaran", type: "train", coords: [106.9231, -6.2153], desc: "C (Lin Cikarang - Kampung Bandan via PSE/MRI" },
        { name: "Halte Simpang Buaran", type: "brt", coords: [106.9242, -6.2158], desc: "11 (Pulo Gebang - Kampung Melayu)" },
        { name: "LRT Jatibening Baru", type: "lrt", coords: [106.9265, -6.2570], desc: "BK (Lin Bekasi)" },

        // Bus stops near MAN 9 - Green markers with walking time info
        { name: "Rusun Pondok Bambu", type: "busstop", coords: [106.910853, -6.241690], desc: "11P (Walikota Jakarta Timur), JAK 85 (Bintara)", walkTime: 1, distance: 50 },
        { name: "Puskesmas Duren Sawit", type: "busstop", coords: [106.910906, -6.241853], desc: "JAK 85 (Cipinang Indah)", walkTime: 2, distance: 80 },
        { name: "Jln. Teluk Mandar 1", type: "busstop", coords: [106.909881, -6.238719], desc: "11P (Walikota Jakarta Timur), JAK 02 (Duren Sawit), JAK 85 (Bintara)", walkTime: 5, distance: 400 },
        { name: "Jln. Teluk Mandar 2", type: "busstop", coords: [106.910088, -6.238954], desc: "11P (Rusun Pondok Bambu), JAK 02 (Kampung Melayu), JAK 85 (Bintara)", walkTime: 4, distance: 350 },

        // Area Pahlawan Revolusi - Kalimalang
        { name: "Yayasan Perguruan Rakyat 1", type: "busstop_area", coords: [106.89865261169159, -6.22863383065942], desc: "4F (Pinang Ranti), JAK 42 (Pondok Kelapa)" },
        { name: "Yayasan Perguruan Rakyat 2", type: "busstop_area", coords: [106.8986294347656, -6.228387594821946], desc: "4F (Pulo Gadung), JAK 42 (Kampung Melayu), JAK 74 (Cipinang Muara)" },
        { name: "Kantor Pos Pondok Bambu", type: "busstop_area", coords: [106.89738539834836, -6.231891954360357], desc: "4F (Pinang Ranti)" },
        { name: "Pajak dan Retribusi Duren Sawit", type: "busstop_area", coords: [106.89767573778508, -6.230972623102336], desc: "4F (Pulo Gadung)" },
        { name: "RSIA Bunda Aliyah 1", type: "busstop_area", coords: [106.89658728511345, -6.233273296687227], desc: "4F (Pinang Ranti)" },
        { name: "RSIA Bunda Aliyah 2", type: "busstop_area", coords: [106.89651592396815, -6.233165020957645], desc: "4F (Pulo Gadung)" },
        { name: "Sbr. Beacukai Pondok Bambu", type: "busstop_area", coords: [106.89745488642193, -6.235849505778705], desc: "4F (Pulo Gadung)" },
        { name: "Komplek Beacukai Pondok Bambu", type: "busstop_area", coords: [106.89757738695754, -6.235849769190579], desc: "4F (Pinang Ranti)" },
        { name: "Sekolah Pusaka", type: "busstop_area", coords: [106.89835497939647, -6.236911696841331], desc: "4F (Pinang Ranti)" },
        { name: "SMAN 61", type: "busstop_area", coords: [106.89820859922939, -6.236911696841331], desc: "4F (Pulo Gadung)" },
        { name: "Simpang Pahlawan Revolusi 1", type: "busstop_area", coords: [106.89942637136932, -6.238650474577929], desc: "4F (Pulo Gadung), JAK 02 (Duren Sawit)" },
        { name: "Simpang Pahlawan Revolusi 2", type: "busstop_area", coords: [106.89939659259336, -6.238355683703602], desc: "4F (Pinang Ranti), JAK 02 (Kampung Melayu)" },
        { name: "Jln. Keamanan", type: "busstop_area", coords: [106.89984079267472, -6.239169750159575], desc: "4F (Pinang Ranti), JAK 02 (Kampung Melayu)" },
        { name: "Simpang Pondok Bambu Batas 3", type: "busstop_area", coords: [106.90095873757926, -6.241234513060123], desc: "4F (Pulo Gadung), JAK 02 (Duren Sawit)" },
        { name: "Simpang Pondok Bambu Batas 4", type: "busstop_area", coords: [106.90108157503, -6.241275216188863], desc: "4F (Pinang Ranti), JAK 02 (Kampung Melayu)" },
        { name: "Jln. Damai", type: "busstop_area", coords: [106.90184837852652, -6.242739293320024], desc: "4F (Pulo Gadung)" },
        { name: "Sbr. Jln. Damai", type: "busstop_area", coords: [106.90194764111298, -6.242738059895372], desc: "4F (Pinang Ranti)" },
        { name: "Jln. Masjid Al Wustho", type: "busstop_area", coords: [106.90492992471597, -6.245285396504473], desc: "4F (Pinang Ranti), JAK 35 (Pangkalan Jati)" },
        { name: "Simpang Kalimalang", type: "busstop_area", coords: [106.90506349194635, -6.245521799914609], desc: "4F (Pulo Gadung)" },
        { name: "Simpang Pahlawan Revolusi Kalimalang", type: "busstop_area", coords: [106.90576553436132, -6.245570375952437], desc: "JAK 35 (Pangkalan Jati), JAK 85 (Cipinang Indah)" },
        { name: "RS Harum", type: "busstop_area", coords: [106.90958643116758, -6.2478209476815705], desc: "4F (Pinang Ranti), 7P (Cawang Cililitan), JAK 35 (Rawamangun), JAK 84 (Kampung Melayu), JAK 85 (Cipinang Indah)" },
        { name: "Pangkalan Jati 1", type: "busstop_area", coords: [106.90837009540422, -6.246799348031465], desc: "7P (Pondok Kelapa), JAK 35 (Pangkalan Jati), JAK 84 (Kapin), JAK 85 (Cipinang Indah)" },
        { name: "Pangkalan Jati 2", type: "busstop_area", coords: [106.90776904285194, -6.247255961428696], desc: "7P (Cawang Cililitan), JAK 35 (Rawamangun), JAK 84 (Kampung Melayu)" },
        { name: "Taman Pangkalan Jati Kalimalang", type: "busstop_area", coords: [106.90529804904226, -6.245996225625063], desc: "7P (Pondok Kelapa), JAK 35 (Rawamangun), JAK 84 (Kapin), JAK 85 (Bintara)" },
        { name: "Pospol Makasar", type: "busstop_area", coords: [106.9062444217672, -6.246899738244128], desc: "4F (Pulo Gadung), 7P (Cawang Cililitan), JAK 35 (Rawamangun), JAK 84 (Kampung Melayu), JAK 85 (Cipinang Indah)" },
        { name: "Pangkalan Jati", type: "busstop_area", coords: [106.90754646390369, -6.247619232116976], desc: "4F (Pinang Ranti), JAK 35 (Rawamangun)" },
        { name: "Naga Jatiwaringin", type: "busstop_area", coords: [106.90781893465356, -6.248388151092027], desc: "4F (Pulo Gadung), JAK 35 (Rawamangun)" },
        { name: "Megatama", type: "busstop_area", coords: [106.9104836453775, -6.247260872745004], desc: "7P (Pondok Kelapa), JAK 35 (Pangkalan Jati), JAK 84 (Kapin), JAK 85 (Cipinang Indah)" },
        { name: "Kav. Agraria Duren Sawit", type: "busstop_area", coords: [106.91201203551618, -6.247703000935738], desc: "7P (Pondok Kelapa), JAK 35 (Pangkalan Jati), JAK 84 (Kapin), JAK 85 (Cipinang Indah)" },

        // Area Duren Sawit - BKT
        { name: "Taman UT Aheme", type: "busstop_area", coords: [106.92258849203223, -6.227737058504703], desc: "11P (Rusun Pondok Bambu), 11Q (Kampung Melayu via BKT)" },
        { name: "Masjid Jami Nurul Ain 2", type: "busstop_area", coords: [106.91942806494298, -6.227862484382258], desc: "11P (Rusun Pondok Bambu), 11Q (Kampung Melayu via BKT)" },
        { name: "Masjid Jami Nurul Ain 1", type: "busstop_area", coords: [106.91976522020691, -6.227724659305376], desc: "11P (Walikota Jakarta Timur), 11Q (Pulo Gebang via BKT)" },
        { name: "Jln. Swadaya Raya", type: "busstop_area", coords: [106.91743664315385, -6.228153796363687], desc: "11P (Walikota Jakarta Timur), 11Q (Pulo Gebang via BKT), JAK 39 (Kalimalang)" },
        { name: "Sbr. Swadaya Raya", type: "busstop_area", coords: [106.91632513214867, -6.22857753826811], desc: "11P (Rusun Pondok Bambu), 11Q (Kampung Melayu via BKT), JAK 42 (Kampung Melayu)" },
        { name: "Jln. Serdang", type: "busstop_area", coords: [106.91456679000049, -6.228892028821094], desc: "11P (Walikota Jakarta Timur), 11Q (Pulo Gebang via BKT), JAK 39 (Duren Sawit), JAK 42 (Pondok Kelapa)" },
        { name: "Jln. Kel. Raya", type: "busstop_area", coords: [106.91434418897317, -6.229106788604358], desc: "11P (Rusun Pondok Bambu), 11Q (Kampung Melayu via BKT), JAK 02 (Duren Sawit), JAK 26 (Rawamangun), JAK 42 (Kampung Melayu)" },
        { name: "Masjid Jami Al Barkah 1", type: "busstop_area", coords: [106.91211840633106, -6.229398784696151], desc: "11P (Walikota Jakarta Timur), 11Q (Pulo Gebang via BKT), JAK 42 (Pondok Kelapa)" },
        { name: "Masjid Jami Al Barkah 2", type: "busstop_area", coords: [106.9122759555198, -6.2295366093335325], desc: "11P (Rusun Pondok Bambu), 11Q (Kampung Melayu via BKT), JAK 02 (Duren Sawit), JAK 26 (Rawamangun), JAK 42 (Kampung Melayu)" },
        { name: "Baladewa Residence", type: "busstop_area", coords: [106.91036719641446, -6.229637077176653], desc: "11P (Walikota Jakarta Timur), 11Q (Pulo Gebang via BKT), JAK 42 (Pondok Kelapa)" },
        { name: "RS Duren Sawit", type: "busstop_area", coords: [106.90968591533799, -6.229770395681205], desc: "11Q (Kampung Melayu via BKT), JAK 26 (Rawamangun), JAK 35 (Rawamangun), JAK 42 (Kampung Melayu)" },
        { name: "Komplek Abadi 2", type: "busstop_area", coords: [106.90811386607544, -6.229721567389249], desc: "11Q (Kampung Melayu via BKT), JAK 26 (Rawamangun), JAK 35 (Rawamangun), JAK 42 (Kampung Melayu)" },
        { name: "Komplek Abadi 1", type: "busstop_area", coords: [106.90791538261222, -6.229588248872304], desc: "11Q (Pulo Gebang via BKT), JAK 26 (Duren Sawit), JAK 35 (Pangkalan Jati), JAK 42 (Pondok Kelapa)" },
        { name: "Komplek Wijaya Kusuma 1", type: "busstop_area", coords: [106.90529754662016, -6.229572250655908], desc: "11Q (Pulo Gebang via BKT), JAK 26 (Duren Sawit), JAK 35 (Pangkalan Jati), JAK 42 (Pondok Kelapa)" },
        { name: "Komplek Wijaya Kusuma 2", type: "busstop_area", coords: [106.90494885945503, -6.229689570956191], desc: "11Q (Kampung Melayu via BKT), JAK 26 (Rawamangun), JAK 35 (Rawamangun), JAK 42 (Kampung Melayu)" },
        { name: "Jln. Mesjid Abidin", type: "busstop_area", coords: [106.90194478535524, -6.2294549303278774], desc: "11Q (Pulo Gebang via BKT), JAK 26 (Duren Sawit)" },
        { name: "Jln. Melati Bhakti", type: "busstop_area", coords: [106.90147271657783, -6.229582916137309], desc: "11Q (Kampung Melayu via BKT), JAK 26 (Rawamangun), JAK 35 (Rawamangun), JAK 42 (Kampung Melayu)" },
        { name: "Sbr. SMPN 195", type: "busstop_area", coords: [106.90987584895811, -6.230897612797323], desc: "11P (Rusun Pondok Bambu), JAK 02 (Duren Sawit), JAK 26 (Duren Sawit)" },
        { name: "Duren Sawit", type: "busstop_area", coords: [106.91006051942696, -6.233312825764764], desc: "11P (Rusun Pondok Bambu), JAK 02 (Kampung Melayu), JAK 26 (Rawamangun)" },
        { name: "Gereja Santa Anna 1", type: "busstop_area", coords: [106.90996241323238, -6.233897982588244], desc: "11P (Walikota Jakarta Timur), JAK 02 (Duren Sawit), JAK 85 (Bintara)" },
        { name: "Gereja Santa Anna 2", type: "busstop_area", coords: [106.91017593847307, -6.234001245485681], desc: "11P (Rusun Pondok Bambu), JAK 02 (Kampung Melayu), JAK 85 (Bintara)" },
        { name: "Jln. Bambu Ori I", type: "busstop_area", coords: [106.90789641222092, -6.239066839410937], desc: "JAK 02 (Duren Sawit)" },
        { name: "Jln. Bambu Ori Raya", type: "busstop_area", coords: [106.90767654890165, -6.239117745147692], desc: "JAK 02 (Kampung Melayu)" },
        { name: "Sekolah Tunas Cemerlang", type: "busstop_area", coords: [106.90498617528901, -6.238971591297629], desc: "JAK 02 (Duren Sawit), JAK 35 (Rawamangun)" },
        { name: "Simpang Gading Raya", type: "busstop_area", coords: [106.90515343412582, -6.239048330465262], desc: "JAK 02 (Kampung Melayu), JAK 35 (Pangkalan Jati)" },
        { name: "Ps. Pondok Bambu I", type: "busstop_area", coords: [106.90241828961786, -6.238095633807914], desc: "JAK 02 (Duren Sawit)" },
        { name: "Ps. Pondok Bambu II", type: "busstop_area", coords: [106.90254991194539, -6.238175277357896], desc: "JAK 02 (Kampung Melayu)" },

        // Additional Stops (User Requested)
        { name: "Sbr. TDP", type: "busstop_area", coords: [106.90947094092778, -6.245595773709065], desc: "JAK 85 (Cipinang Indah)" },
        { name: "TDP", type: "busstop_area", coords: [106.90956794194082, -6.245467206652426], desc: "JAK 85 (Bintara)" },
        { name: "PAUD Bintang Pondok Bambu", type: "busstop_area", coords: [106.90574588354163, -6.245352032567784], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Masjid Alhikmah Duren Sawit", type: "busstop_area", coords: [106.91259978031087, -6.2399748653792155], desc: "JAK 85 (Bintara)" },
        { name: "Sbr. Masjid Alhikmah Duren Sawit", type: "busstop_area", coords: [106.91259689551477, -6.240068065772836], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Simpang Selat Bali Makasar", type: "busstop_area", coords: [106.91499430640648, -6.239988527254732], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Simpang Selat Makasar Bali", type: "busstop_area", coords: [106.91490854104121, -6.239966494486242], desc: "JAK 85 (Bintara)" },
        { name: "PAUD Tunas Bahari", type: "busstop_area", coords: [106.91507691044416, -6.236993754022584], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Sbr. PAUD Tunas Bahari", type: "busstop_area", coords: [106.91496643199088, -6.236812934783234], desc: "JAK 85 (Bintara)" },
        { name: "Sbr. Jln. Selat Potinti", type: "busstop_area", coords: [106.91641644340793, -6.236080701447623], desc: "JAK 85 (Bintara)" },
        { name: "Jln. Selat Potinti", type: "busstop_area", coords: [106.91631461171373, -6.236135738640814], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Masjid Jami Al Falah Duren Sawit", type: "busstop_area", coords: [106.91708070172834, -6.236493924400605], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Sbr. Al Khairiyah School", type: "busstop_area", coords: [106.91761336250802, -6.236511109434822], desc: "JAK 85 (Bintara)" },
        { name: "Al Khairiyah School", type: "busstop_area", coords: [106.9175955229553, -6.236619483725685], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Pansoshan Anak Putra Utama I", type: "busstop_area", coords: [106.91842995408068, -6.237050446069253], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Puri Swadaya", type: "busstop_area", coords: [106.91961108482896, -6.237169180180937], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Jln. 26", type: "busstop_area", coords: [106.92188177861033, -6.238169702983427], desc: "JAK 85 (Cipinang Indah)" },
        { name: "Simpang Jln. 26 Selatan", type: "busstop_area", coords: [106.92217428032097, -6.238376606047682], desc: "JAK 85 (Cipinang Indah), JAK 99 (Term. Pulo Gadung)" },
        { name: "Simpang Jln. 26 Utara", type: "busstop_area", coords: [106.9222513968821, -6.238121072972974], desc: "JAK 85 (Bintara), JAK 99 (Term. Pulo Gadung)" },
        { name: "Masjid An Nur Khadijah", type: "busstop_area", coords: [106.92261361102574, -6.236281231078782], desc: "JAK 99 (Lampiri)" },
        { name: "Rukan Radin Inten II", type: "busstop_area", coords: [106.92283093951382, -6.235581996555973], desc: "JAK 85 (Cipinang Indah), JAK 99 (Lampiri)" },
        { name: "Sbr. Rukan Radin Inten II", type: "busstop_area", coords: [106.92267203266195, -6.235479782794268], desc: "JAK 85 (Bintara), JAK 99 (Term. Pulo Gadung)" },
        { name: "Wira Purusa", type: "busstop_area", coords: [106.92267203266324, -6.23220893183247], desc: "JAK 85 (Cipinang Indah), JAK 99 (Lampiri)" },
        { name: "Sbr. Wira Purusa", type: "busstop_area", coords: [106.92247807282938, -6.23227630041592], desc: "JAK 85 (Bintara), JAK 99 (Term. Pulo Gadung)" },
        { name: "Taman Duren Sawit", type: "busstop_area", coords: [106.92153176950681, -6.240323057047661], desc: "7P (Pondok Kelapa), JAK 84 (Kapin), JAK 99 (Term. Pulo Gadung)" },
        { name: "SPBU Radin Intan II", type: "busstop_area", coords: [106.92070410800287, -6.241815702967298], desc: "JAK 84 (Kapin), JAK 99 (Term. Pulo Gadung)" },
        { name: "KWK Unkermil Timur II", type: "busstop_area", coords: [106.91985315998554, -6.245682676103567], desc: "7P (Pondok Kelapa), JAK 84 (Kapin), JAK 99 (Lampiri)" },
        { name: "Embun Pagi Islamic School", type: "busstop_area", coords: [106.91891198051582, -6.247701246964599], desc: "7P (Pondok Kelapa), JAK 84 (Kapin)" },
        { name: "Sbr. Embun Pagi Islamic School", type: "busstop_area", coords: [106.91893477377356, -6.2478674046911], desc: "7P (Cawang Cililitan), JAK 84 (Kampung Melayu)" },
        { name: "Polsek Duren Sawit", type: "busstop_area", coords: [106.91726924920914, -6.247817391739811], desc: "7P (Pondok Kelapa), JAK 84 (Kapin)" },
        { name: "Sbr. Polsek Duren Sawit", type: "busstop_area", coords: [106.91674247185958, -6.248008724822654], desc: "7P (Cawang Cililitan), JAK 84 (Kampung Melayu)" },
        { name: "Komplek Dolog Jaya", type: "busstop_area", coords: [106.915706645257, -6.247930681075355], desc: "7P (Pondok Kelapa), JAK 84 (Kapin)" },
        { name: "Sbr. Komplek Dolog Jaya", type: "busstop_area", coords: [106.91592444743038, -6.248116979037641], desc: "7P (Cawang Cililitan), JAK 84 (Kampung Melayu)" },
        { name: "Laut Banda", type: "busstop_area", coords: [106.9134265245079, -6.233538245403255], desc: "JAK 02 (Duren Sawit), JAK 26 (Rawamangun)" },
        { name: "Kel. Duren Sawit", type: "busstop_area", coords: [106.91419513267068, -6.230806710151325], desc: "JAK 02 (Duren Sawit), JAK 26 (Rawamangun)" }
    ],
    routes: [
        // BRT
        {
            id: "11",
            code: "11",
            mode: "brt",
            name: "Pulo Gebang - Kampung Melayu",
            badgeColor: "#2F4FA2",
            details: {
                tarif: "Rp 3.500",
                tarifNote: "Rp 2.000 (05.00 - 07.00)",
                headway: "7 Menit",
                ops: "00.00 - 23.59 (24 Jam)",
                heroImage: "assets/images/foto11.jpg"
            },
            directions: [
                {
                    name: "Full Route",
                    stops: [
                        { name: "Kampung Melayu", transfers: ["5", "5C", "7", "11", "B25"] },
                        { name: "Jatinegara", transfers: ["5", "5B", "5C", "11", "B25"] },
                         { 
                            name: "Stasiun Jatinegara", 
                            transfers: ["11M", "B25"], 
                            icons: ["icon-train.svg","KAJJ.svg"],
                            halteInfo: {
                                type: "stasiun",
                                halte: ["Jatinegara"],
                                routes: ["C | Cikarang"]
                            }
                         },
                        { name: "Flyover Jatinegara", transfers: ["4K", "10", "B25"] },
                        { name: "Pasar Enjo", transfers: ["11M"] },
                        { name: "Flyover Cipinang", transfers: ["11M"] },
                        { name: "Cipinang", transfers: ["11M"] },
                        { 
                            name: "Stasiun Klender", 
                            transfers: ["11M", "C | Cikarang"], 
                            icons: ["icon-train.svg"],
                            halteInfo: {
                                type: "stasiun",
                                halte: ["Klender"],
                                routes: ["C | Cikarang"]
                            }
                        },
                        { name: "Klender", transfers: ["11M"] },
                        { name: "Kampung Sumur", transfers: ["11M"] },
                        { name: "Buaran", transfers: ["11M"] },
                        { 
                            name: "Simpang Buaran", 
                            transfers: ["11M", "C | Cikarang"], 
                            icons: ["icon-train.svg"], 
                            isActive: true, 
                            label: "Terdekat",
                            halteInfo: {
                                type: "stasiun",
                                halte: ["Buaran"],
                                routes: ["C | Cikarang"]
                            }
                        },
                        { name: "Flyover Pondok Kopi", transfers: ["11M"] },
                        { name: "Penggilingan", transfers: ["11D", "11M"] },
                        { name: "Walikota Jakarta Timur", transfers: ["11D", "11M"] },
                        { name: "Pulo Gebang", transfers: ["11D"] }
                    ]
                }
            ]
        },

        // N-BRT
        {
            id: "4F",
            code: "4F",
            mode: "nbrt",
            name: "Pinang Ranti - Pulo Gadung",
            badgeColor: "#b900e2",
            details: {
                tarif: "Rp 3.500",
                tarifNote: "Rp 2.000 (05.00 - 07.00)",
                headway: "16 Menit",
                ops: "05.00 - 22.00",
                heroImage: "assets/images/foto4f.jpg"
            },
            directions: [
                {
                    name: "Arah Pulo Gadung",
                    stops: [
                        { name: "Term. Pinang Ranti", transfers: ["JAK 19", "JAK 71"] },
                        { name: "Asrama Haji Pondok Gede", transfers: ["JAK 19"] },
                        { name: "RS Haji Jakarta", transfers: [] },
                        { name: "Sbr. Ps. Gardu", transfers: ["JAK 20"] },
                        { name: "Bacang Lubang Buaya", transfers: ["JAK 20"] },
                        { name: "Lakesgilut TNI AU 1", transfers: ["JAK 20"] },
                        { name: "TK Angkasa 8", transfers: ["JAK 20"] },
                        { name: "Komplek Dirgantara III Halim PK", transfers: ["JAK 06", "JAK 20"] },
                        { name: "Griya Kukila Halim Perdana Kusuma", transfers: ["JAK 06"] },
                        { name: "Pondok Molek", transfers: ["JAK 06"] },
                        { name: "Simpang Raya Pondok Gede 2", transfers: ["JAK 06"] },
                        { name: "SMPN 6 Bekasi", transfers: ["JAK 06"] },
                        { name: "Lapangan Pondok Gede", transfers: [] },
                        { name: "Kec. Pondok Gede", transfers: [] },
                        { name: "Giant Pondok Gede 2", transfers: [] },
                        { name: "Jl. Sejahtera", transfers: [] },
                        { name: "Jl. Jaya Abadi", transfers: [] },
                        { name: "Jn. Bina Lontar 1", transfers: [] },
                        { name: "UNKRIS", transfers: [] },
                        { name: "Univ. Islam As Syafiiyah", transfers: [] },
                        { name: "Gerbang Tol Pondok Gede", transfers: [] },
                        { name: "Jl. Pangkalan Jati VI", transfers: ["JAK 35"] },
                        { name: "Perumahan TNI AU 2", transfers: ["JAK 35"] },
                        { name: "Naga Jatiwaringin", transfers: ["JAK 35"] },
                        { name: "Pospol Makasar", transfers: ["7P", "JAK 35", "JAK 84", "JAK 85"], isActive: true, label: "Terdekat" },
                        { name: "Simpang Kalimalang", transfers: [], isActive: true },
                        { name: "Jl. Damai", transfers: [] },
                        { name: "Simpang Pondok Bambu Batas 3", transfers: ["JAK 02"] },
                        { name: "Simpang Pahlawan Revolusi 1", transfers: ["JAK 02"], isActive: true },
                        { name: "SMAN 61", transfers: [] },
                        { name: "Sbr. Komplek Beacukai Pondok Bambu", transfers: [] },
                        { name: "RSIA Bunda Aliyah 2", transfers: [] },
                        { name: "Pajak dan Retribusi Duren Sawit", transfers: [] },
                        { name: "Yayasan Perguruan Rakyat 2", transfers: ["JAK 42", "JAK 74"] },
                        { name: "STIE Trianandra", transfers: ["JAK 42", "JAK 74", "JAK 105"] },
                        { name: "Sbr. Balai Rakyat", transfers: ["JAK 26", "JAK 35", "JAK 42", "JAK 105"] },
                        { name: "Gg. Randu", transfers: ["JAK 26", "JAK 35", "JAK 42", "JAK 106"] },
                        { name: "Jl. Cipinang Muara III", transfers: ["JAK 26", "JAK 35", "JAK 106"] },
                        { name: "Sbr. Jln. Kapuk II", transfers: ["JAK 26", "JAK 35", "JAK 74"] },
                        { name: "Sbr. Ps. Klender", transfers: ["JAK 26", "JAK 34", "JAK 35"] },
                        { name: "Tanah Koja", transfers: ["4E", "11W", "JAK 26", "JAK 34", "JAK 35"] },
                        { name: "Jl. Arus Jati", transfers: ["4E", "11W", "JAK 26", "JAK 34", "JAK 35"] },
                        { name: "Pool Hiba Utama 2", transfers: ["4E", "11W", "JAK 26", "JAK 34", "JAK 35"] },
                        { name: "Transjakarta Pool Klender", transfers: ["4E", "11W", "JAK 26", "JAK 34", "JAK 35"] },
                        { name: "Pool Mayasari Bakti", transfers: ["4E", "11W"] },
                        { name: "Pool PPD Kec. Pulo Gadung", transfers: ["4E", "11W"] },
                        { name: "SD Jatinegara Kaum", transfers: ["4E", "11W"] },
                        { name: "Masjid Assuada", transfers: ["4E", "11W"] },
                        { name: "JIEP 2", transfers: ["4E", "11W"] },
                        { name: "Pintu Kawasan 2", transfers: ["4E", "4K", "JAK 17", "JAK 41"] },
                        { name: "Ps. Pulo Gadung 2", transfers: ["4E", "4K", "JAK 17", "JAK 41"] },
                        { name: "PKB Pulo Gadung", transfers: ["4E", "4K", "JAK 17", "JAK 41"] },
                        { name: "Pulo Gadung 4", transfers: ["4E", "4K", "JAK 17"] },
                        { name: "Term. Pulo Gadung", transfers: ["2B", "4E", "4K", "11D", "11W"] }
                    ]
                },
                {
                    name: "Arah Pinang Ranti",
                    stops: [
                        { name: "Term. Pulo Gadung", transfers: ["2B", "2F", "4E", "4K", "11D", "11W"] },
                        { name: "Gg. Suzuki", transfers: ["4E", "4K", "JAK 17", "JAK 41"] },
                        { name: "Ananda Pulo Gadung", transfers: ["4E", "4K", "JAK 17", "JAK 41"] },
                        { name: "Ps. Pulo Gadung 1", transfers: ["4E", "4K", "JAK 17"] },
                        { name: "Pintu Kawasan 1", transfers: ["4C", "4E", "4K", "JAK 17"] },
                        { name: "JIEP 1", transfers: ["4E", "11W"] },
                        { name: "Puskesmas Cakung", transfers: ["4E", "11W"] },
                        { name: "Jatinegara Kaum Raya Bekasi", transfers: ["4E", "11W", "JAK 34", "JAK 35"] },
                        { name: "Pool Hiba Utama 1", transfers: ["4E", "11W", "JAK 26", "JAK 34", "JAK 35"] },
                        { name: "Jl. Swadaya PLN", transfers: ["4E", "11W", "JAK 26", "JAK 34", "JAK 35"] },
                        { name: "Ps. Klender", transfers: ["4E", "JAK 26", "JAK 34", "JAK 35"] },
                        { name: "Jl. Kapuk 2", transfers: ["JAK 26", "JAK 35"] },
                        { name: "Jl. Kapuk 3", transfers: ["JAK 26", "JAK 35"] },
                        { name: "Jl. Dermaga Raya", transfers: ["JAK 26", "JAK 35", "JAK 106"] },
                        { name: "Koperasi Serba Usaha", transfers: ["JAK 26", "JAK 35", "JAK 42", "JAK 106"] },
                        { name: "Jl. Balai Rakyat", transfers: ["JAK 42", "JAK 105"] },
                        { name: "Yayasan Perguruan Rakyat 1", transfers: ["JAK 42"] },
                        { name: "Kantor Pos Pondok Bambu", transfers: [] },
                        { name: "RSIA Bunda Aliyah 1", transfers: [] },
                        { name: "Komplek Beacukai Pondok Bambu", transfers: [] },
                        { name: "Sekolah Pusaka", transfers: [] },
                        { name: "Simpang Pahlawan Revolusi 2", transfers: ["JAK 02"], isActive: true, label: "Terdekat" },
                        { name: "Jl. Keamanan", transfers: ["JAK 02"] },
                        { name: "Simpang Pondok Bambu Batas 4", transfers: ["JAK 02"] },
                        { name: "Sbr. Jln. Damai", transfers: [] },
                        { name: "Jl. Masjid Al Wustho", transfers: ["JAK 35"] },
                        { name: "Pangkalan Jati 1", transfers: ["JAK 35", "JAK 84"], isActive: true, label: "Terdekat" },
                        { name: "RS Harum", transfers: ["7P", "JAK 35", "JAK 84"], isActive: true },
                        { name: "Pangkalan Jati", transfers: ["JAK 35"] },
                        { name: "Perumahan TNI AU 1", transfers: ["JAK 35"] },
                        { name: "Sbr. Jln. Pangkalan Jati VI", transfers: [] },
                        { name: "Jl. Anugrah Raya", transfers: [] },
                        { name: "UIA Kampus 2", transfers: [] },
                        { name: "Sekolah Yadika Jatiwaringin", transfers: [] },
                        { name: "Jl. Rawa Indah", transfers: [] },
                        { name: "Jl. Setia 1", transfers: [] },
                        { name: "Sekolah Fadlurrahman", transfers: [] },
                        { name: "Bumi Jatiwaringin", transfers: [] },
                        { name: "Jl. Gamprit Raya", transfers: [] },
                        { name: "Giant Pondok Gede 1", transfers: [] },
                        { name: "Sbr. Koramil Pondok Gede", transfers: ["JAK 06"] },
                        { name: "Ps. Pondok Gede", transfers: ["JAK 06"] },
                        { name: "Simpang Raya Pondok Gede 1", transfers: ["JAK 06"] },
                        { name: "Ruko Molek", transfers: ["JAK 06"] },
                        { name: "Monumen Pancasila Sakti", transfers: ["JAK 06"] },
                        { name: "Jl. Kramat Pangeran Syarif", transfers: ["JAK 20"] },
                        { name: "Lakesgilut TNI AU 2", transfers: ["JAK 20"] },
                        { name: "Jl. Bacang Lubang Buaya", transfers: ["JAK 20"] },
                        { name: "Ps. Gardu", transfers: [] },
                        { name: "Sbr. RS Haji Jakarta", transfers: [] },
                        { name: "SPBU Pinang Ranti 2", transfers: ["JAK 19"] },
                        { name: "Term. Pinang Ranti", transfers: ["JAK 19", "JAK 71"] }
                    ]
                }
            ]
        },
        {
            id: "7P",
            code: "7P",
            mode: "nbrt",
            name: "Pondok Kelapa - Cawang Cililitan",
            badgeColor: "#911d3c",
            details: {
                tarif: "Rp 3.500",
                tarifNote: "Rp 2.000 (05.00 - 07.00)",
                headway: "11 Menit",
                ops: "05.00 - 22.00",
                opsNote: "05.00 (Pondok Kelapa), 05.30 (Cawang Cililitan) - 21.30 (Pondok Kelapa), 22.00 (Cawang Cililitan)",
                heroImage: "assets/images/foto7p.jpg"
            },
            directions: [
                {
                    name: "Arah Cawang Cililitan",
                    stops: [
                        { name: "Klapa Village Pondok Kelapa", transfers: ["JAK 39", "JAK 42"] },
                        { name: "Sbr. SMPN 252", transfers: ["JAK 39"] },
                        { name: "SDN Pondok Kelapa 05", transfers: ["JAK 39"] },
                        { name: "Komplek DDN Bintara Jaya", transfers: ["JAK 39"] },
                        { name: "Sbr. Jln. Swakarsa III", transfers: ["JAK 39"] },
                        { name: "RSU Dr Euis", transfers: ["JAK 39"] },
                        { name: "PPKD Jakarta Timur", transfers: ["JAK 39"] },
                        { name: "Jl. Pondok Kelapa Selatan", transfers: ["JAK 99"] },
                        { name: "Kapin", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Embun Pagi Islamic Elementary School", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Sekolah Pami Jaya", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Jl. Curug Raya Kalimalang", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Sbr. Pondok Kelapa Indah 2", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Sbr. Pondok Kelapa Indah", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Sbr. Embun Pagi Islamic School", transfers: ["JAK 84"] },
                        { name: "Sbr. Polsek Duren Sawit", transfers: ["JAK 84"] },
                        { name: "Sbr. Komplek Dolog Jaya", transfers: ["JAK 84"] },
                        { name: "RS Harum", transfers: ["4F", "JAK 35", "JAK 84", "JAK 85"], isActive: true, label: "Terdekat" },
                        { name: "Pangkalan Jati 2", transfers: ["JAK 35", "JAK 84", "JAK 85"] },
                        { name: "Pospol Makasar", transfers: ["4F", "JAK 35", "JAK 84", "JAK 85"], isActive: true, label: "Terdekat" },
                        { name: "Komplek Pusbinal", transfers: [] },
                        { name: "Universitas Borobudur 4", transfers: ["JAK 84", "JAK 85"] },
                        { name: "universitas Borobudur 2", transfers: ["JAK 02", "JAK 84", "JAK 85"] },
                        { name: "Mall Cipinang Indah 2", transfers: ["JAK 02", "JAK 84", "JAK 85"] },
                        { name: "Jl. Masjid Almuqorrobin Kalimalang", transfers: ["JAK 84"] },
                        { name: "Jl. Cipinang Tengah", transfers: ["JAK 84"] },
                        { name: "Cipinang Melayu Kalimalang", transfers: ["JAK 84"] },
                        { name: "Cipinang Melayu Kalimalang 2", transfers: ["JAK 84"] },
                        { name: "Cipinang Melayu Kalimalang 3", transfers: ["JAK 84"] },
                        { name: "Lion Center", transfers: ["JAK 22"] },
                        { name: "Halim PK", transfers: ["4K", "JAK 22"] },
                        { name: "Simpang Cawang", transfers: ["9N", "10"] },
                        { name: "Cawang Sentral 1 Polypaint", transfers: ["7W", "JAK 20", "JAK 75", "D11"] },
                        { name: "Transjakarta Pintu 1", transfers: ["7W", "JAK 20", "JAK 75"] },
                        { name: "Cawang Cililitan", transfers: ["5C", "7", "7Q", "9A", "10"] }
                    ]
                },
                {
                    name: "Arah Pondok Kelapa",
                    stops: [
                        { name: "Cawang Cililitan", transfers: ["5C", "7", "7Q", "9A", "10"] },
                        { name: "Cawang Sentral 2", transfers: ["7W", "D11", "JAK 75"] },
                        { name: "Simpang Cawang", transfers: ["9N", "10"] },
                        { name: "Ps. Ciplak", transfers: ["JAK 22"] },
                        { name: "KKDM", transfers: ["JAK 84"] },
                        { name: "Jl. Panca Warga IV", transfers: ["JAK 84"] },
                        { name: "Jl. Kesadaran Kalimalang", transfers: ["JAK 84"] },
                        { name: "Masjid Jami Assyakirin Kalimalang", transfers: ["JAK 84"] },
                        { name: "Jl. Cipinang Bali III", transfers: ["JAK 84"] },
                        { name: "Mall Cipinang Indah 1", transfers: ["JAK 02", "JAK 84", "JAK 85"] },
                        { name: "Universitas Borobudur 1", transfers: ["JAK 02", "JAK 84", "JAK 85"] },
                        { name: "Universitas Borobudur 3", transfers: ["JAK 84", "JAK 85"] },
                        { name: "Taman Pangkalan Jati Kalimalang", transfers: ["JAK 35", "JAK 84", "JAK 85"] },
                        { name: "Pangkalan Jati 1", transfers: ["JAK 35", "JAK 84"], isActive: true },
                        { name: "Megatama", transfers: ["JAK 35", "JAK 84"] },
                        { name: "Kavling Agraria Duren Sawit", transfers: ["JAK 35", "JAK 84"] },
                        { name: "Komplek Dolog Jaya", transfers: ["JAK 35", "JAK 84"] },
                        { name: "Polsek Duren Sawit", transfers: ["JAK 84"] },
                        { name: "Embun Pagi Islamic School", transfers: ["JAK 84"] },
                        { name: "SMK Swadaya Global School", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Taman Duren Sawit", transfers: ["JAK 84", "JAK 99"] },
                        { name: "KWK Unkermil Timur II", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Simpang Radin Inten II Kalimalang", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Pondok Kelapa Indah", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Curug Kalimalang", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Kav. Marinir Kalimalang", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Billy Moon 2", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Billy Moon", transfers: ["JAK 84", "JAK 99"] },
                        { name: "Pondok Kelapa Raya Kalimalang", transfers: ["JAK 99"] },
                        { name: "H. Naman Noer Ali", transfers: ["JAK 39"] },
                        { name: "Sbr. PPKD Jakarta Timur", transfers: ["JAK 39"] },
                        { name: "Jl. Swakarsa III Pondok Kelapa", transfers: ["JAK 39"] },
                        { name: "Sbr. Komplek DDN Bintara Jaya", transfers: ["JAK 39"] },
                        { name: "Sbr. SDN Pondok Kelapa 05", transfers: ["JAK 39"] },
                        { name: "SMPN 252", transfers: ["JAK 39"] },
                        { name: "Klapa Village Pondok Kelapa", transfers: ["JAK 39", "JAK 42"] }
                    ]
                }
            ]
        },
        {
            id: "11Q",
            code: "11Q",
            mode: "nbrt",
            name: "Pulo Gebang - Kampung Melayu via BKT",
            badgeColor: "#10c0ff",
            details: {
                tarif: "Rp 3.500",
                tarifNote: "Rp 2.000 (05.00 - 07.00)",
                headway: "12 Menit",
                headwayNote: "Situasional",
                ops: "05.00 - 22.00",
                heroImage: "assets/images/foto11q.jpg"
            },
            directions: [
                {
                    name: "Arah Kampung Melayu",
                    stops: [
                        { name: "Pulo Gebang", transfers: ["11", "11D"] },
                        { name: "Walikota Jakarta Timur 2", transfers: ["11B", "11P", "JAK 100"] },
                        { name: "Penggilingan 2", transfers: ["11B", "11P", "11R", "JAK 100"] },
                        { name: "Perumnas Klender 1", transfers: ["11P"] },
                        { name: "Rusun Klender", transfers: ["11P"] },
                        { name: "Flyover Radin Inten 1", transfers: ["11P", "JAK 39"] },
                        { name: "SMKN 48", transfers: ["11P", "JAK 39"] },
                        { name: "Sbr. Budhaya Santo Agustinus", transfers: ["11P", "JAK 99"] },
                        { name: "Gedung Senam", transfers: ["11P", "JAK 99"] },
                        { name: "Taman UT Aheme", transfers: ["11P"] },
                        { name: "Masjid Jami Nurul Ain 2", transfers: ["11P"] },
                        { name: "Sbr. Swadaya Raya", transfers: ["11P", "JAK 42"] },
                        { name: "Jl. Kel. Raya", transfers: ["11P", "JAK 02", "JAK 26", "JAK 42"], isActive: true },
                        { name: "Masjid Jami Al Barkah 2", transfers: ["11P", "JAK 02", "JAK 26", "JAK 42"] },
                        { name: "RS Duren Sawit", transfers: ["JAK 26", "JAK 35", "JAK 42"] },
                        { name: "Komplek Abadi 2", transfers: ["JAK 26", "JAK 35", "JAK 42"] },
                        { name: "Komplek Wijaya Kusuma 2", transfers: ["JAK 26", "JAK 35", "JAK 42"] },
                        { name: "Jl. Melati Bhakti", transfers: ["JAK 26", "JAK 35", "JAK 42"] },
                        { name: "Masjid Jami At Taqwa 2", transfers: [] },
                        { name: "Cipinang Indah", transfers: [] },
                        { name: "Simpang Perintis 2", transfers: [] },
                        { name: "SMAN 100", transfers: [] },
                        { name: "Nusantara", transfers: [] },
                        { name: "Sbr. Ps. Inpres Cipinang Besar", transfers: ["JAK 84"] },
                        { name: "Mall Basura 2", transfers: ["JAK 84", "JAK 105"] },
                        { name: "Awab Dalam", transfers: ["JAK 84"] },
                        { name: "Sekolah Cahaya Sakti Otista I", transfers: ["JAK 41"] },
                        { name: "Bidara Cina 1", transfers: ["JAK 02"] },
                        { name: "Bidara Cina 2", transfers: ["JAK 02"] },
                        { name: "Term. Kampung Melayu 4", transfers: [] }
                    ]
                },
                {
                    name: "Arah Pulo Gebang",
                    stops: [
                        { name: "Term. Kampung Melayu 4", transfers: [] },
                        { name: "Rusun Jatinegara Barat", transfers: ["5B", "5M", "11M", "JAK 106"] },
                        { name: "RS Hermina", transfers: ["5B", "5M", "11M", "JAK 106"] },
                        { name: "Santa Maria", transfers: ["5B", "5M", "11M", "JAK 106"] },
                        { name: "Bukit Duri", transfers: ["5B", "5M", "11M", "JAK 106"] },
                        { name: "SMPN 14", transfers: ["5M", "11M", "11Q"] },
                        { name: "Jatinegara RS Premier 1", transfers: ["JAK 41", "JAK 42"] },
                        { name: "Masjid Jami Al Inayah", transfers: ["JAK 84"] },
                        { name: "Mall Basura 1", transfers: ["JAK 84", "JAK 105"] },
                        { name: "Ps. Inpres Cipinang Besar", transfers: [] },
                        { name: "Hero Basuki Rahmat", transfers: [] },
                        { name: "Simpang Perintis 1", transfers: [] },
                        { name: "Cipinang BKT", transfers: [] },
                        { name: "Masjid Jami At Taqwa 1", transfers: [] },
                        { name: "Jl. Mesjid Abidin", transfers: ["JAK 26"] },
                        { name: "Komplek Wijaya Kusuma 1", transfers: ["JAK 26", "JAK 35", "JAK 42"] },
                        { name: "Komplek Abadi 1", transfers: ["JAK 26", "JAK 35", "JAK 42"] },
                        { name: "Baladewa Residence", transfers: ["11P", "JAK 42"] },
                        { name: "Masjid Jami Al Barkah 1", transfers: ["11P", "JAK 42"] },
                        { name: "Jl. Serdang", transfers: ["11P", "JAK 39", "JAK 42"], isActive: true },
                        { name: "Jl. Swadaya Raya", transfers: ["11P", "JAK 39"] },
                        { name: "Masjid Jami Nurul Ain 1", transfers: ["11P"] },
                        { name: "Jl. H. Aman", transfers: ["11P", "JAK 99"] },
                        { name: "Wisma Atlet Radin Inten", transfers: ["11P", "JAK 99"] },
                        { name: "Budhaya Santo Agustinus", transfers: ["11P", "JAK 99"] },
                        { name: "Dinas Kebersihan Duren Sawit", transfers: ["11P", "JAK 39", "JAK 99"] },
                        { name: "Buaran Plaza", transfers: ["11P", "JAK 39"] },
                        { name: "Taman Buaran Indah", transfers: ["11P", "JAK 39"] },
                        { name: "Flyover Radin Inten 2", transfers: ["11P", "JAK 39", "C | Cikarang"] },
                        { name: "Perumnas Klender 2", transfers: ["11P", "JAK 39"] },
                        { name: "Penggilingan 1", transfers: ["11B", "11P", "11R", "JAK 100"] },
                        { name: "Walikota Jakarta Timur 1", transfers: ["11B", "11P", "JAK 100"] },
                        { name: "Pulo Gebang", transfers: ["11", "11D"] }
                    ]
                }
            ]
        },

        // Mikrotrans
        {
            id: "11P",
            code: "11P",
            mode: "mikro",
            subtype: "rusun",
            name: "Rusun Pondok Bambu - Walikota Jakarta Timur",
            badgeColor: "#B2A5A3",
            details: {
                tarif: "Rp 0 (Wajib Kartu)",
                ops: "05.00 - 21.00",
                headway: "20 Menit"
            },
            routeMapImage: "https://smk.transjakarta.co.id/aset/berkas/rute/11P-20240709.jpg",
            directions: [{ name: "Arah Walikota", stops: [{ name: "Rusun Pondok Bambu" }, { name: "Walikota Jaktim" }] }]
        },
        {
            id: "JAK02",
            code: "JAK 02",
            mode: "mikro",
            name: "Kampung Melayu - Duren Sawit",
            badgeColor: "#00b0ec",
            details: {
                tarif: "Rp 0",
                headway: "4-7 Menit (situasional)",
                ops: "05.00 - 22.00",
                heroImage: "assets/images/fotojak02.jpg"
            },
            directions: [
                {
                    name: "Arah Kampung Melayu",
                    stops: [
                        { name: "Duren Sawit", transfers: ["JAK 26", "JAK 85"] },
                        { name: "Gereja Santa Anna 2", transfers: [] },
                        { name: "Jl. Teluk Mandar 2", transfers: ["11P", "JAK 85"], isActive: true, label: "Terdekat" },
                        { name: "Jl. Bambu Ori Raya", transfers: [] },
                        { name: "Simpang Gading Raya", transfers: [] },
                        { name: "Ps. Pd. Bambu 2", transfers: [] },
                        { name: "Jl. Kejaksaan Pondok Bambu", transfers: [] },
                        { name: "Simpang Pahlawan Revolusi 2", transfers: ["4F"] },
                        { name: "Jl. Keamanan", transfers: ["4F"] },
                        { name: "Simpang Pondok Bambu Batas 4", transfers: ["4F"] },
                        { name: "Simpang Pondok Bambu Batas 3", transfers: ["4F"] },
                        { name: "Jl. Madrasah Bambu Batas", transfers: [] },
                        { name: "Univ. Borobudur 2", transfers: ["7P", "JAK 84", "JAK 85"] },
                        { name: "Mall Cipinang Indah 2", transfers: ["7P", "JAK 84", "JAK 85"] },
                        { name: "CPI Belakang 2", transfers: ["JAK 85"] },
                        { name: "Simpang Merak Cipinang Indah", transfers: ["JAK 85"] },
                        { name: "Simpang Cipinang Indah II", transfers: [] },
                        { name: "Simpang Nusa Cipinang Indah", transfers: [] },
                        { name: "Masjid Al Akhbar PWI 2", transfers: [] },
                        { name: "Jl. Majalah", transfers: [] },
                        { name: "Jl. Wijaya I", transfers: [] },
                        { name: "Gg. Haji Bunen 2", transfers: [] },
                        { name: "Jl. Panca Warga 3", transfers: [] },
                        { name: "SLBN 7 Jakarta", transfers: [] },
                        { name: "TPU Kebon Nanas 2", transfers: ["10B"] },
                        { name: "STMT Trisakti 2", transfers: ["10B"] },
                        { name: "Penas Kalimalang 2", transfers: ["4K", "10B"] },
                        { name: "SPBU Jln. DI Panjaitan", transfers: ["4K"] },
                        { name: "Jl. Otista III Komplek IV", transfers: [] },
                        { name: "Pasar Kam 2", transfers: [] },
                        { name: "Masjid Jami Attaubah 2", transfers: [] },
                        { name: "Jl. Otista III Selatan", transfers: [] },
                        { name: "Simpang Otista III Selatan", transfers: [] },
                        { name: "STIS", transfers: [] },
                        { name: "Bidara Cina 2", transfers: ["11Q"] },
                        { name: "Klinik Otista", transfers: ["5N"] },
                        { name: "Terminal Kampung Melayu", transfers: ["5", "5C", "5M", "5N", "7", "11", "JAK 41", "JAK 42", "JAK 84"] }
                    ]
                },
                {
                    name: "Arah Duren Sawit",
                    stops: [
                        { name: "Terminal Kampung Melayu", transfers: ["5", "5C", "5M", "5N", "7", "11", "JAK 41", "JAK 42", "JAK 84"] },
                        { name: "Bidara Cina 1", transfers: [] },
                        { name: "Simpang Otista III Utara", transfers: [] },
                        { name: "Jl. Otista III Utara", transfers: [] },
                        { name: "Jl. Kebon Nanas Utara", transfers: [] },
                        { name: "Masjid Jami Attaubah 1", transfers: [] },
                        { name: "Pasar Kam 1", transfers: [] },
                        { name: "Sbr. Jl. Otista III Komplek III", transfers: [] },
                        { name: "Cipinang Kebon Nanas 1", transfers: ["4K", "10B"] },
                        { name: "Kantor Kecamatan Cipinang Cempedak", transfers: [] },
                        { name: "Cipinang Kebon Nanas 2", transfers: ["4K", "10B"] },
                        { name: "STMT Trisakti 1", transfers: ["10B"] },
                        { name: "TPU Kebon Nanas 1", transfers: ["10B"] },
                        { name: "SDN Cipinang Besar Selatan", transfers: [] },
                        { name: "Jl. Catur Tunggal", transfers: [] },
                        { name: "Gg. Haji Bunen 1", transfers: [] },
                        { name: "Simpang Media Massa", transfers: [] },
                        { name: "Jl. Cakrawijaya II", transfers: [] },
                        { name: "Masjid Al Akhbar PWI 1", transfers: [] },
                        { name: "Simpang Cipinang Nusa Indah", transfers: [] },
                        { name: "Simpang Cipinang Indah I", transfers: [] },
                        { name: "Simpang Rajawali Cipinang Indah", transfers: [] },
                        { name: "CPI Belakang", transfers: ["JAK 85"] },
                        { name: "Mall Cipinang Indah 1", transfers: ["7P", "JAK 84", "JAK 85"] },
                        { name: "Univ. Borobudur 1", transfers: ["7P", "JAK 84", "JAK 85"] },
                        { name: "Jl. Leman Bambu Batas", transfers: [] },
                        { name: "Simpang Pondok Bambu Batas 1", transfers: [] },
                        { name: "Simpang Pondok Bambu Batas 3", transfers: ["4F"] },
                        { name: "Simpang Pahlawan Revolusi 1", transfers: ["4F"] },
                        { name: "Ps. Pondok Bambu 1", transfers: [] },
                        { name: "Sekolah Tunas Cemerlang", transfers: [] },
                        { name: "Jl. Bambu Ori I", transfers: [] },
                        { name: "Jl. Teluk Mandar 1", transfers: ["11P", "JAK 85"], isActive: true, label: "Terdekat" },
                        { name: "Gereja Santa Anna 1", transfers: [] },
                        { name: "Laut Banda", transfers: ["JAK 26"] },
                        { name: "Kel. Duren Sawit", transfers: ["JAK 26"] },
                        { name: "Jln. Kel. Raya", transfers: ["11P", "11Q", "JAK 26", "JAK 42"] },
                        { name: "Masjid Jami Al Barkah 2", transfers: ["11P", "11Q", "JAK 26", "JAK 42"] },
                        { name: "Sbr. SMPN 195", transfers: ["11P", "JAK 26"] },
                        { name: "RS Duren Sawit 2", transfers: ["11P", "JAK 26"] },
                        { name: "Duren Sawit", transfers: ["11P", "JAK 26"] }
                    ]
                }
            ]
        },

        {
            id: "JAK85",
            code: "JAK 85",
            mode: "mikro",
            name: "Bintara - Cipinang Indah",
            badgeColor: "#00b0ec",
            details: {
                tarif: "Rp 0",
                headway: "3-7 Menit (situasional)",
                ops: "05.00 - 22.00",
                heroImage: "assets/images/fotojak85.jpg"
            },
            directions: [
                {
                    name: "Arah Cipinang Indah",
                    stops: [
                        { name: "Jln. Bintara IV", transfers: [] },
                        { name: "Simpang Jln. Akses Tol Bintara", transfers: [] },
                        { name: "Kementerian Agama Jakarta Timur", transfers: [] },
                        { name: "Masjid Baitul Hijrah Pondok Kopi", transfers: [] },
                        { name: "Masjid Nurrohman Pondok Kopi", transfers: [] },
                        { name: "Sbr. Minimarket Pondok Kopi", transfers: ["JAK 39"] },
                        { name: "RS Islam Pondok Kopi 2", transfers: ["JAK 39"] },
                        { name: "Yayasan Al Muhajirin Pondok Kopi", transfers: ["JAK 39"] },
                        { name: "Perum Pondok Kopi Indah 2", transfers: [] },
                        { name: "Institut Teknologi Budi Utomo 2", transfers: [] },
                        { name: "Bimbel Calistung", transfers: ["JAK 34", "JAK 106"] },
                        { name: "Sbr. Masjid Assaadah Malaka Jaya", transfers: ["JAK 34"] },
                        { name: "Minimarket Pondok Kelapa", transfers: [] },
                        { name: "TPU Malaka", transfers: [] },
                        { name: "Klinik Sapta Mitra", transfers: [] },
                        { name: "Taman Malaka Selatan 1B", transfers: [] },
                        { name: "Taman Malaka Selatan 1 Gg E", transfers: [] },
                        { name: "Puskesmas Malaka Sari", transfers: [] },
                        { name: "Simpang Taman Malaka Utara Barat", transfers: [] },
                        { name: "Sbr. Taman Malaka Barat 1D", transfers: ["JAK 42"] },
                        { name: "Jln. Bojong Indah Raya Klender", transfers: [] },
                        { name: "Sbr. Univ. Darma Persada", transfers: ["JAK 42"] },
                        { name: "Wira Purusa", transfers: ["JAK 99"] },
                        { name: "Rukan Radin Inten II", transfers: ["JAK 99"] },
                        { name: "Simpang Jln. 26 Selatan", transfers: ["JAK 99"] },
                        { name: "Jln. 26", transfers: [] },
                        { name: "Puri Swadaya", transfers: [] },
                        { name: "Pansoshan Anak Putra Utama I", transfers: [] },
                        { name: "Al Khairiyah School", transfers: [] },
                        { name: "Masjid Jami Al Falah Duren Sawit", transfers: [] },
                        { name: "Jln. Selat Potinti", transfers: [] },
                        { name: "PAUD Tunas Bahari", transfers: [] },
                        { name: "Simpang Selat Bali Makasar", transfers: [] },
                        { name: "Sbr. Masjid Alhikmah Duren Sawit", transfers: [] },
                        { name: "Puskesmas Duren Sawit", transfers: [], isActive: true, label: "Terdekat" },
                        { name: "Sbr. TDP", transfers: [] },
                        { name: "PAUD Bintang Pondok Bambu", transfers: [] },
                        { name: "Simpang Pahlawan Revolusi Kalimalang", transfers: ["JAK 35"] },
                        { name: "Sbr. Taman Pangkalan Jati", transfers: [] },
                        { name: "Sbr. Komplek Pusbinal", transfers: [] },
                        { name: "Univ. Borobudur 4", transfers: ["7P", "JAK 84"] },
                        { name: "Univ. Borobudur 2", transfers: ["7P", "JAK 84"] },
                        { name: "Mall Cipinang Indah 2", transfers: ["7P", "JAK 02", "JAK 84"] },
                        { name: "CPI Belakang 2", transfers: ["JAK 02"] },
                        { name: "Simpang Merak Cipinang Indah", transfers: ["JAK 02"] },
                        { name: "CPI Belakang I", transfers: ["JAK 02"] }
                    ]
                },
                {
                    name: "Arah Bintara",
                    stops: [
                        { name: "CPI Belakang I", transfers: ["JAK 02"] },
                        { name: "Mall Cipinang Indah 1", transfers: ["7P", "JAK 02", "JAK 84"] },
                        { name: "Univ. Borobudur 1", transfers: ["7P", "JAK 02", "JAK 84"] },
                        { name: "Univ. Borobudur 3", transfers: ["7P", "JAK 02", "JAK 84"] },
                        { name: "Taman Pangkalan Jati Kalimalang", transfers: ["7P", "JAK 35", "JAK 84"] },
                        { name: "Simpang Kalimalang Pahlawan Revolusi", transfers: [] },
                        { name: "Sbr. PAUD Bintang Pondok Bambu", transfers: [] },
                        { name: "TDP", transfers: [] },
                        { name: "Rusun Pondok Bambu", transfers: ["11P"], isActive: true, label: "Terdekat" },
                        { name: "Jln. Teluk Mandar 1", transfers: ["11P", "JAK 02"] },
                        { name: "Gereja Santa Anna 1", transfers: ["JAK 02"] },
                        { name: "Duren Sawit", transfers: ["JAK 02", "JAK 26"] },
                        { name: "Gereja Santa Anna 2", transfers: ["JAK 02"] },
                        { name: "Jln. Teluk Mandar 2", transfers: ["11P", "JAK 02"] },
                        { name: "Masjid Alhikmah Duren Sawit", transfers: [] },
                        { name: "Simpang Selat Makasar Bali", transfers: [] },
                        { name: "Sbr. PAUD Tunas Bahari", transfers: [] },
                        { name: "Sbr. Jln. Selat Potinti", transfers: [] },
                        { name: "Sbr. Al Khairiyah School", transfers: [] },
                        { name: "Sbr. Pansoshan Anak Putra Utama I", transfers: [] },
                        { name: "Sbr. Puri Swadaya", transfers: [] },
                        { name: "Simpang Jln. 26 Utara", transfers: [] },
                        { name: "Sbr. Rukan Radin Inten II", transfers: ["JAK 99"] },
                        { name: "Sbr. Wira Purusa", transfers: ["JAK 99"] },
                        { name: "Univ. Darma Persada 2", transfers: ["JAK 99"] },
                        { name: "Taman Malaka Barat 1D", transfers: [] },
                        { name: "Simpang Taman Malaka Barat Utara", transfers: [] },
                        { name: "Sbr. Puskesmas Malaka Sari", transfers: [] },
                        { name: "Jln. Taman Malaka Utara 3 Gg D", transfers: [] },
                        { name: "Jln. Taman Malaka Utara Gg A", transfers: [] },
                        { name: "Sbr. Klinik Sapta Mitra", transfers: [] },
                        { name: "Sbr. TPU Malaka", transfers: [] },
                        { name: "Sbr. Minimarket Pondok Kelapa", transfers: [] },
                        { name: "Masjid Assaadah Malaka Jaya", transfers: ["JAK 34"] },
                        { name: "Simpang Mawar Merah", transfers: ["JAK 34"] },
                        { name: "Institut Teknologi Budi Utomo 1", transfers: [] },
                        { name: "Perum Pondok Kopi Indah 1", transfers: [] },
                        { name: "Perum Pondok Kopi Indah", transfers: ["JAK 39"] },
                        { name: "RS Islam Pondok Kopi 1", transfers: ["JAK 39"] },
                        { name: "Minimarket Pondok Kopi", transfers: ["JAK 39"] },
                        { name: "Akses Bawah Flyover Pondok Kopi", transfers: ["JAK 39"] },
                        { name: "St. Klender Baru", transfers: ["JAK 39", "C | Cikarang"], trainConnections: ["C"] },
                        { name: "Jln. Bintara IV", transfers: [] }
                    ]
                }
            ]
        },

        // Rail
        {
            id: "KRL-C",
            code: "C",
            mode: "krl",
            subtype: "krl",
            name: "Cikarang - Kampung Bandan",
            badgeColor: "#26baed",
            details: {
                tarif: "Rp 3.000 - Rp 13.000",
                ops: "04.00 - 24.00",
                headway: "17-30 Menit",
                headwayNote: "Situasional",
                heroImage: "assets/images/fotokrl.jpg"
            },
            directions: [
                {
                    name: "Via Manggarai",
                    stops: [
                        { name: "Cikarang", transfers: [] },
                        { name: "Metland Telaga Murni", transfers: [] },
                        { name: "Cibitung", transfers: [] },
                        { name: "Tambun", transfers: [] },
                        { name: "Bekasi Timur", transfers: [] },
                        { name: "Bekasi", transfers: [] },
                        { name: "Kranji", transfers: [] },
                        { name: "Cakung", transfers: [] },
                        { name: "Klender Baru", transfers: ["JAK 85"] },
                        { name: "Buaran", transfers: [], isActive: true, label: "Terdekat", halteInfo: { type: "terdekat", stops: [{ halte: "Simpang Buaran", routes: ["11", "11M"] }, { halte: "Flyover Radin Inten 1 & 2", routes: ["11P", "11Q", "JAK 39"] }] } },
                        { name: "Klender", transfers: [], isActive: true, halteInfo: { type: "terdekat", halte: ["Stasiun Klender"], routes: ["11", "11M"] } },
                        {
                            name: "Jatinegara",
                            transfers: [], 
                            icons: ["KAJJ.svg", "icon-bus.svg"],
                            halteInfo: {
                                type: "integrasi",
                                stops: [
                                    {
                                        halte: "Stasiun Jatinegara",
                                        routes: ["11", "11M", "B25"]
                                    },
                                    {
                                        halte: "Bali Mester",
                                        routes: ["5", "5B", "5C"]
                                    }
                                ]
                            }
                        },
                        { name: "Matraman", transfers: [], halteInfo: { type: "integrasi", halte: ["Matraman Baru"], routes: ["5", "5C", "B25"] } },
                        { name: "Manggarai", transfers: ["A | Basoetta", "B | Bogor"], trainConnections: ["A | Basoetta", "B | Bogor"] },
                        { name: "Sudirman", transfers: [], icons: ["MRT.svg", "icon-lrt.svg"], trainConnections: ["MRT", "BK"] },
                        { name: "BNI City", transfers: [] },
                        { name: "Karet", transfers: [] },
                        { name: "Tanah Abang", transfers: ["R | Rangkasbitung"], trainConnections: ["R | Rangkasbitung"] },
                        { name: "Duri", transfers: ["A | Basoetta", "T | Tangerang"], trainConnections: ["A | Basoetta", "T | Tangerang"] },
                        { name: "Angke", transfers: [] },
                        { name: "Kampung Bandan", transfers: ["TP | Tanjung Priok"], trainConnections: ["TP | Tanjung Priok"] },
                        { name: "---", transfers: [], isSeparator: true },
                        { name: "Rajawali", transfers: [] },
                        { name: "Kemayoran", transfers: [] },
                        { name: "Pasar Senen", transfers: [], icons: ["KAJJ.svg"] },
                        { name: "Gang Sentiong", transfers: [] },
                        { name: "Kramat", transfers: [] },
                        { name: "Pondok Jati", transfers: [] },
                        {
                            name: "Jatinegara",
                            transfers: [], 
                            icons: ["KAJJ.svg", "icon-bus.svg"],
                            halteInfo: {
                                type: "integrasi",
                                stops: [
                                    {
                                        halte: "Stasiun Jatinegara",
                                        routes: ["11", "11M", "B25"]
                                    },
                                    {
                                        halte: "Bali Mester",
                                        routes: ["5", "5B", "5C"]
                                    }
                                ]
                            }
                        },
                        { name: "Klender", transfers: [], isActive: true, halteInfo: { type: "terdekat", halte: ["Stasiun Klender"], routes: ["11", "11M"] } },
                        { name: "Buaran", transfers: [], isActive: true, label: "Terdekat", halteInfo: { type: "terdekat", stops: [{ halte: "Simpang Buaran", routes: ["11", "11M"] }, { halte: "Flyover Radin Inten 1 & 2", routes: ["11P", "11Q", "JAK 39"] }] } },
                        { name: "Klender Baru", transfers: ["JAK 85"] },
                        { name: "Cakung", transfers: [] },
                        { name: "Kranji", transfers: [] },
                        { name: "Bekasi", transfers: [] },
                        { name: "Bekasi Timur", transfers: [] },
                        { name: "Tambun", transfers: [] },
                        { name: "Cibitung", transfers: [] },
                        { name: "Metland Telaga Murni", transfers: [] },
                        { name: "Cikarang", transfers: [] }
                    ]
                },
                {
                    name: "Via Pasar Senen",
                    stops: [
                        { name: "Cikarang", transfers: [] },
                        { name: "Metland Telaga Murni", transfers: [] },
                        { name: "Cibitung", transfers: [] },
                        { name: "Tambun", transfers: [] },
                        { name: "Bekasi Timur", transfers: [] },
                        { name: "Bekasi", transfers: [] },
                        { name: "Kranji", transfers: [] },
                        { name: "Cakung", transfers: [] },
                        { name: "Klender Baru", transfers: ["JAK 85"] },
                        { name: "Buaran", transfers: [], isActive: true, label: "Terdekat", halteInfo: { type: "terdekat", stops: [{ halte: "Simpang Buaran", routes: ["11", "11M"] }, { halte: "Flyover Radin Inten 1 & 2", routes: ["11P", "11Q", "JAK 39"] }] } },
                        { name: "Klender", transfers: [], isActive: true, halteInfo: { type: "terdekat", halte: ["Stasiun Klender"], routes: ["11", "11M"] } },
                        {
                            name: "Jatinegara",
                            transfers: [], 
                            icons: ["KAJJ.svg", "icon-bus.svg"],
                            halteInfo: {
                                type: "integrasi",
                                stops: [
                                    {
                                        halte: "Stasiun Jatinegara",
                                        routes: ["11", "11M", "B25"]
                                    },
                                    {
                                        halte: "Bali Mester",
                                        routes: ["5", "5B", "5C"]
                                    }
                                ]
                            }
                        },
                        { name: "Pondok Jati", transfers: [] },
                        { name: "Kramat", transfers: [] },
                        { name: "Gang Sentiong", transfers: [] },
                        { name: "Pasar Senen", transfers: [], icons: ["KAJJ.svg"] },
                        { name: "Kemayoran", transfers: [] },
                        { name: "Rajawali", transfers: [] },
                        { name: "Kampung Bandan", transfers: ["TP | Tanjung Priok"], trainConnections: ["TP | Tanjung Priok"] },
                        { name: "---", transfers: [], isSeparator: true },
                        { name: "Angke", transfers: [] },
                        { name: "Duri", transfers: ["A | Basoetta", "T | Tangerang"], trainConnections: ["A | Basoetta", "T | Tangerang"] },
                        { name: "Tanah Abang", transfers: ["R | Rangkasbitung"], trainConnections: ["R | Rangkasbitung"] },
                        { name: "Karet", transfers: [] },
                        { name: "BNI City", transfers: [] },
                        { name: "Sudirman", transfers: [], icons: ["MRT.svg", "icon-lrt.svg"], trainConnections: ["MRT", "BK"] },
                        { name: "Manggarai", transfers: ["A | Basoetta", "B | Bogor"], trainConnections: ["A | Basoetta", "B | Bogor"] },
                        { name: "Matraman", transfers: [], halteInfo: { type: "integrasi", halte: ["Matraman Baru"], routes: ["5", "5C", "B25"] } },
                        {
                            name: "Jatinegara",
                            transfers: [], 
                            icons: ["KAJJ.svg", "icon-bus.svg"],
                            halteInfo: {
                                type: "integrasi",
                                stops: [
                                    {
                                        halte: "Stasiun Jatinegara",
                                        routes: ["11", "11M", "B25"]
                                    },
                                    {
                                        halte: "Bali Mester",
                                        routes: ["5", "5B", "5C"]
                                    }
                                ]
                            }
                        },
                        { name: "Klender", transfers: [], isActive: true, halteInfo: { type: "terdekat", halte: ["Stasiun Klender"], routes: ["11", "11M"] } },
                        { name: "Buaran", transfers: [], isActive: true, label: "Terdekat", halteInfo: { type: "terdekat", stops: [{ halte: "Simpang Buaran", routes: ["11", "11M"] }, { halte: "Flyover Radin Inten 1 & 2", routes: ["11P", "11Q", "JAK 39"] }] } },
                        { name: "Klender Baru", transfers: ["JAK 85"] },
                        { name: "Cakung", transfers: [] },
                        { name: "Kranji", transfers: [] },
                        { name: "Bekasi", transfers: [] },
                        { name: "Bekasi Timur", transfers: [] },
                        { name: "Tambun", transfers: [] },
                        { name: "Cibitung", transfers: [] },
                        { name: "Metland Telaga Murni", transfers: [] },
                        { name: "Cikarang", transfers: [] }
                    ]
                }
            ]
        },
        {
            id: "LRT-BK",
            code: "BK",
            mode: "lrt",
            subtype: "lrt",
            name: "Dukuh Atas - Jati Mulya",
            badgeColor: "#006838",
            details: {
                tarif: "Rp 5.000 - Rp 20.000",
                ops: "05.12 - 23.45",
                headway: "6-20 Menit",
                headwayNote: "Situasional",
                heroImage: "assets/images/fotolrt.jpg"
            },
            directions: [
                {
                    name: "Full Route",
                    stops: [
                        { name: "Dukuh Atas", transfers: ["CB | Cibubur", "BK | Bekasi"], icons: ["icon-train.svg", "MRT.svg"], trainConnections: ["C | Cikarang", "MRT", "A | Basoetta"], halteInfo: { type: "integrasi", stops: [{ halte: "Galunggung", routes: ["4", "6"] }, { halte: "Dukuh Atas", routes: ["1", "1B", "6A", "6B"] }] }, stationIntegration: { station: "Sudirman", trainLines: ["C | Cikarang"] } },
                        { name: "Setiabudi", transfers: [], halteInfo: { type: "integrasi", halte: ["Setiabudi"], routes: ["4D", "6", "6A", "6B", "6H", "6M", "13E", "L13E"] } },
                        { name: "Rasuna Said", transfers: [], halteInfo: { type: "integrasi", halte: ["Rasuna Said"], routes: ["4D", "6", "6A", "6B", "6H", "6M", "13E", "L13E"] } },
                        { name: "Kuningan", transfers: [], halteInfo: { type: "integrasi", halte: ["Kuningan"], routes: ["4D", "6", "6A", "6B", "6H", "6K", "6M", "13E", "L13E"] } },
                        { name: "Pancoran bank bjb", transfers: [], halteInfo: { type: "integrasi", halte: ["Pancoran"], routes: ["4K", "5N", "9", "9A", "9C", "9D", "13B", "P11"] } },
                        { name: "Cikoko", transfers: ["B | Bogor"], icons: ["icon-train.svg"], trainConnections: ["B | Bogor"], halteInfo: { type: "integrasi", halte: ["Cikoko"], routes: ["4K", "7D", "9", "9A", "9C"] } },
                        { name: "Ciliwung", transfers: [], halteInfo: { type: "integrasi", halte: ["Ciliwung"], routes: ["4K", "7D", "9", "9A", "9C"] } },
                        { name: "Cawang", transfers: [], halteInfo: { type: "integrasi", stops: [{ halte: "Cawang", routes: ["4K", "5C", "7", "7D", "9", "9A", "9C"] }, { halte: "BNN 1 & 2", routes: ["7W", "B11", "B21"] }] } },
                        { name: "Halim", transfers: [], icons: ["KCIC.svg"], halteInfo: { type: "stasiun", halte: ["St. Kereta Cepat Halim"], routes: ["7W"] } },
                        { name: "Jati Bening Baru", transfers: [], isActive: true, label: "Terdekat" },
                        { name: "Cikunir 1", transfers: [] },
                        { name: "Cikunir 2", transfers: [] },
                        { name: "Bekasi Barat", transfers: [] },
                        { name: "Jati Mulya", transfers: [] }
                    ]
                }
            ]
        }
    ],
    guides: [
        {
            title: "Siapkan Kartu Uang Elektronik",
            steps: [
                "**E-Money** - Bank Mandiri",
                "**Flazz** - Bank BCA",
                "**Brizzi** - Bank BRI",
                "**TapCash** - Bank BNI",
                "**JakCard** - Bank DKI",
                "Saldo minimum **Rp 5.000,-**"
            ]
        },
        {
            title: "Alternatif Pembayaran Digital",
            steps: [
                "Gunakan **QRIS Tap** pada E-wallet yang mendukung.",
                "Saldo minimum : **Rp 5.000,-**"
            ]
        },
        {
            title: "Pantau Lokasi Bus Transjakarta",
            steps: [
                "Download aplikasi **TJ: Transjakarta** di Play Store / App Store.",
                "atau bisa gunakan **Google Maps**",
                "Gunakan fitur tracking untuk melihat posisi bus secara real-time.",
                "Cek estimasi waktu kedatangan bus di halte terdekat."
            ]
        }
    ]
};

// Route Colors for Badges
window.routeColors = {
    // Mikrotrans
    "JAK": "#00b0ec",

    // N-BRT / Feeder
    "4F": "#b900e2",
    "7P": "#911d3c",
    "11Q": "#10c0ff",
    "11P": "#B2A5A3", "2F": "#B2A5A3", "10B": "#B2A5A3", "11C": "#B2A5A3", "11M": "#B2A5A3", "11R": "#B2A5A3", "11B": "#B2A5A3", "4E": "#B2A5A3",

    // BRT Transjakarta
    "1": "#d02127",
    "1B": "#2AA8A4",
    "4": "#502d5f",
    "4D": "#E58BBA",
    "4K": "#9626b5",
    "5": "#BC5827",
    "5B": "#905B3A",
    "5C": "#9cd2c6",
    "5M": "#ff5400",
    "5N": "#BC5827",
    "6": "#2ca74a",
    "6A": "#76C18A",
    "6B": "#99C175",
    "6H": "#75358C",
    "6K": "#4A8F4D",
    "6M": "#7B3669",
    "7": "#e2275b",
    "7D": "#53bbb9",
    "7W": "#a5405a",
    "7Q": "#c45438",
    "9": "#43a09a",
    "9A": "#8D9F3D",
    "9C": "#3C9F68",
    "9D": "#4DB748",
    "9N": "#783d3f",
    "10": "#8f1a1e",
    "11": "#2F4FA2",
    "11D": "#a7bae0",
    "11W": "#2d55a0",
    "13B": "#972489",
    "13E": "#761C86",
    "L13E": "#761C86",
    "P11": "#783378",
    "B11": "#D07C28",
    "B21": "#3BB59C",
    "B25": "#A9C498",
    "D11": "#669043",
    "2B": "#266e9a",
    "BK | Lin Bekasi": "#006838",
    "C | Lin Cikarang": "#26baed",

    // KRL Train Lines
    "A | Basoetta": "#262262",      // Lin Bandara Soetta
    "B | Bogor": "#ec2329",      // Lin Bogor/Nambo
    "C | Cikarang": "#26baed",      // Lin Cikarang
    "T | Tangerang": "#c25f28",      // Lin Tangerang
    "R | Rangkasbitung": "#99ca3e",      // Lin Rangkasbitung
    "TP | Tanjung Priok": "#ef509a",     // Lin Tanjung Priok
    "CB | Cibubur": "#21409a",     // Lin Cibubur
    "BK | Bekasi": "#006838",     // Lin Bekasi (LRT)
    "MRT": "#ca2047",    // MRT Lin Utara Selatan
    "KRL": "#26baed",     // Generic KRL
    "LW | Walahar" : "#b6b7b7",
    "LJ | Jatiluhur" : "#404040"
};
