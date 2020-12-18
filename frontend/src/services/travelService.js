import httpService from './httpService'

export const travelService = {
    query,
    getById,
    getNextId,
    getPrevId,
    saveTravel,
    remvoeTravel
}

const BASE_URL = '/travel';
const TRAVELS = 'TRAVELS';
var gTravels = JSON.parse(localStorage.getItem(TRAVELS)) || null;

async function query(filterBy = '') {
    const queryStr = `?filterBy=${filterBy}`
    try {
        const travels = await httpService.get(`${BASE_URL}${queryStr}`, {
            params: queryStr
        });
        gTravels = travels;
        localStorage.setItem(TRAVELS, JSON.stringify(gTravels));
        return travels;
    } catch (err) {
        return `Error From Server is: ${err}`
    }
}

async function getById(id) {
    try {
        const travel = await httpService.get(`${BASE_URL}/${id}`);
        return travel;
    } catch (err) {
        return `Error From Server is: ${err}`
    }
}

function getNextId(id) {
    console.log('Travels is:', gTravels);
    const currIdx = gTravels.findIndex(travel => travel._id === id);
    if (currIdx === gTravels.length - 1) {
        return gTravels[0]._id
    } else {
        return gTravels[currIdx + 1]._id
    }
}

function getPrevId(id) {
    const currIdx = gTravels.findIndex(travel => travel._id === id);
    if (currIdx === 0) {
        return gTravels[gTravels.length - 1]._id
    } else {
        return gTravels[currIdx - 1]._id
    }
}

async function saveTravel(travelToSave) {
    if (travelToSave._id) {
        try {
            const travel = await httpService.put(`${BASE_URL}`, travelToSave);
            return travel;
        } catch (err) {
            return `Error From Server is: ${err}`
        }
    } else {
        try {
            const travel = await httpService.post(`${BASE_URL}`, travelToSave);
            return travel;
        } catch (err) {
            return `Error From Server is: ${err}`
        }
    }
}

async function remvoeTravel(id) {
    try {
        const delleteMsg = await httpService.delete(`${BASE_URL}/${id}`);
        return delleteMsg;
    } catch (err) {
        return `Error From Server is: ${err}`
    }
}


// localStorage.setItem(TRAVELS, JSON.stringify(gTravels))

// function _makeId(length = 6) {
//     var txt = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return txt;
// }
// var gTravels = JSON.parse(localStorage.getItem(TRAVELS)) || [{
//         id: 1,
//         name: "Ein Afek",
//         type: "Nature",
//         title: "Nice place for a walk over swamp area",
//         description: "The En Afek Nature Reserve preserves swampland and waterway sources the majority of which have been lost in Israel. Along the swamp pathway in the Reserve, visitors \"float\" over a swamp surrounded by rich riverbank vegetation and colorful water birds. From the top of the ancient flour mill they can see views of the Akko valley, and in the Garden Shelter they can get an impression of rare plants from the coastal plain.",
//         Level: "Family",
//         duration: 1,
//         seasone: "All Year",
//         location: {
//             lat: 32.847501,
//             lng: 35.110236
//         },
//         img: "https://images.maariv.co.il/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_533,w_758/512485"
//     },
//     {
//         id: 2,
//         name: "Hoola pond",
//         type: "Nature",
//         title: "Grate large lake, many birds and butifull views",
//         description: "Hula Lake Park, known in Hebrew as Agmon HaHula (Hebrew: אגמון החולה‎), is located in the southern part of the Hula Valley, north of the nature reserve and distinct from it. It was established as part of a JNF rehabilitation project.[19] In the early 1990s part of the valley was flooded again in the wake of heavy rains. It was decided to develop the surrounding area and leave the flooded area intact. The new site has become the second home for thousands of migrating birds in the autumn and spring. The lake covers an area of one square kilometer, interspersed with islands that serve as protected bird nesting sites. It has become a major stopover for migrating birds flying from Europe to Africa and back, and also a major birdwatching site. In 2011, Israeli ornithologists confirmed that Lake Hula is the stopover point for tens of thousands of cranes migrating from Finland to Ethiopia every winter. In Israel, farmers set out food for them to keep them from damaging crops near the lake.",
//         Level: "Family",
//         duration: 3,
//         seasone: "All Year",
//         location: {
//             lat: 33.106734,
//             lng: 35.600406
//         },
//         img: "https://hamal.wcdn.co.il/v0/b/walla-hamal.appspot.com/o/-KWbvwf60318xlkrrhtF%2Fimages%2Ffull%2F1579242898893?alt=media&token=20a13a87-f54f-4e61-8ebd-a18fe834a9f7"
//     },
//     {
//         id: 3,
//         name: "Hai-Bar Yotveta",
//         type: "Animal",
//         title: "A Breeding and reintroducing center for extinct large wildlife, open Saffari in the reserve",
//         description: "The Yotvata Hai-Bar Nature Reserve is designed to breed and foster extinct animals as well as other endangered desert creatures. Located in Southern Israel, Yotvata Hai-Bar is about 30 minutes north of Eilat. Covering 3,000 acres, the reserve is home to various animals including oryx, spotted leopards and snakes. Yotvata Hai-Bar can easily be visited by car or with a tour. \nThe purpose of the Yotvota Hai-Bar Nature Reserve is to breed and nurture endangered and locally extinct animals and then reintroduce them to the Negev Desert. There is a focus on animals mentioned in the Bible but the animals are not exclusively from Israel or the Middle East, the reserve also cares for, and breeds animals from other habitats around the world. Some of the animals who make Yotvata their home are the Oryx, ostrich, sand cat, gazelle and Arabian wolf and birds of prey like the Griffon vulture",

