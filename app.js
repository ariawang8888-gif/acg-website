const main = document.querySelector('main');
const t = (en, zh) => language === 'zh' ? zh : en;
const email = 'info@nzacg.com';
const phone = '0800 168 100';
const categories = {residential:['Residential','住宅项目'],commercial:['Commercial','商业项目']};
const pages = {home:['Home','首页'],projects:['Projects','项目'],about:['About','关于我们'],contact:['Contact','联系我们']};
const services = [
  [
    "New Building",
    "新建筑",
    "Our mission is to provide building solutions that effectively translate our client’s visions and needs into built realities. Each phase of construction is posted online and we welcome feedback and comments to collect creative insights. Make sure to view new buildings and projects on our website.",
    "我们的使命是将您的梦想化为砖瓦之间的生动现实。无论是一座雄伟的摩天大楼还是一座迷人的私人别墅，我们的团队都运用敏锐的洞察力和丰富的经验，将每一个施工阶段转化为艺术的展示。",
    null,
    "M3 12l9-8 9 8M5 11v10h14V11"
  ],
  [
    "Subdivision & Construction Management",
    "土地分割以及项目管理",
    "ACG assesses subdivision feasibility and how development may affect your property’s value. For projects in Auckland, we provide a subdivision feasibility report and start to end solutions for land development, subdivision, and land use projects. Our team serves the residential, project management, civil, and building work industries, developing robust strategies to maximize value.",
    "如果您考虑对房产进行分割或开发项目，ACG将为您提供详尽的分析报告，确保您的投资价值最大化。我们的专业团队从土地开发到细分再到土地利用，以及项目管理，全方位的解决方案。我们的目标不仅是为您提供战略规划，更是为您创造持久的价值。",
    null,
    "M2 8l10-5 10 5-10 5zM2 12l10 5 10-5M2 16l10 5 10-5"
  ],
  [
    "Interior Fit Out",
    "室内装修",
    "ACG specializes in carpentry, formwork, and cladding. Working alongside your project managers and our network of subcontractors, we deliver high quality work for your dream home, commercial property, or renovation. Our professional service coordinates design and construction to meet your requirements, project deadlines, and budget, creating modern spaces that bring your vision to life.",
    "ACG团队与您的项目经理紧密合作，确保每一次的设计和建造都能实现您理想的呈现。无论是家庭的温馨空间、商业地产的专业氛围还是翻新工程的创新设计，我们都能够以高品质的工艺和精湛的技术，完美呈现。",
    null,
    "M4 7l13 13 3-3L7 4zM4 17L17 4l3 3L7 20z"
  ]
];
const projects = window.PROJECTS;
const featuredResidentialIds = ['r06','r02','r01','r04'];
const residentialProjects = projects.filter(project => project.cat === 'residential');
const homeResidentialProjects = [
 ...featuredResidentialIds.map(id => residentialProjects.find(project => project.id === id)).filter(Boolean),
 ...residentialProjects.filter(project => !featuredResidentialIds.includes(project.id))
];
let language = localStorage.getItem('acg-language') === 'zh' ? 'zh' : 'en';
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const photo = p => p.image ? '<img loading="lazy" src="./images/'+p.image+'.webp" alt="'+esc(p.name)+'">' : '<span class="photo-empty" aria-hidden="true">ACG</span>';
const button = (label,link,light=false) => '<a class="btn '+(light?'light':'')+'" href="'+link+'">'+label+' <span aria-hidden="true">→</span></a>';
const card = p => `
 <a class="card" href="#project/${p.id}">
  <div class="photo">${photo(p)}</div>
  <div class="cardtext">
   <small>${t(...categories[p.cat])}</small>
   <strong>${esc(p.name)}</strong>
   <span class="card-address">${esc(projectDisplayAddress(p))}</span>
   <span class="card-action">${t('View project','查看项目')} <span aria-hidden="true">→</span></span>
  </div>
 </a>`;
