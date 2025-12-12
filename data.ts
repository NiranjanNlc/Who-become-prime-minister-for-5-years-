import { GameEvent, Concept, Ending } from './types';

export const INITIAL_METERS = {
  trust: 50,
  economy: 50,
  liberty: 50,
  environment: 50,
};

export const INITIAL_FACTIONS = {
  youth: 0,
  business: 0,
  bureaucrats: 0,
  activists: 0,
};

export const CONCEPTS: Record<string, Concept> = {
  'RTI': {
    id: 'RTI',
    title: 'Right to Information',
    titleNe: 'सूचनाको हक',
    definition: 'A fundamental right allowing citizens to request information from public bodies to ensure transparency and accountability.',
    definitionNe: 'सार्वजनिक निकायहरूबाट सूचना माग्ने र पाउने नागरिकको मौलिक अधिकार, जसले पारदर्शिता र जवाफदेहिता सुनिश्चित गर्दछ।',
    nepalContext: 'Guaranteed by the Constitution of Nepal 2072, but often bureaucratic hurdles prevent true access to government data.',
    nepalContextNe: 'नेपालको संविधान २०७२ द्वारा सुनिश्चित गरिएको भए पनि, कर्मचारीतन्त्रका अवरोधहरूले गर्दा सरकारी तथ्याङ्कमा पहुँच पाउन गाह्रो छ।',
    links: ['https://www.nic.gov.np/']
  },
  'federalism': {
    id: 'federalism',
    title: 'Federalism',
    titleNe: 'संघीयता',
    definition: 'A system of government where power is divided between a central authority and constituent political units (provinces).',
    definitionNe: 'राज्यको शक्तिलाई केन्द्र र प्रदेशहरू बीच बाँडफाँड गर्ने शासन प्रणाली।',
    nepalContext: 'Nepal shifted to a federal structure with 7 provinces to decentralize power, though resource allocation remains a point of friction.',
    nepalContextNe: 'नेपालले शक्ति विकेन्द्रीकरण गर्न ७ प्रदेशसहितको संघीय संरचना अपनाएको छ, तर स्रोत बाँडफाँडमा अझै विवाद देखिन्छ।'
  },
  'corruption': {
    id: 'corruption',
    title: 'Policy Corruption',
    titleNe: 'नीतिगत भ्रष्टाचार',
    definition: 'When decision-makers manipulate laws or regulations to benefit specific private interests at the expense of the public.',
    definitionNe: 'जब निर्णयकर्ताहरूले व्यक्तिगत लाभका लागि कानुन वा नियमहरू नै बङ्ग्याउँछन्।',
    nepalContext: 'Often seen in tax exemptions for specific business groups or manipulation of procurement contracts.',
    nepalContextNe: 'विशेष व्यापारिक घरानालाई कर छुट वा ठेक्का सम्झौतामा हेरफेर गर्दा यस्तो भ्रष्टाचार अक्सर देखिन्छ।'
  },
  'eia': {
    id: 'eia',
    title: 'EIA (Environmental Impact Assessment)',
    titleNe: 'वातावरणीय प्रभाव मूल्यांकन',
    definition: 'A process of evaluating the likely environmental impacts of a proposed project or development.',
    definitionNe: 'कुनै पनि विकास आयोजनाले वातावरणमा पार्न सक्ने सम्भावित असरहरूको मूल्यांकन गर्ने प्रक्रिया।',
    nepalContext: 'Infrastructure projects in Nepal often bypass rigorous EIAs, leading to landslides and ecological damage.',
    nepalContextNe: 'नेपालमा पूर्वाधार आयोजनाहरूले अक्सर कडा EIA लाई बेवास्ता गर्छन्, जसले पहिरो र पारिस्थितिक क्षति निम्त्याउँछ।'
  },
  'press_freedom': {
    id: 'press_freedom',
    title: 'Press Freedom',
    titleNe: 'प्रेस स्वतन्त्रता',
    definition: 'The right of newspapers, magazines, and other media to report news without being controlled by the government.',
    definitionNe: 'सरकारको नियन्त्रण बिना समाचार रिपोर्ट गर्ने पत्रपत्रिका र सञ्चार माध्यमहरूको अधिकार।',
    nepalContext: 'While constitutionally protected, journalists in Nepal frequently face harassment or legal threats for critical reporting.',
    nepalContextNe: 'संविधानले संरक्षण गरेको भए पनि, नेपालमा पत्रकारहरूले आलोचनात्मक रिपोर्टिङ गर्दा धम्की वा कानुनी झमेला व्यहोर्नुपर्छ।'
  },
  'geopolitics': {
    id: 'geopolitics',
    title: 'Non-Alignment',
    titleNe: 'असंलग्न परराष्ट्र नीति',
    definition: 'Nepal\'s foreign policy principle of not aligning with any major power bloc, balancing relations between neighbors.',
    definitionNe: 'कुनै पनि शक्ति गुटमा नलागी छिमेकीहरूसँग सन्तुलित सम्बन्ध राख्ने नेपालको परराष्ट्र नीति।',
    nepalContext: 'Situated between China and India, Nepal must carefully balance foreign aid and diplomatic pressure.',
    nepalContextNe: 'चीन र भारतको बीचमा अवस्थित नेपालले विदेशी सहायता र कूटनीतिक दबाबलाई होसियारीपूर्वक सन्तुलनमा राख्नुपर्छ।'
  },
  'coalition': {
    id: 'coalition',
    title: 'Coalition Politics',
    titleNe: 'गठबन्धन राजनीति',
    definition: 'A government formed by multiple political parties cooperating, often reducing dominance of any single party.',
    definitionNe: 'एकभन्दा बढी राजनीतिक दलहरू मिलेर बनेको सरकार।',
    nepalContext: 'Frequent changes in coalition partners lead to government instability, with the average tenure of a PM being less than a year.',
    nepalContextNe: 'गठबन्धन साझेदारहरूमा बारम्बार परिवर्तन हुँदा सरकार अस्थिर हुन्छ, र प्रधानमन्त्रीको औसत कार्यकाल एक वर्षभन्दा कम हुन्छ।'
  },
  'remittance': {
    id: 'remittance',
    title: 'Remittance Economy',
    titleNe: 'विप्रेषण अर्थतन्त्र',
    definition: 'Funds sent by foreign workers to their home country, which significantly contributes to the national GDP.',
    definitionNe: 'विदेशमा काम गर्ने कामदारहरूले आफ्नो देशमा पठाएको रकम, जसले राष्ट्रिय अर्थतन्त्रमा ठूलो योगदान गर्छ।',
    nepalContext: 'Remittances contribute over 20% of Nepal\'s GDP, but reliance on foreign employment exposes workers to exploitation.',
    nepalContextNe: 'रेमिट्यान्सले नेपालको जीडीपीमा २०% भन्दा बढी योगदान गर्छ, तर वैदेशिक रोजगारमा निर्भरताले श्रमिकहरूलाई जोखिममा पार्छ।'
  },
  'pollution': {
    id: 'pollution',
    title: 'Air Quality Management',
    titleNe: 'वायु गुणस्तर व्यवस्थापन',
    definition: 'Policies aimed at regulating emissions and protecting public health from hazardous air pollutants.',
    definitionNe: 'हानिकारक वायु प्रदूषकहरूबाट जनस्वास्थ्यको रक्षा गर्न र उत्सर्जन नियमन गर्न बनाइएका नीतिहरू।',
    nepalContext: 'Kathmandu Valley often tops global pollution charts due to vehicle emissions, brick kilns, and geography.',
    nepalContextNe: 'सवारी साधनको धुवाँ, इट्टा भट्टा र भौगोलिक बनावटका कारण काठमाडौँ उपत्यका अक्सर विश्वव्यापी प्रदूषणको सूचीमा माथि पर्छ।'
  },
  'nepotism': {
    id: 'nepotism',
    title: 'Political Appointees',
    titleNe: 'राजनीतिक नियुक्ति',
    definition: 'Appointment of government officials based on political loyalty rather than merit or qualifications.',
    definitionNe: 'योग्यता वा क्षमताको सट्टा राजनीतिक वफादारीको आधारमा सरकारी अधिकारीहरूको नियुक्ति।',
    nepalContext: 'Universities and constitutional bodies in Nepal often suffer from "Bhagbanda" (sharing spoils) among major parties.',
    nepalContextNe: 'नेपालका विश्वविद्यालय र संवैधानिक निकायहरूमा अक्सर प्रमुख दलहरूबीच "भागबन्डा" को समस्या देखिन्छ।'
  },
  'citizenship': {
    id: 'citizenship',
    title: 'Citizenship Rights',
    titleNe: 'नागरिकताको अधिकार',
    definition: 'The legal relationship between an individual and the state. In Nepal, transmission of citizenship through mothers has been a contentious issue.',
    definitionNe: 'व्यक्ति र राज्य बीचको कानुनी सम्बन्ध। नेपालमा आमाको नामबाट नागरिकता दिने विषय विवादित रहँदै आएको छ।',
    nepalContext: 'Millions remain stateless due to complex laws regarding naturalization and descent, particularly affecting single mothers.',
    nepalContextNe: 'जटिल कानुनका कारण लाखौं मानिस राज्यविहीन छन्, विशेष गरी एकल आमाहरू प्रभावित छन्।'
  },
  'social_justice': {
    id: 'social_justice',
    title: 'Social Justice',
    titleNe: 'सामाजिक न्याय',
    definition: 'Ensuring fair treatment and equitable distribution of opportunities for all members of society, particularly marginalized groups.',
    definitionNe: 'समाजका सबै सदस्यहरू, विशेष गरी सीमान्तकृत समूहहरूका लागि समान अवसर र न्याय सुनिश्चित गर्नु।',
    nepalContext: 'Despite legal bans on caste discrimination, Dalits continue to face segregation and violence in many parts of Nepal.',
    nepalContextNe: 'जातीय विभेदमा कानुनी प्रतिबन्ध भए पनि, नेपालका धेरै ठाउँमा दलितहरूले अझै पनि विभेद र हिंसा भोगिरहेका छन्।'
  },
  'trade_balance': {
    id: 'trade_balance',
    title: 'Trade Deficit',
    titleNe: 'व्यापार घाटा',
    definition: 'An economic measure where a country imports more goods and services than it exports.',
    definitionNe: 'जब देशले निर्यात भन्दा बढी वस्तु तथा सेवा आयात गर्छ।',
    nepalContext: 'Nepal relies heavily on imports for basic goods and fuel, leading to a massive trade deficit primarily with India.',
    nepalContextNe: 'नेपाल आधारभूत वस्तु र इन्धनका लागि आयातमा अत्यधिक निर्भर छ, जसले गर्दा विशेष गरी भारतसँग ठूलो व्यापार घाटा छ।'
  },
  'public_health': {
    id: 'public_health',
    title: 'Public Health',
    titleNe: 'जनस्वास्थ्य',
    definition: 'The science of protecting and improving the health of people and their communities.',
    definitionNe: 'मानिस र समुदायको स्वास्थ्य रक्षा र सुधार गर्ने विज्ञान।',
    nepalContext: 'Infectious diseases like Dengue are becoming more common in urban areas due to unplanned urbanization.',
    nepalContextNe: 'अव्यवस्थित सहरीकरणका कारण डेङ्गु जस्ता संक्रामक रोगहरू सहरी क्षेत्रमा सामान्य बन्दै गएका छन्।'
  },
  'foreign_policy': {
    id: 'foreign_policy',
    title: 'Diplomatic Protocol',
    titleNe: 'कूटनीतिक मर्यादा',
    definition: 'The official procedure or system of rules governing affairs of state or diplomatic occasions.',
    definitionNe: 'राज्य वा कूटनीतिक मामिलाहरू सञ्चालन गर्ने आधिकारिक प्रक्रिया वा नियमहरू।',
    nepalContext: 'Balancing relations between neighbors often requires strict adherence to protocol to avoid misunderstandings.',
    nepalContextNe: 'छिमेकीहरूसँगको सम्बन्ध सन्तुलनमा राख्न गलतफहमी नहोस् भनेर प्रोटोकलको कडा पालना आवश्यक हुन्छ।'
  },
  'labor_rights': {
    id: 'labor_rights',
    title: 'Labor Rights',
    titleNe: 'श्रम अधिकार',
    definition: 'Legal rights and human rights relating to labor relations between workers and employers.',
    definitionNe: 'कामदार र रोजगारदाता बीचको सम्बन्धसँग सम्बन्धित कानुनी अधिकार र मानव अधिकार।',
    nepalContext: 'Strikes in the transport sector often paralyze the country, highlighting the power of unions vs public need.',
    nepalContextNe: 'यातायात क्षेत्रका बन्द हडतालले अक्सर देश ठप्प पार्छन्, जसले युनियनको शक्ति र जनताको आवश्यकता बीचको द्वन्द्व देखाउँछ।'
  }
};