//         Level: "Family",
//         duration: 1,
//         seasone: "All Year",
//         location: {
//             lat: 29.845710,
//             lng: 35.028569
//         },
//         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu_oAQt7RBjEqTarwuFSOOKIFZvB8NNRb7iQ&usqp=CAU"
//     },
//     {
//         id: 4,
//         name: "Acre Port",
//         type: "Urban",
//         title: "A butifull port near the acient city citadel",
//         description: "The Old City of Akko is very much a living, breathing place. The colorful souk still trades as it has for hundreds of years with traders selling the whole spectrum of goods you might go to a shopping mall to purchase.  As you reach the seafront, you’ll see Akko’s Marina where tens of small, working fishing boats are docked. It is possible to take boat rides in Akko for a small fee and see the walls of the city from the water. If you want to stay on dry ground, take a stroll along the seafront atop the ancient walls. Pass the iconic spot where local kids famously jump into the water and watch fishermen trying to catch fish which are likely to end up on the table in one of the many fish restaurants found in and around the Old City",
//         Level: "Family",
//         duration: 1.5,
//         seasone: "All Year",
//         location: {
//             lat: 32.919370,
//             lng: 35.069073
//         },
//         img: "https://www.picshare.co.il/m_pictures/img42631.jpg"
//     },
//     {
//         id: 5,
//         name: "Under Water Observatory",
//         type: "Animal",
//         title: "A unick observatory on the reach marine life of Eilat reef",
//         Level: "Family",
//         description: "The park was founded in 1974 by the zoologist and marine biologist David Friedman. The idea of the observatory was planned in 1972, it took careful planning to create the observatory without harming the natural environment. The observatory was built completely on land, which was then flooded with water from the Red Sea using armory parts and other metals. The base of the observatory was connected to large iron chains, and after the observatory was placed many corals were planted on and around the observatory in order to repair the damage that was done during the making of the observatory. The coral reef around the observatory flourished and became a major feeding spot for many fish and other marine wildlife, both carnivorous and herbivore.",
//         duration: 1.5,
//         seasone: "All Year",
//         location: {
//             lat: 29.504318,
//             lng: 34.917599
//         },
//         img: "https://pelleg-arch.com/wp-content/uploads/2018/02/1010857.jpg"
//     },
//     {
//         id: 6,
//         name: "Zippory",
//         type: "Archiology",
//         title: "Butifuly preserve acient Roman city of Zippory",
//         Level: "Family",
//         description: "Crusader tower.\n The Crusader fortress on the hill overlooking the Roman theater was built in the 12th century on the foundation of an earlier Byzantine structure. The fortress is a large square structure, 15m x15m, and approximately 10 m. high. The lower portion of the building consists of reused antique spolia, including a sarcophagus with decorative carvings. The upper part of the structure and the doorway were added by Zahir al-Umar in the 18th century. Noticeable features from the rebuilding are the rounded corners which are similar to those constructed under Zahir in the fort in Shefa-'Amr. The upper part of the building was used as a school during the reign of Abdul Hamid II in the early 1900s (late Ottoman era), and used for this purpose until 1948.\nRoman and Byzantine city\n Much of the town has been excavated, revealing Jewish homes along a main cobblestone street. Several images have been found carved into the stones of the street, including that of a menorah, and another image that resembles some ancient game reminiscent of tic-tac-toe. Stepped pools have been uncovered throughout Sepphoris, and it is generally believed that these may well have been used as Mikva'ot, Jewish ritual baths.\nRoman theatre\nThe Roman theatre sits on the northern slope of the hill, and is about 45 m in diameter, seating 4500. Most of it is carved into the hillside, but some parts are supported by separate stone pillars. The theatre shows evidence of ancient damage, possibly from the earthquake in 363.\nNile mosaic villa\nA modern structure stands to one side of the excavations, overlooking the remains of a 5th-century public building with a large and intricate mosaic floor. Some believe the room was used for festival rituals involving a celebration of water, and possibly covering the floor in water. Drainage channels have been found in the floor, and the majority of the mosaic seems devoted to measuring the floods of the Nile, and celebrations of those floods.\nDionysus mosaic villa\nRevelers and attendants of the Dionysus party.A Roman villa, built around the year 200, contains an elaborate mosaic floor in what is believed to have been a triclinium. In Roman tradition, seating would have been arranged in a U-shape around the mosaic for guests to recline as they ate, drank and socialised. The mosaic features images of Dionysus, god of wine and of socialising, along with Pan and Hercules in several of the 15 panels.The mosaic depicts a wine-drinking contest between Dionysus and Hercules. The most famous image is that of a young woman, possibly representing Venus, which has been dubbed the \"Mona Lisa of the Galilee\".Smaller mosaic tesserae were used, which allowed for greater detail and a more lifelike result, as seen in the shading and blush of her cheeks.",
//         duration: 2,
//         seasone: "All Year",
//         location: {
//             lat: 32.750830,
//             lng: 35.283789
//         },
//         img: "data:image/jpeg;base64,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"
//     },
//     {
//         id: 7,
//         name: "Banias",
//         type: "Nature",
//         title: "The largest stream and waterfall of Northern Galilee",
//         Level: "Family",
//         description: "The Banias Nature Reserve contains an abundance of natural and historical beauty, from the ruins of ancient cities to the roaring Banias Waterfall – the biggest waterfall in Israel. Found in the Upper Golan between the fertile Hula Valley and the Mount Hermon mountain area, the Banias is a favorite for those visiting the Golan. Hours can be spent at the Banias; walking the trails, exploring the ruins and picnicking in the lush green woodlands.\nThe Banias can be entered in two separate locations; the Falls and the Springs. The Falls entrance is the first one on the road heading northeast and allows one to visit the Banias Waterfall with ease – just a short walk down to the suspended trail. The Springs entrance takes one to the old temple complex that is now mere ruins of what once was a Greek and Roman testament to their rule of ancient Israel and their devotion to their gods. The name Banias is actually an Arabic corruption of the word Panias or Paneus – of the Greek god Pan, god of the forests and shepherds.\nBanias Falls Park -The Falls park entrance contains a large parking lot, facilities and a place to buy ice creams, snacks, and hot Druze pitas. Beyond the ticket gate (note: one ticket gains entrance to both park entrances) a trail leads down to the river, a 45-minute walk round-trip, including the suspended trail. A very unique way to approach a waterfall, the suspended trail was built along the basalt and travertine stone walls of the gorge, the roaring river just several meters below. The Banias Waterfalls are most impressive during the winter and spring when the water is most plentiful, on its way down to the Sea of Galilee. The waterfall is 10 meters (33 feet) high and during the winter and spring, the water crashes and mists down on those standing close on the observation deck. \nBanias Springs Park- The Springs park entrance contains a smaller parking lot, facilities and a gift shop. The wide mouth of Pan’s Cave can be seen from the road, making it easily identifiable. Before the cave, there is a calm series of stepped water, the Hermon stream, which can ever overflow onto the paved walkway. It is a peaceful and gorgeous entrance to the cave area. The ruins around the cave have been charted out to show the various temples and courts that were built and glorified by Agrippa II after the original site was founded by Herod’s son Philip who made the city Caesarea Philipi in the Banias. The cliff edge above the cave and ruins can be climbed, giving a birds-eye view of the park’s entrance and various trails and ruins.\nHikes at Banias-There are 4 trails that one can take within the Banias Nature Preserve, three of them 45-minutes long and one of them 90-minutes long.\n• Trail 1 – From the Springs Parking Lot to the Crusader city and back (45 minutes)\n• Trail 2 – From the Palace of Agrippa II to the Underground Passages and back to the Springs Parking Lot (45 minutes)\n• Trail 3 – From the Springs Parking Lot to the Banias Waterfalls (90 minutes)\n•	Trail 4 – From the Falls Parking Lot to the Banias Waterfalls and back (45 minutes)\n Note: Trail 3 goes from one parking lot to the other so be sure to have a car waiting for you unless you want to walk back another 90 minutes.\nTo be seen along the trails are places of interest such as the Officer’s Pool – a hot spring built by the Syrians and used by their officers, an ancient Roman bridge, a still-operational flour mill with olive press facilities as well, a hydroelectric station, gates, walls and moats from the Crusader and Mameluke times and an ancient synagogue on the outskirts of the ancient city ruins.",
//         duration: 2.5,
//         seasone: "Autumn, Winter, Spring",
//         location: {
//             lat: 33.247507,
//             lng: 35.694362
//         },
//         img: "https://i.ytimg.com/vi/6TaXEXmEgQk/maxresdefault.jpg"
//     },
//     {
//         id: 8,
//         name: "City Of David",
//         type: "Archiology",
//         title: "The best preserved site of biblical Jerusalem",
//         Level: "Family",
//         description: "City of David - Tours of Biblical Jerusalem\nBook a Tour\nthe underground tunnels through \nStart Point:\n        \nThe City owhich the city was conquered and residents fled. Go down to the hidden spring where kings were coronated. Explore the underground mysteries of Hezekiah’s Tunnel, where water has flowed since the time of the prophets. Join the mysterious, magical journey between ancient shafts, walls and fortresses at the City of David, the place where Jerusalem began.\nPhoto credit: Eliyahou Yanai\nFor additional information and to make a telephone reservation, call the Reservation Center:f David- Visitors Center        \nA guided tour of the City of David includes:\n• A panoramic view of the surrounding area\n• Dr. Mazar’s Palace Excavation- an impressive structure from the period of the Judean kings. \n•The Royal Acropolis (Area G) and remnants of remarkable homes from the Biblical Period.\n• The underground water system from the time of Abraham, including recent discoveries of the Canaanite fortress that guarded ancient Jerusalem’s main water source - the Gihon Spring.\n• Walk to lantern lights through the famous Hezekiah's Tunnel (Shiloah tunnel) – complete water track, Walk through the dry Canaanite tunnel, for those who prefer the dry track.\n \nEnd Point:\nThe City of David- Visitors Center.\nEssential Information \n• Tour length is 3 hours\n• For those that choose to walk through Hezekiah’s Tunnel (water tunnel), the tour is 3 hours long\n• The tour includes walking through an underground tunnel. For those that choose to walk through the water tunnel, water shoes and flashlights are required (available for purchase at our Gift Shop). The use of candles and bare feet are strictly prohibited. Entrance recommended for those 5 years and older\n• The water may reach up to 70 cm (28 inches)  \n Please note that the tour includes walking up and down stairs\n• Babies and toddlers may join the tour in a front baby carrier only. No strollers, please\n• There are storage lockers at the site for your convenience at a cost of 10 NIS. We apologize but there is no storage for baby carriages.\n• The Old City is closed to private vehicles\n• In order to reach the City of David by foot, exit the Old City via the Dung Gate (the gate closest to the Western Wall Plaza). Turn left and shortly after (approximately 50 meters), make a right. The entrance to the City of David will be on your left hand side \n• Transportation is available at the end of the tour to take you to the starting point. Cost 5 NIS per pers",
//         duration: 3,
//         seasone: "All Year",
//         location: {
//             lat: 31.772978,
//             lng: 35.234835
//         },
//         img: "https://dalicanvas.co.il/wp-content/uploads/2020/01/%D7%A2%D7%99%D7%A8-%D7%93%D7%95%D7%93-%D7%91%D7%9C%D7%99%D7%9C%D7%94-7.jpg"
//     },
//     {
//         id: 9,
//         name: "Ein Gedi - David Fountain",
//         type: "Nature",
//         title: "The largest Oasis in the Jehudeya desert with abundance of wildlife",
//         Level: "Family",
//         description: "Ein Gedi, just aside the Dead Sea in the Judean Desert, not too far from Jerusalem, is one of Israel’s premier hiking spots, featuring spectacular beauty, varied landscapes, and botanical gardens. There’s no doubt that Ein Gedi Nature Reserve is one of the most beautiful places in Israel. While it is located close to Jerusalem, it feels worlds away, Ein Gedi is, of course, one of the most popular escape spots for locals and tourists who take advantage of the reserve, botanical gardens, and the Dead Sea.\n\nWhile the Ein Gedi Nature Reserve offers over nine different hiking trails, suitable for everyone from family groups to experienced hikers, and ranging in duration from just half an hour in length to a full day, some of the most popular hiking trails are those which head through Wadi David.\nThe following route is split into two, the first section is suitable for all hikers, whilst the second section is a slightly more challenging “moderate” hike.\nThe first section of the Wadi David Hike (the ‘lower section’) is a scenic hike from the Wadi David ticket office to David’s Waterfall. A circular walk, it’s a pretty walk which is expected to take no longer than one hour to complete.",
//         duration: 1.5,
//         seasone: "All Year",
//         location: {
//             lat: 31.466239,
//             lng: 35.394379
//         },
//         img: "https://www.cuponofesh.co.il/Resize_Image.aspx?maxsize=400&img=/zimmers/pictures/tours/82/big/_020220140902432_1.jpg"
//     },
//     {
//         id: 10,
//         name: "Ein Gedi - Arugot Stream",
//         type: "Nature",
//         title: "More extreme tour to the upper Clifts of Ein Gedi",
//         Level: "Fit walkers",
//         description: "Ein Gedi, just aside the Dead Sea in the Judean Desert, not too far from Jerusalem, is one of Israel’s premier hiking spots, featuring spectacular beauty, varied landscapes, and botanical gardens. There’s no doubt that Ein Gedi Nature Reserve is one of the most beautiful places in Israel. While it is located close to Jerusalem, it feels worlds away, Ein Gedi is, of course, one of the most popular escape spots for locals and tourists who take advantage of the reserve, botanical gardens, and the Dead Sea.\n\nThe second section, or the “upper section” as it’s known, is an additional three or four-hour hike. Continuing from David’s Fall you head onto more difficult trails towards Shulamit’s Spring, Dodim’s Cave, and finally, the Ein Gedi Spring. These trails involve a little climbing so be prepared for something a little physically demanding. Along the way, water pools are popular with hikers who decide to stop and cool off. The sweet water pool in Dodim’s Cave is particularly beautiful.\nWhichever of the hikes you decide to take, you are likely to gaze in awe at the beauty of Ein Gedi Nature Reserve, and be amazed in particular at how it contrasts to its desert surroundings. The springs are a source of beauty today, and have, for thousands of years, been the source upon which life, both human and otherwise, has relied upon for living in the area.",
//         duration: 4,
//         seasone: "Spring, Summer, Autom",
//         location: {
//             lat: 31.455646,
//             lng: 35.383742

