
class CountryFlag {

    /**
     * @param {HTMLElement} parent
     */
    constructor (parent) {
        const element = document.createElement("div");
        parent.appendChild(element);
        this.element = element;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {Number} the ISO numeric code of the selected country
     */
    randomize() {
        CountryFlag.lazyLoadCountryList();
        const randomIndex = Math.floor(Math.random() * CountryFlag.countryList.length);
        const country = CountryFlag.countryList[randomIndex];
        return this.trySelectCountry(country);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} alpha2 the ISO alpha-2 code of the country to be selected
     * @return {Number} the ISO numeric code of the selected country
     */
    selectByAlpha2(alpha2) {
        return this.selectByMapName(CountryFlag.IDX_ALPHA2, alpha2.toLowerCase());
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} alpha3 the ISO alpha-2 code of the country to be selected
     * @return {Number} the ISO numeric code of the selected country
     */
    selectByAlpha3(alpha3) {
        return this.selectByMapName(CountryFlag.IDX_ALPHA3, alpha3.toLowerCase());
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} tld the top-level domain of the country to be selected
     * @return {Number} the ISO numeric code of the selected country
     */
    selectByTopLevelDomain(tld) {
        return this.selectByMapName(CountryFlag.IDX_TLD, tld.toLowerCase());
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {Number} isoNumeric the ISO numeric code of the country to be selected
     * @return {Number} the ISO numeric code of the selected country
     */
    selectByIsoNumeric(isoNumeric) {
        return this.selectByMapName(CountryFlag.IDX_NUMERIC, isoNumeric);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} alpha2 the ISO alpha-2 code of the country to be fetched
     * @return {CountryFlagInfo} an object with info about the country
     */
    static getCountryByAlpha2(alpha2) {
        const country = CountryFlag.getCountryByMapName(CountryFlag.IDX_ALPHA2, alpha2);
        return CountryFlag.makeCountryFlagInfo(country);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} alpha3 the ISO alpha-3 code of the country to be fetched
     * @return {CountryFlagInfo} an object with info about the country
     */
    static getCountryByAlpha3(alpha3) {
        const country = CountryFlag.getCountryByMapName(CountryFlag.IDX_ALPHA3, alpha3);
        return CountryFlag.makeCountryFlagInfo(country);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} tld the ISO top-level domain code of the country to be fetched
     * @return {CountryFlagInfo} an object with info about the country
     */
    static getCountryByTopLevelDomain(tld) {
        const country = CountryFlag.getCountryByMapName(CountryFlag.IDX_TLD, tld);
        return CountryFlag.makeCountryFlagInfo(country);
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {Number} isoNumeric the ISO numeric code of the country to be selected
     * @return {CountryFlagInfo} an object with info about the country
     */
    static getCountryByIsoNumeric(isoNumeric) {
        const country = CountryFlag.getCountryByMapName(CountryFlag.IDX_NUMERIC, isoNumeric);
        return CountryFlag.makeCountryFlagInfo(country);
    }

    /**
     * @private
     * @return {CountryFlagInfo}
     */
    static makeCountryFlagInfo(country) {
        return /** @type {CountryFlagInfo} */ {
            isoNumeric: country[CountryFlag.IDX_NUMERIC],
            name: country[CountryFlag.IDX_NAME],
            name_es: country[CountryFlag.IDX_NAME_ES],
            alpha2: country[CountryFlag.IDX_ALPHA2],
            alpha3: country[CountryFlag.IDX_ALPHA3],
            topLevelDomain: country[CountryFlag.IDX_TLD],
            phoneCode: country[CountryFlag.IDX_PHONE],
        }
    }

    /**
     * @private
     * @return {Number} the ISO numeric code of the selected country
     */
    selectByMapName(keyIndex, code) {
        const country = CountryFlag.getCountryByMapName(keyIndex, code);
        return this.trySelectCountry(country);
    }

    /**
     * @private
     * @param {CountryFlagTuple} country
     * @return {Number} the ISO numeric code of the selected country
     */
    trySelectCountry(country) {
        if (country) {
            this.element.setAttribute("class", `flag flag-${country[CountryFlag.IDX_ALPHA2]}`);
            return country[CountryFlag.IDX_NUMERIC];
        } else {
            this.element.setAttribute("class", "");
            return 0;
        }
    }

    /** @private */
    static getCountryByMapName(keyIndex, code) {
        const mapName = `map-${keyIndex}`;
        CountryFlag.lazyLoadCountryMap(mapName, keyIndex);
        return CountryFlag[mapName].get(code);
    }

    /** @private */
    static lazyLoadCountryMap(mapName, keyIndex) {
        CountryFlag.lazyLoadCountryList();
        if (!CountryFlag[mapName]) {
            CountryFlag[mapName] = new Map();
            for (const country of CountryFlag.countryList) {
                CountryFlag[mapName].set(country[keyIndex], country);
            }
        }
    }

    /** @private */
    static lazyLoadCountryList() {
        if (!CountryFlag.countryList) {
            CountryFlag.countryList = JSON.parse(CountryFlag.rawCountryList);
        }
    }
}

/* I wanted these below to be either static class members or a top-level module constants,
   but I'm avoiding it for now to maximize browser compatibility */

CountryFlag.IDX_NUMERIC = 0;
CountryFlag.IDX_NAME = 1;
CountryFlag.IDX_NAME_ES = 2;
CountryFlag.IDX_ALPHA2 = 3;
CountryFlag.IDX_ALPHA3 = 4;
CountryFlag.IDX_TLD = 5;
CountryFlag.IDX_PHONE = 6;

/** @typedef {Array<Number, String, String, String, String, String, Number>} CountryFlagTuple */
/**
 * @typedef {Object} CountryFlagInfo
 * @property {Number} isoNumeric
 * @property {String} name in English
 * @property {String} name in Spanish
 * @property {String} alpha2
 * @property {String} alpha3
 * @property {String} topLevelDomain
 * @property {Number} phone code
 */

CountryFlag.rawCountryList = '[
  [4,"Afghanistan","Afganistán","af","afg","af",93],
  [8,"Albania","Albania","al","alb","al",355],
  [12,"Algeria","Argelia","dz","dza","dz",213],
  [16,"American Samoa","Samoa Americana","as","asm","as",1],
  [20,"Andorra","Andorra","ad","and","ad",376],
  [24,"Angola","Angola","ao","ago","ao",244],
  [660,"Anguilla","Anguilla","ai","aia","ai",1],
  [10,"Antarctica","Antártida","aq","ata","aq",672],
  [28,"Antigua and Barbuda","Antigua y Barbuda","ag","atg","ag",1],
  [32,"Argentina","Argentina","ar","arg","ar",54],
  [51,"Armenia","Armenia","am","arm","am",374],
  [533,"Aruba","Aruba","aw","abw","aw",297],
  [36,"Australia","Australia","au","aus","au",61],
  [40,"Austria","Austria","at","aut","at",43],
  [31,"Azerbaijan","Azerbaiyán","az","aze","az",994],
  [44,"Bahamas","Bahamas","bs","bhs","bs",1],
  [48,"Bahrain","Bahrein","bh","bhr","bh",973],
  [50,"Bangladesh","Bangladesh","bd","bgd","bd",880],
  [52,"Barbados","Barbados","bb","brb","bb",1],
  [112,"Belarus","Bielorrusia","by","blr","by",375],
  [56,"Belgium","Bélgica","be","bel","be",32],
  [84,"Belize","Belice","bz","blz","bz",501],
  [204,"Benin","Benin","bj","ben","bj",229],
  [60,"Bermuda","islas Bermudas","bm","bmu","bm",1],
  [64,"Bhutan","Bután","bt","btn","bt",975],
  [68,"Bolivia","Bolivia","bo","bol","bo",591],
  [70,"Bosnia and Herzegovina","Bosnia y Herzegovina","ba","bih","ba",387],
  [72,"Botswana","Botswana","bw","bwa","bw",267],
  [76,"Brazil","Brasil","br","bra","br",55],
  [86,"British Indian Ocean Territory","Territorio Británico del Océano Índico","io","iot","io",246],
  [92,"British Virgin Islands","Islas Vírgenes Británicas","vg","vgb","vg",1],
  [96,"Brunei","Brunei","bn","brn","bn",673],
  [100,"Bulgaria","Bulgaria","bg","bgr","bg",359],
  [854,"Burkina Faso","Burkina Faso","bf","bfa","bf",226],
  [108,"Burundi","Burundi","bi","bdi","bi",257],
  [116,"Cambodia","Camboya","kh","khm","kh",855],
  [120,"Cameroon","Camerún","cm","cmr","cm",237],
  [124,"Canada","Canadá","ca","can","ca",1],
  [132,"Cape Verde","Cabo Verde","cv","cpv","cv",238],
  [136,"Cayman Islands","Islas Caimán","ky","cym","ky",1],
  [140,"Central African Republic","República Centroafricana","cf","caf","cf",236],
  [148,"Chad","Chad","td","tcd","td",235],
  [152,"Chile","Chile","cl","chl","cl",56],
  [156,"China","China","cn","chn","cn",86],
  [162,"Christmas Island","Isla de Navidad","cx","cxr","cx",61],
  [166,"Cocos Islands","Islas Cocos","cc","cck","cc",61],
  [170,"Colombia","Colombia","co","col","co",57],
  [174,"Comoros","Comoras","km","com","km",269],
  [184,"Cook Islands","Islas Cook","ck","cok","ck",682],
  [188,"Costa Rica","Costa Rica","cr","cri","cr",506],
  [191,"Croatia","Croacia","hr","hrv","hr",385],
  [192,"Cuba","Cuba","cu","cub","cu",53],
  [531,"Curacao","Curacao","cw","cuw","cw",599],
  [196,"Cyprus","Chipre","cy","cyp","cy",357],
  [203,"Czech Republic","Republica checa","cz","cze","cz",420],
  [180,"Democratic Republic of the Congo","República Democrática del Congo","cd","cod","cd",243],
  [208,"Denmark","Dinamarca","dk","dnk","dk",45],
  [262,"Djibouti","Djibouti","dj","dji","dj",253],
  [212,"Dominica","dominica","dm","dma","dm",1],
  [214,"Dominican Republic","República Dominicana","do","dom","do",1],
  [626,"East Timor","Timor del Este","tl","tls","tl",670],
  [218,"Ecuador","Ecuador","ec","ecu","ec",593],
  [818,"Egypt","Egipto","eg","egy","eg",20],
  [222,"El Salvador","El Salvador","sv","slv","sv",503],
  [226,"Equatorial Guinea","Guinea Ecuatorial","gq","gnq","gq",240],
  [232,"Eritrea","Eritrea","er","eri","er",291],
  [233,"Estonia","Estonia","ee","est","ee",372],
  [231,"Ethiopia","Etiopía","et","eth","et",251],
  [238,"Falkland Islands","Islas Malvinas","fk","flk","fk",500],
  [234,"Faroe Islands","Islas Faroe","fo","fro","fo",298],
  [242,"Fiji","Fiji","fj","fji","fj",679],
  [246,"Finland","Finlandia","fi","fin","fi",358],
  [250,"France","Francia","fr","fra","fr",33],
  [258,"French Polynesia","Polinesia francés","pf","pyf","pf",689],
  [266,"Gabon","Gabón","ga","gab","ga",241],
  [270,"Gambia","Gambia","gm","gmb","gm",220],
  [268,"Georgia","Georgia","ge","geo","ge",995],
  [276,"Germany","Alemania","de","deu","de",49],
  [288,"Ghana","Ghana","gh","gha","gh",233],
  [292,"Gibraltar","Gibraltar","gi","gib","gi",350],
  [300,"Greece","Grecia","gr","grc","gr",30],
  [304,"Greenland","Groenlandia","gl","grl","gl",299],
  [308,"Grenada","Granada","gd","grd","gd",1],
  [316,"Guam","Guam","gu","gum","gu",1],
  [320,"Guatemala","Guatemala","gt","gtm","gt",502],
  [831,"Guernsey","Guernesey","gg","ggy","gg",44],
  [324,"Guinea","Guinea","gn","gin","gn",224],
  [624,"Guinea-Bissau","Guinea-Bissau","gw","gnb","gw",245],
  [328,"Guyana","Guayana","gy","guy","gy",592],
  [332,"Haiti","Haití","ht","hti","ht",509],
  [340,"Honduras","Honduras","hn","hnd","hn",504],
  [344,"Hong Kong","Hong Kong","hk","hkg","hk",852],
  [348,"Hungary","Hungría","hu","hun","hu",36],
  [352,"Iceland","Islandia","is","isl","is",354],
  [356,"India","India","in","ind","in",91],
  [360,"Indonesia","Indonesia","id","idn","id",62],
  [364,"Iran","Corrí","ir","irn","ir",98],
  [368,"Iraq","Irak","iq","irq","iq",964],
  [372,"Ireland","Irlanda","ie","irl","ie",353],
  [833,"Isle of Man","Isla del hombre","im","imn","im",44],
  [376,"Israel","Israel","il","isr","il",972],
  [380,"Italy","Italia","it","ita","it",39],
  [384,"Ivory Coast","Costa de Marfil","ci","civ","ci",225],
  [388,"Jamaica","Jamaica","jm","jam","jm",1],
  [392,"Japan","Japón","jp","jpn","jp",81],
  [832,"Jersey","Jersey","je","jey","je",44],
  [400,"Jordan","Jordán","jo","jor","jo",962],
  [398,"Kazakhstan","Kazajstán","kz","kaz","kz",7],
  [404,"Kenya","Kenia","ke","ken","ke",254],
  [296,"Kiribati","Kiribati","ki","kir","ki",686],
  [0,"Kosovo","Kosovo","xk","xkx","ko",383],
  [414,"Kuwait","Kuwait","kw","kwt","kw",965],
  [417,"Kyrgyzstan","Kirguizistán","kg","kgz","kg",996],
  [418,"Laos","Laos","la","lao","la",856],
  [428,"Latvia","Letonia","lv","lva","lv",371],
  [422,"Lebanon","Líbano","lb","lbn","lb",961],
  [426,"Lesotho","Lesoto","ls","lso","ls",266],
  [430,"Liberia","Liberia","lr","lbr","lr",231],
  [434,"Libya","Libia","ly","lby","ly",218],
  [438,"Liechtenstein","Liechtenstein","li","lie","li",423],
  [440,"Lithuania","Lituania","lt","ltu","lt",370],
  [442,"Luxembourg","Luxemburgo","lu","lux","lu",352],
  [446,"Macau","macao","mo","mac","mo",853],
  [807,"Macedonia","macedonia","mk","mkd","mk",389],
  [450,"Madagascar","Madagascar","mg","mdg","mg",261],
  [454,"Malawi","Malawi","mw","mwi","mw",265],
  [458,"Malaysia","Malasia","my","mys","my",60],
  [462,"Maldives","Maldivas","mv","mdv","mv",960],
  [466,"Mali","mali","ml","mli","ml",223],
  [470,"Malta","Malta","mt","mlt","mt",356],
  [584,"Marshall Islands","Islas Marshall","mh","mhl","mh",692],
  [478,"Mauritania","Mauritania","mr","mrt","mr",222],
  [480,"Mauritius","Isla mauricio","mu","mus","mu",230],
  [175,"Mayotte","Mayotte","yt","myt","yt",262],
  [484,"Mexico","México","mx","mex","mx",52],
  [583,"Micronesia","micronesia","fm","fsm","fm",691],
  [498,"Moldova","Moldavia","md","mda","md",373],
  [492,"Monaco","Mónaco","mc","mco","mc",377],
  [496,"Mongolia","Mongolia","mn","mng","mn",976],
  [499,"Montenegro","Montenegro","me","mne","me",382],
  [500,"Montserrat","Montserrat","ms","msr","ms",1],
  [504,"Morocco","Marruecos","ma","mar","ma",212],
  [508,"Mozambique","Mozambique","mz","moz","mz",258],
  [104,"Myanmar","Myanmar","mm","mmr","mm",95],
  [516,"Namibia","Namibia","na","nam","na",264],
  [520,"Nauru","Nauru","nr","nru","nr",674],
  [524,"Nepal","Nepal","np","npl","np",977],
  [528,"Netherlands","Países Bajos","nl","nld","nl",31],
  [530,"Netherlands Antilles","Antillas Holandesas","an","ant","an",599],
  [540,"New Caledonia","Nueva Caledonia","nc","ncl","nc",687],
  [554,"New Zealand","Nueva Zelanda","nz","nzl","nz",64],
  [558,"Nicaragua","Nicaragua","ni","nic","ni",505],
  [562,"Niger","Níger","ne","ner","ne",227],
  [566,"Nigeria","Nigeria","ng","nga","ng",234],
  [570,"Niue","Niue","nu","niu","nu",683],
  [408,"North Korea","Corea del Norte","kp","prk","kp",850],
  [580,"Northern Mariana Islands","Islas Marianas del Norte","mp","mnp","mp",1],
  [578,"Norway","Noruega","no","nor","no",47],
  [512,"Oman","Omán","om","omn","om",968],
  [586,"Pakistan","Pakistán","pk","pak","pk",92],
  [585,"Palau","Palau","pw","plw","pw",680],
  [275,"Palestine","Palestina","ps","pse","ps",970],
  [591,"Panama","Panamá","pa","pan","pa",507],
  [598,"Papua New Guinea","Papúa Nueva Guinea","pg","png","pg",675],
  [600,"Paraguay","Paraguay","py","pry","py",595],
  [604,"Peru","Perú","pe","per","pe",51],
  [608,"Philippines","Filipinas","ph","phl","ph",63],
  [612,"Pitcairn","Pitcairn","pn","pcn","pn",870],
  [616,"Poland","Polonia","pl","pol","pl",48],
  [620,"Portugal","Portugal","pt","prt","pt",351],
  [630,"Puerto Rico","Puerto Rico","pr","pri","pr",1],
  [634,"Qatar","Katar","qa","qat","qa",974],
  [178,"Republic of the Congo","República del Congo","cg","cog","cg",242],
  [638,"Reunion","Reunión","re","reu","re",262],
  [642,"Romania","Rumania","ro","rou","ro",40],
  [643,"Russia","Rusia","ru","rus","ru",7],
  [646,"Rwanda","Ruanda","rw","rwa","rw",250],
  [652,"Saint Barthelemy","San Bartolomé","bl","blm","gp",590],
  [654,"Saint Helena","Santa Helena","sh","shn","sh",290],
  [659,"Saint Kitts and Nevis","Saint Kitts y Nevis","kn","kna","kn",1],
  [662,"Saint Lucia","Santa Lucía","lc","lca","lc",1],
  [663,"Saint Martin","San Martín","mf","maf","gp",590],
  [666,"Saint Pierre and Miquelon","San Pedro y Miquelón","pm","spm","pm",508],
  [670,"Saint Vincent and the Grenadines","San Vicente y las Granadinas","vc","vct","vc",1],
  [882,"Samoa","Samoa","ws","wsm","ws",685],
  [674,"San Marino","San Marino","sm","smr","sm",378],
  [678,"Sao Tome and Principe","Santo Tomé y Príncipe","st","stp","st",239],
  [682,"Saudi Arabia","Arabia Saudita","sa","sau","sa",966],
  [686,"Senegal","Senegal","sn","sen","sn",221],
  [688,"Serbia","Serbia","rs","srb","rs",381],
  [690,"Seychelles","Seychelles","sc","syc","sc",248],
  [694,"Sierra Leone","Sierra Leona","sl","sle","sl",232],
  [702,"Singapore","Singapur","sg","sgp","sg",65],
  [534,"Sint Maarten","Sint Maarten","sx","sxm","sx",599],
  [703,"Slovakia","Eslovaquia","sk","svk","sk",421],
  [705,"Slovenia","Eslovenia","si","svn","si",386],
  [90,"Solomon Islands","Islas Salomón","sb","slb","sb",677],
  [706,"Somalia","Somalia","so","som","so",252],
  [710,"South Africa","Sudáfrica","za","zaf","za",27],
  [410,"South Korea","Corea del Sur","kr","kor","kr",82],
  [728,"South Sudan","Sudán del Sur","ss","ssd","ss",211],
  [724,"Spain","España","es","esp","es",34],
  [144,"Sri Lanka","Sri Lanka","lk","lka","lk",94],
  [729,"Sudan","Sudán","sd","sdn","sd",249],
  [740,"Suriname","Surinam","sr","sur","sr",597],
  [744,"Svalbard and Jan Mayen","Svalbard y Jan Mayen","sj","sjm","sj",47],
  [748,"Swaziland","Swazilandia","sz","swz","sz",268],
  [752,"Sweden","Suecia","se","swe","se",46],
  [756,"Switzerland","Suiza","ch","che","ch",41],
  [760,"Syria","Siria","sy","syr","sy",963],
  [158,"Taiwan","Taiwán","tw","twn","tw",886],
  [762,"Tajikistan","Tayikistán","tj","tjk","tj",992],
  [834,"Tanzania","Tanzania","tz","tza","tz",255],
  [764,"Thailand","Tailandia","th","tha","th",66],
  [768,"Togo","Ir","tg","tgo","tg",228],
  [772,"Tokelau","Tokelau","tk","tkl","tk",690],
  [776,"Tonga","Tonga","to","ton","to",676],
  [780,"Trinidad and Tobago","Trinidad y Tobago","tt","tto","tt",1],
  [788,"Tunisia","Túnez","tn","tun","tn",216],
  [792,"Turkey","Turquía","tr","tur","tr",90],
  [795,"Turkmenistan","Turkmenistán","tm","tkm","tm",993],
  [796,"Turks and Caicos Islands","Islas Turcas y Caicos","tc","tca","tc",1],
  [798,"Tuvalu","Tuvalu","tv","tuv","tv",688],
  [850,"U.S. Virgin Islands","Islas Vírgenes de EE.UU","vi","vir","vi",1],
  [800,"Uganda","Uganda","ug","uga","ug",256],
  [804,"Ukraine","Ucrania","ua","ukr","ua",380],
  [784,"United Arab Emirates","Emiratos Árabes Unidos","ae","are","ae",971],
  [826,"United Kingdom","Reino Unido","gb","gbr","uk",44],
  [840,"United States","Estados Unidos","us","usa","us",1],
  [858,"Uruguay","Uruguay","uy","ury","uy",598],
  [860,"Uzbekistan","Uzbekistán","uz","uzb","uz",998],
  [548,"Vanuatu","Vanuatu","vu","vut","vu",678],
  [336,"Vatican","Vaticano","va","vat","va",379],
  [862,"Venezuela","Venezuela","ve","ven","ve",58],
  [704,"Vietnam","Vietnam","vn","vnm","vn",84],
  [876,"Wallis and Futuna","Wallis y Futuna","wf","wlf","wf",681],
  [732,"Western Sahara","Sahara Occidental","eh","esh","eh",212],
  [887,"Yemen","Yemen","ye","yem","ye",967],
  [894,"Zambia","Zambia","zm","zmb","zm",260],
  [716,"Zimbabwe","Zimbabue","zw","zwe","zw",263]
]';