export const ENDINGS: Record<string, Ending> = {
  'trust_low': {
    id: 'trust_low',
    title: 'No Confidence',
    titleNe: 'अविश्वासको प्रस्ताव',
    subtitle: 'Forced to Resign',
    subtitleNe: 'राजीनामा दिन बाध्य',
    narrative: 'Mass protests have erupted across Kathmandu. The people have lost all faith in your leadership. Your own party has voted to remove you to save face before the next election.',
    narrativeNe: 'काठमाडौँभरि जनआन्दोलन चर्किएको छ। जनताले तपाईंको नेतृत्वमा पूर्ण विश्वास गुमाएका छन्। अर्को चुनाव अघि पार्टीको साख जोगाउन आफ्नै सांसदहरूले तपाईंलाई हटाउने निर्णय गरेका छन्।',
    type: 'defeat'
  },
  'economy_low': {
    id: 'economy_low',
    title: 'Economic Collapse',
    titleNe: 'आर्थिक पतन',
    subtitle: 'National Bankruptcy',
    subtitleNe: 'राष्ट्रिय टाट पल्टाई',
    narrative: 'Inflation has skyrocketed and the state treasury is empty. International donors have pulled out, and you cannot pay civil servants. The government has dissolved in chaos.',
    narrativeNe: 'मुद्रास्फीति आकाशिएको छ र राज्यको ढुकुटी रित्तिएको छ। अन्तर्राष्ट्रिय दाताहरू पछि हटेका छन्, र तपाईंले कर्मचारीहरूलाई तलब खुवाउन सक्नुभएको छैन। सरकार अराजकतामा विघटन भएको छ।',
    type: 'defeat'
  },
  'liberty_low': {
    id: 'liberty_low',
    title: 'Authoritarian Drift',
    titleNe: 'तानाशाही शासन',
    subtitle: 'Democracy Suspended',
    subtitleNe: 'लोकतन्त्र निलम्बित',
    narrative: 'Your heavy-handed tactics silenced critics but destroyed the democratic spirit. The Supreme Court has intervened, and you have been removed for violating the constitution.',
    narrativeNe: 'तपाईंको दमनकारी कदमले आलोचकहरूलाई चुप त लगायो तर लोकतान्त्रिक भावना नष्ट गर्यो। सर्वोच्च अदालतले हस्तक्षेप गरेको छ, र संविधान उल्लंघन गरेको अभियोगमा तपाईंलाई पदमुक्त गरिएको छ।',
    type: 'defeat'
  },
  'environment_low': {
    id: 'environment_low',
    title: 'Ecological Disaster',
    titleNe: 'पर्यावरणीय विपत्ति',
    subtitle: 'Nature Rebels',
    subtitleNe: 'प्रकृतिको विद्रोह',
    narrative: 'Unchecked exploitation has led to massive floods and landslides destroying major infrastructure. The humanitarian crisis has made governance impossible.',
    narrativeNe: 'अनियन्त्रित दोहनले ठूला बाढी र पहिरो निम्त्याएको छ, जसले प्रमुख पूर्वाधारहरू नष्ट गरेको छ। मानवीय संकटले शासन सञ्चालन असम्भव बनाएको छ।',
    type: 'defeat'
  },
  'survivor': {
    id: 'survivor',
    title: 'The Survivor',
    titleNe: 'שורभाइभर (The Survivor)',
    subtitle: 'Completed Full Term',
    subtitleNe: 'पूरा कार्यकाल सम्पन्न',
    narrative: 'You managed to navigate the treacherous waters of Nepali politics for a full term. You may not be a hero, but you kept the country running without total collapse.',
    narrativeNe: 'तपाईंले नेपालको जोखिमपूर्ण राजनीतिमा पूरा कार्यकाल टिक्न सफल हुनुभयो। तपाईं नायक नहुन सक्नुहुन्छ, तर तपाईंले देशलाई पूर्ण पतन हुनबाट बचाउनुभयो।',
    type: 'victory'
  },
  'pragmatist': {
    id: 'pragmatist',
    title: 'The Pragmatist',
    titleNe: 'यथार्थवादी नेता',
    subtitle: 'Balanced Leadership',
    subtitleNe: 'सन्तुलित नेतृत्व',
    narrative: 'By making difficult compromises, you maintained stability. The economy is decent, and rights are intact. A solid, if unexciting, tenure.',
    narrativeNe: 'कठिन सम्झौताहरू गरेर, तपाईंले स्थिरता कायम राख्नुभयो। अर्थतन्त्र ठीकठाक छ, र अधिकारहरू सुरक्षित छन्। एक मजबुत, यद्यपि सामान्य, कार्यकाल।',
    type: 'victory'
  }
};