//         },
//         img: "https://www.tiuli.com/image/2d27a15fe7a6e9d8362388e978661183.jpg?&width=1080"
//     },
//     {
//         id: 11,
//         name: "Hai-Bar Carmel",
//         type: "Animal",
//         title: "A Breeding center for the Carmel and Galill extinct wildlife",
//         Level: "Family",
//         description: "The Hay-Bar on the Carmel is devoted to the raising of endangered and extinct animals of the region and possible re-introduction to the wild.\n\n Major Centers of Interest\n• Viewing breeding cells of Persian fallow deer and roe deer, from which individuals are re-introduced into the wild. Since the re-introduction program began, Persian fallow deer have been living in the Galilee and the Judean mountains, and roe deer on the Carmel, but it is difficult to see them in the wild. A visit to the Carmel Hay-Bar is an opportunity to take a close look at these noble animals.\n• A close view of the griffon vulture (Gyps fulvus), which are endangered birds in Israel. The vultures bred at the Carmel Hay-Bar are reintroduced into the wild as part of a nation-wide project called “Taking Israeli Raptors Under our Wing”. The purpose of the project is to increase the population of vultures which has declined in Israel in the last few decades.\n• Viewing the mountain gazelle (Gazella gazella gazella) which is an endangered species. Some of the individuals bred at the Carmel Hay-Bar are eventually reintroduced into the wild.\n• Viewing other raptors: White-tailed eagle (Haliaetus albicilla), Bonelli’s eagle (Aquila fasciata), and others.\n• Viewing wild goats (Capra aegagrus) and wild sheep (Ovis orientalis) – herbivores living at the Carmel Hay-bar in fenced enclosures.",
//         duration: 1.5,
//         seasone: "All Year",
//         location: {
//             lat: 32.754056,
//             lng: 35.016584
//         },
//         img: "https://www.colbonews.co.il/wp-content/uploads/2020/05/34f2cbc9973fbf82a7d8b43d24e4ba51.jpg"
//     },
//     {
//         id: 12,
//         name: "Ancient Safed ",
//         type: "Urban",
//         title: "The butiful ancient quarter of the northern Holy City",
//         Level: "Family",
//         description: "Taking a walk through Safed, the northern city which is a major point of interest for many visitors to Israel who journey to the town to enjoy the cobbled stone alleys, the art, the historical sites and the mystical atmosphere of this ancient city. Jewish settlement in Tzfat dates back to the Temple period but Safed – pronounced “Tz-fat” in Hebrew – achieved fame and a reputation as the “City of Kabbalah” during the 16th century when the rabbis, Kabbalistic scholars and other Jews who were fleeing from the Spanish Inquisition made their home in the mountaintop town.\nTaking a walk through Safed\nVisitors today have a wide variety of opportunities to explore the city, its history and its meaning to the Jewish world, either with a guide or through their own self-guided walking tour. As well as the most popular sites – the Safed Artists Quarter and Safed Citadel, there are a host of more off-the-beaten track things to see in this city.\nTzfat Tourist Information Center\nThe Tzfat Visitors Center is located at 17 Alkabetz Street, just below the ARI Ashkanazi synagogue. The Center features a historical exhibition and provides maps, guidebooks and other information to tourists. Visitors can watch a 10-minute audio-visual presentation on the History of Safed at the Center, walk down into 16th century excavations and walk up to an observation deck which presents a stunning view of Northern Israel. The center is operated by Livnot U’Lehibanot, a unique experiential Israel Experience Program which offers program options to young Jewish adults who are interested in participating in excavations, volunteer activities, hiking and Jewish exploration.\nInternational Center of Tzfat Kabbalah\nThe Center brings the study of Kabbalah back to its Jewish roots with staff members who offer teaches followers how to strengthen their relationship with God and their fellow man. The Center offers a 15-minute audio-visual presentation which provides an overview of Kabbalah for beginners. The Center is located on the second floor of the Fig Tree Gallery on Alkabetz Street.\nAscent InstituteThe Ascent Institute features daily classes on different aspects of Kabbalah, traditional Judaism and Hassidic thought. There are accommodations available for Jewish travelers who want to take advantage of a low-cost \nhostel while they learn more about their heritage. There is a library with a staff rabbi where people of any religious background can ask questions about Judaism and find out the meaning of their name according to Bible codes. Ascent is located at 2 HaAri Street. Read more at www.zissil.com\nHaARI Ashkanazi Synagogue\nHaARI Ashkanazi Synagogue was once called the “Grigoris Synagogue.” It was established by Jews who had converted to Christianity under duress under the Spanish Inquisition and subsequently escaped. When they made their way to Tzfat they were not immediately accepted by the Safed community so they built their own synagogue. The famous Kabbalistic rabbi Rabbi Isaac Luria (the ARI) celebrated the Kabbalat Shabbat service with his students next to the synagogue and after his death the synagogue was renamed\nThe Kahal National Heritage Site\nExcavations are underway near the Abuhav synagogue which have uncovered an entire 16th century Jewish neighborhood. This site has been named a National Heritage Site of Israel and will be developed into an educational village that will contain information and interactive exhibits to depict Jewish life of Safed’s Golden Age and its influences on today’s Jewish world. A sample of the excavations, along with more information, can be obtained at the Tzfat Tourist Information Center. The Kahal is being excavated by the Livnot U’Lehibanot Israel Experience Program.\ntam Center\nThe Stam Center is located outside of the Old Jewish Quarter on Gedud HaSlishi street, approximately a 10 minute drive from the Old City. The center shows interactive exhibitions and audio-visual presentations of the art of “sofer stam” – making the parchments which Jews place in their mezuzzas and tefillin as well as the creation of Torah scrolls",
//         duration: 6,
//         seasone: "Spring, Summer",
//         location: {
//             lat: 32.969088,
//             lng: 35.493516

