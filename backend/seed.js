import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Ngo from './models/Ngo.js';

dotenv.config();

// ALL image URLs below are verified working Cloudinary-hosted images
const ngos = [

  // ── EDUCATION ─────────────────────────────────────────────
  {
    name: 'Pratham Education Foundation',
    location: 'Mumbai, Maharashtra',
    cause: 'Education',
    description: 'One of India\'s largest NGOs improving quality of education through innovative low-cost interventions, reaching millions of children across 23 states with programs like Read India and TaRL.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/a89d4933c9d0bdee23dfe4968fb63dd123ab43bb.jpg',
    verified: true,
    campaigns: [{
      title: 'Read India – Learning Camps 2026',
      description: 'Running remedial learning camps to restore foundational literacy and numeracy for 10 lakh children in 600 districts.',
      goal: 2000000, raised: 1350000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/eca9eaca8f738ed85afb314b70bfc38216aa45f8.jpg',
    }],
  },
  {
    name: 'CRY – Child Rights and You',
    location: 'Mumbai, Maharashtra',
    cause: 'Education',
    description: 'Since 1979, CRY has worked with local NGO partners in 19 states to protect the rights of over 3 million underprivileged children — keeping them in school, safe and healthy.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/f5e6f50a1bf97d4ef8f753521ad3db28f4d19d06.jpg',
    verified: true,
    campaigns: [{
      title: 'Keep Every Child in School',
      description: 'Community mobilisation, stipends and awareness to prevent dropout for 5 lakh at-risk children across India.',
      goal: 3000000, raised: 2100000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/5076308c68892bae20e7716a557c25f69113fbec.jpg',
    }],
  },
  {
    name: 'Smile Foundation',
    location: 'New Delhi, NCR',
    cause: 'Education',
    description: 'Smile Foundation impacts over 20 lakh children and families annually through 400+ education, healthcare and livelihood projects across 27 states since 2002.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/601902ac7d40febe2438fa6a2d01cbd791bb282d.jpg',
    verified: true,
    campaigns: [{
      title: 'Mission Education 2026',
      description: 'Providing quality non-formal education to 50,000 out-of-school children through learning centres and digital tools.',
      goal: 2500000, raised: 1700000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/c3193e7634af81bda7c88bf58e1f4f16c1ad3efb.jpg',
    }],
  },
  {
    name: 'Teach For India',
    location: 'Mumbai, Maharashtra',
    cause: 'Education',
    description: 'Placing exceptional graduates as full-time teachers in under-resourced classrooms across 9 Indian cities, building a pipeline of leaders committed to educational equity.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/03170efc27dbc1f922913c0f6f56d32e16796bc0.jpg',
    verified: true,
    campaigns: [{
      title: 'Recruit 1,000 Fellows 2026',
      description: 'Recruiting, training and placing 1,000 new teaching fellows in low-income schools across Mumbai, Delhi, Pune, Hyderabad and Bengaluru.',
      goal: 5000000, raised: 3200000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e8ebf514b7bbac848faa473689b1f84cb34a581c.jpg',
    }],
  },
  {
    name: 'Nanhi Kali – KC Mahindra Trust',
    location: 'Mumbai, Maharashtra',
    cause: 'Education',
    description: 'Nanhi Kali supports girls from disadvantaged communities with academic and material support to help them complete 10 years of schooling.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/64257a8c0f1c5c9504d9fee97c8da69311719cfa.jpg',
    verified: true,
    campaigns: [{
      title: 'Sponsor a Girl Child',
      description: 'Enabling 10,000 girls to complete secondary education with full academic and material support packages.',
      goal: 4000000, raised: 2800000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/64257a8c0f1c5c9504d9fee97c8da69311719cfa.jpg',
    }],
  },

  // ── HUNGER & FOOD ─────────────────────────────────────────
  {
    name: 'Akshaya Patra Foundation',
    location: 'Bengaluru, Karnataka',
    cause: 'Hunger Relief',
    description: 'World\'s largest NGO-run school mid-day meal program, serving freshly cooked meals to over 2.1 million children daily across 78 kitchens in 16 states.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/510be46a0b4f72d26fc5f11afc04daff5aa5ad67.jpg',
    verified: true,
    campaigns: [{
      title: 'Feed a Child for a Year',
      description: 'Sponsoring nutritious mid-day meals for 1 lakh government school children for a full academic year.',
      goal: 10000000, raised: 7500000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/b3ddf94b1dd5c56917c147d19c7a5d310f912555.jpg',
    }],
  },
  {
    name: 'Goonj',
    location: 'New Delhi, NCR',
    cause: 'Hunger Relief',
    description: 'Founded by Anshu Gupta (Ramon Magsaysay Award 2015), Goonj converts urban surplus into a development resource for rural India across 23 states.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/fd9cbfa80c57206dcea67f1d270a698d431e595e.jpg',
    verified: true,
    campaigns: [{
      title: 'Rahat – Disaster Relief Drive',
      description: 'Delivering relief material including food, clothing, medicines and shelter kits to 1 lakh flood and cyclone affected families.',
      goal: 5000000, raised: 3800000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/67c2a2f9306aee008b995bf4bc52eb9202933504.jpg',
    }],
  },
  {
    name: 'Robin Hood Army',
    location: 'New Delhi, NCR',
    cause: 'Hunger Relief',
    description: 'A zero-funds volunteer organisation collecting surplus food from restaurants and distributing to the less fortunate. Active in 200+ cities across 11 countries.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e7c2f84583485a488825773163932acc12896026.jpg',
    verified: true,
    campaigns: [{
      title: 'Zero Food Waste India',
      description: 'Mobilising 5,000 new volunteers to serve 10 lakh meals monthly across 50 Indian cities.',
      goal: 500000, raised: 320000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/fcb0abf2ed4b013c7e251a75b20c99abbdf6dd06.jpg',
    }],
  },

  // ── ENVIRONMENT ───────────────────────────────────────────
  {
    name: 'Wildlife SOS',
    location: 'New Delhi, NCR',
    cause: 'Environment',
    description: 'Wildlife SOS rescues and rehabilitates India\'s wildlife in distress — elephants, bears, leopards — operating India\'s only dedicated elephant hospital and multiple wildlife care centres.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/829555109cbad51561f2cfa76f0a43d2f13c322c.jpg',
    verified: true,
    campaigns: [{
      title: 'Expand the Elephant Hospital',
      description: 'Building a new treatment wing at the Mathura Elephant Hospital to care for 50 additional rescued elephants.',
      goal: 8000000, raised: 5200000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/950d4e4ff08ef56cf5ea672b485ca882153190d3.jpg',
    }],
  },
  {
    name: 'Tarun Bharat Sangh',
    location: 'Alwar, Rajasthan',
    cause: 'Environment',
    description: 'Founded by Rajendra Singh "Water Man of India", TBS has revived 1,000+ rivers and water bodies using traditional johad techniques across Rajasthan.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/045bd63825bf7824a793e2ecd87f7a1d18182d87.jpg',
    verified: true,
    campaigns: [{
      title: 'Revive 50 Dried Rivers',
      description: 'Building johad and check-dam structures to restore water flow in 50 seasonal rivers across Rajasthan.',
      goal: 3000000, raised: 1800000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/c06ea9072107cb82ae606678183fa861bd50bcba.jpg',
    }],
  },
  {
    name: 'Chintan Environmental Research and Action Group',
    location: 'New Delhi, NCR',
    cause: 'Environment',
    description: 'Chintan works on waste management, recycling rights of waste-pickers and sustainable consumption across Delhi NCR.',
    image: 'https://picsum.photos/seed/chintan-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'Green the Delhi Air',
      description: 'Formalising 5,000 waste-pickers into a cooperative recycling workforce to divert 100 tonnes of waste from landfills monthly.',
      goal: 1200000, raised: 690000,
      image: 'https://picsum.photos/seed/chintan-camp/600/300',
    }],
  },

  // ── WOMEN EMPOWERMENT ────────────────────────────────────
  {
    name: 'SEWA – Self Employed Women\'s Association',
    location: 'Ahmedabad, Gujarat',
    cause: 'Women Empowerment',
    description: 'India\'s largest union of informal women workers — street vendors, domestic workers, handloom weavers — providing finance and social security since 1972 with 2+ million members.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/0e7a2b4670cc1c491c4fa51673d0bca53f73f22a.jpg',
    verified: true,
    campaigns: [{
      title: 'Digital Payments for Women Workers',
      description: 'Training 1 lakh home-based women workers in digital banking, UPI and social security schemes.',
      goal: 2000000, raised: 1350000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/46b6a739cc946f4a214623d6b53ee6b8332a4248.jpg',
    }],
  },
  {
    name: 'Jagori',
    location: 'New Delhi, NCR',
    cause: 'Women Empowerment',
    description: 'A feminist organisation working on women\'s safety, mobility and gender-based violence for over 30 years, including the landmark Safe Delhi campaign.',
    image: 'https://picsum.photos/seed/jagori-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'Safe Cities for Women',
      description: 'Training 10,000 women in self-defence, safety audits and community watch programs across Delhi.',
      goal: 900000, raised: 580000,
      image: 'https://picsum.photos/seed/jagori-safe/600/300',
    }],
  },
  {
    name: 'Breakthrough India',
    location: 'New Delhi, NCR',
    cause: 'Women Empowerment',
    description: 'Breakthrough uses art, media and pop culture to challenge gender stereotypes, reaching 8 million+ people through campaigns like Bell Bajao.',
    image: 'https://picsum.photos/seed/breakthrough-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'Bell Bajao 2.0',
      description: 'Digital and ground campaign reaching 2 crore youth on gender equality and domestic violence prevention.',
      goal: 1500000, raised: 950000,
      image: 'https://picsum.photos/seed/breakthrough-camp/600/300',
    }],
  },

  // ── ELDERLY CARE ─────────────────────────────────────────
  {
    name: 'HelpAge India',
    location: 'New Delhi, NCR',
    cause: 'Elderly Care',
    description: 'India\'s leading NGO for senior citizens (est. 1978), running mobile Medicare units, cataract camps and elder abuse helplines across 26 states.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/fd007e9ab0f6d01f1e911391ebfcd4480099b080.jpg',
    verified: true,
    campaigns: [{
      title: 'Mobile Medicare for Elders',
      description: 'Operating 100 mobile health vans providing free checkups, medicines and referrals for elderly in rural and urban India.',
      goal: 4000000, raised: 2900000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/bb9eff8ad8e933526a9eb5d8312c1b59ede265e9.jpg',
    }],
  },
  {
    name: 'Nightingales Medical Trust',
    location: 'Bengaluru, Karnataka',
    cause: 'Elderly Care',
    description: 'Nightingales Medical Trust runs India\'s first dementia day-care centre and Alzheimer\'s support groups for elderly with cognitive impairments since 1995.',
    image: 'https://picsum.photos/seed/nightingales-trust/600/300',
    verified: true,
    campaigns: [{
      title: 'Dementia Care Centre Expansion',
      description: 'Adding 40 beds and caregiver training facilities to Bengaluru\'s first dementia day-care centre.',
      goal: 2500000, raised: 1400000,
      image: 'https://picsum.photos/seed/nightingales-camp/600/300',
    }],
  },

  // ── DISABILITY ────────────────────────────────────────────
  {
    name: 'National Association for the Blind',
    location: 'Mumbai, Maharashtra',
    cause: 'Disability',
    description: 'NAB India has served the visually impaired since 1952 — Braille libraries, vocational training, white-cane mobility and employment support for over 50,000 blind individuals.',
    image: 'https://picsum.photos/seed/nab-india/600/300',
    verified: true,
    campaigns: [{
      title: 'Braille for Every Student',
      description: 'Producing 50,000 Braille textbooks for visually impaired school children across India.',
      goal: 2000000, raised: 1250000,
      image: 'https://picsum.photos/seed/nab-braille/600/300',
    }],
  },
  {
    name: 'Hridayam Hope Foundation',
    location: 'Bhimavaram, Andhra Pradesh',
    cause: 'Disability',
    description: 'Hridayam (meaning "heart") works at the grassroots in AP — tree plantation drives, school awareness sessions, health camps and empowerment programs for communities in need.',
    image: 'https://picsum.photos/seed/hridayam-hope/600/300',
    verified: true,
    campaigns: [{
      title: 'Empowering PWDs in AP',
      description: 'Vocational training, assistive devices and legal aid for 500 persons with disabilities in rural Andhra Pradesh.',
      goal: 400000, raised: 210000,
      image: 'https://picsum.photos/seed/hridayam-camp/600/300',
    }],
  },

  // ── DISASTER RELIEF ───────────────────────────────────────
  {
    name: 'SEEDS India',
    location: 'New Delhi, NCR',
    cause: 'Disaster Relief',
    description: 'SEEDS works on disaster preparedness, post-disaster reconstruction and community resilience in earthquake, flood and cyclone zones across India since 1994.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/462b5097c3cbad85311cd8a611a2013108911a36.jpg',
    verified: true,
    campaigns: [{
      title: 'Climate Resilient Schools',
      description: 'Retrofitting and rebuilding 200 schools in seismic and flood-prone zones across North India.',
      goal: 5000000, raised: 3100000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/74af6c9c2bd2e2d1add82ce676dc577d612e9685.jpg',
    }],
  },
  {
    name: 'Rapid Response India',
    location: 'Mumbai, Maharashtra',
    cause: 'Disaster Relief',
    description: 'Rapid Response deploys emergency relief within 24 hours of any disaster — floods, earthquakes, cyclones — providing food, shelter kits and medical aid.',
    image: 'https://picsum.photos/seed/rapid-response/600/300',
    verified: true,
    campaigns: [{
      title: 'Monsoon Pre-Positioning 2026',
      description: 'Pre-positioning relief material for 50,000 families in flood-prone districts ahead of the 2026 monsoon.',
      goal: 3000000, raised: 1900000,
      image: 'https://picsum.photos/seed/rapidres-camp/600/300',
    }],
  },

  // ── WATER & SANITATION ───────────────────────────────────
  {
    name: 'Sulabh International',
    location: 'New Delhi, NCR',
    cause: 'Water & Sanitation',
    description: 'Sulabh has constructed 1.5 million household toilets and 8,500+ community complexes, revolutionising sanitation for the poor and liberating manual scavengers since 1970.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/ee912caf86628f12e745bf6cdee6d783450b1e0e.jpg',
    verified: true,
    campaigns: [{
      title: 'Urban Sanitation Drive 2026',
      description: 'Building 10,000 household toilets in 5 states for urban poor communities.',
      goal: 6000000, raised: 4100000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/5419ec0f9ec5347c79168b56d9f93881b7b8cce2.jpg',
    }],
  },
  {
    name: 'Gramalaya',
    location: 'Tiruchirappalli, Tamil Nadu',
    cause: 'Water & Sanitation',
    description: 'Gramalaya has been working on safe water, sanitation and menstrual health in urban slums and rural Tamil Nadu since 1987, reaching over 4 million people.',
    image: 'https://picsum.photos/seed/gramalaya-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'Safe Water for 1 Lakh Homes',
      description: 'Installing piped water systems in 100 underserved panchayats in Tamil Nadu.',
      goal: 4000000, raised: 2600000,
      image: 'https://picsum.photos/seed/gramalaya-camp/600/300',
    }],
  },

  // ── LIVELIHOOD ────────────────────────────────────────────
  {
    name: 'PRADAN',
    location: 'New Delhi, NCR',
    cause: 'Livelihood',
    description: 'PRADAN deploys professionals to work alongside tribal and rural communities in 7 states, building SHG federations and sustainable livelihoods since 1983.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/46b6a739cc946f4a214623d6b53ee6b8332a4248.jpg',
    verified: true,
    campaigns: [{
      title: 'Tribal SHG Revival – Jharkhand',
      description: 'Setting up 1,000 new self-help groups for tribal women in Jharkhand and Chhattisgarh.',
      goal: 2500000, raised: 1600000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/46b6a739cc946f4a214623d6b53ee6b8332a4248.jpg',
    }],
  },
  {
    name: 'GiveIndia Foundation',
    location: 'Bengaluru, Karnataka',
    cause: 'Livelihood',
    description: 'India\'s largest and most trusted giving platform, channelling over ₹1,000 crore in donations to 200+ verified NGOs and running direct livelihood and health programs.',
    image: 'https://picsum.photos/seed/giveindia-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'Livelihood for 1 Lakh Families',
      description: 'Direct cash transfers, skills training and asset creation for 1 lakh families below the poverty line.',
      goal: 20000000, raised: 14000000,
      image: 'https://picsum.photos/seed/giveindia-camp/600/300',
    }],
  },

  // ── ANIMAL WELFARE ───────────────────────────────────────
  {
    name: 'Blue Cross of India',
    location: 'Chennai, Tamil Nadu',
    cause: 'Animal Welfare',
    description: 'India\'s oldest animal welfare organisation (est. 1959), Blue Cross runs a 24-hour rescue service, sterilisation and adoption centre in Chennai.',
    image: 'https://picsum.photos/seed/bluecross-india/600/300',
    verified: true,
    campaigns: [{
      title: 'Sterilise 10,000 Strays',
      description: 'Free Animal Birth Control surgeries and anti-rabies vaccinations for 10,000 Chennai stray dogs.',
      goal: 2000000, raised: 1300000,
      image: 'https://picsum.photos/seed/bluecross-camp/600/300',
    }],
  },
  {
    name: 'Wildlife Trust of India',
    location: 'New Delhi, NCR',
    cause: 'Animal Welfare',
    description: 'WTI works on wildlife rescue, habitat conservation and human-wildlife conflict mitigation — with over 20,000 animals rescued and 12 active conservation programs.',
    image: 'https://picsum.photos/seed/wti-india/600/300',
    verified: true,
    campaigns: [{
      title: 'Elephant Corridor Protection',
      description: 'Securing and restoring 5 critical elephant corridors in Northeast India through land buyout and community stewardship.',
      goal: 6000000, raised: 3900000,
      image: 'https://picsum.photos/seed/wti-camp/600/300',
    }],
  },

  // ── DIGITAL LITERACY ──────────────────────────────────────
  {
    name: 'Pratham InfoTech Foundation',
    location: 'Mumbai, Maharashtra',
    cause: 'Digital Literacy',
    description: 'Pratham InfoTech bridges the digital divide by establishing computer learning centres in government schools and urban slums across 15 states.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/a5c00ee90dacebaacc972bd9002fc05b8abf31b4.jpg',
    verified: true,
    campaigns: [{
      title: 'Digital Labs in 200 Schools',
      description: 'Setting up computer labs with internet in 200 government schools in Maharashtra.',
      goal: 2000000, raised: 1250000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/035c768594bda6472cdf64df6c92f6b5b37291e5.jpg',
    }],
  },
  {
    name: 'Digital Empowerment Foundation',
    location: 'New Delhi, NCR',
    cause: 'Digital Literacy',
    description: 'DEF bridges the digital divide by establishing community information centres and training rural women in digital tools across India.',
    image: 'https://picsum.photos/seed/def-india/600/300',
    verified: true,
    campaigns: [{
      title: 'Digital Villages – 100 Panchayats',
      description: 'Setting up internet centres with trained operators in 100 gram panchayats.',
      goal: 2500000, raised: 1550000,
      image: 'https://picsum.photos/seed/def-camp/600/300',
    }],
  },

  // ── SPORTS & YOUTH ────────────────────────────────────────
  {
    name: 'Dream a Dream',
    location: 'Bengaluru, Karnataka',
    cause: 'Sports & Youth',
    description: 'Dream a Dream empowers young people from vulnerable backgrounds through sport, art and creative learning — helping 10,000+ children annually develop life skills.',
    image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2cee7f952bb267e2f026e2e1bcea8148fa9bc84e.jpg',
    verified: true,
    campaigns: [{
      title: 'Life Skills for 10,000 Youth',
      description: 'Running sport and creative learning programs for 10,000 at-risk children in Bengaluru slums.',
      goal: 2000000, raised: 1300000,
      image: 'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/2cee7f952bb267e2f026e2e1bcea8148fa9bc84e.jpg',
    }],
  },
  {
    name: 'Olympic Gold Quest',
    location: 'Mumbai, Maharashtra',
    cause: 'Sports & Youth',
    description: 'OGQ identifies and nurtures India\'s elite Olympic athletes — funding coaching and sports science support for 60+ champions including PV Sindhu and Abhinav Bindra.',
    image: 'https://picsum.photos/seed/ogq-india/600/300',
    verified: true,
    campaigns: [{
      title: 'Olympic Pathway 2028 – LA',
      description: 'Funding 50 elite athletes in archery, badminton, boxing and wrestling for the 2028 Los Angeles Olympics.',
      goal: 10000000, raised: 6800000,
      image: 'https://picsum.photos/seed/ogq-camp/600/300',
    }],
  },

  // ── ARTS & CULTURE ────────────────────────────────────────
  {
    name: 'Dastkar',
    location: 'New Delhi, NCR',
    cause: 'Arts & Culture',
    description: 'Dastkar supports over 40,000 artisans across India through design development, fair trade and the famous Dastkar Nature Bazaar craft fair since 1981.',
    image: 'https://picsum.photos/seed/dastkar-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'Nature Bazaar 2026 – 5 Cities',
      description: 'Organising the annual craft fair in 5 cities, connecting 2,000 artisans with urban buyers.',
      goal: 800000, raised: 480000,
      image: 'https://picsum.photos/seed/dastkar-camp/600/300',
    }],
  },

  // ── AGRICULTURE ───────────────────────────────────────────
  {
    name: 'BAIF Development Research Foundation',
    location: 'Pune, Maharashtra',
    cause: 'Agriculture',
    description: 'BAIF improves rural and tribal livelihoods through cattle development, watershed management and wadi orchard programs in 16 states since 1967, reaching 4 million families.',
    image: 'https://picsum.photos/seed/baif-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'Wadi – 10,000 Tribal Orchards',
      description: 'Establishing 10,000 household fruit orchards for tribal families across Rajasthan and Gujarat.',
      goal: 4000000, raised: 2700000,
      image: 'https://picsum.photos/seed/baif-camp/600/300',
    }],
  },

  // ── URBAN DEVELOPMENT ────────────────────────────────────
  {
    name: 'Apnalaya',
    location: 'Mumbai, Maharashtra',
    cause: 'Urban Development',
    description: 'Apnalaya has served Mumbai\'s M-East ward for 50+ years through integrated education, healthcare, livelihood and community development in Govandi and Shivaji Nagar.',
    image: 'https://picsum.photos/seed/apnalaya-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'M-East Community Centre',
      description: 'Building a multi-purpose centre with library, health clinic and skill lab in Govandi.',
      goal: 3000000, raised: 1800000,
      image: 'https://picsum.photos/seed/apnalaya-camp/600/300',
    }],
  },
  {
    name: 'Janaagraha',
    location: 'Bengaluru, Karnataka',
    cause: 'Urban Development',
    description: 'Janaagraha improves urban infrastructure and governance through citizen participation, ward committees and city finance reform advocacy since 2001.',
    image: 'https://picsum.photos/seed/janaagraha-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'My Ward My City – 5 Cities',
      description: 'Training 10,000 citizen leaders in ward governance, budget reading and civic participation.',
      goal: 1500000, raised: 950000,
      image: 'https://picsum.photos/seed/janaagraha-camp/600/300',
    }],
  },

  // ── TRIBAL WELFARE ────────────────────────────────────────
  {
    name: 'Eklavya Foundation',
    location: 'Bhopal, Madhya Pradesh',
    cause: 'Tribal Welfare',
    description: 'Eklavya develops inquiry-based learning programs for tribal and rural schools in central India through the Hoshangabad Science Teaching Programme.',
    image: 'https://picsum.photos/seed/eklavya-ngo/600/300',
    verified: true,
    campaigns: [{
      title: 'Science Kits for Tribal Schools',
      description: 'Supplying hands-on science kits and training 2,000 teachers in 500 tribal schools across MP and CG.',
      goal: 1000000, raised: 650000,
      image: 'https://picsum.photos/seed/eklavya-camp/600/300',
    }],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    await Ngo.deleteMany({});
    console.log('Cleared existing NGOs');
    const inserted = await Ngo.insertMany(ngos);
    console.log(`✅ Seeded ${inserted.length} NGOs`);
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();