export const EVENTS: GameEvent[] = [
  // --- Phase 1: First 100 Days (Turns 1-10) ---
  {
    id: 'evt_vc_appt',
    title: 'University VC',
    titleNe: 'विश्वविद्यालय उपकुलपति',
    description: 'The Vice-Chancellor post at the top university is vacant. Your party cadres want a loyalist appointed; students demand a merit-based professor.',
    descriptionNe: 'शीर्ष विश्वविद्यालयमा उपकुलपति पद रिक्त छ। तपाईंका कार्यकर्ताहरू आफ्नो मान्छे चाहन्छन्; विद्यार्थीहरू योग्यतामा आधारित प्राध्यापकको माग गर्दैछन्।',
    conceptTag: 'nepotism',
    icon: '🎓',
    category: 'Party',
    minTurn: 1,
    maxTurn: 10,
    choices: [
      {
        id: 'vc_loyalist',
        label: 'Appoint Party Man',
        labelNe: 'कार्यकर्ता नियुक्त गर्नुहोस्',
        summary: 'Appointed a party loyalist as VC.',
        effect: {
          meters: { trust: -10, liberty: -10 },
          factions: { youth: -25, bureaucrats: -5 },
          setFlags: ['uni_politicized']
        }
      },
      {
        id: 'vc_merit',
        label: 'Appoint Professor',
        labelNe: 'प्राध्यापक नियुक्त गर्नुहोस्',
        summary: 'Appointed a qualified independent VC.',
        effect: {
          meters: { trust: 15, liberty: 10 },
          factions: { youth: 25, bureaucrats: 5 },
        }
      }
    ]
  },
  {
    id: 'evt_tourism',
    title: 'Visit Nepal Campaign',
    titleNe: 'नेपाल भ्रमण अभियान',
    description: 'The tourism board wants to launch a massive "Visit Nepal" campaign, but air safety records are poor and infrastructure is lacking.',
    descriptionNe: 'पर्यटन बोर्ड ठूलो "भिजिट नेपाल" अभियान सुरु गर्न चाहन्छ, तर हवाई सुरक्षा रेकर्ड खराब छ र पूर्वाधारको अभाव छ।',
    conceptTag: 'eia',
    icon: '🏔️',
    category: 'Economy',
    minTurn: 1,
    maxTurn: 10,
    choices: [
      {
        id: 'tour_promote',
        label: 'Launch Campaign',
        labelNe: 'अभियान सुरु गर्नुहोस्',
        summary: 'Launched tourism campaign despite risks.',
        effect: {
          meters: { economy: 15, trust: -5 },
          factions: { business: 20, activists: -5 },
        }
      },
      {
        id: 'tour_fix',
        label: 'Fix Safety First',
        labelNe: 'पहिले सुरक्षा सुधार गर्नुहोस्',
        summary: 'Prioritized safety over marketing.',
        effect: {
          meters: { economy: -10, trust: 10, environment: 5 },
          factions: { business: -10, activists: 10 },
        }
      }
    ]
  },
  {
    id: 'evt_province_budget',
    title: 'Provincial Budget Row',
    titleNe: 'प्रदेश बजेट विवाद',
    description: 'Provincial governments are demanding a larger share of the national budget. The central finance ministry warns this will drain federal reserves.',
    descriptionNe: 'प्रदेश सरकारहरूले राष्ट्रिय बजेटमा ठूलो हिस्सा मागिरहेका छन्। केन्द्रिय अर्थ मन्त्रालयले यसले संघीय कोष रित्याउने चेतावनी दिएको छ।',
    conceptTag: 'federalism',
    icon: '🏛️',
    category: 'Economy',
    minTurn: 1,
    maxTurn: 15,
    choices: [
      {
        id: 'budget_decentralize',
        label: 'Empower Provinces',
        labelNe: 'प्रदेशलाई अधिकार दिनुहोस्',
        summary: 'Granted more funds to provinces.',
        effect: {
          meters: { liberty: 10, economy: -10, trust: 5 },
          factions: { bureaucrats: -15, youth: 5 },
          setFlags: ['federalism_boost']
        }
      },
      {
        id: 'budget_centralize',
        label: 'Keep funds Central',
        labelNe: 'केन्द्रमै राख्नुहोस्',
        summary: 'Kept tight control on the budget.',
        effect: {
          meters: { liberty: -10, economy: 10 },
          factions: { bureaucrats: 15, activists: -10 },
          setFlags: ['centralist']
        }
      }
    ]
  },
  {
    id: 'evt_hospital_bribe',
    title: 'Medical Affiliation',
    titleNe: 'मेडिकल सम्बन्धन',
    description: 'A private medical college with poor infrastructure offers a "donation" to your party fund in exchange for immediate university affiliation.',
    descriptionNe: 'कमजोर पूर्वाधार भएको निजी मेडिकल कलेजले तत्काल सम्बन्धनको बदलामा तपाईंको पार्टी कोषमा "चन्दा" दिने प्रस्ताव गरेको छ।',
    conceptTag: 'corruption',
    icon: '🏥',
    category: 'Corruption',
    minTurn: 1,
    maxTurn: 15,
    choices: [
      {
        id: 'med_accept',
        label: 'Accept donation',
        labelNe: 'चन्दा स्वीकार्नुहोस्',
        summary: 'Accepted bribes for medical affiliation.',
        effect: {
          meters: { trust: -20, economy: 10 },
          factions: { business: 15, youth: -20, activists: -15 },
        }
      },
      {
        id: 'med_reject',
        label: 'Reject and investigate',
        labelNe: 'अस्वीकार र छानबिन गर्नुहोस्',
        summary: 'Investigated the corrupt medical college.',
        effect: {
          meters: { trust: 15, economy: -5 },
          factions: { youth: 15, business: -10 },
        }
      }
    ]
  },
  {
    id: 'evt_dalit_rights',
    title: 'Caste Discrimination',
    titleNe: 'जातीय विभेद',
    description: 'A Dalit family was denied entry to a temple by local elites. The police are hesitant to file a case to avoid "disturbing social harmony".',
    descriptionNe: 'एक दलित परिवारलाई स्थानीय ठूलाठालुले मन्दिर पस्न दिएनन्। "सामाजिक सद्भाव बिग्रने" भन्दै प्रहरी मुद्दा दर्ता गर्न हिचकिचाएको छ।',
    conceptTag: 'social_justice',
    icon: '⚖️',
    category: 'Rights',
    minTurn: 1,
    maxTurn: 30, // Can happen anytime
    choices: [
      {
        id: 'dalit_arrest',
        label: 'Arrest Perpetrators',
        labelNe: 'दोषीलाई पक्राउ गर्नुहोस्',
        summary: 'Enforced the law strictly.',
        effect: {
          meters: { liberty: 15, trust: 10 },
          factions: { activists: 20, bureaucrats: -5 },
          setFlags: ['rule_of_law']
        }
      },
      {
        id: 'dalit_mediate',
        label: 'Seek Mediation',
        labelNe: 'मिलापत्र गराउनुहोस्',
        summary: 'Pushed for informal mediation.',
        effect: {
          meters: { liberty: -20, trust: -15 },
          factions: { activists: -30 },
        }
      }
    ]
  },

  // --- Phase 2: Mid-Term (Turns 11-20) ---
  {
    id: 'evt_coalition_crisis',
    title: 'Coalition Ultimatum',
    titleNe: 'गठबन्धन संकट',
    description: 'Your junior coalition partner demands the powerful Home Ministry portfolio for a leader facing criminal charges, threatening to topple the government.',
    descriptionNe: 'तपाईंको सत्ता साझेदार दलले आपराधिक मुद्दा खेपिरहेको नेताका लागि गृह मन्त्रालय माग्दै सरकार ढाल्ने धम्की दिएको छ।',
    conceptTag: 'coalition',
    icon: '⚖️',
    category: 'Party',
    minTurn: 11,
    maxTurn: 20,
    choices: [
      {
        id: 'coalition_yield',
        label: 'Yield to save Gov',
        labelNe: 'सरकार बचाउन झुक्नुहोस्',
        summary: 'Gave up the ministry to stay in power.',
        effect: {
          meters: { trust: -15, liberty: -10, economy: 5 },
          factions: { bureaucrats: -20, business: 10 },
          setFlags: ['compromised_cabinet']
        }
      },
      {
        id: 'coalition_refuse',
        label: 'Refuse blackmail',
        labelNe: 'ब्ल्याकमेल अस्वीकार गर्नुहोस्',
        summary: 'Refused demands, risking stability.',
        effect: {
          meters: { trust: 15, economy: -10 },
          factions: { youth: 10, bureaucrats: 15 },
          setFlags: ['unstable_govt']
        }
      }
    ]
  },
  {
    id: 'evt_tax_scandal',
    title: 'Tax Evasion Scandal',
    titleNe: 'कर छली काण्ड',
    description: 'A major business conglomerate—a key donor to your party—is caught evading billions in taxes. Prosecution could crash the stock market.',
    descriptionNe: 'तपाईंको पार्टीलाई चन्दा दिने एक ठूलो व्यापारिक घराना अर्बौं कर छलीमा परेको छ। कारबाही गर्दा सेयर बजार गिर्न सक्छ।',
    conceptTag: 'corruption',
    icon: '💰',
    category: 'Corruption',
    minTurn: 10,
    maxTurn: 25,
    choices: [
      {
        id: 'tax_prosecute',
        label: 'Prosecute fully',
        labelNe: 'कडा कारबाही गर्नुहोस्',
        summary: 'Prosecuted the tax evaders.',
        effect: {
          meters: { economy: -15, trust: 20 },
          factions: { business: -40, youth: 10, activists: 15 },
          setFlags: ['tax_justice']
        }
      },
      {
        id: 'tax_settle',
        label: 'Quiet settlement',
        labelNe: 'भित्रभित्रै मिलाउनुहोस्',
        summary: 'Settled the tax case quietly.',
        effect: {
          meters: { economy: 10, trust: -25 },
          factions: { business: 20, activists: -20 },
          setFlags: ['tax_coverup']
        }
      }
    ]
  },
  {
    id: 'evt_mcc',
    title: 'Foreign Aid Pact',
    titleNe: 'विदेशी अनुदान सम्झौता',
    description: 'A superpower offers a $500M infrastructure grant. Critics call it a "military alliance" trap; supporters say it\'s vital for development.',
    descriptionNe: 'एक महाशक्ति राष्ट्रले ५० करोड डलरको अनुदान प्रस्ताव गरेको छ। आलोचकहरू यसलाई "सैन्य पासो" भन्छन्; समर्थकहरू विकासका लागि अपरिहार्य ठान्छन्।',
    conceptTag: 'geopolitics',
    icon: '🤝',
    category: 'Economy',
    minTurn: 5,
    maxTurn: 20,
    choices: [
      {
        id: 'mcc_ratify',
        label: 'Ratify the Compact',
        labelNe: 'सम्झौता पास गर्नुहोस्',
        summary: 'Ratified the controversial grant.',
        effect: {
          meters: { economy: 25, trust: -10, liberty: 5 },
          factions: { business: 25, youth: -15, activists: -20 },
          setFlags: ['aid_accepted']
        }
      },
      {
        id: 'mcc_reject',
        label: 'Reject National Sellout',
        labelNe: 'देश बेच्न पाइदैन (अस्वीकार)',
        summary: 'Rejected the foreign grant.',
        effect: {
          meters: { economy: -15, trust: 15 },
          factions: { youth: 20, activists: 15, business: -20 },
          setFlags: ['aid_rejected']
        }
      }
    ]
  },
  {
    id: 'evt_fertilizer',
    title: 'Fertilizer Shortage',
    titleNe: 'मल अभाव',
    description: 'Farmers are protesting due to a lack of fertilizer during peak planting season. A fast G2G deal with a neighbor is possible but expensive.',
    descriptionNe: 'बाली लगाउने सिजनमा मल नपाएर किसानहरू आन्दोलित छन्। छिमेकीसँग महँगोमा जी-टु-जी सम्झौता गरेर तुरुन्त ल्याउन सकिन्छ।',
    conceptTag: 'trade_balance',
    icon: '🌾',
    category: 'Economy',
    minTurn: 8,
    maxTurn: 22,
    choices: [
      {
        id: 'fert_subsidy',
        label: 'Emergency Import',
        labelNe: 'तुरुन्त आयात गर्नुहोस्',
        summary: 'Imported expensive fertilizer.',
        effect: {
          meters: { economy: -15, trust: 15 },
          factions: { business: 5, youth: 10 },
        }
      },
      {
        id: 'fert_wait',
        label: 'Wait for Contract',
        labelNe: 'प्रक्रिया पर्खनुहोस्',
        summary: 'Waited for cheaper shipment, angering farmers.',
        effect: {
          meters: { economy: 5, trust: -20 },
          factions: { activists: -10 },
        }
      }
    ]
  },
  {
    id: 'evt_road_expansion',
    title: 'Ring Road Expansion',
    titleNe: 'चक्रपथ विस्तार',
    description: 'Expanding the Ring Road will reduce traffic jams but requires cutting down 2,000 trees and demolishing 500 roadside homes without full compensation.',
    descriptionNe: 'चक्रपथ विस्तारले जाम घटाउनेछ तर यसका लागि २,००० रुख काट्नुपर्छ र ५०० घर भत्काउनुपर्छ, जसको पूर्ण मुआब्जा दिइएको छैन।',
    conceptTag: 'RTI',
    icon: '🚜',
    category: 'Environmental',
    minTurn: 5,
    maxTurn: 25,
    choices: [
      {
        id: 'road_build',
        label: 'Build for progress',
        labelNe: 'विकासको लागि बनाउनुहोस्',
        summary: 'Expanded the road despite protests.',
        effect: {
          meters: { economy: 10, environment: -15, liberty: -10 },
          factions: { business: 10, activists: -20 },
        }
      },
      {
        id: 'road_halt',
        label: 'Halt for review',
        labelNe: 'पुनरावलोकनको लागि रोक्नुहोस्',
        summary: 'Halted road expansion for review.',
        effect: {
          meters: { economy: -5, environment: 10, liberty: 5 },
          factions: { activists: 15, business: -10 },
        }
      }
    ]
  },
  {
    id: 'evt_hydro',
    title: 'Mega Hydro Project',
    titleNe: 'मेगा हाइड्रो प्रोजेक्ट',
    description: 'A foreign consortium wants to build a massive dam in a protected conservation area. It promises jobs and electricity but will displace indigenous communities and harm local wildlife.',
    descriptionNe: 'एक विदेशी कम्पनी संरक्षित क्षेत्रमा ठूलो बाँध बनाउन चाहन्छ। यसले रोजगारी र बिजुली दिनेछ तर आदिवासीलाई विस्थापित गर्नेछ र वन्यजन्तुलाई हानि पुर्याउनेछ।',
    conceptTag: 'eia',
    icon: '🌊',
    category: 'Environmental',
    minTurn: 10,
    maxTurn: 30,
    choices: [
      {
        id: 'hydro_approve',
        label: 'Approve the project',
        labelNe: 'प्रोजेक्ट स्वीकृत गर्नुहोस्',
        summary: 'Approved the dam for economic growth.',
        effect: {
          meters: { economy: 15, environment: -20, trust: -5 },
          factions: { business: 20, activists: -25 },
          setFlags: ['dam_built']
        }
      },
      {
        id: 'hydro_reject',
        label: 'Reject to save nature',
        labelNe: 'प्रकृति बचाउन अस्वीकार',
        summary: 'Rejected the dam to protect the environment.',
        effect: {
          meters: { economy: -10, environment: 15, trust: 5 },
          factions: { business: -15, activists: 20 },
          setFlags: ['dam_rejected']
        }
      }
    ]
  },
  {
    id: 'evt_citizenship',
    title: 'Citizenship Bill',
    titleNe: 'नागरिकता विधेयक',
    description: 'A new bill proposes granting citizenship to children of single mothers. Nationalists call it a threat; rights activists call it a necessity.',
    descriptionNe: 'एकल आमाका सन्तानलाई नागरिकता दिने विधेयक प्रस्ताव गरिएको छ। राष्ट्रवादीहरू यसलाई खतरा मान्छन्; अधिकारकर्मीहरू आवश्यकता भन्छन्।',
    conceptTag: 'citizenship',
    icon: '🪪',
    category: 'Rights',
    minTurn: 10,
    maxTurn: 30,
    choices: [
      {
        id: 'cit_pass',
        label: 'Pass the Bill',
        labelNe: 'विधेयक पास गर्नुहोस्',
        summary: 'Passed the inclusive citizenship bill.',
        effect: {
          meters: { liberty: 20, trust: 5, economy: 5 },
          factions: { activists: 25, bureaucrats: -10 },
          setFlags: ['citizenship_inclusive']
        }
      },
      {
        id: 'cit_shelve',
        label: 'Shelve for Now',
        labelNe: 'अहिलेलाई रोक्नुहोस्',
        summary: 'Shelved the citizenship bill.',
        effect: {
          meters: { liberty: -15, trust: -5 },
          factions: { activists: -25, bureaucrats: 5 },
        }
      }
    ]
  },

  // --- Phase 3: Final Tenure (Turns 21-30) ---
  {
    id: 'evt_border_map',
    title: 'Border Dispute',
    titleNe: 'सीमा विवाद',
    description: 'Public pressure mounts to publish a new political map claiming disputed territories held by a neighbor. It will cause a diplomatic freeze.',
    descriptionNe: 'छिमेकीले ओगटेको विवादित भूभाग समेटेर नयाँ नक्सा जारी गर्न जनदबाब बढेको छ। यसले कूटनीतिक सम्बन्ध चिस्याउनेछ।',
    conceptTag: 'geopolitics',
    icon: '🗺️',
    category: 'Party',
    minTurn: 20,
    maxTurn: 30,
    choices: [
      {
        id: 'map_publish',
        label: 'Publish New Map',
        labelNe: 'नयाँ नक्सा जारी गर्नुहोस्',
        summary: 'Published map reclaiming territory.',
        effect: {
          meters: { trust: 25, economy: -10 },
          factions: { youth: 25, business: -10 },
          setFlags: ['nationalist_hero']
        }
      },
      {
        id: 'map_diplomacy',
        label: 'Quiet Diplomacy',
        labelNe: 'शान्त कूटनीति',
        summary: 'Chose quiet talks over public map.',
        effect: {
          meters: { trust: -15, economy: 5 },
          factions: { youth: -20, bureaucrats: 10 },
        }
      }
    ]
  },
  {
    id: 'evt_gold_smuggling',
    title: 'Gold Smuggling',
    titleNe: 'सुन तस्करी',
    description: '100kg of gold was seized at the airport. Evidence points to the involvement of high-ranking officials in your own party.',
    descriptionNe: 'विमानस्थलमा १०० किलो सुन बरामद भयो। प्रमाणले तपाईंको आफ्नै पार्टीका उच्च नेताहरूको संलग्नता देखाउँछ।',
    conceptTag: 'corruption',
    icon: '🥇',
    category: 'Corruption',
    minTurn: 18,
    maxTurn: 30,
    choices: [
      {
        id: 'gold_investigate',
        label: 'Investigate Party',
        labelNe: 'नेतालाई छानबिन गर्नुहोस्',
        summary: 'Launched probe against own leaders.',
        effect: {
          meters: { trust: 20, economy: 5 },
          factions: { activists: 20, bureaucrats: 10 },
          setFlags: ['party_rebellion']
        }
      },
      {
        id: 'gold_bury',
        label: 'Protect Leaders',
        labelNe: 'नेता जोगाउनुहोस्',
        summary: 'Buried the gold smuggling case.',
        effect: {
          meters: { trust: -25, liberty: -5 },
          factions: { activists: -25, youth: -15 },
          setFlags: ['corruption_scandal']
        }
      }
    ]
  },
  {
    id: 'evt_media_bill',
    title: 'Media Council Bill',
    titleNe: 'मिडिया काउन्सिल विधेयक',
    description: 'Your advisors propose a new bill to regulate "fake news" on social media. Critics say it gives the government power to silence dissent and jail journalists.',
    descriptionNe: 'सल्लाहकारहरूले "फेक न्युज" रोक्न नयाँ विधेयक ल्याउन सुझाव दिएका छन्। आलोचकहरू भन्छन् यसले सरकारलाई विरोध दबाउने र पत्रकारलाई थुन्ने अधिकार दिन्छ।',
    conceptTag: 'press_freedom',
    icon: '📰',
    category: 'Rights',
    minTurn: 15,
    maxTurn: 30,
    choices: [
      {
        id: 'media_pass',
        label: 'Pass the strict bill',
        labelNe: 'कडा विधेयक पास गर्नुहोस्',
        summary: 'Enacted strict media controls.',
        effect: {
          meters: { liberty: -20, trust: -10, economy: 5 },
          factions: { bureaucrats: 10, activists: -30, youth: -15 },
          setFlags: ['media_censored']
        }
      },
      {
        id: 'media_soften',
        label: 'Revise for freedom',
        labelNe: 'स्वतन्त्रताका लागि सच्याउनुहोस्',
        summary: 'Ensured press freedom in the new bill.',
        effect: {
          meters: { liberty: 15, trust: 10 },
          factions: { activists: 20, bureaucrats: -5 },
          setFlags: ['media_free']
        }
      }
    ]
  },
  {
    id: 'evt_smog',
    title: 'Toxic Valley',
    titleNe: 'विषाक्त उपत्यका',
    description: 'Kathmandu\'s air quality hits hazardous levels (AQI 400). Experts demand an emergency lockdown, but daily wage earners will starve.',
    descriptionNe: 'काठमाडौँको वायु प्रदूषण खतरनाक स्तरमा पुगेको छ (AQI ४००)। विज्ञहरू लकडाउनको माग गर्छन्, तर दैनिक ज्यालादारी मजदुरहरू भोकै पर्नेछन्।',
    conceptTag: 'pollution',
    icon: '😷',
    category: 'Environmental',
    minTurn: 10,
    maxTurn: 30,
    choices: [
      {
        id: 'smog_lockdown',
        label: 'Emergency Lockdown',
        labelNe: 'संकटकालीन लकडाउन',
        summary: 'Imposed lockdown to clear the air.',
        effect: {
          meters: { environment: 20, economy: -20, trust: 5 },
          factions: { activists: 20, business: -25 },
        }
      },
      {
        id: 'smog_ignore',
        label: 'Keep Economy Open',
        labelNe: 'अर्थतन्त्र खुला राख्नुहोस्',
        summary: 'Ignored pollution to protect jobs.',
        effect: {
          meters: { environment: -20, economy: 5, trust: -10 },
          factions: { business: 10, activists: -25, youth: -10 },
        }
      }
    ]
  },
  {
    id: 'evt_migrant_ban',
    title: 'Labor Safety Crisis',
    titleNe: 'कामदार सुरक्षा संकट',
    description: 'Reports confirm hundreds of Nepali workers are dying from heat stress in a destination country. Rights groups demand a total ban on labor permits.',
    descriptionNe: 'खाडी मुलुकमा सयौं नेपाली कामदारको गर्मीले मृत्यु भइरहेको रिपोर्ट आएको छ। अधिकारकर्मीहरू श्रम स्वीकृति पूर्ण रूपमा रोक्न माग गर्दैछन्।',
    conceptTag: 'remittance',
    icon: '✈️',
    category: 'Rights',
    minTurn: 15,
    maxTurn: 30,
    choices: [
      {
        id: 'migrant_ban',
        label: 'Ban Labor Permits',
        labelNe: 'श्रम स्वीकृति रोक्नुहोस्',
        summary: 'Banned workers from going abroad.',
        effect: {
          meters: { economy: -25, liberty: 10, trust: 5 },
          factions: { activists: 25, youth: -20 }, // Youth rely on these jobs
        }
      },
      {
        id: 'migrant_dialogue',
        label: 'Diplomatic Talk Only',
        labelNe: 'कूटनीतिक पहल मात्र',
        summary: 'Sent a diplomatic note only.',
        effect: {
          meters: { economy: 5, liberty: -10, trust: -10 },
          factions: { business: 10, activists: -20 },
        }
      }
    ]
  },
  // --- Additional Events (Turns 10-30) ---
  {
    id: 'evt_health_outbreak',
    title: 'Disease Outbreak',
    titleNe: 'रोग महामारी',
    description: 'A contagious disease spreads in urban centers.',
    descriptionNe: 'सार्वजनिक सहरहरूमा संक्रामक रोग फैलिरहेको छ।',
    conceptTag: 'public_health',
    icon: '🦠',
    category: 'Health',
    minTurn: 12,
    maxTurn: 28,
    choices: [
      {
        id: 'health_quarantine',
        label: 'Enforce Quarantine',
        labelNe: 'क्वारेन्टिन लागू गर्नुहोस्',
        summary: 'Quarantine measures taken.',
        effect: { meters: { trust: 5, economy: -10 }, factions: { bureaucrats: 10 } }
      },
      {
        id: 'health_ignore',
        label: 'Minimal Intervention',
        labelNe: 'सामान्य हस्तक्षेप',
        summary: 'Minimal health measures applied.',
        effect: { meters: { trust: -15, economy: 5 } }
      }
    ]
  },
  {
    id: 'evt_mining_conflict',
    title: 'Illegal Mining Scandal',
    titleNe: 'अवैध खानी काण्ड',
    description: 'Reports of illegal mining activities surface, angering citizens.',
    descriptionNe: 'अवैध खानी गतिविधिको रिपोर्ट आएको छ, जसले नागरिकलाई क्रोधित बनाउँछ।',
    conceptTag: 'corruption',
    icon: '⛏️',
    category: 'Corruption',
    minTurn: 15,
    maxTurn: 30,
    choices: [
      {
        id: 'mining_crackdown',
        label: 'Crackdown',
        labelNe: 'कडा कारबाही',
        summary: 'Illegal mining suppressed.',
        effect: { meters: { trust: 10, economy: -5 }, factions: { activists: 10 } }
      },
      {
        id: 'mining_ignore',
        label: 'Ignore Scandal',
        labelNe: 'काण्ड बेवास्ता गर्नुहोस्',
        summary: 'Ignored mining scandal.',
        effect: { meters: { trust: -10 }, factions: { activists: -15 } }
      }
    ]
  },
  {
    id: 'evt_foreign_visit',
    title: 'State Visit',
    titleNe: 'राजकीय भ्रमण',
    description: 'A neighboring country requests a formal visit to strengthen ties.',
    descriptionNe: 'छिमेकी देशले सम्बन्ध सुदृढ गर्न औपचारिक भ्रमणको अनुरोध गरेको छ।',
    conceptTag: 'foreign_policy',
    icon: '🤝',
    category: 'Diplomacy',
    minTurn: 14,
    maxTurn: 30,
    choices: [
      {
        id: 'visit_accept',
        label: 'Accept Visit',
        labelNe: 'भ्रमण स्वीकार गर्नुहोस्',
        summary: 'Diplomatic visit accepted.',
        effect: { meters: { trust: 10, economy: 5 }, factions: { bureaucrats: 10 } }
      },
      {
        id: 'visit_decline',
        label: 'Decline Visit',
        labelNe: 'भ्रमण अस्वीकार गर्नुहोस्',
        summary: 'Diplomatic visit declined.',
        effect: { meters: { trust: -5 }, factions: { bureaucrats: -10 } }
      }
    ]
  },
  {
    id: 'evt_transport_strike',
    title: 'Transport Strike',
    titleNe: 'सवारी आन्दोलन',
    description: 'Truckers strike demanding fuel subsidy reforms.',
    descriptionNe: 'ट्रकर चालकहरूले इन्धन अनुदान सुधारको माग गर्दै आन्दोलन गर्छन्।',
    conceptTag: 'labor_rights',
    icon: '🚛',
    category: 'Economy',
    minTurn: 5,
    maxTurn: 30,
    choices: [
        {
            id: 'strike_concede',
            label: 'Grant Subsidy',
            labelNe: 'अनुदान दिनुहोस्',
            summary: 'Granted subsidies to end strike.',
            effect: { meters: { economy: -10, trust: 5 }, factions: { business: 10 } }
        },
        {
            id: 'strike_resist',
            label: 'Resist Demands',
            labelNe: 'माग अस्वीकार गर्नुहोस्',
            summary: 'Resisted union demands.',
            effect: { meters: { economy: 5, trust: -10 }, factions: { business: -10, activists: 5 } }
        }
    ]
  }
];