//         },
//         img: "https://www.tiuli.com/image/3d7c63f8ca3f176747a6133fa221e913.jpg?&width=520&height=450"
//     },
//     {
//         id: 13,
//         name: "Ein Avdat",
//         type: "Nature",
//         title: "A Butiful island of green in the the largest Wadi in the Negev ",
//         Level: "Family",
//         description: "Ein Avdat (Hebrew: עין עבדת‎) or Ein Ovdat is a canyon in the Negev Desert of Israel, south of Kibbutz Sde Boker. Archaeological evidence shows that Ein Avdat was inhabited by Nabateans and Catholic monks. Numerous springs at the southern opening of the canyon empty into deep pools in a series of waterfalls. The water emerges from the rock layers with salt-tolerant plants like Poplar trees and Atriplexes growing nearby\nGeography\nThe canyon of Ein Avdat is part of Nahal Zin, the largest Wadi or dry riverbed in the Negev. The 120 kilometer-long riverbed begins at the northwestern tip of Makhtesh Ramon and heads north before veering sharply eastwards. Ein Avdat was created by erosion.[3][5]\nSprings\nThe southernmost spring is Ein Ma'arif,[3][9] featuring a series of waterfalls and pools.[10] A Byzantine fortress overlooks the spring and adjacent agricultural land.[5][10] Further north is Ein Avdat, a 15-meter high waterfall that flows into an 8-meter deep pool of water divided by a small artificial dam.[11]Located near the northern entrance of the park is a spring called Ein Mor, named for the spice myrrh.[9][12]Growing around the springs are Poplar trees and Atriplexes, commonly known as saltbush, which grows on riverbanks and can tolerate salinity.[3][7]\nClimate\nAccording to statistics compiled by a weather station at Sde Boker, the summers are hot with almost no precipitation while the winters are cold with some rain. The lowest recorded temperature for January was −3.6 °C (25.5 °F). In the summer temperatures can reach over 40 °C (104 °F). The humidity is relatively high.",
//         duration: 2,
//         seasone: "Spring, Summer, Autom",
//         location: {
//             lat: 30.831602,
//             lng: 34.770648
//         },
//         img: "https://www.parks.org.il/wp-content/uploads/2017/08/DSC_4566.jpg"
//     },

