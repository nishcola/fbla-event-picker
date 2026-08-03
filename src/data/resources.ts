// Recommended study resources for every FBLA competitive event, keyed by
// event ID (see events.ts). DEFAULT_RESOURCES remains the safety net for
// any future event added without custom links.

export interface ResourceLink {
  label: string;
  url: string;
}

// Official starting points for any event.
export const DEFAULT_RESOURCES: ResourceLink[] = [
  { label: 'FBLA competitive events overview', url: 'https://www.fbla.org/competitive-events/' },
  { label: 'FBLA guidelines & event resources', url: 'https://connect.fbla.org/' },
  { label: 'FBLA Store practice materials', url: 'https://www.fblastore.org/' },
];

export const resources: Record<string, ResourceLink[]> = {
  accounting: [
    { label: 'AccountingCoach — free accounting study guides', url: 'https://www.accountingcoach.com/' },
    { label: 'Khan Academy — accounting & financial statements', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance/accounting-and-financial-stateme' },
    { label: 'Investopedia — accounting terms explained', url: 'https://www.investopedia.com/terms/a/accounting.asp' },
    { label: 'FBLA Store — Accounting practice tests', url: 'https://www.fblastore.org/' },
  ],
  'advanced-accounting': [
    { label: 'Corporate Finance Institute — accounting & finance courses', url: 'https://corporatefinanceinstitute.com/' },
    { label: 'AccountingCoach — advanced accounting topics', url: 'https://www.accountingcoach.com/' },
    { label: 'Investopedia — corporate accounting terms', url: 'https://www.investopedia.com/terms/c/corporateaccounting.asp' },
    { label: 'Khan Academy — accounting fundamentals', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance' },
  ],
  advertising: [
    { label: 'Think with Google — advertising research & insights', url: 'https://www.thinkwithgoogle.com/' },
    { label: 'HubSpot Academy — free marketing courses', url: 'https://academy.hubspot.com/' },
    { label: 'American Marketing Association — advertising resources', url: 'https://www.ama.org/' },
    { label: 'Ad Age — advertising industry news', url: 'https://adage.com/' },
  ],
  agribusiness: [
    { label: 'USDA — agriculture programs & data', url: 'https://www.usda.gov/' },
    { label: 'USDA NASS — agricultural statistics', url: 'https://www.nass.usda.gov/' },
    { label: 'AgCareers — agribusiness career information', url: 'https://www.agcareers.com/' },
    { label: 'BLS — farming, fishing & forestry outlook', url: 'https://www.bls.gov/ooh/farming-fishing-and-forestry/' },
  ],
  'banking-financial-systems': [
    { label: 'Federal Reserve — how the banking system works', url: 'https://www.federalreserve.gov/' },
    { label: 'FDIC — deposit insurance & bank resources', url: 'https://www.fdic.gov/' },
    { label: 'American Bankers Association — banking careers & education', url: 'https://www.aba.com/' },
    { label: 'Khan Academy — banking and money', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance' },
  ],
  'broadcast-journalism': [
    { label: 'Poynter — journalism craft & ethics', url: 'https://www.poynter.org/' },
    { label: 'NPR Training — storytelling & audio guides', url: 'https://training.npr.org/' },
    { label: 'Columbia Journalism Review — media criticism & ethics', url: 'https://www.cjr.org/' },
    { label: 'YouTube Creator Academy — video production basics', url: 'https://creatoracademy.youtube.com/' },
  ],
  'business-communication': [
    { label: 'Purdue OWL — business writing guides', url: 'https://owl.purdue.edu/' },
    { label: 'Grammarly Blog — writing & professional tone tips', url: 'https://www.grammarly.com/blog/' },
    { label: 'Indeed Career Advice — workplace communication', url: 'https://www.indeed.com/career-advice' },
  ],
  'business-ethics': [
    { label: 'Markkula Center — ethics resources for students', url: 'https://www.scu.edu/ethics/' },
    { label: 'Investopedia — business ethics explained', url: 'https://www.investopedia.com/terms/b/business-ethics.asp' },
    { label: 'Harvard Business Review — ethics & leadership', url: 'https://hbr.org/' },
  ],
  'business-law': [
    { label: 'Cornell Legal Information Institute — free law library', url: 'https://www.law.cornell.edu/' },
    { label: 'Oyez — Supreme Court cases made simple', url: 'https://www.oyez.org/' },
    { label: 'FindLaw — business & employment law basics', url: 'https://www.findlaw.com/' },
  ],
  'business-management': [
    { label: 'MindTools — management & leadership skills', url: 'https://www.mindtools.com/' },
    { label: 'Harvard Business Review — management insights', url: 'https://hbr.org/' },
    { label: 'Coursera — management courses (free audit)', url: 'https://www.coursera.org/courses?query=management' },
  ],
  'business-plan': [
    { label: 'SBA — write your business plan', url: 'https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan' },
    { label: 'SCORE — free business plan templates', url: 'https://www.score.org/resource/business-plan-template-startup-business' },
    { label: 'Bplans — sample business plans', url: 'https://www.bplans.com/sample-business-plans/' },
    { label: 'Khan Academy — finance & capital markets', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance' },
  ],
  'career-portfolio': [
    { label: 'Indeed Career Advice — resumes & portfolios', url: 'https://www.indeed.com/career-advice' },
    { label: 'The Balance — career & portfolio guidance', url: 'https://www.thebalancemoney.com/' },
    { label: 'Canva Design School — portfolio design tips', url: 'https://www.canva.com/learn/' },
  ],
  'coding-programming': [
    { label: 'freeCodeCamp — free coding curriculum', url: 'https://www.freecodecamp.org/learn/' },
    { label: 'W3Schools — interactive programming tutorials', url: 'https://www.w3schools.com/' },
    { label: 'Codecademy — learn to code', url: 'https://www.codecademy.com/' },
    { label: 'GitHub — host and share your code', url: 'https://github.com/' },
  ],
  'community-service-project': [
    { label: 'VolunteerMatch — find service opportunities', url: 'https://www.volunteermatch.org/' },
    { label: 'DoSomething — youth-led service campaigns', url: 'https://www.dosomething.org/' },
    { label: 'Points of Light — community impact resources', url: 'https://www.pointsoflight.org/' },
  ],
  'computer-applications': [
    { label: 'LearnFree (Goodwill) — free Office tutorials', url: 'https://www.learnfree.org/explore/microsoft-office-tutorials' },
    { label: 'Microsoft Learn — Word, Excel & PowerPoint training', url: 'https://learn.microsoft.com/' },
    { label: 'Google Workspace Learning Center — Docs, Sheets & Slides', url: 'https://support.google.com/workspace/' },
  ],
  'computer-game-sim-programming': [
    { label: 'Scratch — build games with block coding', url: 'https://scratch.mit.edu/' },
    { label: 'Unity Learn — game development courses', url: 'https://learn.unity.com/' },
    { label: 'freeCodeCamp — game development tutorials', url: 'https://www.freecodecamp.org/news/tag/game-development/' },
  ],
  'computer-problem-solving': [
    { label: 'CompTIA — IT fundamentals & certification prep', url: 'https://www.comptia.org/' },
    { label: 'Computer Hope — free tech help & tutorials', url: 'https://www.computerhope.com/' },
    { label: 'Professor Messer — free IT exam training videos', url: 'https://www.professormesser.com/' },
  ],
  'customer-service': [
    { label: 'Help Scout Blog — customer service best practices', url: 'https://www.helpscout.com/blog/' },
    { label: 'Zendesk Blog — support & CX guides', url: 'https://www.zendesk.com/blog/' },
    { label: 'Indeed Career Advice — customer service skills', url: 'https://www.indeed.com/career-advice' },
  ],
  cybersecurity: [
    { label: 'Cybrary — free cybersecurity courses', url: 'https://www.cybrary.it/' },
    { label: 'NIST — Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
    { label: 'freeCodeCamp — cybersecurity fundamentals', url: 'https://www.freecodecamp.org/news/tag/cybersecurity/' },
    { label: 'SANS — free cyber security resources', url: 'https://www.sans.org/security-resources/' },
  ],
  'data-analysis': [
    { label: 'Kaggle Learn — free data science micro-courses', url: 'https://www.kaggle.com/learn' },
    { label: 'Coursera — Google Data Analytics certificate (free audit)', url: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
    { label: 'freeCodeCamp — data analysis tutorials', url: 'https://www.freecodecamp.org/learn/' },
  ],
  'data-science-ai': [
    { label: 'Kaggle Learn — free data science micro-courses', url: 'https://www.kaggle.com/learn' },
    { label: 'Google — free AI/ML courses (Google AI)', url: 'https://ai.google/education/' },
    { label: 'IBM SkillsBuild — data & AI learning paths', url: 'https://skillsbuild.org/' },
    { label: 'freeCodeCamp — data science curriculum', url: 'https://www.freecodecamp.org/learn/' },
  ],
  'digital-animation': [
    { label: 'Blender — free 3D animation software & tutorials', url: 'https://www.blender.org/' },
    { label: 'Animation Mentor — animation fundamentals blog', url: 'https://www.animationmentor.com/' },
    { label: 'YouTube Creator Academy — animation & video basics', url: 'https://creatoracademy.youtube.com/' },
  ],
  'digital-video-production': [
    { label: 'YouTube Creator Academy — video production courses', url: 'https://creatoracademy.youtube.com/' },
    { label: 'NPR Training — video storytelling guides', url: 'https://training.npr.org/' },
    { label: 'Adobe — Premiere Pro tutorials', url: 'https://helpx.adobe.com/premiere-pro/tutorials.html' },
  ],
  economics: [
    { label: 'Khan Academy — macro & microeconomics', url: 'https://www.khanacademy.org/economics-finance-domain' },
    { label: 'Library of Economics and Liberty — econ concepts', url: 'https://www.econlib.org/' },
    { label: 'Federal Reserve — monetary policy education', url: 'https://www.federalreserve.gov/' },
    { label: 'BEA — U.S. economic data', url: 'https://www.bea.gov/' },
  ],
  entrepreneurship: [
    { label: 'SBA — start and grow your business', url: 'https://www.sba.gov/business-guide' },
    { label: 'SCORE — free mentoring & templates', url: 'https://www.score.org/' },
    { label: 'Y Combinator Startup School — free startup lessons', url: 'https://www.startupschool.org/' },
    { label: 'Khan Academy — entrepreneurship course', url: 'https://www.khanacademy.org/college-careers-more/entrepreneurship' },
  ],
  'event-planning': [
    { label: 'Eventbrite Blog — event planning guides', url: 'https://www.eventbrite.com/blog/' },
    { label: 'Cvent Blog — professional event management', url: 'https://www.cvent.com/en/blog' },
    { label: 'BLS — meeting, convention & event planners', url: 'https://www.bls.gov/ooh/business-and-financial/meeting-convention-and-event-planners.htm' },
  ],
  'financial-planning': [
    { label: 'Consumer Financial Protection Bureau — money basics', url: 'https://www.consumerfinance.gov/' },
    { label: 'Khan Academy — personal finance', url: 'https://www.khanacademy.org/college-careers-more/personal-finance' },
    { label: 'NerdWallet — budgeting & planning tools', url: 'https://www.nerdwallet.com/' },
    { label: 'MyMoney.gov — federal financial education', url: 'https://www.mymoney.gov/' },
  ],
  'financial-statement-analysis': [
    { label: 'Corporate Finance Institute — reading financial statements', url: 'https://corporatefinanceinstitute.com/' },
    { label: 'Investopedia — financial statement analysis', url: 'https://www.investopedia.com/terms/f/financial-statement-analysis.asp' },
    { label: 'SEC EDGAR — real company filings to practice on', url: 'https://www.sec.gov/edgar' },
    { label: 'Khan Academy — accounting & financial statements', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance' },
  ],
  'future-business-educator': [
    { label: 'We Are Teachers — lesson planning ideas', url: 'https://www.weareteachers.com/' },
    { label: 'ReadWriteThink — classroom resources & lesson plans', url: 'https://www.readwritethink.org/' },
    { label: 'NEA — teaching resources & professional development', url: 'https://www.nea.org/' },
  ],
  'future-business-leader': [
    { label: 'FBLA — national programs & leadership', url: 'https://www.fbla.org/' },
    { label: 'FBLA Connect — member resources', url: 'https://connect.fbla.org/' },
    { label: 'MindTools — leadership skills development', url: 'https://www.mindtools.com/' },
    { label: 'TED — leadership talks', url: 'https://www.ted.com/' },
  ],
  'graphic-design': [
    { label: 'Canva Design School — free design lessons', url: 'https://www.canva.com/learn/' },
    { label: 'Figma Learn — design fundamentals', url: 'https://www.figma.com/resource-library/' },
    { label: 'Adobe — color and typography guides', url: 'https://www.adobe.com/creativecloud/design/discover.html' },
    { label: 'Google Material Design — design principles', url: 'https://m3.material.io/' },
  ],
  'healthcare-administration': [
    { label: 'HHS — HIPAA & health policy information', url: 'https://www.hhs.gov/' },
    { label: 'AHIMA — health information careers & standards', url: 'https://www.ahima.org/' },
    { label: 'MedlinePlus — medical terminology & health topics', url: 'https://medlineplus.gov/' },
    { label: 'CMS — healthcare administration & billing', url: 'https://www.cms.gov/' },
  ],
  'hospitality-event-management': [
    { label: 'American Hotel & Lodging Association — hospitality industry', url: 'https://www.ahla.com/' },
    { label: 'National Restaurant Association — food service industry', url: 'https://restaurant.org/' },
    { label: 'EHL Hospitality Insights — industry research', url: 'https://hospitalityinsights.ehl.edu/' },
  ],
  'hr-management': [
    { label: 'SHRM — human resource management resources', url: 'https://www.shrm.org/' },
    { label: 'BLS — human resources specialists outlook', url: 'https://www.bls.gov/ooh/business-and-financial/human-resources-specialists.htm' },
    { label: 'Investopedia — HR terms & concepts', url: 'https://www.investopedia.com/terms/h/humanresourcemanagement.asp' },
  ],
  'impromptu-speaking': [
    { label: 'Toastmasters — impromptu speaking tips', url: 'https://www.toastmasters.org/' },
    { label: 'TED — talks on speaking and thinking fast', url: 'https://www.ted.com/' },
    { label: 'VirtualSpeech — impromptu speaking articles', url: 'https://virtualspeech.com/blog/category/public-speaking' },
  ],
  'insurance-risk-management': [
    { label: 'Insurance Information Institute — insurance basics', url: 'https://www.iii.org/' },
    { label: 'NAIC — insurance regulation & consumer guides', url: 'https://www.naic.org/' },
    { label: 'Khan Academy — personal finance insurance', url: 'https://www.khanacademy.org/college-careers-more/personal-finance' },
  ],
  'international-business': [
    { label: 'Trade.gov — international trade resources', url: 'https://www.trade.gov/' },
    { label: 'World Economic Forum — global economy insights', url: 'https://www.weforum.org/' },
    { label: 'Harvard Business Review — global business articles', url: 'https://hbr.org/' },
  ],
  'intro-business-communication': [
    { label: 'Purdue OWL — business writing basics', url: 'https://owl.purdue.edu/' },
    { label: 'Grammarly Blog — professional writing tips', url: 'https://www.grammarly.com/blog/' },
    { label: 'Indeed Career Advice — communication at work', url: 'https://www.indeed.com/career-advice' },
  ],
  'intro-business-concepts': [
    { label: 'Khan Academy — entrepreneurship fundamentals', url: 'https://www.khanacademy.org/college-careers-more/entrepreneurship' },
    { label: 'SBA — business guide for beginners', url: 'https://www.sba.gov/business-guide' },
    { label: 'Investopedia — business essentials', url: 'https://www.investopedia.com/terms/b/business.asp' },
  ],
  'intro-business-presentation': [
    { label: 'Canva Design School — presentation design', url: 'https://www.canva.com/learn/' },
    { label: 'Toastmasters — presentation skills', url: 'https://www.toastmasters.org/' },
    { label: 'TED — great presentation examples', url: 'https://www.ted.com/' },
  ],
  'intro-business-procedures': [
    { label: 'LearnFree (Goodwill) — office skills tutorials', url: 'https://www.learnfree.org/explore/microsoft-office-tutorials' },
    { label: 'Indeed Career Advice — professionalism & workplace basics', url: 'https://www.indeed.com/career-advice' },
    { label: 'MindTools — workplace skills', url: 'https://www.mindtools.com/' },
  ],
  'intro-fbla': [
    { label: 'FBLA — national organization', url: 'https://www.fbla.org/' },
    { label: 'FBLA Connect — member resources', url: 'https://connect.fbla.org/' },
    { label: 'FBLA Store — publications & materials', url: 'https://www.fblastore.org/' },
  ],
  'intro-it': [
    { label: 'LearnFree (Goodwill) — free computer tutorials', url: 'https://www.learnfree.org/explore/computers-101' },
    { label: 'Code.org — computer science basics', url: 'https://code.org/' },
    { label: 'CompTIA — IT fundamentals explained', url: 'https://www.comptia.org/' },
  ],
  'intro-marketing-concepts': [
    { label: 'American Marketing Association — marketing basics', url: 'https://www.ama.org/' },
    { label: 'HubSpot Academy — free marketing courses', url: 'https://academy.hubspot.com/' },
    { label: 'Google Digital Garage — marketing fundamentals', url: 'https://learndigital.withgoogle.com/digitalgarage' },
  ],
  'intro-parliamentary-procedure': [
    { label: 'Robert’s Rules of Order — official site', url: 'https://robertsrules.com/' },
    { label: 'FBLA Connect — event guidelines', url: 'https://connect.fbla.org/' },
    { label: 'FFA — parliamentary procedure resources', url: 'https://www.ffa.org/' },
  ],
  'intro-programming': [
    { label: 'Scratch — start coding with blocks', url: 'https://scratch.mit.edu/' },
    { label: 'Code.org — learn programming basics', url: 'https://code.org/' },
    { label: 'W3Schools — simple coding tutorials', url: 'https://www.w3schools.com/' },
  ],
  'intro-public-speaking': [
    { label: 'Toastmasters — public speaking resources', url: 'https://www.toastmasters.org/' },
    { label: 'TED — inspiring speech examples', url: 'https://www.ted.com/' },
    { label: 'VirtualSpeech — speech articles for beginners', url: 'https://virtualspeech.com/blog/category/public-speaking' },
  ],
  'intro-retail-merchandising': [
    { label: 'National Retail Federation — retail industry', url: 'https://nrf.com/' },
    { label: 'Retail Dive — retail news & trends', url: 'https://www.retaildive.com/' },
    { label: 'BLS — retail sales workers outlook', url: 'https://www.bls.gov/ooh/sales/retail-sales-workers.htm' },
  ],
  'intro-social-media-strategy': [
    { label: 'Hootsuite Blog — social media strategy guides', url: 'https://blog.hootsuite.com/' },
    { label: 'HubSpot Academy — social media courses', url: 'https://academy.hubspot.com/' },
    { label: 'Meta Blueprint — free social media training', url: 'https://www.facebook.com/business/learn' },
  ],
  'intro-supply-chain': [
    { label: 'MIT OpenCourseWare — supply chain fundamentals', url: 'https://ocw.mit.edu/search/?q=supply%20chain' },
    { label: 'CSCMP — supply chain resources', url: 'https://cscmp.org/' },
    { label: 'BLS — logisticians career outlook', url: 'https://www.bls.gov/ooh/business-and-financial/logisticians.htm' },
  ],
  'job-interview': [
    { label: 'Indeed Career Advice — interviewing guides', url: 'https://www.indeed.com/career-advice/interviewing' },
    { label: 'Big Interview — free interview practice', url: 'https://www.biginterview.com/' },
    { label: 'Glassdoor Blog — interview tips & questions', url: 'https://www.glassdoor.com/blog/' },
  ],
  journalism: [
    { label: 'Poynter — journalism ethics & craft', url: 'https://www.poynter.org/' },
    { label: 'Columbia Journalism Review — press & media criticism', url: 'https://www.cjr.org/' },
    { label: 'NPR Training — reporting & editing', url: 'https://training.npr.org/' },
    { label: 'American Press Institute — journalism resources', url: 'https://www.americanpressinstitute.org/' },
  ],
  'local-chapter-annual-report': [
    { label: 'FBLA — national chapter programs', url: 'https://www.fbla.org/' },
    { label: 'FBLA Connect — reporting guidelines', url: 'https://connect.fbla.org/' },
    { label: 'FBLA Store — chapter resources', url: 'https://www.fblastore.org/' },
  ],
  'management-information-systems': [
    { label: 'TechTarget — information systems explained', url: 'https://www.techtarget.com/' },
    { label: 'Coursera — MIS courses (free audit)', url: 'https://www.coursera.org/courses?query=management%20information%20systems' },
    { label: 'IBM SkillsBuild — technology career paths', url: 'https://skillsbuild.org/' },
  ],
  marketing: [
    { label: 'American Marketing Association — marketing resources', url: 'https://www.ama.org/' },
    { label: 'HubSpot Academy — free marketing certification', url: 'https://academy.hubspot.com/' },
    { label: 'Google Digital Garage — digital marketing fundamentals', url: 'https://learndigital.withgoogle.com/digitalgarage' },
  ],
  'mobile-application-development': [
    { label: 'MIT App Inventor — build apps without complex setup', url: 'https://appinventor.mit.edu/' },
    { label: 'Android Developers — official Android training', url: 'https://developer.android.com/' },
    { label: 'Flutter — cross-platform app development', url: 'https://flutter.dev/' },
    { label: 'Apple Developer — iOS development resources', url: 'https://developer.apple.com/' },
  ],
  'network-design': [
    { label: 'Cisco Networking Academy — free networking courses', url: 'https://www.netacad.com/' },
    { label: 'Professor Messer — free Network+ training videos', url: 'https://www.professormesser.com/' },
    { label: 'CompTIA Network+ — certification objectives', url: 'https://www.comptia.org/certifications/network' },
  ],
  'networking-infrastructures': [
    { label: 'Cisco Networking Academy — networking fundamentals', url: 'https://www.netacad.com/' },
    { label: 'Professor Messer — network training videos', url: 'https://www.professormesser.com/' },
    { label: 'CompTIA Network+ — certification objectives', url: 'https://www.comptia.org/certifications/network' },
  ],
  'organizational-leadership': [
    { label: 'MindTools — leadership & team management', url: 'https://www.mindtools.com/' },
    { label: 'Harvard Business Review — leadership articles', url: 'https://hbr.org/' },
    { label: 'TED — leadership talks', url: 'https://www.ted.com/' },
  ],
  'parliamentary-procedure': [
    { label: 'Robert’s Rules of Order — official site', url: 'https://robertsrules.com/' },
    { label: 'FFA — parliamentary procedure resources', url: 'https://www.ffa.org/' },
    { label: 'FBLA Connect — event guidelines', url: 'https://connect.fbla.org/' },
  ],
  'personal-finance': [
    { label: 'Consumer Financial Protection Bureau — money basics', url: 'https://www.consumerfinance.gov/' },
    { label: 'Khan Academy — personal finance course', url: 'https://www.khanacademy.org/college-careers-more/personal-finance' },
    { label: 'NerdWallet — budgeting & credit tools', url: 'https://www.nerdwallet.com/' },
    { label: 'MyMoney.gov — federal financial education', url: 'https://www.mymoney.gov/' },
  ],
  'project-management': [
    { label: 'PMI — project management standards & resources', url: 'https://www.pmi.org/' },
    { label: 'MindTools — planning & scheduling skills', url: 'https://www.mindtools.com/' },
    { label: 'Coursera — project management courses (free audit)', url: 'https://www.coursera.org/courses?query=project%20management' },
  ],
  'public-administration': [
    { label: 'USA.gov — how government works', url: 'https://www.usa.gov/' },
    { label: 'GovInfo — official government documents', url: 'https://www.govinfo.gov/' },
    { label: 'GAO — government accountability reports', url: 'https://www.gao.gov/' },
  ],
  'public-service-announcement': [
    { label: 'Ad Council — classic public service campaigns', url: 'https://www.adcouncil.org/' },
    { label: 'YouTube Creator Academy — video production basics', url: 'https://creatoracademy.youtube.com/' },
    { label: 'Canva — PSA design & video templates', url: 'https://www.canva.com/' },
  ],
  'public-speaking': [
    { label: 'Toastmasters — speaking resources & tips', url: 'https://www.toastmasters.org/resources' },
    { label: 'TED — talks on public speaking craft', url: 'https://www.ted.com/playlists/207/talks_on_public_speaking' },
    { label: 'Coursera — public speaking course (free audit)', url: 'https://www.coursera.org/courses?query=public%20speaking' },
    { label: 'VirtualSpeech — public speaking articles', url: 'https://virtualspeech.com/blog/category/public-speaking' },
  ],
  'real-estate': [
    { label: 'National Association of REALTORS — industry resources', url: 'https://www.nar.realtor/' },
    { label: 'BLS — real estate brokers & sales agents', url: 'https://www.bls.gov/ooh/sales/real-estate-brokers-and-sales-agents.htm' },
    { label: 'Investopedia — mortgages & real estate', url: 'https://www.investopedia.com/mortgage/' },
  ],
  'retail-management': [
    { label: 'National Retail Federation — retail industry insights', url: 'https://nrf.com/' },
    { label: 'Retail Dive — retail management news', url: 'https://www.retaildive.com/' },
    { label: 'BLS — retail sales workers outlook', url: 'https://www.bls.gov/ooh/sales/retail-sales-workers.htm' },
  ],
  'sales-presentation': [
    { label: 'HubSpot Sales Blog — sales techniques', url: 'https://blog.hubspot.com/sales' },
    { label: 'Sandler Training — professional selling methods', url: 'https://www.sandler.com/' },
    { label: 'Sales Gravy — sales training resources', url: 'https://salesgravy.com/' },
  ],
  'securities-investments': [
    { label: 'SEC Investor.gov — investing basics', url: 'https://www.investor.gov/' },
    { label: 'FINRA — investor education', url: 'https://www.finra.org/investors' },
    { label: 'Investopedia — stocks, bonds & portfolios', url: 'https://www.investopedia.com/investing/' },
    { label: 'Khan Academy — investing & financial markets', url: 'https://www.khanacademy.org/college-careers-more/personal-finance' },
  ],
  'social-media-strategies': [
    { label: 'Hootsuite Blog — social media strategy', url: 'https://blog.hootsuite.com/' },
    { label: 'HubSpot Academy — social media certification', url: 'https://academy.hubspot.com/' },
    { label: 'Meta Blueprint — free platform training', url: 'https://www.facebook.com/business/learn' },
  ],
  'sports-entertainment-management': [
    { label: 'BLS — sports management career outlook', url: 'https://www.bls.gov/ooh/management/agents-and-business-managers-of-artists-performers-and-athletes.htm' },
    { label: 'SBA — event planning & promotion basics', url: 'https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis' },
    { label: 'Sports Business Classroom — industry education', url: 'https://www.sportsbusinessclassroom.com/' },
    { label: 'Stadium Journey — venue & fan experience analysis', url: 'https://www.stadiumjourney.com/' },
  ],
  'supply-chain-management': [
    { label: 'MIT OpenCourseWare — supply chain fundamentals', url: 'https://ocw.mit.edu/search/?q=supply%20chain' },
    { label: 'CSCMP — supply chain resources', url: 'https://cscmp.org/' },
    { label: 'BLS — logisticians career outlook', url: 'https://www.bls.gov/ooh/business-and-financial/logisticians.htm' },
    { label: 'edX — supply chain management courses (free audit)', url: 'https://www.edx.org/learn/supply-chain-management' },
  ],
  'technology-support-services': [
    { label: 'CompTIA A+ — IT support certification objectives', url: 'https://www.comptia.org/certifications/a' },
    { label: 'Professor Messer — free A+ training videos', url: 'https://www.professormesser.com/' },
    { label: 'Computer Hope — help desk & troubleshooting help', url: 'https://www.computerhope.com/' },
  ],
  'visual-design': [
    { label: 'Canva Design School — free design lessons', url: 'https://www.canva.com/learn/' },
    { label: 'Figma Learn — design fundamentals', url: 'https://www.figma.com/resource-library/' },
    { label: 'Google Material Design — design principles', url: 'https://m3.material.io/' },
    { label: 'Adobe — color and typography guides', url: 'https://www.adobe.com/creativecloud/design/discover.html' },
  ],
  'website-coding-development': [
    { label: 'MDN Web Docs — HTML, CSS, and JavaScript reference', url: 'https://developer.mozilla.org/' },
    { label: 'freeCodeCamp — responsive web design certification', url: 'https://www.freecodecamp.org/learn/' },
    { label: 'W3Schools — interactive tutorials', url: 'https://www.w3schools.com/' },
    { label: 'Codecademy — free web development courses', url: 'https://www.codecademy.com/catalog/subject/web-development' },
  ],
  'website-design': [
    { label: 'Figma Learn — UI/UX design fundamentals', url: 'https://www.figma.com/resource-library/' },
    { label: 'MDN Web Docs — CSS & responsive design', url: 'https://developer.mozilla.org/' },
    { label: 'Canva Design School — layout & visual design', url: 'https://www.canva.com/learn/' },
  ],
};