const title = (heading,copy='') => '<section class="title"><div class="wrap"><h1>'+heading+'</h1>'+(copy?'<p>'+copy+'</p>':'')+'</div></section>';
function servicesMarkup() {
 return services.map(([en,zh,copy,translated,subtitle,path],index) => '<article class="service" id="service-'+index+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+path+'"/></svg><h3>'+(index === 1 && language === 'en' ? '<span class="service-title-line">Subdivision & </span><span class="service-title-line">Construction Management</span>' : t(en,zh)+(subtitle ? ' '+t('& '+subtitle[0],'与'+subtitle[1]) : ''))+'</h3><p>'+t(copy,translated)+'</p></article>').join('');
}
function industryMarks() {
 const marks = [
  ['bronze-2024','Registered Master Builders House of the Year Bronze Award 2024'],
  ['nz-immigration','New Zealand Immigration'],
  ['master-builders','Registered Master Builders'],
  ['lbp','Licensed Building Practitioner'],
  ['impac-prequal','IMPAC PREQUAL'],
  ['sitesafe','Site Safe Member'],
  ['sitewise-2022-23','SiteWise Gold 2022/23'],
  ['nzcbia','New Zealand Chinese Building Industry Association']
 ];
 return `<ul>
     ${marks.map(([id,label])=>`<li><img loading="lazy" src="./images/acg-mark-${id}.webp" alt="${label}"></li>`).join('')}
    </ul>`;
}
function whyChooseACG() {
 return `
  <section class="why-acg" aria-labelledby="why-acg-title">
   <div class="wrap why-acg-layout">
    <div class="why-acg-intro">
     <span class="rule"></span>
     <h2 id="why-acg-title">${t('Why build with ACG?','为什么选择 ACG？')}</h2>
     <p>${t('From bespoke homes to landmark commercial projects, Auckland Construction Group brings experienced teams, careful workmanship and consistent standards to every build. We work with clients and project managers to meet the brief, budget and programme.','从定制住宅到标志性商业项目，奥克兰建工集团凭借经验丰富的团队、扎实的施工工艺与一致的质量标准，推进每一项工程。我们与客户及项目经理紧密合作，兼顾项目需求、预算和工期。')}</p>
     ${button(t('Learn more about ACG','了解更多'),'#about',true)}
    </div>
    <div class="why-acg-marks">${industryMarks()}</div>
   </div>
  </section>`;
}
function home() {
 return '<section class="hero"><div class="hero-photos" aria-hidden="true"><img src="./images/home-carousel-refresh-20261120-1.png" alt="" fetchpriority="high" decoding="async"><img src="./images/home-carousel-refresh-20261120-2.png" alt="" fetchpriority="low" decoding="async"><img src="./images/home-carousel-refresh-20261120-3.jpg" alt="" fetchpriority="low" decoding="async"><img src="./images/home-carousel-refresh-20261120-4.jpg" alt="" fetchpriority="low" decoding="async"><img src="./images/home-carousel-refresh-20261120-5.png" alt="" fetchpriority="low" decoding="async"></div><div class="wrap"><div class="eyebrow">'+t('Auckland · Design · Build','奥克兰 · 设计 · 施工')+'</div><h1>'+t('Auckland’s Trusted','值得信赖的奥克兰')+'<span>'+t('Building Partner','建筑合作伙伴')+'</span></h1><p>'+t('Building the kiwi dream project by project.','ACG 建筑艺术臻品 铸就匠心人居典范')+'</p>'+button(t('Our Projects','查看项目'),'#projects',true)+'</div></section><section class="services"><div class="wrap service-grid"><div class="intro"><span class="rule"></span><h2>'+t('Design & Build<br class="service-intro-break"> in Auckland','奥克兰建筑<br>设计与施工')+'</h2><p>'+t('From pre-construction through delivery, we build residential and commercial spaces across Auckland.','奥克兰建工集团（ACG）凭借一系列标志性项目的卓越业绩，成为奥克兰领先的建筑公司之一，提供涵盖商业和住宅领域的全方位建筑服务。')+'</p></div>'+servicesMarkup()+'</div></section>'+'<section class="featured"><div class="wrap feature-grid"><div class="intro"><span class="rule"></span><h2>'+t('Residential Projects','住宅项目')+'</h2><a href="#projects/residential">'+t('View all residential projects','查看全部住宅项目')+' →</a></div><div class="residential-cards">'+homeResidentialProjects.map(card).join('')+'</div></div></section>'+directorSection();
}
function projectList(filter) {
 const list = projects.filter(p=>!categories[filter]||p.cat===filter);
 return title(t('Our Projects','工程项目'),t('Explore Auckland Construction Group’s residential and commercial portfolio.','浏览奥克兰建工集团的住宅及商业工程案例。'))+'<section class="section"><div class="wrap"><nav class="filters" aria-label="'+t('Project categories','项目分类')+'">'+Object.entries({all:['All projects','全部项目'],...categories}).map(([key,label])=>'<a class="'+((filter||'all')===key?'active':'')+'" href="#projects/'+key+'">'+t(...label)+'</a>').join('')+'</nav><div class="grid">'+list.map(card).join('')+'</div></div></section>';
}
const projectVideos = {
 r02:'qDMCVQya3do', r01:'e0-177dLcy0', r04:'HDfkuWZSPRI', r07:'QWc3mcoJpJU',
 r05:'uN9hmDs2ffI', r08:'P4nbGvL6sqs', r09:'tT8wnFtycRk', r06:'3QuwIA8e6QE'
};
const projectAddressOverrides = {
 r03:'153 Lake Road, Belmont, Auckland 0622',
 c02:'39/47 Union Street, Auckland Central, Auckland 1010',
 c10:'60 Highbrook Drive, East Tāmaki, Auckland 2013',
 c11:'1 Kimiora Street, Three Kings, Auckland'
};
function projectAddress(project) {
 return projectAddressOverrides[project.id] ??
  project.en.match(/^Location:\s*([^\n]+)/m)?.[1].trim() ?? '';
}
function projectDisplayAddress(project) {
 return projectAddress(project)
  .replace(/\bAuckland\b/gi, '')
  .replace(/\b\d{4}\s*$/, '')
  .split(',').map(part => part.trim()).filter(Boolean).join(', ');
}
const projectSummaries = {
 r01:["5 MacMurray Road in Remuera comprises 11 standalone and semi-detached homes delivered across two completed stages. ACG was the main construction contractor.", "5 MacMurray Road 位于 Remuera，分两期建成并交付 11 套住宅，涵盖独立及半独立住宅。ACG 担任主要建筑承包商。"],
 r02:["244 & 246 Victoria Avenue in Remuera comprises six contemporary standalone houses. ACG was the main contractor, with a focus on architectural detailing and interior finishes.", "244 & 246 Victoria Avenue 位于 Remuera，由六栋现代独立住宅组成，ACG 担任总承包商，施工注重建筑细部与室内饰面。"],
 r03:["153–159 Lake Road in Belmont comprises 16 residential units and three retail units, with two- and three-bedroom apartments and three-bedroom terrace houses with detached garages.", "153–159 Lake Road 位于 Belmont，包含 16 个住宅单元及 3 个零售单元，涵盖两居室和三居室公寓，以及配有独立车库的三居室排屋。"],
 r04:["Te Māra – 7 Playfair Road in Mount Roskill was built by ACG in partnership with Avanta Group. The two- and three-bedroom freehold homes feature open-plan living and private courtyards.", "Te Māra – 7 Playfair Road 位于 Mount Roskill，由 ACG 与 Avanta Group 合作建设，提供两卧室及三卧室永久地契住宅，设有开放式起居空间及私人庭院。"],
 r05:["Te Māra – 7 Vercoe Street in Mount Roskill comprises two- and three-bedroom freehold homes with open-plan living, private landscaped courtyards and engineered stone kitchen benchtops.", "Te Māra – 7 Vercoe Street 位于 Mount Roskill，包含两卧室及三卧室永久地契住宅，设有开放式起居空间、私人景观庭院及人造石厨房台面。"],
 r06:["54 Taharoto Road in Takapuna comprises 14 apartments, 14 retail shops and five terrace houses, integrating residential, commercial and access requirements.", "54 Taharoto Road 位于 Takapuna，包含 14 套公寓、14 个商铺及 5 套联排住宅，整合住宅、商业及通行功能。"],
 r07:["23 Frater Avenue in Milford comprises nine four-bedroom, three-bathroom standalone houses, with an internal lift, timber floors and single internal-access garages.", "23 Frater Avenue 位于 Milford，包含九套四卧室、三浴室独立住宅，配有室内电梯、木地板及室内通道单车库。"],
 r08:["45 Anzac Street in Takapuna comprises six terrace houses and four standalone houses, with two- or three-bedroom layouts and studies. Works included interior, kitchen and bathroom updates.", "45 Anzac Street 位于 Takapuna，包含六套联排住宅及四套独立住宅，户型设两间或三间卧室及书房，工程涉及室内、厨房及卫浴更新。"],
 r09:["201 Hurstmere Road in Takapuna incorporates an internal lift, a study and distinct living areas, together with a private garden and off-street parking.", "201 Hurstmere Road 位于 Takapuna，住宅设计包含室内电梯、书房及独立生活区域，并结合私人花园与院内停车空间。"],
 r10:["33 Stanley Avenue in Milford comprises five two-storey, three-bedroom standalone townhouses with two bathrooms, studies, separate kitchens and private patios connected to the living areas.", "33 Stanley Avenue 位于 Milford，包含五栋两层三卧室独立住宅，每栋设两间浴室、书房、独立厨房及与起居室相连的私人庭院。"],
 r11:["71 Jutland Road in Hauraki comprises four three-bedroom standalone houses, with layouts incorporating en-suites or studies and private garden areas.", "71 Jutland Road 位于 Hauraki，包含四栋三卧室独立住宅，不同户型配置套内卫浴或书房，并设有私人花园。"],
 r12:["56 Ernie Pinches Street in Mount Roskill is a seven-lot residential development by ACG and Modulus Home, with coordinated driveway design, interior colour schemes and exterior finishes.", "56 Ernie Pinches Street 位于 Mount Roskill，由 ACG 与 Modulus Home 共同开发，包含七个住宅地块，设计统一协调车道、室内配色及外墙饰面。"],
 r13:["30 Merfield Street in Glen Innes comprises six two-bedroom terrace houses, with kitchens featuring gas range cookers, granite benchtops and tiled splashbacks.", "30 Merfield Street 位于 Glen Innes，由六栋两卧室联排住宅组成，厨房配置燃气灶、花岗岩台面及瓷砖防溅墙面。"],
 r14:["4 Montmere Avenue on Te Atatū Peninsula comprises six residential lots, with building layouts responding to the sloping terrain, existing trees and outdoor spaces.", "4 Montmere Avenue 位于 Te Atatū Peninsula，包含六个住宅地块，建筑布局顺应坡地与高差，协调住宅体量、树木及户外空间。"],
 r15:["117 St Lukes Road in Sandringham was one of the original buildings introduced by Urban Collective. The apartment is on the 17th floor, with city and harbour views.", "117 St Lukes Road 位于 Sandringham，是 Urban Collective 最早推出的建筑之一，所述公寓位于第 17 层，可眺望城市与海港。"],
 r16:["3–5 Hemsway Place in Sunnyhills comprises nine terrace-house lots with almost 800 m² of living space, combining private gardens with functional residential layouts.", "3–5 Hemsway Place 位于 Sunnyhills，包含九个联排住宅地块，居住空间总面积近 800 平方米，住宅结合私人花园及室内功能布局。"],
 r18:["10B Huka Road in Birkenhead comprises eight two-storey terrace houses, with layouts connecting living spaces, fitted kitchens and private outdoor areas.", "10B Huka Road 位于 Birkenhead，包含八栋两层联排住宅，布局结合起居空间、厨房储物及私人户外区域。"],
 r19:["258 Lake Road in Hauraki comprises seven residential lots. Works included residential extensions and kitchen updates, with selected homes having three bedrooms and a study.", "258 Lake Road 位于 Hauraki，包含七个住宅地块，工程涉及住宅扩建及厨房更新，部分户型设三间卧室及书房。"],
 r20:["2 Queen Mary Avenue in Epsom combines four homes and street-facing commercial space, with residential layouts integrating living, dining, kitchen, laundry and parking functions.", "2 Queen Mary Avenue 位于 Epsom，包含四套住宅及沿街商业空间，住宅布局整合起居、用餐、厨房、洗衣及停车功能。"],
 r21:["218 Manukau Road in Epsom comprises six mixed-use terrace houses. The front four combine ground-floor retail and upper-level accommodation, while the rear two have four bedrooms and a study.", "218 Manukau Road 位于 Epsom，由六栋商住联排住宅组成，前四栋结合底层零售及上层住宅，后两栋设四间卧室及书房。"],
 r22:["76 Barrack Road in Mount Wellington comprises four two-storey standalone houses, each with four bedrooms, three bathrooms and an outdoor terrace.", "76 Barrack Road 位于 Mount Wellington，由四栋两层独立住宅组成，每栋设四间卧室、三间浴室及户外露台。"],
 r23:["14 Roseman Avenue in Mount Roskill includes three-bedroom residential accommodation built by ACG, with attention to internal layouts and finish detailing.", "14 Roseman Avenue 位于 Mount Roskill，住宅设三间卧室，由 ACG 施工团队建造，注重室内布局及饰面细节。"],
 r24:["7 Youth Street in Mount Roskill is a three-bedroom standalone home with an internal layout balancing bedroom privacy and everyday living.", "7 Youth Street 位于 Mount Roskill，为三卧室独立住宅，室内布局兼顾卧室私密性及日常起居功能。"],
 r25:["2 Wahanui Road in Greenlane, Auckland, offers three-bedroom and four-bedroom layouts, with three bathrooms and a double garage.", "2 Wahanui Road 位于 Greenlane，设三卧室及四卧室两种户型，配置三间浴室及双车库，布局兼顾卧室私密性、生活空间及停车功能。"],
 r26:["6 Shakespeare Road in Milford comprises eight three-bedroom terrace houses with open-plan living and private outdoor areas, completed in March 2025.", "6 Shakespeare Road 位于 Milford，包含八栋三卧室联排住宅，设有开放式起居空间及私人户外区域，于 2025 年 3 月完工。"],
 c01:["Hockey Centre at 159 Bush Road in Rosedale has a concrete-block ground floor and a steel portal-framed upper level. Extensive glazing and rooflights provide daylight and views towards the hockey pitches.", "Hockey Centre（曲棍球中心）位于奥克兰 Rosedale 的 159 Bush Road。场馆建筑采用混凝土砌块底层及钢门架上层，并以大面积玻璃和屋顶采光构造引入自然光、形成面向球场的视野。"],
 c02:["Union Green is a multi-level office and retail development on Union Street in Auckland. The design combines passive solar principles, natural light and a range of floor plates. ACG carried out the structural fit-out and carpentry package.", "Union Green 位于奥克兰 Union Street，是一个多层办公和零售项目。建筑设计结合被动式太阳能设计、自然采光及多种楼层平面布局，ACG 负责结构性装修及木作工程。"],
 c03:["The Antipodean on Beach Road is a multi-level apartment building with ground-floor retail. Its Art Deco Moderne exterior responds to the surrounding streetscape, while the design addresses coastal wind exposure, sea spray and protection of neighbouring buildings.", "The Antipodean 位于奥克兰 Beach Road，是一座底层设有零售空间的多层公寓建筑。外观采用 Art Deco Moderne 风格，设计同时回应沿海风荷载、盐雾及邻近建筑保护等施工条件。"],
 c04:["Miro Apartment on Enfield Street in Mount Eden, Auckland, comprises 13 serviced apartments. ACG carried out interior refurbishment, including new internal carpentry, focusing on functional spaces and coordinated finishes.", "Miro Apartment 位于奥克兰 Mount Eden 的 Enfield Street，共有 13 套服务式公寓。ACG 负责室内改造及木作施工，注重空间实用性与饰面细节。"],
 c05:["Manukau PAK’nSAVE is at 6 Cavendish Drive in Manukau City Centre, Auckland. The three-level building includes a mezzanine, with a floor area of 139 m² and 304 m² of retail space.", "Manukau PAK’nSAVE 位于奥克兰 Manukau 市中心的 6 Cavendish Drive。建筑共三层并设有夹层，建筑面积为 139 平方米，零售面积为 304 平方米。"],
 c06:["Manurewa Warehouse at 35 Cavendish Drive in Manukau City Centre occupies a 4,800 m² site and has three storeys. ACG carried out spray foam insulation as part of refurbishment works to the upper two storeys.", "Manurewa Warehouse 位于奥克兰 Manukau 市中心的 35 Cavendish Drive，占地 4,800 平方米，建筑共三层。ACG 负责喷涂泡沫保温施工，配合上部两层的翻新工程。"],
 c07:["Takapuna Countdown is a supermarket commercial building at 10 Barrys Point Road in Takapuna, Auckland. The project involved refurbishment of the first-floor retail tenancy.", "Takapuna Countdown 位于奥克兰 Takapuna 的 10 Barrys Point Road，为超市商业建筑。项目涉及二层零售租赁空间翻新。"],
 c08:["Selwyn Oaks Retirement, now Papakura Oaks, is at 21 Youngs Road in Papakura. The village includes independent living homes, care facilities and communal spaces. The villas have garages, laundries and gardens, while the care accommodation incorporates shared living rooms, open-plan kitchens and balconies.", "Selwyn Oaks 退休社区位于奥克兰 Papakura 的 21 Youngs Road，现名 Papakura Oaks。社区由独立住宅、护理设施及共享空间组成，独立住宅设有车库、洗衣区及花园，护理设施包含公共客厅、开放式厨房及阳台。"],
 c09:["The International at 9 Princes Street in Auckland combines a restored historic façade with a contemporary exoskeleton. Apartments have internal ceilings approximately three metres high, with modern fittings and shared amenities.", "The International 位于奥克兰 9 Princes Street，建筑保留并修复了历史立面，结合现代外骨架结构，形成古典与现代相结合的外观。公寓层高约三米，内部采用当代饰面及配套设施。"],
 c10:["Quest Highbrook is a modern apartment hotel at 60 Highbrook Drive in East Tāmaki, Auckland. It occupies the multi-level Quest Building within the Highbrook business precinct.", "Quest Highbrook 位于奥克兰 East Tāmaki 的 60 Highbrook Drive，是 Highbrook 商业园区内的现代公寓式酒店，住宿空间设于多层 Quest Building 内。"],
 c11:["Obsidian Apartments on Kimiora Street in Three Kings, Auckland, comprises 59 homes. Its four-level design uses three circulation cores to organise connected residential sections.", "Obsidian Apartments 位于奥克兰 Three Kings 的 Kimiora Street，包含 59 套住宅。建筑采用四层布局及三个独立交通核心，形成相互连接的住宅组团。"]
};
function projectDescription(project) {
 return t(project.en, project.zh).split(/\n\s*\n/).map(part => part.replace(/^(?:Location|Address|地址)\s*[:：][^\n]*(?:\n|$)/im,'').trim()).filter(Boolean);
}
function projectInfo(project) {
 const video = projectVideos[project.id];
 const address = projectAddress(project);
 const description = projectDescription(project);
 const mapQuery = encodeURIComponent(address+', New Zealand');
 return `
  <section class="section project-info">
   <div class="wrap">
    <section class="project-detail-section" aria-labelledby="project-details-heading">
     <div class="project-detail-content${video ? ' has-video' : ''}">
      <div class="project-detail-text">
       <h2 id="project-details-heading">${t('Project details','项目详情')}</h2>
       ${description.length ? description.map(paragraph=>`<p>${esc(paragraph)}</p>`).join('') : `<p>${t('Contact us for more project information.','欢迎联系我们了解更多项目资料。')}</p>`}
      </div>
      ${video ? `<div class="project-video-wrap">
       <iframe class="project-video" title="${t('Project video','项目视频')}: ${esc(project.name)}" data-src="https://www.youtube-nocookie.com/embed/${video}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
       <a class="project-source" href="https://www.youtube.com/watch?v=${video}" target="_blank" rel="noopener">${t('Watch on YouTube','在 YouTube 上观看')} <svg class="external-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></a>
      </div>` : ''}
     </div>
    </section>
    <section class="project-location-section" aria-labelledby="project-location-heading">
     <h2 id="project-location-heading">${t('Location','位置')}</h2>
     ${address ? `
      <div class="project-address"><p>${esc(address)}</p><a class="project-source" href="https://www.google.com/maps/search/?api=1&amp;query=${mapQuery}" target="_blank" rel="noopener">${t('Open in Google Maps','在 Google 地图中打开')} <svg class="external-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></a></div>
      <iframe class="project-map" title="${t('Project map','项目地图')}: ${esc(project.name)}" data-src="https://maps.google.com/maps?q=${mapQuery}&amp;z=16&amp;hl=${t('en','zh-CN')}&amp;output=embed" loading="lazy" allowfullscreen></iframe>`
      : `<p>${t('The project address is not available.','暂无项目地址。')}</p>`}
    </section>
   </div>
  </section>`;
}
let projectVideoObserver;
function bindProjectMedia() {
 projectVideoObserver?.disconnect();
 projectVideoObserver = null;
 if ('IntersectionObserver' in window) {
  projectVideoObserver = new IntersectionObserver((entries, observer) => {
   if (observer !== projectVideoObserver) return;
   for (const entry of entries) {
    if (entry.intersectionRatio < 0.35 || entry.target.closest('[hidden]')) continue;
    const frame = entry.target;
    observer.unobserve(frame);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    frame.src = frame.dataset.src + (reducedMotion ? '' : '?autoplay=1&mute=1&playsinline=1');
   }
  }, {threshold:0.35});
 }
 main.querySelectorAll('.project-info iframe[data-src]').forEach(frame => {
  if (frame.classList.contains('project-video') && projectVideoObserver) {
   projectVideoObserver.observe(frame);
  } else {
   frame.src = frame.dataset.src;
  }
 });
}
function otherProjects(project) {
 const categoryProjects = projects.filter(item => item.cat === project.cat);
 const currentIndex = categoryProjects.findIndex(item => item.id === project.id);
 const following = [...categoryProjects.slice(currentIndex + 1), ...categoryProjects.slice(0, currentIndex)].slice(0, 3);
 if (!following.length) return '';
 const heading = project.cat === 'commercial'
  ? t('Other Commercial Projects', '其他商业项目')
  : t('Other Residential Projects', '其他住宅项目');
 return `<section class="section other-projects" aria-labelledby="other-projects-heading">
  <div class="wrap">
   <h2 id="other-projects-heading">${heading}</h2>
   <div class="grid other-projects-grid">${following.map(card).join('')}</div>
  </div>
 </section>`;
}
function detail(id) {
 const project = projects.find(item => item.id === id);
 if (!project) return projectList();
 const summary = t(...projectSummaries[id]);
 const address = projectAddress(project);
 return `
  <section class="project-detail">
   <div class="wrap">
    <a class="project-back" href="#projects/${project.cat}">← ${t('Back to projects','返回项目列表')}</a>
    <div class="project-detail-layout">
     <div class="project-copy">
      <div class="eyebrow">${t(...categories[project.cat])}</div>
      <h1>${esc(project.name)}</h1>
      <p class="project-overview-address">${esc(address)}</p>
      <p>${esc(summary)}</p>
      ${button(t('Contact Us','联系我们'),'#contact')}
     </div>
     ${gallery(project)}
    </div>
   </div>
  </section>${projectInfo(project)}${otherProjects(project)}`;
}
function gallery(project) {
 const photos = [...new Set([...(project.gallery ?? []), project.image].filter(Boolean))];
 if (!photos.length) return '';
 const src = slug => './images/'+slug+'.webp';
 const label = index => esc(project.name)+' · '+t('Photo','照片')+' '+(index+1);
 return `
  <div class="detail-gallery">
   <a class="gallery-main" href="${src(photos[0])}" target="_blank" rel="noopener">
    <img src="${src(photos[0])}" alt="${label(0)}">
    <span class="gallery-enlarge">${t('Open Full Size','查看大图')} <svg class="external-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></span>
   </a>
   ${photos.length > 1 ? `
    <div class="gallery-controls">
     <button type="button" data-step="-1" aria-label="${t('Previous photo','上一张照片')}">←</button>
     <button type="button" data-step="1" aria-label="${t('Next photo','下一张照片')}">→</button>
     <div class="gallery-thumbs">
      ${photos.map((slug,index)=>`<button type="button" data-photo="${src(slug)}" aria-label="${label(index)}" aria-pressed="${index === 0}"><img src="${src(slug)}" loading="lazy" alt=""></button>`).join('')}
     </div>
    </div>` : ''}
  </div>`;
}
let galleryTimer;
function bindGallery() {
 clearInterval(galleryTimer);
 const controls = main.querySelector('.gallery-controls');
 if (!controls) return;
 const link = main.querySelector('.gallery-main');
 const image = link.querySelector('img');
 const thumbnails = [...controls.querySelectorAll('[data-photo]')];
 let active = 0;
 const preloaded = new Map();
 function preload(index) {
  const url = thumbnails[index].dataset.photo;
  if (!preloaded.has(url)) {
   const photo = new Image();
   photo.src = url;
   preloaded.set(url, photo);
  }
 }
 preload(1 % thumbnails.length);
 function select(index, manual = false) {
  thumbnails[active].setAttribute('aria-pressed','false');
  active = index;
  const selected = thumbnails[active];
  selected.setAttribute('aria-pressed','true');
  link.href = image.src = selected.dataset.photo;
  image.alt = selected.getAttribute('aria-label');
  preload((active + 1) % thumbnails.length);
  if (manual) {
   selected.scrollIntoView({block:'nearest',inline:'nearest'});
   startAutoplay();
  }
 }
 thumbnails.forEach((thumbnail,index)=>{thumbnail.onclick = () => select(index, true)});
 controls.querySelectorAll('[data-step]').forEach(button=>{
  button.onclick = () => select((active + Number(button.dataset.step) + thumbnails.length) % thumbnails.length, true);
 });
 function startAutoplay() {
  clearInterval(galleryTimer);
  galleryTimer = setInterval(() => {
   if (!document.hidden && !controls.querySelector(':focus-visible')) {
    select((active + 1) % thumbnails.length);
   }
  }, 2500);
 }
 startAutoplay();
}
function about() {
 const companyCopy = t([["ACG is a full-service construction company specialising in commercial and residential developments. Our construction management services include pre-construction, design-build, and general contracting operations. ACG offers clients expert project management, quality eco-friendly building techniques, and expertise in building multi-unit complexes, as well as terrace homes.", "ACG’s philosophy has always been to provide quality workmanship at an affordable price and to meet the client’s budget and deadline. Having grown into one of New Zealand’s most established construction companies, ACG is committed to expanding its presence within Auckland and throughout New Zealand."], ["From quality new homes for the modern family to multi-unit apartment complexes, we take care of your entire construction process from project management to brownfield development and council compliance – providing expert advice and invaluable experience along the way.", "ACG is committed to working towards a greener future that provides excellent living options for all. We want our work to reflect what matters most to our clients – their unique needs and lifestyles, neighborhood, and ultimate sustainable outcomes."]], [["奥克兰建工集团（ACG）是一家综合性的建筑公司，专注于商业和住宅项目的承建。我们提供广泛的建筑相关服务，包括前期准备、设计-建造和总承包业务。ACG致力于为客户提供专业的项目管理和高质量的建筑技术。", "作为新西兰领先的建筑公司之一，ACG始终坚持以合理的价格交付高品质的项目，确保在符合客户预算的前提下，按时完成施工。虽然我们以奥克兰为核心，但在新西兰各地拓展业务。"], ["无论是现代化的高品质新住宅、多单元公寓、酒店还是购物中心，ACG都能提供全方位的服务，从项目管理到土地开发及市政合规等方面，我们都具备丰富的经验和专业能力。我们的团队为客户提供专业建议和宝贵经验，确保每个项目顺利进行。"]]);
 return `
  <section class="about-hero">
   <div class="wrap"><span class="rule"></span><h1>${t('About ACG','关于 ACG')}</h1></div>
  </section>
  <section class="section about-overview" aria-labelledby="about-company">
   <div class="wrap">
    <div class="about-overview-heading">
     <span class="rule"></span>
     <h2 id="about-company">${t('Auckland Construction Group','奥克兰建工集团')}</h2>
    </div>
    <div class="about-columns">
     <div>${companyCopy[0].map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}</div>
     <div>${companyCopy[1].map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}</div>
    </div>
   </div>
  </section>
  <section class="section about-awards" aria-labelledby="about-awards-title">
   <div class="wrap">
    <span class="rule"></span>
    <h2 id="about-awards-title">${t('Awards and Industry Marks','奖项与行业标识')}</h2>
    <div class="why-acg-marks">${industryMarks()}</div>
   </div>
  </section>
  <section class="section about-capabilities" aria-labelledby="about-capabilities">
   <div class="wrap">
    <span class="rule"></span>
    <h2 id="about-capabilities">${t('Our Capabilities','核心业务能力')}</h2>
    <div class="about-capability-grid">
     ${services.map(([en,zh,copy,translation,subtitle])=>`
      <article>
       <h3>${t(en,zh)}${subtitle ? t(' & '+subtitle[0],'与'+subtitle[1]) : ''}</h3>
       <p>${t(copy,translation)}</p>
      </article>`).join('')}
    </div>
   </div>
  </section>
  ${directorSection()}`;
}
function directorSection() {
 const people = [
  ['nick','Nick Zha','Director','联合创始人',
   [
    'Nick is the Director of ACG and has over 15 years of development experience in New Zealand. He has a history in both design and construction, giving him incredible insight into every aspect of an architect’s job. Nick specialises in managing internal resources and subcontractors to ensure projects run smoothly, on time, and with great quality.',
    'With his keen ability to communicate and work with the different stakeholders of a project, Nick’s background as a developer has become an asset in his business strategy. His ability to understand complex physical challenges allows him to take a holistic approach to problem-solving.',
    'He has been involved with projects ranging from high-end residential and hospitality properties, medium to large-scale mixed use-commercial properties, and high-rise complex buildings with proficiency in project management and land development.'
   ],
   ['Nick是ACG的联合创始人，熟悉新西兰市场环境，了解新西兰法律法规，曾参与投资开发了众多高端住宅，商业的建设。独具商业嗅觉，善于资源管理和整合，最大化利用现有资源提高投资回报率。拥有超过15年房地产以及建筑行业投资开发背景，熟悉新西兰房地产相关法律、合同，并善于把控投资风险；熟悉项目开发流程，善于项目管理，资源统筹；熟悉新西兰高端住宅，酒店商业，高层住宅以及大型商业综合体的行业建造标准。']],
  ['jason','Jason Tang','Construction Director','联合创始人',
   [
    'Jason is the Construction Director of ACG and has over 10 years of experience in the commercial and residential industries. He also has extensive professional experience in leading construction practices in New Zealand. He was brought on board to ensure that every new build fulfils both the construction company’s and the client’s visions. His contagious positive attitude has not only made ACG more valuable but has also served as an inspiration to all other employees.',
    'From humble beginnings, Jason began working in the construction industry doing work as a carpenter. He also gained a unique knowledge of construction and quality assessment, particularly with terraced houses and commercial buildings. Jason has learned the importance of quality and attention to detail. With his solid background, paired with his deep understanding of industry standards, he can meet and exceed client requirements.',
    'In 2013, Jason was issued an LBP certificate and established a superb construction team over the next few years. Jason’s understanding of the New Zealand building code and standard enables him to help developers find the most efficient, profitable, and sustainable way to complete their projects.'
   ],
   ['Jason是ACG的联合创始人，拥有超过 10 年新西兰建筑行业经验；熟知新西兰商业建筑，民用建筑标准与规范；擅长施工安全管理；2013 年获得新西兰建筑 LBP 行业资格认证；还参与承建多个新西兰高层公寓以及民宅项目建设。他在新西兰领先的建筑实践中积累了丰富的专业经验。他的加入是为了确保每个新建项目都能实现建筑公司和客户的愿景。']]
 ];
 return `
  <section class="founders" aria-labelledby="founders-title">
   <div class="wrap founders-heading">
    <span class="rule"></span>
    <h2 id="founders-title">${t('Meet Our Founders','认识我们的创始人')}</h2>
    <p>${t('Nick Zha and Jason Tang first met each other at a construction forum in 2013. Sharing the same passion and values, they started ACG together in 2016 and built a solid reputation for quality craftsmanship and integrity.','Nick 和 Jason相识于2013年的一次新西兰建筑峰会，两人拥有相同的价值观和创业的激情，打造新西兰华人建筑的标杆是他们共同的奋斗目标，2016年两人共同创立了Auckland Construction Group Limited，以优质的工艺和诚信的口碑，建立了良好的声誉。')}</p>
   </div>
   ${people.map(([id,name,enRole,zhRole,enBio,zhBio])=>`
    <article class="founder founder-${id}" aria-labelledby="founder-${id}">
     <div class="wrap founder-layout">
      <div class="founder-profile">
       <img loading="lazy" src="./images/director-${id}.jpg" alt="${name}" width="640" height="640">
       <div class="founder-name">
        <p>${t(enRole,zhRole)}</p>
        <h3 id="founder-${id}">${name}</h3>
       </div>
      </div>
      <div class="founder-bio">${t(enBio,zhBio).map(paragraph=>`<p>${esc(paragraph)}</p>`).join('')}</div>
     </div>
    </article>`).join('')}
  </section>`;
}
function contact(heading = 'h1') {
 const field=(name,label,type='text',required=true,full=false)=>'<label class="'+(full?'full':'')+'">'+label+(required?' *':'')+'<input name="'+name+'" type="'+type+'" '+(required?'required':'')+'></label>';
 return '<section class="contact"><div class="wrap contact-grid"><div><span class="rule"></span><'+heading+' class="contact-heading">'+t('Contact','联系')+' <span>ACG</span></'+heading+'><p>'+t('Tell us what you’re planning or get in touch with our Auckland team.','欢迎介绍您的项目计划，或直接联系奥克兰团队。')+'</p><div class="contact-video"><iframe src="https://www.youtube-nocookie.com/embed/3QuwIA8e6QE?autoplay=1&amp;mute=1&amp;playsinline=1&amp;controls=0&amp;loop=1&amp;playlist=3QuwIA8e6QE&amp;rel=0&amp;fs=0&amp;disablekb=1" title="ACG — 54 Taharoto Road" loading="eager" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" tabindex="-1"></iframe></div><h2>'+t('General enquiries','一般咨询')+'</h2><address><a href="mailto:'+email+'">'+email+'</a><br><a href="tel:0800168100">'+phone+'</a></address></div><form class="panel" id="enquiry"><div class="form-grid">'+field('first',t('First name','名'))+field('last',t('Last name','姓'))+field('email',t('Email','邮箱'),'email')+field('phone',t('Phone','电话'),'tel')+field('location',t('Project location','项目地点'),'text',false,true)+'<label class="full">'+t('Message','留言')+' *<textarea name="message" required></textarea></label></div><button class="btn" type="submit">'+t('Send enquiry','发送咨询')+' →</button><p class="note" role="status" aria-live="polite">'+t('Your enquiry will be sent to info@nzacg.com.','您的咨询将发送至 info@nzacg.com。')+'</p></form></div></section>';
}
function officeMap() {
 const address = encodeURIComponent('195 Khyber Pass Road, Grafton, Auckland 1023, New Zealand');
 return `
  <section class="section office-map" aria-labelledby="office-map-title">
   <div class="wrap">
    <div class="office-map-header">
     <div>
      <span class="rule"></span>
      <h2 id="office-map-title">${t('Find Us','找到我们')}</h2>
      <p>Level 3, 195 Khyber Pass Road, Grafton, Auckland 1023</p>
     </div>
     <a class="btn" href="https://www.google.com/maps/dir/?api=1&amp;destination=${address}" target="_blank" rel="noopener">${t('Get Directions','获取路线')} <span aria-hidden="true"><svg class="external-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></span></a>
    </div>
    <iframe title="${t('Map of the ACG Auckland office','ACG 奥克兰办公室地图')}" src="https://maps.google.com/maps?q=${address}&amp;z=15&amp;hl=${t('en','zh-CN')}&amp;output=embed" loading="eager" allowfullscreen></iframe>
   </div>
  </section>`;
}
function setLanguage(next, focusSelector) {
 if (next === language) return;
 const form = document.querySelector('#enquiry');
 const values = form ? new FormData(form) : null;
 const scrollPosition = window.scrollY;
 language = next;
 localStorage.setItem('acg-language', language);
 render();
 if (values) {
  for (const [key, value] of values) document.querySelector('#enquiry').elements[key].value = value;
 }
 window.scrollTo(0, scrollPosition);
 document.querySelector(focusSelector).focus({preventScroll:true});
}
function renderFooter(page) {
 const footer = document.querySelector('#footer');
 const links = Object.entries(pages).map(([key, label]) =>
  `<li><a href="#${key}"${page === key ? ' aria-current="page"' : ''}>${t(...label)}</a></li>`
 ).join('');
 footer.innerHTML = `
  <div class="wrap footer-grid">
   <section aria-labelledby="footer-about">
    <h2 id="footer-about">${t('About ACG','关于奥克兰建工集团')}</h2>
    <p>${t('Auckland Construction Group (ACG) is a New Zealand-based construction company specializing in bespoke residential and commercial building projects. We are dedicated to enhancing the quality of life through our meticulously crafted buildings and spaces.','奥克兰建筑集团（ACG）是一家总部位于新西兰的建筑公司，专注于定制住宅和商业建筑项目。我们致力于通过卓越的建筑工艺，提高客户的生活和工作品质。')}</p>
    <p>${t('Our goal is to provide a comprehensive insight into our construction expertise, key team members, and company culture, highlighting our commitment to excellence and innovation in the industry.','我们的目标是为客户提供对我们的建筑专业知识、核心团队成员和公司文化的深刻洞见，彰显我们对行业卓越和创新的坚定承诺。')}</p>
   </section>
   <div class="footer-links-column">
    <nav aria-labelledby="footer-links">
     <h2 id="footer-links">${t('Quick Links','快捷导航')}</h2>
     <ul>${links}<li><a href="#about/capabilities">${t('Our Services','查看服务')}</a></li></ul>
    </nav>
    <div class="footer-social">
     <a href="https://www.linkedin.com/company/auckland-construction-group-ltd/home/" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v11m0-16v1m6 15V9m0 5c0-6 9-7 9 0v6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg></a>
     <a href="https://www.youtube.com/channel/UCfJl_wy89HXjE73bvhx4g7A" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor"/><path d="m10 9 5 3-5 3z" fill="#10253a"/></svg></a>
    </div>
   </div>
   <div class="footer-contact-column">
    <div class="footer-languages" role="group" aria-labelledby="footer-language">
     <h2 id="footer-language">${t('Languages','语言')}</h2>
     <button type="button" lang="en" data-language="en" aria-pressed="${language === 'en'}">English</button>
     <button type="button" lang="zh-Hans" data-language="zh" aria-pressed="${language === 'zh'}">简体中文</button>
    </div>
   <section aria-labelledby="footer-contact">
    <h2 id="footer-contact">${t('Contact Us','联系我们')}</h2>
    <address>
     <p>Level 3, 195 Khyber Pass Road, Grafton, Auckland 1023</p>
     <a href="tel:0800168100">${phone}</a>
     <a href="mailto:${email}">${email}</a>
    </address>

   </section>
   </div>
  </div>
  <div class="footer-bottom"><div class="wrap">© ${new Date().getFullYear()} Auckland Construction Group</div></div>`;
 footer.querySelectorAll('[data-language]').forEach(button => {
  button.onclick = () => setLanguage(button.dataset.language, `#footer [data-language="${button.dataset.language}"]`);
 });
}
const navSections = {
 projects: [
  ['Residential Projects','住宅项目','projects/residential','r01-residential-1'],
  ['Commercial Projects','商业项目','projects/commercial',projects.find(p=>p.cat==='commercial' && p.image).image]
 ],
 about: [
  ['Company Overview','公司简介','about'],
  ['Meet Our Founders','认识我们的创始人','about/founders']
 ]
};
function navigation(page) {
 return Object.entries(pages).filter(([key]) => key !== 'contact').map(([key,label]) => {
  const link = `<a href="#${key}"${page===key?' aria-current="page"':''}>${t(...label)}</a>`;
  if (!navSections[key]) return link;
  return `<div class="nav-entry">
   <div class="nav-trigger">${link}<button type="button" aria-label="${t(...label)} ${t('submenu','子菜单')}" aria-expanded="false" aria-controls="submenu-${key}"></button></div>
   <div class="nav-panel" id="submenu-${key}" hidden>
    <div class="wrap nav-panel-inner">
     <div class="nav-panel-title">${t(...label)}</div>
     ${key === 'projects' ? `
      <div class="project-menu-layout">
       <div class="project-menu-index">
        <a href="#projects">${t('All Projects','全部项目')} <span aria-hidden="true">→</span></a>
        ${navSections.projects.map(([en,zh,route])=>`<a href="#${route}">${t(en,zh)} <span aria-hidden="true">→</span></a>`).join('')}
       </div>
       <div class="nav-panel-links">
        ${navSections.projects.map(([en,zh,route,image])=>`<a class="nav-photo-link" href="#${route}"><img src="./images/${image}.webp" alt=""><span>${t(en,zh)} <span aria-hidden="true">→</span></span></a>`).join('')}
       </div>
      </div>` : `
      <div class="nav-panel-links">
       ${navSections[key].map(([en,zh,route])=>`<a href="#${route}"><span>${t(en,zh)} <span aria-hidden="true">→</span></span></a>`).join('')}
      </div>`}
    </div>
   </div>
  </div>`;
 }).join('');
}
function bindNavigation() {
 const nav = document.querySelector('.nav');
 const menu = document.querySelector('.menu');
 const entries = [...nav.querySelectorAll('.nav-entry')];
 const setOpen = (entry, open) => {
  entry.querySelector('button').setAttribute('aria-expanded', String(open));
  entry.querySelector('.nav-panel').hidden = !open;
 };
 const openOnly = active => entries.forEach(entry => setOpen(entry, entry === active));
 entries.forEach(entry => {
  const trigger = entry.querySelector('button');
  const panel = entry.querySelector('.nav-panel');
  entry.onpointerenter = event => {
   if (event.pointerType === 'mouse' && !menu.getClientRects().length) openOnly(entry);
  };
  entry.onpointerleave = event => {
   if (event.pointerType === 'mouse' && !menu.getClientRects().length && !panel.contains(document.activeElement)) setOpen(entry,false);
  };
  entry.onfocusout = event => {
   if (!entry.contains(event.relatedTarget) && !entry.matches(':hover')) setOpen(entry,false);
  };
  trigger.onclick = () => openOnly(panel.hidden ? entry : null);
  entry.onkeydown = event => {
   if (event.key === 'Escape' && !panel.hidden) {
    setOpen(entry,false);
    trigger.focus();
   }
  };
 });
 menu.onclick = () => {
  menu.setAttribute('aria-expanded',String(nav.classList.toggle('open')));
  openOnly(null);
 };
 nav.onclick = event => {
  if (!event.target.closest('a')) return;
  openOnly(null);
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
 };
}
let revealObserver;
let disposeScrollReveals = () => {};
function observeScrollReveals() {
 disposeScrollReveals();
 revealObserver = null;
 const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 if (reduceMotion.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
 const animations = new Set();
 let frame;
 const stop = () => {
  cancelAnimationFrame(frame);
  revealObserver?.disconnect();
  animations.forEach(animation => animation.cancel());
  animations.clear();
 };
 const preferenceChanged = () => { if (reduceMotion.matches) stop(); };
 reduceMotion.addEventListener('change', preferenceChanged);
 disposeScrollReveals = () => {
  cancelAnimationFrame(frame);
  stop();
  reduceMotion.removeEventListener('change', preferenceChanged);
 };
 revealObserver = new IntersectionObserver((entries, observer) => {
  if (observer !== revealObserver) return;
  entries.filter(entry => entry.isIntersecting)
   .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
   .forEach(({target}, index) => {
    observer.unobserve(target);
    if (reduceMotion.matches || target.contains(document.activeElement)) return;
    // Content stays visible by default, including when animation is unsupported.
    const isFounder = target.matches('.founder-profile > img, .founder-name, .founder-bio > p');
    const animation = target.animate(
     [{opacity:0, translate:isFounder ? '0 32px' : '0 24px'}, {opacity:1, translate:'0 0'}],
     {duration:isFounder ? 760 : 620, delay:(index % 3) * 70, fill:'backwards', easing:'cubic-bezier(.22,1,.36,1)'}
    );
    animations.add(animation);
    const cancelOnFocus = () => animation.cancel();
    target.addEventListener('focusin', cancelOnFocus, {once:true});
    const finish = () => {
     animations.delete(animation);
     target.removeEventListener('focusin', cancelOnFocus);
    };
    animation.finished.then(finish, finish);
   });
 }, {rootMargin:'0px 0px 48px 0px', threshold:0});
 // Wait until route scrolling or language restoration has set the viewport.
 frame = requestAnimationFrame(() => {
  const viewportBottom = document.documentElement.clientHeight;
  const targets = main.querySelectorAll(
   '.services .intro, .service, .featured .intro, .card, .founders-heading, .founder-profile > img, .founder-name, .founder-bio > p, ' +
   '.about-overview-heading, .about-columns > div, .about-awards .wrap, .about-capabilities h2, .about-capability-grid > article, ' +
   '.project-copy, .detail-gallery, .project-detail-text, .project-video-wrap, .project-location-section, ' +
   '.other-projects h2, .contact-grid > div, .contact-grid > form, .office-map-header, .office-map iframe'
  );
  for (const target of targets) {
   const rect = target.getBoundingClientRect();
   const isFounder = target.matches('.founder-profile > img, .founder-name, .founder-bio > p');
   if (rect.top >= viewportBottom || (isFounder && rect.bottom > 0)) revealObserver.observe(target);
  }
 });
}
function searchResults(query) {
 const terms = query.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
 if (!terms.length) return [];
 const entries = [
  ['Home','首页','#home','Auckland Construction Group ACG'],
  ['About ACG','关于 ACG','#about','Auckland Construction Group 奥克兰建工集团'],
  ['Our Capabilities','核心业务能力','#about/capabilities',services.flatMap(service=>service.slice(0,5)).flat().join(' ')],
  ['Meet Our Founders','认识我们的创始人','#about/founders','Nick Zha Jason Tang directors 董事'],
  ['Contact Us','联系我们','#contact',email+' '+phone+' address 地址 Level 3 195 Khyber Pass Road Grafton'],
  ['Residential Projects','住宅项目','#projects/residential','homes housing 住宅'],
  ['Commercial Projects','商业项目','#projects/commercial','commercial buildings 商业']
 ];
 for (const project of projects) {
  entries.push([project.name,project.name,'#project/'+project.id,[project.en,project.zh,...categories[project.cat]].join(' ')]);
 }
 return entries.map(entry => {
  const title = entry.slice(0,2).join(' ').toLowerCase();
  const text = (title+' '+entry[3]).toLowerCase();
  const score = terms.every(term=>text.includes(term)) ? 1+terms.filter(term=>title.includes(term)).length : 0;
  return {entry,score};
 }).filter(result=>result.score).sort((a,b)=>b.score-a.score).map(result=>result.entry);
}
function bindSearch() {
 const trigger = document.querySelector('.header-search');
 const dialog = document.querySelector('#site-search');
 const input = dialog.querySelector('input');
 const results = dialog.querySelector('ul');
 const status = dialog.querySelector('[role="status"]');
 function update() {
  const matches = searchResults(input.value);
  results.innerHTML = matches.map(([en,zh,href])=>`<li><a href="${href}">${esc(t(en,zh))} <span aria-hidden="true">→</span></a></li>`).join('');
  status.textContent = input.value.trim() && !matches.length ? t('No matching results.','没有找到匹配的内容。') : '';
 }
 trigger.onclick = () => {dialog.showModal();input.focus()};
 dialog.querySelector('button').onclick = () => dialog.close();
 input.oninput = update;
 dialog.querySelector('form').onsubmit = event => {event.preventDefault();update()};
 results.onclick = event => {
  const link = event.target.closest('a');
  if (!link) return;
  dialog.close();
  if (link.hash === location.hash) scrollToRoute();
 };
}
function render() {
 if (/^#services(?:\/|$)/.test(location.hash)) history.replaceState(null,'','#about/capabilities');
 const [route,arg] = location.hash.slice(1).split('/');
 const page=route==='project'?'projects':pages[route]?route:'home';
 document.body.dataset.page=page;
 document.documentElement.lang=t('en-NZ','zh-Hans');
 document.title='ACG | Auckland Construction Group';
 document.querySelector('#header').innerHTML=`
  <div class="main-header"><div class="wrap bar">
   <a class="brand" href="#home"><img src="./images/acg-brand-original.png" alt="Auckland Construction Group" width="842" height="595"></a>
   <nav id="navigation" class="nav" aria-label="${t('Main navigation','主导航')}">${navigation(page)}<button class="lang" type="button" lang="${t('zh-Hans','en')}">${t('简体中文','English')}</button></nav>
   <div class="header-actions">
    <button class="header-search" type="button" aria-haspopup="dialog" aria-controls="site-search" aria-label="${t('Search website','站内搜索')}"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button>
    <a class="header-contact" href="#contact"${page==='contact'?' aria-current="page"':''}>${t('Contact Us','联系我们')}</a>
    <button class="menu" type="button" aria-controls="navigation" aria-expanded="false">${t('Menu','菜单')}</button>
   </div>
  </div></div>
  <dialog id="site-search" aria-labelledby="site-search-title">
   <div class="search-title"><h2 id="site-search-title">${t('Search website','站内搜索')}</h2><button type="button" aria-label="${t('Close search','关闭搜索')}">×</button></div>
   <form role="search"><input type="search" aria-label="${t('Search keywords','搜索关键词')}" placeholder="${t('Search projects, services and more','搜索项目、业务等')}" autofocus></form>
   <p role="status"></p><ul></ul>
  </dialog>`;
 document.querySelector('.lang').onclick=()=>setLanguage(t('zh','en'),document.querySelector('.nav').classList.contains('open') ? '.menu' : '.lang');
 bindNavigation();
 bindSearch();
 if(route==='project') main.innerHTML=detail(arg);
 else if(page==='projects') main.innerHTML=projectList(arg);
 else if(page==='about') main.innerHTML=about();
 else if(page==='contact') main.innerHTML=contact()+officeMap();
 else main.innerHTML=home();
 bindGallery();
 bindProjectMedia();
 observeScrollReveals();
 renderFooter(page);
 const form=document.querySelector('#enquiry');
 if(form) form.onsubmit=async event=>{
  event.preventDefault();
  if (form.dataset.sending === 'true' || !form.reportValidity()) return;
  const data = new FormData(form);
  const submit = form.querySelector('[type="submit"]');
  const status = form.querySelector('.note');
  form.dataset.sending = 'true';
  submit.disabled = true;
  submit.textContent = t('Sending…','正在发送…');
  status.textContent = t('Submitting your enquiry…','正在提交您的咨询…');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
   const response = await fetch('https://formsubmit.co/ajax/info@nzacg.com', {
    method:'POST',
    headers:{'Content-Type':'application/json',Accept:'application/json'},
    signal:controller.signal,
    body:JSON.stringify({
     name:data.get('first')+' '+data.get('last'),
     email:data.get('email'),
     phone:data.get('phone'),
     'Project location':data.get('location'),
     message:data.get('message'),
     _subject:'ACG website enquiry',
     _template:'table'
    })
   });
   const result = await response.json();
   if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('Submission failed');
   form.reset();
   status.textContent = t('Thank you. Your enquiry has been submitted.','感谢您的联系，咨询已提交。');
  } catch {
   status.textContent = t('Unable to submit. Please try again, or email info@nzacg.com.','提交失败，请重试，或发送邮件至 info@nzacg.com。');
  } finally {
   clearTimeout(timeout);
   delete form.dataset.sending;
   submit.disabled = false;
   submit.textContent = t('Send enquiry →','发送咨询 →');
  }
 };
}
document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();main.focus()});
function scrollToRoute() {
 const [route, anchor] = location.hash.slice(1).split('/');
 const target = route === 'about' && anchor === 'founders' ? document.querySelector('.founders')
  : route === 'about' && anchor === 'capabilities' ? document.getElementById('about-capabilities') : null;
 if (target) target.scrollIntoView();
 else window.scrollTo(0,0);
}
window.addEventListener('hashchange',()=>{render();main.focus({preventScroll:true});scrollToRoute()});
render();
if (location.hash) scrollToRoute();