//     {
//         id: 14,
//         name: "Ein Saharonim",
//         type: "Nature",
//         title: "A wild walk between clifts and water holes of Makhtesh Ramon ",
//         Level: "Family in fit",
//         description: "After about 800 meters of walking on the dirt road, turn right, in a southeasterly direction, to a walking path marked in green. The path quickly takes us down to the Nahal Nekraot gorge and a road marked in blue that runs along it. This is the moment when they \"ascend\" the Israel Trail. Continue in a southwesterly direction and enter Nahal Nekraot (marking the blue trails, will lead us through the horseshoe and back to the parking lot). After a short walk up the wide gorge of Nahal Nekraot, we will reach the beginning of the gorge of Nakrat Horseshoe (2).We will continue up the gorge, which is about 15 meters deep and the distance between its walls is only 2-3 meters. After a few dozen meters the stream widens, but continues to maintain its canyon character as it is bounded by upright and impressive limestone cliffs.Continue for about a kilometer up the creek. Cross the rock crevice - Ramon Gate and continue to Ein Saharonim (3). We will cross Ein Saharonim and reach the parking lot from which we left.",
//         duration: 4,
//         seasone: "All year",
//         location: {
//             lat: 30.591410,
//             lng: 34.917764

//         },
//         img: "https://upload.wikimedia.org/wikipedia/commons/7/71/Ein_Saharonim.jpg"
//     },
//     {
//         id: 15,
//         name: "Masada",
//         type: "Archiology",
//         title: "The ancient fortress which became a symbol of determination and heroism ",
//         Level: "Fit walkers",
//         description: "Masada is not only important because it is a UNESCO World Heritage Site or an ancient fortress occupying a breathtaking, strategic location high on a flat plateau above the Dead Sea, but because of its symbolic importance of determination and heroism which continues to this day with many Israeli soldiers sworn in here.This mountain is one of the greatest archaeological sites in Israel and, perhaps, across the world. Its dramatic ascent can now be made by cable-car, but the drama and imagery that this site portrays is no less powerful than it ever was. Many people opt to join a tour, enjoying a guide who will bring the site to life.\n\nHistory of Masada\nThe fortress was built in the year 30 BCE by King Herod, whose architectural feats have left their mark throughout the country. At the beginning of the great revolt against Rome in the year 68 CE, the site was conquered by a group of Jewish zealots, and Masada became their last stronghold.\n\nIn the year 72, the Romans besieged Masada and succeeded in reaching the steep fortress after constructing a huge earthen ramp on its western side. In the year 73, the 960 Jewish zealots living at the top chose to commit suicide rather than to fall into the hands of the Romans alive. Their deeds left behind a saga of courage, heroism, and martyrdom.\n\nThe remains of the fortress are well-preserved and have been reconstructed in an effort to pay homage to the site and its heroic inhabitants. The most impressive structure remaining is King Herod’s northern palace, built on three rock terraces overlooking the gorge below.Near the palace is a large Roman style bath house with a colorful mosaic floor and walls decorated with murals. Many other buildings at the site – such as the luxurious western palace, the mikveh (Jewish ritual bath), storerooms, watchtowers, and synagogue relate the history of Masada, especially when viewed with artifacts such as storage containers, decorated pottery, scrolls, and coins.\n\nThe beautiful embossments and murals that were discovered on the walls of buildings on the site were restored by Italian experts to preserve them for years to come. This is the largest and most complete Roman siege camp that remains today.\n\nClimbing Masada\n\nMasada is extremely high, and can be ascended on foot by the winding “snake path” or by a cable car that runs from the tourist center at the foot of the mountain to the top. The tourist center also features a movie about the story of Masada, a model of the site, and an exhibit of the archeological findings.\n\nMany like to climb Masada at sunrise, which has become something of a tradition, with the spectacular view of the Moab Mountains and the Dead Sea. For those seeking a unique and memorable experience atop Masada, check out our Masada Sunrise Yoga, Ein Gedi Oasis, and Dead Sea Wellness Experience Tour.",
//         duration: 4.5,
//         seasone: "All year",
//         location: {
//             lat: 31.311796,
//             lng: 35.362562
//         },
//         img: "https://motwebmediastg01.blob.core.windows.net/nop-thumbs-images/0009864_masada_493.jpeg"
//     },
//     {
//         id: 16,
//         name: "Hatzbani Stream",
//         type: "Nature",
//         title: "A butiful green route between and inside flowing creeks and rivers",
//         Level: "Family",
//         description: "The Snir Stream (Hatsbani) is the longest of the Jordan River tributaries. The stream flows all year round, through a well-developed “riverside forest” of plane trees and travertine walls.\n\n Main points of interest\n        \n•	Picnic area – the entrance to the nature reserve \n• Man-made pools – two pools between the parking area and the river\n        \n•	Bird hide and Tapline reservoir – a large reservoir that attracts waterfowl\n• Snir Stream lookout point – looking over the northern part of the reserve, which is closed to visitors",
//         duration: 3.5,
//         seasone: "Autom, Summer, Spring",
//         location: {
//             lat: 33.232337,
//             lng: 35.625014
//         },
//         img: "https://www.tiuli.com/image/dacae306c34adfc269e107819875ed25.jpg?&width=1080"
//     },
//     {
//         id: 17,
//         name: "Dan Reserve",
//         type: "Nature",
//         title: "One of the largest rivers in the north which set in a butiful ever green reserve",
//         Level: "Family",
//         description: "Treat yourselves to a wondrous nature reserve that is nothing short of a magnificent little piece of heaven, full of history and beauty. This site, located in northern Israel (near Kiryat Shmona) isn’t only a rare and exquisite archaeological treasure but it is also one of Israel’s most stunning natural attractions.\n\nThe Dan river, originating from the springs at Tel Dan, is the largest of three sources of the Jordan river and this site (covering a total area of 120 acres) has a variety of walks you can take through the reserve while enjoying its beautiful waters streams and treetops. The longest route is the most thrilling one, for it combines antiquities with gorgeous natural sights. All these paths will ultimately lead you to a pool where the river has its source. There’s a total of four nature trails that crosses water channels amid big forest trees and a flourishing plantation. \n\nThis site is also famous for its incredible archaeological excavations, offering a unique exploration of both an ancient Canaanite civilization (about 4,000 years ago) and the Israelite tribe of Dan. These ancient ruins are truly amazing and will give you a new perspective on the historic events that took place in the Northern Kingdom. Make sure you don’t miss out on an ancient water-powered flour mill (located in the center of the nature reserve) that dates back approx. 150 years ago, as well as an ancient arch that is at least 3800 years old and is probably one of the earliest man-made arches found in the world.",
//         duration: 3,
//         seasone: "All Year",
//         location: {
//             lat: 33.245060,
//             lng: 35.647775

//         },
//         img: "https://img.mako.co.il/2019/09/19/49Places_To_See_Israel_Part2_5_i.jpg"
//     },
//     {
//         id: 18,
//         name: "Korsi",
//         type: "Archiology",
//         title: "Impressive well preserved remains of a monastery and church from the Byzantine period",
//         Level: "Family",
//         description: "Kursi National Park contains the impressive remains of a monastery and church from the Byzantine period. According to Christian tradition, this is the site of the Miracle of the Swine mentioned in the New Testament\n\n Points of interest\n The ruins of the Byzantine monastery and church\n• A spectacular mosaic from the Byzantine period\n• The Holy Rock\n• The “Enchanted Bench”\n• The sand verses\n\n\n The monastery and church – the ruins that can be seen today were built in the Byzantine period. The monastery was surrounded by a stone wall (145 x 123 m), and is one of the largest in Israel. It appears that not only monks lived in the compound, but also members of a Christian sect that set itself apart from the nearby Jewish settlement on the shores of the Sea of Galilee. In the courtyard of the monastery there were public buildings, houses, farm buildings, agricultural and fishing facilities, and a hostel serving pilgrims. \n\nA dirt road led up from the lake to the monumental gate of the compound, with a watchtower alongside it. From the gate, a paved road led to a large church (45 x 23 m) – a basilica, with two rows of six columns dividing the central space of the church into the nave and two aisles. The stone columns and marble Corinthian capitals were decorated with carved crosses. The excavations uncovered a small stone chest under the site of the altar, intended for the relics of saints.\n\n The church had a single apse, with rooms on either side of it. At the threshold of the southern room a mosaic inscription was found, stating that the mosaic floor was laid in the days of the Emperor Mauricius, in the year 585. The room was used for baptizing babies. Underneath one of the rooms at the side of the nave a burial cave was found, containing 30 male skeletons.\n\n The mosaic – on the floor of the church, especially in the aisles, splendid mosaics were found. They do not depict or even hint at the story of the Miracle of the Swine, although such a mosaic may have existed and been destroyed, or not yet found. The mosaics depict stunningly beautiful animal and vegetal decorations: cockerels, geese, doves, cormorants, and all kinds of fish. Many of the animal figures have been defaced. The plants have fared better, and it is easy to recognize fruit trees such as citrons, figs, and pomegranates, and bunches of grapes. One of the mosaics shows a pair of doves with a basket between them. The dove in Christianity is a symbol of the holy spirit, the purity of Mary (who conceived without sin), and the spirit of Christ.\nThe holy rock – in 1980, an excavation was carried out around a promontory on the hillside to the east of the church. Close to the rock, a small chapel was found, its apse incorporated in a cave. Christian tradition connects the cave with the place where Jesus met the man possessed by devils.\nThe sand verses – a large spinning top placed in a sandbox. Visitors can spin the top to imprint in the sand the story of the Miracle of the Swine, as it appears in the New Testament, in different languages.\n The enchanted bench – a wooden bench that has become known for having energetic properties that imbue visitors with a unique feeling of calm.\n The remains of the bathhouse – to the north of the church, excavations carried out at the site between 2011 – 2013 found the remains of a bathhouse dated to the Byzantine period.",
//         duration: 1.5,
//         seasone: "All Year",
//         location: {
//             lat: 32.826554,
//             lng: 35.650211

//         },
//         img: "https://media-cdn.tripadvisor.com/media/photo-s/0e/af/4c/bd/caption.jpg"
//     },
//     {
//         id: 19,
//         name: "Coral Beach Reserve",
//         type: "Animal",
//         title: "Swimming amongs the corals, fish and many more, at the world's northern coral reef",
//         Level: "Family",
//         description: "Eilat's Coral Beach Nature Reserve and Conservation area (Hebrew: שמורת טבע חוף האלמוגים‎) is a nature reserve and national park in the Red Sea, near the city Eilat in Israel. It covers 1.2 kilometers of shore, and is the northernmost shallow water coral reef in the world. It is popular for diving and research, and was founded by the Israel Nature and Parks Authority. At the southernmost point of the nature reserve there is the Coral World Underwater Observatory, the largest public aquarium in the Middle East. It was listed as one of the New York Times Places to Go in 2019.",
//         duration: 2,
//         seasone: "Autom, Summer, Spring",
//         location: {
//             lat: 29.509733,
//             lng: 34.922533
//         },
//         img: "https://www.yomyom.net/UploadImg/ArticlesNew/images/2901/1(4).jpg"
//     },
//     {
//         id: 21,
//         name: "The Bahá’í Gardens",
//         type: "Urban",
//         title: "The most impressive urban tample in all of Israel",
//         Level: "Family",
//         description: "With over a million visitors a year, the Bahá’í Gardens in Haifa and ‘Akko are among the most popular sites in the Middle East. Their unique design, combining geometrical shapes and exquisite detailing with loving conservation of natural and historic landscape features, leaves an indelible impression on visitors. Many return again and again to experience the changing seasons and relive the serene tranquility and uplifting spirit of these special places.\nLike all great works of art, these extraordinary sites are tangible expressions of the human spirit. Here the impetus was not the creativity of a great artist, but rather the loving labor and sacrifice of many people from diverse origins and several generations, inspired by a common faith and an optimistic vision of our collective future.\nIn July 2008, the Bahá’í Gardens in Haifa and ‘Akko were inscribed on UNESCO’s World Heritage List, in recognition of their “outstanding universal value” as holy places and places of pilgrimage for the followers of the Bahá’í Faith.\n\nThe Bahá’í Gardens in Haifa\nThese gardens, located in the heart of Haifa, comprise a staircase of nineteen terraces extending all the way up the northern slope of Mount Carmel. The golden-domed Shrine of the Báb, the resting place of the Prophet-Herald of the Bahá’í Faith, stands on the central terrace, looking across the bay towards ‘Akko.\nWhile different parts of the gardens offer a variety of experiences, they speak in a common language of graveled paths, hedges and flower beds groomed and nurtured by dedicated gardeners. The gardens frame panoramic views of the city, the Galilee Hills and the Mediterranean Sea.",
//         duration: 2,
//         seasone: "All Year",
//         location: {
//             lat: 32.817181,
//             lng: 34.988707

//         },
//         img: "https://www.danhotels.co.il/Blog/wp-content/uploads/2019/02/header11.jpg"
//     },
//     {
//         id: 22,
//         name: "Tanur Waterfall",
//         type: "Nature",
//         title: "Impressive well preserved remains of a monastery and church from the Byzantine period",
//         Level: "Family",
//         description: "In the Nahal Ayun Nature Reserve, where the stream passes from the Ayun Valley in the “Finger of Galilee” to the Hula Valley, there is a beautiful gorge with many flowing waterfalls.\n\nMajor Centers of InterestMajor Centers of Interest\n• Day camping area for picnics in the northern area of the stream.\n • The gorge of Nahal Ayun and its waterfalls: Ayun Falls, the Mill Falls, the Cascades, and the Tanur Waterfall. \n• Southern day-camping/parking area for picnics, and three paddling pools. \n• Wheelchair-accessible path, for disabled persons and for children’s strollers, from the day camping area up to the area of the Tanur Waterfall. \n\n \n Particulars (Major Centers of Interest):\n• Day camping/parking area for picnics in the northern area of the stream – the camping area is located at the edge of the Moshava Metula, and is the northern entry gate into the nature reserve. There is a well-established eucalyptus grove here, suitable for picnics and barbeques. There are toilets in the camping area for the use of visitors, and it is permitted to light fires in the area. \n• The Nahal Ayun gorge and its waterfalls – a walking route for hiking buffs. It is recommended to walk down the stream, from the northern camping area close to Metula, down to the southern camping area. The route is not circular, and you will need to leave a car at the termination point in the southern camping area. The major attraction in the gorge is the waterfalls – the Ayun waterfall, the Mill waterfall, the Cascades and the Tanur waterfall. These waterfalls flow all year round, and along the channel there is an abundance of water vegetation. Two of the waterfalls are considered especially beautiful and impressive: The Mill Waterfall – relatively broad, 21 meters high, alongside which are the remains of a flour mill that, in the past, was the only flour mill in the country under Jewish ownership; and the Tanur Waterfall, 30 m. high, one of the highest perennial streams in Israel. \n• The pump at En Sukhra – along the channel of Nahal Ayun there are a number of small springs and pools that contain water all year round. Fish live in these pools even when the rest of the stream runs completely dry. En Sukhra, located south of the Mill Waterfall, is one of the most prominent of these springs. The waters of the spring were utilized to water the land of neighboring Metula up to 1957, and the remains of the irrigation pump have been left in place. \n• Seasonal flowering of the Maritime Squill (Drimia maritima) – on the slopes west of the gorge, in the vicinity of the Metula Cemetery, blooms a spectacular field of maritime squill. \n• The Tanur Lookout Point (Gafni) – an impressive observation point, from which the Tanur Falls can be seen, with a view of the Hills of Naftali and the Hula Valley. The lookout point is reached by a steep path with many stairs. \n• Day camping/parking site for picnics with three paddling pools – the southern camping site is the main camping/parking area in the nature reserve, serving both hikers on the long route and those visiting the Tanur Waterfall only. There is a stand of trees at the campsite with picnic tables, and it is permitted to light fires there. There are also toilets, a kiosk selling snacks and three new paddling pools, enabling visitors to enjoy the abundance of water in the stream. \n• Trail for disabled persons and for children’s strollers – the last part of the walking route in the nature reserve, from the Tanur Waterfall down to the southern camping site has been made accessible for people who have difficulty walking. \n• Pump at En Sukhra.\n• Seasonal flowering of the Maritime Squill (Drimia Maritina).\n• The Tanur Lookout Point (Gafni) – observation point towards the Tanur Waterfall and downstream.",
//         duration: 2.5,
//         seasone: "Spring, Winter, Autom",
//         location: {
//             lat: 33.268449,
//             lng: 35.578470

//         },
//         img: "https://www.tiuli.com/image/b1d6873ae889d22e5a83ae1e9c2fda39.jpg?&width=1080"
//     },
// ]