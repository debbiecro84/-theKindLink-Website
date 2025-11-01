// Global Search Functionality
class GlobalSearch {
    constructor() {
        this.searchData = [];
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.loadSearchData();
        this.bindEvents();
    }

    createSearchInterface() {
        // Create global search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'global-search-container';
        searchContainer.innerHTML = `
            <div class="global-search-box">
                <div class="search-input-wrapper">
                    <input type="text" id="globalSearchInput" placeholder="Search" autocomplete="off">
                    <i class="fas fa-search global-search-icon"></i>
                </div>
                <button class="search-close-btn" id="searchCloseBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-results" id="searchResults"></div>
        `;
        
        document.body.appendChild(searchContainer);
    }

    loadSearchData() {
        // Define searchable content for each page
        this.searchData = [
            // Home Page
            {
                page: 'index.html',
                title: 'Home',
                url: 'index.html',
                content: [
                    { title: 'The Kind Link', description: 'The Link for all things Vegan', keywords: 'home, main, vegan, link' },
                    { title: 'Explore Now', description: 'Discover amazing vegan products and ethical brands', keywords: 'explore, products, brands' },
                    { title: 'Upcoming Vegan Events', description: 'Join our community at amazing vegan events and meetups', keywords: 'events, vegan events, festivals, meetups, community, vegan community' },
                    { title: 'Want to be Featured?', description: 'Get your vegan company featured on Kind VGN Link', keywords: 'featured, company listing, business listing, partnership, advertise, promote, get featured, request listing' },
                    { title: 'Social Media', description: 'Follow us on Instagram @kindvgnlink for latest vegan updates', keywords: 'social media, instagram, kindvgnlink, follow, social, community, updates, news' }
                ]
            },
            
            // Explore Page
            {
                page: 'explore.html',
                title: 'Explore Vegan Brands',
                url: 'explore.html',
                content: [
                    { title: 'Fashion', description: 'Ethical clothing and accessories', keywords: 'fashion, clothing, clothes, accessories, ethical, apparel, wear, outfit, style, wardrobe', url: 'fashion.html' },
                    { title: 'Beauty & Skincare', description: 'Cruelty-free beauty products', keywords: 'beauty, skincare, cosmetics, cruelty-free, makeup, skincare, personal care, toiletries', url: 'beauty.html' },
                    { title: 'Home & Living', description: 'Sustainable home products', keywords: 'home, living, sustainable, eco, household, decor, furniture, cleaning', url: 'home-living.html' },
                    { title: 'Food & Drinks', description: 'Plant-based food and beverages', keywords: 'food, drinks, plant-based, vegan food, sweets, treats, snacks, chocolate, candy, desserts, beverages, drinks', url: 'food-drinks.html' },
                    { title: 'Meal kit services', description: 'Plant-based meal kits delivered with easy recipes', keywords: 'meal kits, meal-kit, delivery, recipe kits, ready meals, plant-based, vegan meal kits, grubby, planthood, planty', url: 'meal-kits.html' },
                    { title: 'Books & Media', description: 'Vegan books, magazines, and media', keywords: 'books, media, magazines, reading, literature, documentaries, films', url: 'books-children.html' },
                    { title: 'Travel', description: 'Vegan-friendly travel and accommodation', keywords: 'travel, accommodation, hotels, vegan travel, holidays, trips, vacation', url: 'travel.html' },
                    { title: 'Gifts & Accessories', description: 'Vegan gifts and accessories', keywords: 'gifts, accessories, presents, vegan gifts, presents, souvenirs', url: 'gifts-accessories.html' },
                    { title: 'Vitamins & Supplements', description: 'High-quality vegan vitamins and supplements', keywords: 'vitamins, supplements, nutrition, health, wellness, b12, omega, minerals', url: 'vitamins-supplements.html' },
                    { title: 'Jobs', description: 'Vegan and ethical job opportunities', keywords: 'jobs, careers, employment, work, vegan jobs, ethical jobs, opportunities, hiring', url: 'jobs.html' },
                    { title: 'Spa & Retreat', description: 'Vegan-friendly wellness and relaxation experiences', keywords: 'spa, retreat, wellness, relaxation, glamping, sanctuary, vegan spa, wellness retreat, detox, mindfulness, meditation, yoga retreat, animal sanctuary', url: 'spa-retreat.html' },
                    // { title: 'Video Games', description: 'Vegan-friendly gaming and entertainment', keywords: 'video games, gaming, entertainment, vegan games, animal games, ethical gaming, cruelty-free gaming', url: 'video-games.html' }
                ]
            },

            // Individual Category Pages
            {
                page: 'meal-kits.html',
                title: 'Meal kit services',
                url: 'meal-kits.html',
                content: [
                    { title: 'Meal kit services', description: 'Plant-based meal kits delivered with easy recipes', keywords: 'meal kits, recipe kits, plant-based, vegan meal kits, delivery, ready meals', url: 'meal-kits.html' },
                    { title: 'Grubby', description: 'Chef-crafted plant-based meal kits and healthy ready meals. 30+ weekly choices, pre-portioned ingredients, generous portions.', keywords: 'grubby, plant-based, meal kits, ready meals, delivery, pre-portioned', url: 'https://grubby.co.uk/' },
                    { title: 'Planthood', description: 'Whole food, plant-based, chef-prepared meal kits. Natural ingredients, gut-health friendly, ready in minutes. UK-wide delivery.', keywords: 'planthood, meal kits, chef-prepared, whole food, natural ingredients, gut health', url: 'https://planthood.co.uk/' },
                    { title: 'Planty', description: 'Chef-prepared 100% plant-based ready meals. Heat from frozen in minutes, flexible subscriptions, eco packaging, free weekday delivery.', keywords: 'planty, ready meals, frozen, heat and eat, eco packaging, free delivery', url: 'https://planty.uk/' }
                ]
            },
            {
                page: 'fashion.html',
                title: 'Fashion',
                url: 'fashion.html',
                content: [
                    { title: 'Fashion', description: 'Ethical clothing and accessories', keywords: 'fashion, clothing, clothes, accessories, ethical, apparel, wear, outfit, style, wardrobe', url: 'fashion.html' }
                ]
            },
            {
                page: 'beauty.html',
                title: 'Beauty & Skincare',
                url: 'beauty.html',
                content: [
                    { title: 'Beauty & Skincare', description: 'Cruelty-free beauty products', keywords: 'beauty, skincare, cosmetics, cruelty-free, makeup, skincare, personal care, toiletries', url: 'beauty.html' },
                    { title: 'Re:gn', description: 'UK-based sustainable brand offering eco-friendly beauty products including makeup, skincare, and hair care', keywords: 'regn, re:gn, sustainable, eco-friendly, uk, bamboo, organic, cruelty-free, vegan, zero waste, reusable, affordable, makeup, skincare, hair care, beauty', url: 'https://www.regn.co.uk/' }
                ]
            },
            {
                page: 'skincare.html',
                title: 'Skincare',
                url: 'skincare.html',
                content: [
                    { title: 'Skincare', description: 'Vegan skincare products', keywords: 'skincare, skin care, face, moisturizer, cleanser, serum, cream, lotion, vegan skincare', url: 'skincare.html' },
                    { title: 'Wild Deodorant', description: 'UK-based company offering naturally effective body care products', keywords: 'wild deodorant, wild, deodorant, body care, plastic-free, compostable, refills, uk', url: 'https://wearewild.com/' },
                    { title: 'Sukin Naturals', description: 'Australian natural skincare brand offering 100% vegan and cruelty-free products', keywords: 'sukin, naturals, australian, natural, skincare, vegan, cruelty-free, carbon neutral', url: 'https://sukinorganics.com/' },
                    { title: 'Evolve Beauty', description: 'UK-based natural and organic skincare brand certified as a B Corporation', keywords: 'evolve beauty, natural, organic, skincare, b corporation, sustainable, uk', url: 'https://evolvebeauty.co.uk/' },
                    { title: 'Pacifica Beauty', description: 'Leading vegan beauty brand offering comprehensive skincare and beauty products', keywords: 'pacifica beauty, vegan, beauty, skincare, haircare, fragrance, makeup, cruelty-free', url: 'https://www.pacificabeauty.com/' },
                    { title: 'Pai Skincare', description: 'UK-based organic skincare brand specializing in sensitive skin solutions', keywords: 'pai skincare, organic, sensitive skin, cruelty-free, vegan, uk, patch-tested', url: 'https://www.paiskincare.com/' },
                    { title: 'Tropic Skincare', description: 'UK-based beauty company with 20 years of experience in natural skincare', keywords: 'tropic skincare, natural, organic, skincare, tanning, bronzing, uk, beauty', url: 'https://tropicskincare.com/' },
                    { title: 'Dr. Paw Paw', description: 'UK-based multipurpose beauty brand creating vegan lip balms and skincare products with sustainability at its heart', keywords: 'dr paw paw, drpawpaw, lip balm, skincare, multipurpose, vegan, natural, eco-conscious, charity, uk', url: 'https://www.drpawpaw.com/' },
                    { title: 'UpCircle Beauty', description: 'Forward-thinking skincare and haircare brand creating natural, sustainable, and upcycled beauty products. B-Corp certified with over 30,000 5-star reviews', keywords: 'upcircle beauty, upcycled skincare, upcycled haircare, b-corp certified, natural sustainable, coffee grounds, fruit stones, refill scheme, cruelty-free, vegan-friendly', url: 'https://upcirclebeauty.com/' }
                ]
            },
            {
                page: 'makeup.html',
                title: 'Makeup',
                url: 'makeup.html',
                content: [
                    { title: 'Makeup', description: 'Cruelty-free makeup products', keywords: 'makeup, cosmetics, lipstick, foundation, mascara, eyeshadow, blush, powder, vegan makeup', url: 'makeup.html' },
                    { title: 'e.l.f. Cosmetics', description: 'Always vegan, cruelty-free beauty brand offering affordable professional-quality makeup', keywords: 'elf cosmetics, vegan, cruelty-free, affordable, professional, leaping bunny, clean beauty', url: 'https://www.elfcosmetics.com/' },
                    { title: 'BareFaced Beauty', description: 'Natural, vegan, cruelty-free mineral makeup for sensitive skin. Mineral foundation, blusher, eyeshadow, organic lipsticks, refillable brushes. Ethically sourced with over 2,000 trees planted and money-back guarantee', keywords: 'barefaced beauty, mineral makeup, vegan, cruelty-free, sensitive skin, organic lipsticks, refillable brushes, trees planted, money-back guarantee', url: 'https://www.barefacedbeauty.co.uk/' },
                    { title: 'Beauty Without Cruelty', description: 'UK-based vegan beauty brand offering natural makeup products including liquid foundation, waterproof mascara, moisturising lipsticks, eyebrow pencils, and nail polish. Committed to cruelty-free cosmetics with natural ingredients', keywords: 'beauty without cruelty, bwc, uk, vegan, cruelty-free, natural makeup, liquid foundation, mascara, lipsticks, nail polish, ipswich, suffolk', url: 'https://www.bwcshop.com/' },
                    { title: 'VE Cosmetics', description: 'Pioneering UK indie brand established in 2015, one of the first to produce completely vegan cosmetics. Use code KINDVGN for 10% off.', keywords: 've cosmetics, uk indie, vegan, cruelty-free, audhd, alternative styles, individuality', url: 'https://ve-cosmetics.com/KINDVGN' },
                    { title: 'Barry M', description: 'UK-based beauty brand offering innovative makeup and nail products with trending collections', keywords: 'barry m, uk, beauty, makeup, nail products, glazed, sheer splash, thats swell, affordable', url: 'https://www.barrym.com/' },
                    { title: 'CATRICE', description: '100% vegan makeup brand committed to cruelty-free beauty and environmental sustainability', keywords: 'catrice, vegan, cruelty-free, environmental, sustainability, microplastics, clean beauty', url: 'https://www.catrice.com/' },
                    { title: 'essence', description: 'European makeup brand committed to vegan beauty with natural ingredients whenever possible', keywords: 'essence, european, vegan, natural ingredients, affordable, high-quality, animal welfare', url: 'https://www.essence.eu/' },
                    { title: 'Black Moon Cosmetics', description: '100% vegan and cruelty-free makeup brand specializing in alternative beauty', keywords: 'black moon cosmetics, vegan, cruelty-free, alternative beauty, grunge, liquid to mattes, orb of light', url: 'https://blackmooncosmetics.com/' },
                    { title: 'NailKind', description: 'Award-winning vegan and cruelty-free nail polish brand offering healthy nail care treatments', keywords: 'nailkind, nail polish, vegan, cruelty-free, award-winning, nail care, non-toxic, be kind be you be daring', url: 'https://www.nailkind.com/' },
                    { title: 'Earthy Nail Polish', description: 'Sustainability beauty pioneer offering plant-based nail polishes with natural ingredients', keywords: 'earthy nail polish, plant-based, natural ingredients, sustainability, gel lock system, iso 16128, eco-friendly', url: 'https://www.earthynailpolish.com/' }
                ]
            },
            {
                page: 'fragrances.html',
                title: 'Fragrances',
                url: 'fragrances.html',
                content: [
                    { title: 'Fragrances', description: 'Vegan perfumes and fragrances', keywords: 'fragrances, perfume, perfumes, cologne, scent, aromas, body spray, eau de toilette, eau de parfum, vegan perfume', url: 'fragrances.html' },
                    { title: 'Eden Perfumes', description: '100% vegan and cruelty-free fragrances with free UK delivery over £40', keywords: 'eden perfumes, vegan, cruelty-free, luxury scents, pheromone, alcohol-free, paraben-free, phthalate-free', url: 'https://www.edenperfumes.co.uk/' },
                    { title: 'Flaya', description: 'Natural, organic and vegan perfumes handmade in small batches in Scotland', keywords: 'flaya, natural, organic, vegan, perfumes, scotland, nfcc, vegan society, naturewatch foundation', url: 'https://www.flaya.co.uk/' },
                    { title: 'Floral Street', description: 'Vegan and cruelty-free luxury perfumes inspired by London', keywords: 'floral street, vegan, cruelty-free, luxury, perfumes, london, sustainable, recyclable, discovery sets', url: 'https://www.floralstreet.com/' },
                    { title: 'Dolma Perfumes', description: 'Vegan and cruelty-free perfumes and aftershaves since 1982', keywords: 'dolma perfumes, vegan, cruelty-free, britain, palm oil free, paraben free, phthalate free, tree planting', url: 'https://www.dolmaperfumes.co.uk/' },
                    { title: 'Herbivore Botanicals', description: 'Plant-powered, clinically effective skincare and body care using 99% natural ingredients', keywords: 'herbivore botanicals, plant-powered, natural ingredients, skincare, body care, lightweight, glow-giving', url: 'https://www.herbivorebotanicals.com/' },
                    { title: 'Shay & Blue', description: 'Certified clean, vegan and cruelty-free unisex perfumes since 2012', keywords: 'shay blue, clean, vegan, cruelty-free, unisex, perfumes, planet-friendly, artisan techniques, real flowers', url: 'https://www.shayandblue.com/' },
                    { title: 'The Essence Vault', description: 'UK-based company offering designer-inspired fragrances at affordable prices', keywords: 'essence vault, uk, designer-inspired, fragrances, affordable, eau de parfum, luxury brand, vegan, cruelty-free', url: 'https://www.theessencevault.com/' }
                ]
            },
            {
                page: 'tanning.html',
                title: 'Tanning',
                url: 'tanning.html',
                content: [
                    { title: 'Tanning', description: 'Vegan tanning products', keywords: 'tanning, tan, self tan, fake tan, bronzer, sunless tanning, tanning lotion, tanning oil, vegan tanning', url: 'tanning.html' },
                    { title: 'utan', description: 'Revolutionary self-tanning mist that helps clear skin, reduce redness and gives a natural glow', keywords: 'utan, self-tanning mist, clear skin, reduce redness, natural glow, mail online, must-have product', url: 'https://utan.com/' },
                    { title: 'Coco & Eve', description: 'Global bestselling tanning brand with award-winning products including the No.1 Face Tanner', keywords: 'coco eve, global bestselling, tanning brand, award-winning, face tanner, tanning mists, antioxidant, bali-inspired', url: 'https://cocoandeve.com/' },
                    { title: 'Eco By Sonya Driver', description: 'Certified organic, vegan, and cruelty-free tanning products', keywords: 'eco sonya driver, certified organic, vegan, cruelty-free, tanning, vogue best fake tan water, australian made', url: 'https://ecobysonyadriver.com/' },
                    { title: 'Isle of Paradise', description: 'UK-based tanning brand offering innovative self-tanning solutions for a natural, sun-kissed glow', keywords: 'isle of paradise, uk, tanning brand, self-tanning, natural, sun-kissed glow, cruelty-free, vegan-friendly', url: 'https://www.theisleofparadise.com/' },
                    { title: 'Nouvatan', description: 'Family-run British brand with over 25 years of experience in professional spray tanning', keywords: 'nouvatan, family-run, british, 25 years, professional spray tanning, vegan-friendly, cruelty-free, organic dha, made in britain', url: 'https://nouvatan.com/' },
                    { title: 'Skin & Tan', description: 'Established UK brand with over 10 years of experience, previously known as Skinny Tan', keywords: 'skin tan, uk brand, 10 years, skinny tan, dragons den, 23k reviews, streak-free, natural-looking', url: 'https://skinandtan.com/' }
                ]
            },
            {
                page: 'hair-care.html',
                title: 'Hair Care',
                url: 'hair-care.html',
                content: [
                    { title: 'Hair Care', description: 'Vegan hair care products', keywords: 'hair care, haircare, shampoo, conditioner, hair treatment, hair mask, hair oil, vegan hair care', url: 'hair-care.html' },
                    { title: 'Faith In Nature', description: 'First company in the world to give nature a voice and a vote', keywords: 'faith in nature, uk-made, vegan, hair care, b corp, carbon balanced, refillable, plastic-free', url: 'https://www.faithinnature.co.uk/' },
                    { title: 'Noughty', description: 'UK-based hair care brand certified B Corp, offering vegan and cruelty-free products', keywords: 'noughty, hair care, b corp, vegan, cruelty-free, curly hair, damaged hair, dry hair', url: 'https://www.noughtycare.com/' },
                    { title: 'Maria Nila', description: 'Swedish professional vegan hair care brand, 100% vegan and cruelty-free', keywords: 'maria nila, swedish, professional, vegan, cruelty-free, sulphate-free, paraben-free, color protection', url: 'https://www.marianila.com/' },
                    { title: 'Umberto Giannini', description: 'UK-based hair care brand defining curls since 1998', keywords: 'umberto giannini, uk, hair care, curls, b corp, vegan, cruelty-free, curl jelly', url: 'https://www.umbertogiannini.com/' },
                    { title: 'Plant Made', description: 'Plant-based beauty and personal care brand offering vegan and cruelty-free hair care products', keywords: 'plant made, hair care, beauty, personal care, vegan, cruelty-free, sustainable', url: 'https://www.weareplantmade.com/' },
                    { title: 'Moo & Yoo', description: 'UK-based sustainable haircare brand offering luxury vegan products with natural ingredients like Marula Oil and Icelandic Moss', keywords: 'moo and yoo, moo & yoo, sustainable haircare, luxury vegan, marula oil, icelandic moss, b corp, uk brand, salon quality, mother daughter', url: 'https://mooandyoo.com/' }
                ]
            },
            {
                page: 'body-care.html',
                title: 'Body Care',
                url: 'body-care.html',
                content: [
                    { title: 'Body Care', description: 'Vegan body care products', keywords: 'body care, bodycare, body lotion, body wash, body scrub, body butter, body oil, vegan body care', url: 'body-care.html' },
                    { title: 'Och Vegan', description: 'Glasgow-based vegan artisan soaps & cosmetics made by hand', keywords: 'och vegan, glasgow, artisan, soaps, cosmetics, zero-waste, natural, vegan', url: 'https://ochvegan.com/' },
                    { title: 'Wild', description: 'UK-based brand offering refillable, plastic-free body care powered by nature', keywords: 'wild, deodorant, body care, plastic-free, refillable, compostable, natural, uk', url: 'https://wearewild.com/' },
                    { title: 'Apple & Bears', description: 'British family-run skincare brand crafting natural, plant-based products', keywords: 'apple bears, british, family, natural, plant-based, cruelty-free, sustainable', url: 'https://appleandbears.com/' },
                    { title: 'Fussy', description: 'UK-based company offering next-generation sustainable deodorant', keywords: 'fussy, deodorant, sustainable, plastic-free, compostable, probiotic, uk', url: 'https://getfussy.com/' },
                    { title: 'Napuve', description: 'Natural Pure Vegan brand offering aromatherapy and massage products', keywords: 'napuve, aromatherapy, massage, body care, hair care, essential oils, natural soap', url: 'https://napuve.com/' },
                    { title: 'The English Soap Company', description: 'Family business crafting luxury vegan soap bars and toiletries', keywords: 'english soap company, luxury, soap bars, toiletries, sussex, hand-finished, sustainable', url: 'https://www.englishsoapcompany.co.uk/' },
                    { title: 'Original Source', description: 'UK-based brand offering PETA-approved and vegan shower gels', keywords: 'original source, shower gel, peta approved, vegan, natural fragrances, uk', url: 'https://www.originalsource.co.uk/' },
                    { title: 'AKT London', description: 'Premium natural deodorant and body care brand born to perform', keywords: 'akt london, deodorant, body care, natural, premium, vegan, cruelty-free', url: 'https://www.aktlondon.com/' },
                    { title: 'The Green Woman', description: 'Award-winning clean beauty essentials: organic deodorant, mineral toothpaste, mineral suncream, natural skincare', keywords: 'the green woman, organic deodorant, mineral toothpaste, mineral suncream, natural skincare, plastic-free, zero waste', url: 'https://www.thegreenwoman.co.uk/' },
                ]
            },
            {
                page: 'tooth-care.html',
                title: 'Tooth Care',
                url: 'tooth-care.html',
                content: [
                    { title: 'Tooth Care', description: 'Vegan dental care products', keywords: 'tooth care, dental, toothpaste, toothbrush, mouthwash, dental floss, oral care, vegan dental', url: 'tooth-care.html' },
                    { title: 't-brush', description: 'Natural oral care products with toothpaste tablets, toothbrushes, and dental floss', keywords: 't-brush, natural oral care, toothpaste tablets, toothbrushes, dental floss, vegan, plastic-free, travel-friendly', url: 'https://t-brush.com/' },
                    { title: 'GudYu', description: 'Plastic-free toothpaste tablets with fluoride and hydroxyapatite', keywords: 'gudyu, plastic-free, toothpaste tablets, fluoride, hydroxyapatite, remineralising, whitening, dentist-approved, peta-certified', url: 'https://gudyu.com/' },
                    { title: 'Sarakan', description: 'Natural dental care with Salvadora persica (toothbrush tree) extract', keywords: 'sarakan, natural dental care, salvadora persica, toothbrush tree, 30 years heritage, fluoride-free, vegan-friendly, oral health foundation', url: 'https://sarakan.co.uk/' },
                    { title: 'Mighty Mouthcare', description: 'Natural, refillable toothpaste with biodegradable refills and dentist-approved formulas', keywords: 'mighty mouthcare, refillable toothpaste, biodegradable refills, dentist approved, plastic-free, english mint, natural whitening, oral microbiome, subscription service, sustainable, microplastic-free, papain enzyme, sls-free', url: 'https://mightymouthcare.com/' },
                    { title: 'The Humble Co.', description: 'Swedish brand making natural oral care essentials including toothbrushes, toothpaste, dental floss, and accessories', keywords: 'the humble co, humble, swedish, natural oral care, toothbrushes, toothpaste, dental floss, accessories, vegan certified, cosmos certified, sls free, pfas free, ptfe free, plant-based, compostable, sustainable, zero waste, dentist developed, whitening strips, mouthwash, tongue scraper', url: 'https://www.thehumble.co/' },
                    { title: 'ZING Toothpaste', description: 'UK-made toothpaste that dissolves stains, repairs enamel, and stops sensitivity with hydroxyapatite and natural ingredients', keywords: 'zing toothpaste, uk made, dissolves stains, repairs enamel, stops sensitivity, hydroxyapatite, 1450 ppm fluoride, papain, sls free, titanium dioxide free, cruelty-free, vegan-friendly, 100% recyclable, made in yorkshire, dentist approved, 4.82 rating, 100000 tubes sold, mint, peach, lemon, apple kiwi', url: 'https://zingtoothpaste.com/' },
                    { title: 'My Green Routine', description: 'Plastic-free personal care products including zero-waste toothpaste tablets, bamboo toothbrushes, and natural hair & body care', keywords: 'my green routine, plastic-free, zero-waste, toothpaste tablets, bamboo toothbrush, natural hair care, body care, organic, compostable, planet friendly, hand crafted, suitcase safe, carbon neutral delivery, 90 day guarantee, remove ocean plastic, plant a tree, 4.8 rating, trustpilot, travel kit, planet protector', url: 'https://mygreenroutine.earth/' },
                    { title: 'BIOMED', description: 'Natural oral care products blending science and nature with mineral-plant complexes, calcium hydroxyapatite, and arginine for enamel strengthening', keywords: 'biomed, natural oral care, science and nature, mineral-plant complex, arginine, calcium hydroxyapatite, enamel strengthening, reduce sensitivity, soothing gums, switzerland studies, fluoride free, fluoride, dental floss, mouthwash, toothbrush, toothpaste, whitening, natural extracts, herbal gum guardian, sensitive shield, coconut delight, charcoal power', url: 'https://biomed-pro.com/' },
                    { title: 'Ordo Life', description: 'Premium sonic toothbrushes and oral care products designed by dentists with sustainable practices and affordable pricing', keywords: 'ordo life, sonic toothbrush, water flosser, premium oral care, designed by dentists, sustainable, affordable, vegan friendly, cruelty free, sls free, sonic edge, sonic plus, hydro sonic, travel cases, toothpaste, mouthwash, interdental cleaning, 60 day guarantee, clinically proven, brush head recycling', url: 'https://www.ordolife.com/' },
                    { title: 'Truthpaste', description: 'UK\'s best zero waste, natural and SLS-free oral care with hydroxyapatite for enamel remineralization and probiotic mouthwash', keywords: 'truthpaste, zero waste, natural oral care, sls free, hydroxyapatite, enamel remineralization, probiotic mouthwash, bamboo toothbrush, dental floss, kids toothpaste, travel, accessories, fluoride free, fluoride, organic botanicals, anti-plaque, antibacterial, anti-inflammatory, bentonite, no artificial additives, no plastics, no palm oil, uk made', url: 'https://www.awin1.com/cread.php?s=3598522&v=27664&q=486583&r=2576869' },
                    { title: 'Life Supplies', description: 'World\'s first zero-waste toothpaste with refillable glass and metal bottles, compostable refills, and BioHAP + fluoride formula', keywords: 'life supplies, zero waste toothpaste, refillable, glass bottle, metal bottle, compostable refills, bihap, fluoride, potassium citrate, aloe vera, enamel repair, gum care, whitening, sensitivity relief, sls free, paraben free, vegan, cruelty free, dentist approved, 1450 ppm fluoride, papain, natural mint, 4.5 rating, 1450 reviews, 75,000 people, 330,000 plastic tubes saved', url: 'https://lifesupplies.com/' }
                ]
            },
            {
                page: 'vitamins-supplements.html',
                title: 'Vitamins & Supplements',
                url: 'vitamins-supplements.html',
                content: [
                    { title: 'Vitamins & Supplements', description: 'Vegan vitamins and supplements', keywords: 'vitamins, supplements, nutrition, health, b12, iron, calcium, omega, protein powder, vegan supplements', url: 'vitamins-supplements.html' },
                    { title: 'Vegetology', description: 'Certified vegan and vegetarian supplements with award-winning Omega-3 and collagen alternatives', keywords: 'vegetology, vegan supplements, vegetarian, omega-3, collagen alternatives, health support, certified', url: 'https://vegetology.com/' },
                    { title: 'Vegums', description: 'Delicious vegan gummy vitamins with 100,000+ happy customers', keywords: 'vegums, vegan gummy vitamins, delicious, science-backed, nutrition, plastic-free packaging', url: 'https://www.awin1.com/cread.php?s=3484173&v=46483&q=461167&r=2576869' },
                    { title: 'Omvits', description: 'UK\'s 1st vegan collagen peptide supplement with thoughtfully designed plant-based supplements', keywords: 'omvits, uk, vegan collagen, peptide supplement, plant-based, vegan society, eco-conscious packaging', url: 'https://omvits.com/' },
                    { title: 'The Vegan Wellness Co.', description: 'Award-winning vegan healthcare brand with premium nutrition at affordable prices', keywords: 'vegan wellness co, award-winning, vegan healthcare, premium nutrition, affordable, cruelty-free, best vegan healthcare brand 2025', url: 'https://theveganwellnessco.com/' },
                    { title: 'Love Mushrooms', description: 'The Home of Functional Mushrooms - organic mushroom supplements from Marcassie Farm, Scotland', keywords: 'love mushrooms, functional mushrooms, organic, mushroom supplements, scotland, marcassie farm, lions mane, reishi, cordyceps, maitake, shiitake, menopause, wellness, focus, energy', url: 'https://lovemushrooms.co.uk/' }
                ]
            },
            {
                page: 'jobs.html',
                title: 'Jobs',
                url: 'jobs.html',
                content: [
                    { title: 'Jobs', description: 'Vegan and ethical job opportunities', keywords: 'jobs, careers, employment, work, vegan jobs, ethical jobs, opportunities, hiring, career, recruitment', url: 'jobs.html' },
                    { title: 'Vegan Jobs', description: 'The leading job board connecting vegan companies with passionate professionals', keywords: 'vegan jobs, job board, plant-based jobs, animal advocacy, sustainable fashion, ethical industries, careers', url: 'https://veganjobs.com/' },
                    { title: 'The Vegan Society Jobs', description: 'Work with the world\'s oldest vegan organization with roles in Birmingham', keywords: 'vegan society, jobs, charity work, birmingham, vegan trademark, campaigns, research, advocacy, flexible working', url: 'https://www.vegansociety.com/about-us/jobs' },
                    { title: 'LinkedIn Vegan Jobs', description: 'Browse over 150+ vegan-related job opportunities across the UK', keywords: 'linkedin, vegan jobs, uk jobs, plant-based companies, cruelty-free beauty, ethical fashion, remote jobs', url: 'https://uk.linkedin.com/jobs/vegan-jobs' },
                    { title: 'VeganWork', description: 'Comprehensive job aggregator with hundreds of vegan career opportunities worldwide', keywords: 'veganwork, job aggregator, animal rights, plant-based companies, alternative protein, remote positions, internships, volunteer', url: 'https://veganwork.com/' }
                ]
            },
            {
                page: 'wellness-products.html',
                title: 'Wellness Products',
                url: 'wellness-products.html',
                content: [
                    { title: 'Wellness Products', description: 'Vegan wellness and health products', keywords: 'wellness, health, meditation, yoga, aromatherapy, essential oils, wellness products, vegan wellness', url: 'wellness-products.html' }
                ]
            },
            {
                page: 'clothing.html',
                title: 'Clothing',
                url: 'clothing.html',
                content: [
                    { title: 'Clothing', description: 'Vegan clothing and apparel', keywords: 'clothing, clothes, apparel, shirts, pants, dresses, tops, bottoms, vegan clothing', url: 'clothing.html' },
                    { title: 'Vegan Happy Clothing', description: 'Clothes made with love, designed to spark conversation and support animal rescue. Subtle, stylish vegan clothing for men, women, and kids', keywords: 'vegan happy clothing, clothes made with love, animal rescue support, subtle vegan messaging, 100% cotton, peta approved, hoodies, sweatshirts, joggers, jackets, beanies, accessories, men women kids, cruelty free style, spark conversation', url: 'https://www.veganhappyclothing.co.uk/' },
                    { title: 'Viva La Vegan', description: 'Eco-ethical vegan clothing & accessories with powerful activist messaging', keywords: 'viva la vegan, eco-ethical, vegan clothing, organic cotton, sweatshop-free, animal charities', url: 'https://vivalavegan.com/' },
                    { title: 'HeartCure Clothing', description: 'Vegan non-profit clothing company creating conscious clothing that supports sanctuaries', keywords: 'heartcure clothing, non-profit, conscious clothing, sanctuaries, activism, vegan', url: 'https://heartcureclothing.com/' },
                    { title: 'Anticarnist', description: 'Independent one-woman vegan brand creating sweatshop-free apparel with organic fabrics and cruelty-free inks', keywords: 'anticarnist, independent, one-woman, vegan brand, sweatshop-free, organic fabrics, cruelty-free inks, made to order, animal sanctuaries', url: 'https://www.anticarnist.com/' },
                    { title: 'Rogue + Wolf', description: 'UK-based fashion and jewellery designer brand specializing in unique witchin gear', keywords: 'rogue wolf, uk, fashion, jewellery, witchin gear, alternative style, dark aesthetic, botanical, celestial, occult', url: 'https://rogueandwolf.com/' },
                    { title: 'VO Clothing', description: 'Ethical vegan clothing brand where every purchase helps protect our planet', keywords: 'vo clothing, ethical, vegan clothing, embroidered designs, sustainable materials, planet-conscious', url: 'https://voclothing.co.uk/' },
                    { title: 'Plant Faced Clothing', description: 'Vegan clothing brand offering sustainable, ethical fashion with plant-based messaging', keywords: 'plant faced clothing, vegan clothing, sustainable, ethical fashion, plant-based messaging, eco-friendly', url: 'https://plantfacedclothing.com/' },
                    { title: 'Immaculate Vegan', description: 'Premium vegan store bringing you the best vegan and ethical fashion brands', keywords: 'immaculate vegan, premium, vegan store, ethical fashion, vegan shoes, bags, accessories, sustainable clothing', url: 'https://www.immaculatevegan.com/' },
                    { title: 'Yes Friends', description: 'UK-based ethical and sustainable clothing company making affordable ethical fashion accessible', keywords: 'yes friends, uk, ethical, sustainable clothing, affordable, fairtrade, organic cotton, solar-assisted', url: 'https://yesfriends.com/' },
                    { title: 'Vegan As Folk', description: 'UK family-run company dedicated to ethical plant-based clothing using organic cotton', keywords: 'vegan as folk, uk, family-run, ethical, plant-based clothing, organic cotton, recycled polyester, wrap, fair wear', url: 'https://veganasfolk.com/' },
                    { title: 'Worn Out Vegan', description: 'Made-to-order sustainable vegan clothing with bold activist messaging. Ships from the EU with 10% of proceeds helping animals', keywords: 'worn out vegan, made-to-order, sustainable, vegan clothing, activist messaging, eu shipping, animal support, organic cotton, peta-approved', url: 'https://wornoutvegan.com?sca_ref=9854438.AACEK0gVym4&utm_source=instagram&utm_medium=instagram&utm_campaign=beardedveganutm' },
                    { title: 'London Underground Vegans', description: 'UK-based vegan brand offering animal-free headgear including LUV branded vegan beanies in a variety of colors', keywords: 'london underground vegans, luv, vegan beanies, headgear, animal-free, acrylic, uk-based, vegan headwear', url: 'https://londonundergroundvegans.com/' }
                ]
            },
            {
                page: 'footwear.html',
                title: 'Footwear',
                url: 'footwear.html',
                content: [
                    { title: 'Footwear', description: 'Vegan shoes and footwear', keywords: 'footwear, shoes, boots, sneakers, sandals, heels, flats, vegan shoes, vegan footwear', url: 'footwear.html' },
                    { title: 'Will\'s Vegan Shoes', description: 'UK-based vegan footwear company at the forefront of vegan shoes since 2012', keywords: 'wills vegan shoes, uk, vegan footwear, goodyear welt, boots, sandals, carbon-neutral, italy, portugal', url: 'https://www.wills-vegan-shoes.com/' },
                    { title: 'NOAH Italian Vegan Shoes', description: '100% vegan, 100% fair, 100% made in Italy', keywords: 'noah italian vegan shoes, italy, vegan shoes, fair, sustainable materials, traditional craftsmanship', url: 'https://www.noahvegan.com/' },
                    { title: 'Vegetarian Shoes', description: 'Established in 1990, long-established vegan-friendly footwear company', keywords: 'vegetarian shoes, brighton, uk, vegan shoes, boots, sandals, accessories, established 1990', url: 'https://www.vegetarianshoesandbags.com/' },
                    { title: 'MoEa', description: 'Bio-based vegan sneakers made from fruits and plants', keywords: 'moea, bio-based, vegan sneakers, fruits, plants, mother earth, low-carbon, animal-free materials', url: 'https://www.moea.com/' },
                    { title: 'Bohema Clothing', description: 'Vegan footwear and clothing brand', keywords: 'bohema clothing, vegan footwear, vegan clothing, ethical fashion', url: 'https://en.bohemaclothing.com/' }
                ]
            },
            {
                page: 'bags-accessories.html',
                title: 'Bags & Accessories',
                url: 'bags-accessories.html',
                content: [
                    { title: 'Bags & Accessories', description: 'Vegan bags and accessories', keywords: 'bags, accessories, handbags, backpacks, purses, wallets, belts, vegan bags, vegan accessories', url: 'bags-accessories.html' },
                    { title: 'Matt & Nat', description: 'Premium vegan bags and accessories made with sustainable materials', keywords: 'matt nat, premium, vegan bags, accessories, sustainable materials, backpacks, crossbody bags, totes, wallets', url: 'https://mattandnat.com/' },
                    { title: 'LaBante London', description: '100% vegan bags and accessories made with sustainable materials since 2011', keywords: 'labante london, vegan bags, accessories, sustainable materials, 2011, cruelty-free, ethically manufactured, portugal, india', url: 'https://www.awin1.com/cread.php?s=4559275&v=121216&q=585642&r=2576869' },
                    { title: 'Vendula London', description: 'Voted the Most Innovative Vegan Accessory Brand 3 years running by Lux Life Magazine', keywords: 'vendula london, innovative, vegan accessory brand, lux life magazine, novelty bags, quirky designs, sushi shops, laundromats', url: 'https://vendulalondon.com/' },
                    { title: 'Mashu', description: 'Women-founded and owned, PETA-certified 100% vegan luxury handbags', keywords: 'mashu, women-founded, peta-certified, vegan luxury handbags, sustainable, contemporary design, artisan craftsmanship, recyclable materials', url: 'https://mashu.co.uk/' }
                ]
            },
            {
                page: 'jewellery.html',
                title: 'Jewellery',
                url: 'jewellery.html',
                content: [
                    { title: 'Jewellery', description: 'Vegan jewellery and accessories', keywords: 'jewellery, rings, necklaces, earrings, bracelets, watches, vegan jewellery', url: 'jewellery.html' },
                    { title: 'Talisman Kind', description: 'Vegan jewellery handmade in North Yorkshire, UK since 2013', keywords: 'talisman kind, vegan jewellery, handmade, north yorkshire, uk, 2013, nature-inspired, eco-friendly, recycled metals, silversmithing, ecologi', url: 'https://talismankind.com/' },
                    { title: 'Luna Tree', description: 'Handmade ethical silver jewellery and quirky artworks from Cheshire, UK', keywords: 'luna tree, handmade, ethical silver jewellery, quirky artworks, cheshire, uk, fair trade, recycled silver, tribal-inspired, vegan-founded', url: 'https://lunatree.co.uk/' },
                    { title: 'Heathergems', description: 'Unique handmade Scottish jewellery crafted in Pitlochry from natural heather stems', keywords: 'heathergems, unique, handmade, scottish jewellery, pitlochry, natural heather stems, distinctive scottish variety, sustainable', url: 'https://heathergems.com/' },
                    { title: 'Serena Jewellery', description: 'Bespoke jewellers located in Cambridge\'s historic Bridge Street', keywords: 'serena jewellery, bespoke jewellers, cambridge, bridge street, custom pieces, vegan design jewellery, ethically sourced diamonds', url: 'https://serenajewellery.co.uk/' },
                    { title: 'Harbour UK', description: 'Handmade bracelets crafted in London for men, women, and couples', keywords: 'harbour uk, handmade bracelets, london, men, women, couples, adjustable, waterproof, eco-friendly materials, sustainable, artisan-crafted', url: 'https://harbouruk.com/' }
                ]
            },
            {
                page: 'food-drinks.html',
                title: 'Food & Drinks',
                url: 'food-drinks.html',
                content: [
                    { title: 'Food & Drinks', description: 'Plant-based food and beverages', keywords: 'food, drinks, plant-based, vegan food, sweets, treats, snacks, chocolate, candy, desserts, beverages, drinks', url: 'food-drinks.html' },
                    { title: 'Cheese', description: 'Delicious plant-based cheese alternatives', keywords: 'cheese, vegan cheese, plant-based cheese, dairy-free cheese, cheese alternatives, vegan dairy, cheese substitutes', url: 'cheese.html' },
                    { title: 'Cereals', description: 'Nutritious vegan breakfast cereals and grains', keywords: 'cereals, vegan cereals, breakfast, granola, muesli, healthy grains, plant-based breakfast, morning cereal', url: 'cereals.html' },
                    { title: 'Ice Cream', description: 'Delicious vegan ice cream and frozen desserts', keywords: 'ice cream, vegan ice cream, dairy-free ice cream, frozen desserts, plant-based ice cream, gelato, sorbet, frozen treats', url: 'ice-cream.html' }
                ]
            },
            {
                page: 'cereals.html',
                title: 'Cereals',
                url: 'cereals.html',
                content: [
                    { title: 'Cereals', description: 'Nutritious vegan breakfast cereals and grains', keywords: 'cereals, vegan cereals, breakfast, granola, muesli, healthy grains, plant-based breakfast, morning cereal', url: 'cereals.html' },
                    { title: 'Surreal', description: 'High-protein, zero-sugar cereal that tastes like childhood favorites with grown-up health benefits', keywords: 'surreal, high protein cereal, zero sugar, plant-based protein, low carb, cocoa, cinnamon, frosted, peanut butter, breakfast', url: 'https://eatsurreal.co.uk/' },
                    { title: 'ELEAT', description: 'High-protein breakfast range with protein oats, cereal, and granola designed to fuel active lifestyles', keywords: 'eleat, high protein breakfast, protein oats, protein cereal, protein granola, natural ingredients, active lifestyle, fitness', url: 'https://eleatcereal.com/' }
                ]
            },
            {
                page: 'ice-cream.html',
                title: 'Ice Cream',
                url: 'ice-cream.html',
                content: [
                    { title: 'Ice Cream', description: 'Delicious vegan ice cream and frozen desserts', keywords: 'ice cream, vegan ice cream, dairy-free ice cream, frozen desserts, plant-based ice cream, gelato, sorbet, frozen treats', url: 'ice-cream.html' },
                    { title: 'Booja-Booja', description: 'Multi award-winning dairy-free ice cream made with minimal, natural ingredients. Organic, gluten-free, and vegan treats', keywords: 'booja-booja, organic ice cream, award-winning, dairy-free, gluten-free, vegan ice cream, natural ingredients', url: 'https://boojabooja.com/' },
                    { title: 'Moonji', description: 'Ayurvedic-inspired ice cream combining Eastern flavours with plant-based ingredients. All natural, vegan, dairy-free, gluten-free', keywords: 'moonji, ayurvedic ice cream, matcha, salted caramel chai, golden turmeric, natural, vegan ice cream, dairy-free, gluten-free, refined sugar free', url: 'https://wearemoonji.com/' }
                ]
            },
            {
                page: 'beverages.html',
                title: 'Beverages',
                url: 'beverages.html',
                content: [
                    { title: 'Beverages', description: 'Vegan drinks and beverages', keywords: 'beverages, drinks, juice, smoothies, tea, coffee, plant milk, vegan drinks, vegan beverages', url: 'beverages.html' },
                    { title: 'Oatly', description: 'Delicious oat-based plant milk and dairy alternatives', keywords: 'oatly, oat milk, plant milk, dairy-free, coffee, cooking, recipes, vegan milk', url: 'https://www.oatly.com/' },
                    { title: 'Plamil Foods', description: 'Premium vegan chocolates, spreads, and organic soya milk', keywords: 'plamil, vegan chocolate, spreads, soya milk, organic, dairy-free, uk', url: 'https://plamilfoods.co.uk/' },
                    { title: 'DUG', description: 'Genius potato-based plant drinks that are creamy and sustainable', keywords: 'dug, potato milk, plant drinks, sustainable, allergen-friendly, coffee', url: 'https://dugdrinks.com/' },
                    { title: 'Three Spirit', description: 'Non-alcoholic botanical elixirs crafted by plant scientists', keywords: 'three spirit, botanical, elixirs, non-alcoholic, adaptogenic, nootropics', url: 'https://threespiritdrinks.com/' },
                    { title: 'Vegan Soft Drinks', description: 'Handcrafted post-mix syrups with botanical goodness', keywords: 'vegan soft drinks, syrups, botanical, vegan society, uk', url: 'https://www.vegansoftdrinks.co.uk/' },
                    { title: 'Living Things', description: 'Low sugar, all natural prebiotic sodas with belly-loving bubbles', keywords: 'living things, prebiotic, soda, low sugar, natural, uk', url: 'https://drinklivingthings.com/' },
                    { title: 'Overherd', description: 'Powdered oat milk that you just add water to', keywords: 'overherd, oat milk, powdered, sustainable, dairy-free, plant milk', url: 'https://overherd.uk/' },
                    { title: 'MYOM', description: 'Revolutionary oat milk paste that you make at home', keywords: 'myom, oat milk, paste, home made, dairy-free, plant milk', url: 'https://myom.shop/' },
                    { title: 'Cairn o\' Mohr', description: 'Scottish fruit wine and cider winery crafting award-winning country wines since 1987', keywords: 'cairn o mohr, scottish, fruit wine, cider, winery, perthshire, award-winning, country wines', url: 'https://cairnomohr.com/' },
                    { title: 'Cremaura', description: 'Vegan tequila cream liqueurs made in the UK. Award-winning, gluten-free, Vegan Friendly UK certified. Flavours include Coffee Caramel and Rose', keywords: 'cremaura, vegan tequila cream, liqueur, cream liqueur, coffee caramel, rose, gluten-free, vegan friendly uk, awards, plant based alcohol', url: 'https://www.cremaura.com/' }
                ]
            },
            {
                page: 'snacks-treats.html',
                title: 'Snacks & Treats',
                url: 'snacks-treats.html',
                content: [
                    { title: 'Snacks & Treats', description: 'Vegan snacks and treats', keywords: 'snacks, treats, sweets, chocolate, candy, cookies, chips, vegan snacks, vegan treats, vegan sweets', url: 'snacks-treats.html' },
                    { title: 'Vegan Supermarket', description: 'Your everyday online vegan supermarket with 1000s of animal-free products', keywords: 'vegan supermarket, online, vegan products, cruelty-free', url: 'https://vegansupermarket.com/' },
                    { title: 'Ombar Chocolate', description: 'Premium organic vegan chocolate made with real, natural ingredients', keywords: 'ombar, chocolate, organic, vegan, oat milk, fair trade', url: 'https://ombar.co.uk/' },
                    { title: 'Alternative Stores', description: 'Your go-to for free-from, plant-based and vegan products', keywords: 'alternative stores, free-from, plant-based, vegan products', url: 'https://alternativestores.com/' },
                    { title: 'Vego Chocolate', description: 'Premium vegan chocolate brand offering organic, Fairtrade certified products', keywords: 'vego, chocolate, organic, fairtrade, hazelnut, pralines', url: 'https://vego-chocolate.com/' },
                    { title: 'Dash Vegan', description: 'For your gluten-free, cruelty-free vegan goodies & eco home wares', keywords: 'dash vegan, gluten-free, cruelty-free, eco, plastic-free', url: 'https://dashvegan.com/' },
                    { title: 'Navesu', description: 'Naturally Vegan Supermarket - 100% plant-based supermarket', keywords: 'navesu, vegan supermarket, plant-based, delivery', url: 'https://navesu.com/' },
                    { title: 'H!P Chocolate', description: 'Premium vegan chocolate brand creating creamy, plant-based chocolate', keywords: 'hip chocolate, vegan chocolate, colombian cocoa, oat milk', url: 'https://hipchocolate.com/' },
                    { title: 'Vegan Town', description: 'UK-based vegan store offering a comprehensive range of plant-based snacks', keywords: 'vegan town, uk, vegan store, snacks, treats', url: 'https://vegantown.co.uk/' },
                    { title: 'OH MY GOSH IT\'S VEGAN', description: 'UK-based company specializing in 100% vegan sweets and chocolate delights', keywords: 'oh my gosh, vegan sweets, chocolate, sustainable packaging', url: 'https://ohmygoshitsvegan.com/' },
                    { title: 'Rhythm108', description: 'Swiss-made vegan chocolate treats crafted by expert chocolatiers', keywords: 'rhythm108, swiss chocolate, vegan, nuts, oats, cocoa', url: 'https://rhythm108.com/' },
                    { title: 'Candy Kittens', description: 'London-based gourmet sweets brand making plant-powered sweets', keywords: 'candy kittens, london, gourmet sweets, b corp, jamie laing', url: 'https://candykittens.co.uk/' },
                    { title: 'Based Food', description: 'Plant-based baking and breakfast mixes made with premium ingredients', keywords: 'based food, baking, breakfast, mixes, plant-based, gluten-free, allergen-free', url: 'https://basedfood.co.uk/' },
                    { title: 'Vive', description: 'Dangerously delicious plant-based chocolate treats', keywords: 'vive, chocolate, treats, plant-based, vegan chocolate, sweets', url: 'https://eatvive.com/' },
                    { title: 'Magpye', description: 'Vegan snacks and treats', keywords: 'magpye, snacks, treats, vegan', url: 'https://magpye.co.uk/' },
                    { title: 'NOMO Chocolate', description: 'Award-winning vegan chocolate crafted for everyone, proudly free from dairy, gluten, eggs, and nuts without compromising on taste', keywords: 'nomo chocolate, vegan chocolate, plant-powered, dairy-free, gluten-free, egg-free, nut-free, award-winning, creamy chocolate, caramel filled, cookie dough, sharing boxes, no missing out', url: 'https://www.awin1.com/cread.php?s=3931129&v=24011&q=489659&r=2576869' },
                    { title: 'Kiuki', description: 'Premium vegan snacks and treats offering a curated selection of plant-based goodies with a focus on taste, nutrition, and sustainability', keywords: 'kiuki, vegan snacks, treats, plant-based, premium quality, sustainability, nutrition, vegankind', url: 'https://kiuki.com/vegankind' },
                    { title: 'The Undairy Co.', description: 'The creamiest plant-based chocolate crafted with single origin organic Peruvian cacao', keywords: 'undairy, chocolate, dairy-free, gluten-free, bean-to-bar, peruvian cacao', url: 'https://undairy.co.uk/' },
                    { title: 'Bay Fudge Co.', description: '100% plant-based artisanal fudge created with locally-sourced ingredients', keywords: 'bay fudge, fudge, artisanal, plant-based, locally-sourced, gift boxes', url: 'https://bayfudge.com/' },
                    { title: 'Jeavons Toffee', description: 'Award-winning handmade vegan confectionery specializing in dairy-free toffees and caramels', keywords: 'jeavons toffee, toffee, caramel, confectionery, award-winning, handmade, vegan', url: 'https://jeavonstoffee.com/' },
                    { title: 'Kindly of Brighton', description: 'Brighton\'s premier vegan supermarket offering thousands of plant-based products with refill stations to reduce plastic waste', keywords: 'kindly of brighton, brighton, vegan supermarket, refill stations, plastic waste, vegan cheeses, local breweries, organic toiletries, free delivery', url: 'https://kindlyofbrighton.com/' },
                    { title: 'The Vegan Candy Man', description: 'UK-based vegan sweets and treats store offering a wide selection of plant-based chocolates, pick & mix sweets, advent calendars, and vegan confectionery', keywords: 'the vegan candy man, vegan sweets, treats, chocolates, pick mix, advent calendars, candy kittens, ombar, vego, free shipping', url: 'https://thevegancandyman.com/' },
                    { title: 'Moo Free Chocolates', description: 'UK-based, family-run business offering award-winning, dairy-free, vegan chocolates made with Rainforest Alliance cocoa', keywords: 'moo free, moo free chocolates, dairy-free, vegan chocolate, gluten-free, soya-free, palm oil-free, rainforest alliance, award-winning, family-run', url: 'https://www.moofreechocolates.com/' }
                ]
            },
            {
                page: 'frozen-foods.html',
                title: 'Frozen Foods',
                url: 'frozen-foods.html',
                content: [
                    { title: 'Frozen Foods', description: 'Vegan frozen foods', keywords: 'frozen foods, frozen, ice cream, frozen meals, frozen vegetables, vegan frozen, vegan ice cream', url: 'frozen-foods.html' },
                    { title: 'Root Kitchen', description: 'Chef-made plant-based ready meals delivered to your door', keywords: 'root kitchen, ready meals, plant-based, frozen, subscription, carbon-neutral', url: 'https://rootkitchen.co.uk/' },
                    { title: 'Grubby', description: 'Chef-crafted meal kits and healthy ready meals', keywords: 'grubby, meal kits, ready meals, chef-crafted, healthy, nutritionalist-approved', url: 'https://www.awin1.com/cread.php?s=3598522&v=27664&q=486583&r=2576869' },
                    { title: 'VFC Foods', description: 'Award-winning vegan chicken alternatives', keywords: 'vfc foods, vegan chicken, crispy fillets, tenders, popcorn chicken, asda', url: 'https://vfc-foods.com/' },
                    { title: 'Strong Roots', description: 'Plant-based frozen foods that are good for you and the planet', keywords: 'strong roots, plant-based, frozen foods, low saturated fat, vegan friendly, no artificial ingredients', url: 'https://strongroots.com/' },
                    { title: 'Shicken Foods', description: 'Vegan versions of everyday favorite foods', keywords: 'shicken foods, vegan, curries, kebabs, wings, sides, plant-based', url: 'https://shickenfoods.com/' }
                ]
            },
            {
                page: 'bakery.html',
                title: 'Bakery',
                url: 'bakery.html',
                content: [
                    { title: 'Bakery', description: 'Vegan bakery and baked goods', keywords: 'bakery, baked goods, bread, cakes, pastries, vegan bakery, vegan baked goods', url: 'bakery.html' },
                    { title: 'The Vegan Cakery', description: 'Multi-award winning artisan 100% vegan bakery', keywords: 'vegan cakery, artisan, vegan bakery, hand-made, england, wales', url: 'https://thevegancakery.co.uk/' },
                    { title: 'Vegan Antics', description: '100% vegan café and bakery in Gravesend, Kent', keywords: 'vegan antics, café, bakery, gravesend, kent, cookies, cupcakes, doughnuts', url: 'https://veganantics.co.uk/' },
                    { title: 'The Female Glaze', description: 'Vegan feminist bakery celebrating feminist icons', keywords: 'female glaze, feminist, bakery, lgbtq, custom cakes, events', url: 'https://thefemaleglaze.com/' },
                    { title: 'Magpye', description: 'Multi-award winning vegan pies handmade in Northumberland', keywords: 'magpye, vegan pies, handmade, northumberland, organic, sustainable', url: 'https://magpye.co.uk/' },
                    { title: 'The Dorky French', description: 'Artisan French bakery and café in Glasgow', keywords: 'dorky french, artisan, french bakery, glasgow, viennoiseries', url: 'https://thedorkyfrench.com/' },
                    { title: 'Pure Bakery Highland', description: 'The UK\'s best and biggest variety of vegan friendly bakes', keywords: 'pure bakery highland, vegan bakes, croy, scotland, stockist', url: 'https://purebakeryhighland.co.uk/' },
                    { title: 'Carla Bakes', description: 'Gluten-free, vegan & FODMAP friendly bakes handmade in small batches', keywords: 'carla bakes, gluten-free, fodmap, fife, sustainable packaging', url: 'https://carlabakes.com/' },
                    { title: 'A. Pastry Shop', description: 'Vegan bakery in Glasgow offering celebration cakes, wedding cakes, catering, and pastry preorders', keywords: 'a pastry shop, glasgow, vegan bakery, celebration cakes, wedding cakes, catering, lgbtq friendly, croissants', url: 'https://apastry.com/' }
                ]
            },
            {
                page: 'cleaning-essentials.html',
                title: 'Cleaning Essentials',
                url: 'cleaning-essentials.html',
                content: [
                    { title: 'Cleaning Essentials', description: 'Vegan cleaning products', keywords: 'cleaning, essentials, household, detergent, soap, cleaner, vegan cleaning, eco cleaning', url: 'cleaning-essentials.html' },
                    { title: 'Cleaning Essentials - Retailers', description: 'Vegan cleaning product retailers and brands', keywords: 'cleaning retailers, cleaning brands, cleaning stores, vegan cleaning retailers, eco cleaning retailers, cleaning essentials retailers', url: 'cleaning-essentials.html' },
                    { title: 'Smol', description: 'Innovative concentrated cleaning products, sustainably packaged and delivered direct', keywords: 'smol, innovative, concentrated cleaning, sustainably packaged, delivered direct, b corporation, free trials', url: 'https://smolproducts.com/' },
                    { title: 'Astonish', description: 'UK-based cleaning products company offering effective, affordable cleaning solutions', keywords: 'astonish, uk, cleaning products, effective, affordable, as seen on tv, household, bathroom, kitchen, floor, laundry', url: 'https://astonishcleaners.com/' },
                    { title: 'Bio-D', description: 'UK-produced ethical cleaning and laundry products made from naturally derived ingredients', keywords: 'bio-d, uk-produced, ethical cleaning, laundry products, naturally derived, b corporation, 35 years, hull, east yorkshire', url: 'https://www.biod.co.uk/' },
                    { title: 'Miniml', description: 'UK-based zero waste cleaning and personal care products with refillable bottles and closed-loop system', keywords: 'miniml, zero waste, refillable, closed loop system, uk, cleaning, personal care, laundry, hand soap, toilet cleaner, shampoo, natural, plant based, cruelty free, independent, british made', url: 'https://minimlrefills.co.uk/' },
                    { title: 'Re:gn', description: 'UK-based sustainable brand offering eco-friendly products across health, beauty, home, and kitchen categories', keywords: 'regn, re:gn, sustainable, eco-friendly, uk, bamboo, organic, cruelty-free, vegan, zero waste, reusable, affordable, laundry sheets, cleaning, beauty, health, kitchen', url: 'https://www.regn.co.uk/' },
                    { title: 'Clean Living International', description: 'Probiotic-based eco-cleaning products scientifically proven to clean better than antibacterial cleaners', keywords: 'clean living international, probiotic cleaning, eco-friendly, antibacterial, science-backed, family safe, pet safe, planet safe, 30 day guarantee, free shipping, complete cleaning kit, multi-mop system, laundry essentials', url: 'https://www.cleanlivingint.com/' },
                    { title: 'nimble cares', description: 'Plant-based, skin-kind cleaning and laundry products safe for families, gentle on homes, and kind to the planet', keywords: 'nimble cares, plant-based, skin-kind, non-bio, child friendly, sensitive skin, fragrance-free, natural water softener, ingredient transparency, not tested on animals, recyclable bottles, laundry detergent, fabric softener, multi-purpose cleaner, baby products', url: 'https://nimblecares.co.uk/' },
                    { title: 'Tru Earth', description: 'Eco-strips laundry detergent and cleaning products that are ultra-concentrated, plastic-free, and designed to reduce waste', keywords: 'tru earth, eco-strips, laundry detergent, plastic-free, ultra-concentrated, water-activated sheets, recyclable packaging, b corporation, 1% for planet, fabric softener, multi-surface cleaner, dishwasher tablets, toilet bowl cleaner, subscription service, 4 million customers, 50,000 reviews', url: 'https://tru.earth/' },
                    { title: 'Splosh', description: 'Refillable home cleaning and personal care products with zero plastic waste system, delivered directly from Wales', keywords: 'splosh, refillable, zero plastic waste, wales, uk, cruelty-free, vegan-friendly, all natural, great value, direct delivery, starter packs, bottles, refills, pouch returns, washing up liquid, hand wash, kitchen cleaner, air fryer cleaner, septic tank safe', url: 'https://splosh.com/' },
                    { title: 'NeatClean', description: 'Stylish refillable aluminum bottles with plant-based cleaning and personal care products, designed to look good and do good for the planet', keywords: 'neatclean, neat clean, stylish bottles, refillable aluminum, plant-based, cruelty-free, made in uk, plastic-free refills, hand wash, body wash, surface cleaner, washing up spray, dishwasher tablets, toilet cleaner, discovery kits, subscription service, 40% off', url: 'https://neatclean.com/' },
                    { title: 'Simple Living Eco', description: 'Gentle, plant-based laundry and fabric care products that treat fabrics like skin, with clean, skin-kind formulas designed to care for clothes and the planet', keywords: 'simple living eco, plant-based, laundry, fabric care, skin-kind, gentle, non-toxic, eco-friendly, fragrance-free, fragrance, aqualess, laundry detergent sheets, fragrance booster, multi-surface cleaner, dishwasher tablets, hand wash sachets, plastic-free, mindful self-care', url: 'https://simplelivingeco.com/' },
                    { title: 'Spruce', description: 'Refillable cleaning products with lightweight aluminum Eternity bottles that are unbreakable and infinitely recyclable. Break up with toxic chemicals and single-use plastics with plastic-free, non-toxic refills', keywords: 'spruce, refillable cleaning, aluminum bottles, eternity bottles, plastic-free refills, non-toxic, b corp certified, bio laundry sheets, glass cleaner, eco sponges, floor cleaner, safe ingredients, organic essential oils, zero water shipped, low carbon footprint, home compostable', url: 'https://www.wearespruce.co/' }
                ]
            },
            {
                page: 'candles.html',
                title: 'Candles',
                url: 'candles.html',
                content: [
                    { title: 'Candles', description: 'Vegan candles and home fragrances', keywords: 'candles, candle, home fragrance, aromatherapy, wax, vegan candles, soy candles', url: 'candles.html' },
                    { title: 'Wild Nature Candles', description: 'Eco-friendly soy wax candles and vegan wax melts hand-poured in the UK Cotswolds, inspired by wild beauty of nature', keywords: 'wild nature candles, eco-friendly, soy wax, vegan wax melts, uk cotswolds, wild beauty, plants trees, free uk delivery', url: 'https://www.wildnaturecandles.co.uk/' },
                    { title: 'Scents of the Wild', description: 'Natural botanical candles and soy wax melts handcrafted in Scotland using 100% natural, vegan and eco-friendly ingredients', keywords: 'scents of the wild, natural botanical candles, soy wax melts, scotland, 100% natural, therapeutic essential oils, flower petals', url: 'https://scentsofthewild.co.uk/' },
                    { title: 'The Loyal Candle Company', description: 'Luxury soy wax candles handcrafted in the heart of Scotland using 100% natural, vegan-friendly ingredients', keywords: 'loyal candle company, luxury soy wax candles, scotland, 100% natural, vegan-friendly, hand-poured, free shipping', url: 'https://www.theloyalcandlecompany.co.uk/' },
                    { title: 'Witch & Twig', description: '100% vegan soy wax candles lovingly handmade in the UK, infused with natural essential oils, herbs, flowers, and sacred stones', keywords: 'witch and twig, 100% vegan, soy wax candles, uk, libby johnstone, natural essential oils, herbs, flowers, sacred stones, mystical energy', url: 'https://www.witchandtwig.com/' },
                    { title: 'The Yorkshire Candle Company', description: 'Hand-poured candles made in Yorkshire since 2014, ethically driven with vegan-friendly products and sustainability commitment', keywords: 'yorkshire candle company, hand-poured candles, yorkshire, 2014, ethically driven, vegan-friendly, sustainability, wax melts, reed diffusers, free uk shipping', url: 'https://theyorkshirecandleco.co.uk/' },
                    { title: 'Belle Isle Botanicals', description: 'Handmade vegan pressed flower candles and home fragrance using 100% cruelty-free and vegan ingredients, made in Bristol', keywords: 'belle isle botanicals, pressed flower candles, home fragrance, vegan candles, bristol, recyclable packaging, tin returns, soy candles, room sprays, reed diffusers', url: 'https://belleislebotanicals.com/' },
                    { title: 'Carly\'s Candle Company', description: 'Multi award-winning home fragrances hand-poured using 100% sustainable soy wax with vegan-friendly fragrance oils and wood wicks', keywords: 'carlys candle company, carlys candles, award-winning, sustainable soy wax, vegan-friendly, wood wicks, refillable candles, plantable labels, trees planted, northamptonshire, buckinghamshire', url: 'https://www.carlyscandlecompany.co.uk/' },
                    { title: 'The Lemon Tree Candle Company', description: 'Hand-poured candles and essential oil candles made in the UK since March 2020, offering candles, reed diffusers, wax melts, and hand & body wash', keywords: 'lemon tree candle company, hand-poured candles, essential oil candles, uk, llanidloes, powys, chester, reed diffusers, wax melts, hand body wash', url: 'https://lemontreecandles.co.uk/' },
                    { title: 'Vegan Bunny', description: 'Award-winning vegan soy candles and eco-decor with long-lasting, beautifully scented candles including signature soy candles, bakery candles, and glass jar candles', keywords: 'vegan bunny, award-winning candles, vegan soy candles, eco-decor, bakery candles, self care candles, glass jar candles, plants trees, free delivery, subscriptions, preserved bouquets', url: 'https://veganbunny.co.uk/' }
                ]
            },
            {
                page: 'home-living.html',
                title: 'Home & Living',
                url: 'home-living.html',
                content: [
                    { title: 'Home & Living', description: 'Sustainable home products', keywords: 'home, living, sustainable, eco, household, decor, furniture, cleaning', url: 'home-living.html' },
                    { title: 'Textiles & Linens', description: 'Vegan bedding, towels, and home textiles', keywords: 'textiles, linens, bedding, towels, sheets, pillows, mattresses, vegan textiles, eco textiles', url: 'textiles-linens.html' },
                    { title: 'Re:gn', description: 'UK-based sustainable brand offering eco-friendly home and kitchen products', keywords: 'regn, re:gn, sustainable, eco-friendly, uk, bamboo, organic, cruelty-free, vegan, zero waste, reusable, affordable, home, kitchen, laundry, cleaning, candles', url: 'https://www.regn.co.uk/' },
                    { title: 'General Household', description: 'Essential household items and home accessories for sustainable living', keywords: 'general household, household items, home accessories, essential items, sustainable living, eco household, home essentials, household products', url: 'general-household.html' }
                ]
            },
            {
                page: 'general-household.html',
                title: 'General Household',
                url: 'general-household.html',
                content: [
                    { title: 'General Household', description: 'Essential household items and home accessories for sustainable living', keywords: 'general household, household items, home accessories, essential items, sustainable living, eco household, home essentials, household products', url: 'general-household.html' },
                    { title: 'Vegan Haven', description: 'A business with a soul - your one-stop vegan lifestyle store with furniture, home accessories, clothing, and ethical products', keywords: 'vegan haven, lifestyle store, furniture, home accessories, clothing, watches, ethical products, wildlife rescue, 100% vegan, secure payment, created by vegans, business with soul, percentage sales wildlife, safe haven, rescue rehabilitate release', url: 'https://www.veganhaven.co.uk/' },
                    { title: 'Naked Paper', description: 'UK\'s best eco toilet paper, kitchen roll, and tissues made from unbleached bamboo and recycled materials', keywords: 'naked paper, eco toilet paper, bamboo toilet paper, unbleached, recycled toilet paper, kitchen roll, tissues, sustainable paper, fsc certified, climate footprint, 20 million rolls sold, 12000 reviews, fossil fuel free, double length rolls, subscription service', url: 'https://uk.nakedpaper.com/' },
                    { title: 'The Cheeky Panda', description: 'Sustainable bamboo toilet paper, kitchen roll, tissues, period products, and baby care items that save trees, money and time', keywords: 'cheeky panda, bamboo toilet paper, sustainable toilet paper, bamboo kitchen roll, bamboo tissues, period pads, baby nappies, bamboo wipes, tree-free, double length rolls, subscription service, wwf uk, b corp, fsc certified, cruelty free, vegan, biodegradable, eco friendly, zero waste, bamboo revolution, 8k customers, cheeky savings', url: 'https://uk.cheekypanda.com/' },
                    { title: 'Who Gives A Crap', description: 'Eco-friendly toilet paper, tissues, kitchen roll, and household products with 50% of profits donated to clean water and sanitation projects', keywords: 'who gives a crap, eco toilet paper, recycled toilet paper, bamboo toilet paper, sustainable tissues, kitchen roll, household products, 50% profits donated, clean water, sanitation, fsc certified, carbon neutral shipping, 100% money back guarantee, over 9 million raised, deforestation reduction, bundles, subscription', url: 'https://uk.whogivesacrap.org/' },
                    { title: 'The Seep Company', description: 'Sustainable eco cleaning tools for a cleaner home, healthier planet and happier humans - 100% plastic-free sponges, scourers, gloves, and bin bags', keywords: 'seep company, eco cleaning tools, plastic-free sponges, scourers, rubber gloves, bin bags, sustainable cleaning, dragons den, b corp, zero plastic, natural materials, recyclable, home compostable, feel good cleaning, 1 billion plastic items eliminated, laura founder', url: 'https://theseepcompany.com/' },
                    { title: 'Anything But Plastic', description: 'UK-based plastic-free shop offering sustainable alternatives to everyday household products. Features bathroom essentials, cleaning products, laundry items, kitchen accessories, and lifestyle products', keywords: 'anything but plastic, plastic-free shop, uk, sustainable alternatives, household products, bathroom essentials, cleaning products, laundry items, kitchen accessories, lifestyle products, informed choices, material ratings, what does it replace, why is it better, is it worth it, sustainable buying practices', url: 'https://www.anythingbutplastic.co.uk/shop' }
                ]
            },
            {
                page: 'kitchen-dining.html',
                title: 'Kitchen & Dining',
                url: 'kitchen-dining.html',
                content: [
                    { title: 'Kitchen & Dining', description: 'Vegan kitchen and dining products', keywords: 'kitchen, dining, cookware, utensils, plates, bowls, vegan kitchen, eco kitchen', url: 'kitchen-dining.html' }
                ]
            },
            {
                page: 'books-children.html',
                title: 'Books - Children',
                url: 'books-children.html',
                content: [
                    { title: 'Books - Children', description: 'Vegan children\'s books', keywords: 'books, children, kids, reading, vegan books, children books, kids books', url: 'books-children.html' },
                    { title: 'V Is for Vegan by Ruby Roth', description: 'Introducing 3-7 year olds to the ABCs of a compassionate lifestyle', keywords: 'v is for vegan, ruby roth, children, abc, compassionate lifestyle, rhymes, illustrations, 3-7 years', url: 'https://www.rubyroth.com/' },
                    { title: 'Your Vegan Kid by Joanna Draus', description: 'A comprehensive guide for parents raising vegan children', keywords: 'your vegan kid, joanna draus, parents, raising vegan children, pregnancy, teenage years, practical advice', url: 'https://www.joannadraus.com/' },
                    { title: 'Vegan Is Love by Ruby Roth', description: 'Introduces young readers to veganism as a lifestyle of compassion and action', keywords: 'vegan is love, ruby roth, young readers, veganism, compassion, action, daily choices, local, global', url: 'https://www.rubyroth.com/' },
                    { title: 'That\'s Why We Don\'t Eat Animals by Ruby Roth', description: 'Introduces vegetarianism and veganism to early readers (ages 6-10)', keywords: 'thats why we dont eat animals, ruby roth, vegetarianism, veganism, early readers, 6-10, animal compassion', url: 'https://www.rubyroth.com/' },
                    { title: 'ROXI the Rescue Dog - Helps the Cows by Carolyn Drew', description: 'A heartwarming story about ROXI the rescue dog helping cows', keywords: 'roxi rescue dog, carolyn drew, heartwarming, rescue dog, cows, animal compassion, rescue work', url: 'https://www.carolyndrew.com/' },
                    { title: 'Frankie D, Vegan Vampire by Sally Dutra', description: 'A lovable vampire who\'s just trying to fit in', keywords: 'frankie d vegan vampire, sally dutra, vampire, school, new kid, vegan diet, lovable', url: 'https://www.sallydutra.com/' }
                ]
            },
            {
                page: 'books-cookbooks.html',
                title: 'Books - Cookbooks',
                url: 'books-cookbooks.html',
                content: [
                    { title: 'Books - Cookbooks', description: 'Vegan cookbooks and recipes', keywords: 'books, cookbooks, recipes, cooking, vegan cookbooks, vegan recipes', url: 'books-cookbooks.html' }
                ]
            },
            {
                page: 'books-media.html',
                title: 'Books - Media',
                url: 'books-media.html',
                content: [
                    { title: 'Books - Media', description: 'Vegan books, magazines, and media', keywords: 'books, media, magazines, reading, literature, documentaries, films', url: 'books-media.html' }
                ]
            },
            {
                page: 'books-media-page.html',
                title: 'Vegan Media',
                url: 'books-media-page.html',
                content: [
                    { title: 'Vegan Media', description: 'Documentaries, films, podcasts, and media content that explore veganism and animal compassion', keywords: 'vegan media, documentaries, films, podcasts, vegan content, animal compassion, media resources', url: 'books-media-page.html' },
                    { title: 'Vegan Media Content (1976)', description: 'Educational and inspiring vegan media content from 1976 exploring plant-based living, animal compassion, and ethical lifestyle choices', keywords: 'vegan media 1976, vegan society, 1976 documentary, vegan history, educational vegan content', url: 'https://www.youtube.com/watch?v=VlTYjaQLy2o' },
                    { title: 'Dominion', description: 'A powerful documentary exposing the hidden reality of animal agriculture and its impact on animals, the environment, and human health', keywords: 'dominion documentary, animal agriculture, documentary, vegan documentary, animal rights, youtube documentary', url: 'https://www.youtube.com/watch?v=LQRAfJyEsko' },
                    { title: 'Seaspiracy', description: 'An eye-opening 2021 documentary exploring ocean life and the harm humans do to marine species, uncovering alarming global corruption', keywords: 'seaspiracy, netflix documentary, ocean life, marine conservation, 2021 documentary, ocean corruption', url: 'https://www.netflix.com/gb/title/81014008' }
                ]
            },
            {
                page: 'travel.html',
                title: 'Travel',
                url: 'travel.html',
                content: [
                    { title: 'Travel', description: 'Vegan-friendly travel and accommodation', keywords: 'travel, accommodation, hotels, vegan travel, holidays, trips, vacation', url: 'travel.html' }
                ]
            },
            {
                page: 'uk-hotels-b&bs.html',
                title: 'UK Hotels & B&Bs',
                url: 'uk-hotels-b&bs.html',
                content: [
                    { title: 'UK Hotels & B&Bs', description: 'Vegan-friendly UK accommodation', keywords: 'uk, hotels, b&b, bed and breakfast, accommodation, vegan hotels, uk travel', url: 'uk-hotels-b&bs.html' }
                ]
            },
            {
                page: 'europe-hotels-b&bs.html',
                title: 'Europe Hotels & B&Bs',
                url: 'europe-hotels-b&bs.html',
                content: [
                    { title: 'Europe Hotels & B&Bs', description: 'Vegan-friendly European accommodation', keywords: 'europe, hotels, b&b, bed and breakfast, accommodation, vegan hotels, europe travel', url: 'europe-hotels-b&bs.html' },
                    { title: 'Açai Plant-Based Hotel', description: 'Opening summer 2025 in Rhodes, Greece. A sustainable and plant-based haven in the heart of Rhodes town featuring the only exclusive plant-based fine restaurant on the island', keywords: 'acai plant-based hotel, rhodes, greece, plant-based hotel, sustainable, vegan hotel, rhodes town, fine restaurant, eco-friendly, luxury suites, plant-based cuisine', url: 'https://acairhodes.com/' }
                ]
            },
            {
                page: 'gifts-accessories.html',
                title: 'Gifts & Accessories',
                url: 'gifts-accessories.html',
                content: [
                    { title: 'Gifts & Accessories', description: 'Vegan gifts and accessories', keywords: 'gifts, accessories, presents, vegan gifts, presents, souvenirs', url: 'gifts-accessories.html' }
                ]
            },
            {
                page: 'gifts-occasions.html',
                title: 'Gifts by Occasions',
                url: 'gifts-occasions.html',
                content: [
                    { title: 'Gifts by Occasions', description: 'Vegan gifts for special occasions', keywords: 'gifts, occasions, birthday, christmas, wedding, anniversary, vegan gifts', url: 'gifts-occasions.html' }
                ]
            },
            {
                page: 'clothing.html',
                title: 'Clothing',
                url: 'clothing.html',
                content: [
                    { title: 'Clothing', description: 'Ethical and sustainable vegan clothing', keywords: 'clothing, fashion, apparel, vegan clothing, ethical, sustainable, brands', url: 'clothing.html' },
                    { title: 'Vegayn', description: 'Queer-owned brand: queer • kind • plant-based. Eco-certified, printed on demand to avoid overproduction. T-shirts, hoodies, hats, mugs, towels and more', keywords: 'vegayn, queer, queer owned, kind, plant-based, clothing, t-shirts, hoodies, accessories, eco-certified, printed on demand', url: 'https://vegayn.com/' },
                    { title: 'London Underground Vegans', description: 'UK-based vegan brand offering animal-free headgear including LUV branded vegan beanies in a variety of colors', keywords: 'london underground vegans, luv, vegan beanies, headgear, animal-free, acrylic, uk-based, vegan headwear', url: 'https://londonundergroundvegans.com/' }
                ]
            },
            {
                page: 'tattoo-studios.html',
                title: 'Tattoo Studios',
                url: 'tattoo-studios.html',
                content: [
                    { title: 'Tattoo Studios', description: 'Vegan-friendly tattoo studios', keywords: 'tattoo, tattoos, studio, studios, vegan tattoo, vegan tattoos, body art', url: 'tattoo-studios.html' },
                    { title: 'Harmless Tattoo', description: 'UK\'s premier vegan and cruelty-free tattoo studio, specializing in vegan tattoos, nail art, and tooth gems', keywords: 'harmless tattoo, uk, premier, vegan, cruelty-free, tattoo studio, nail art, tooth gems, braintree', url: 'https://harmlesstattoo.com/' },
                    { title: 'Tengu Tattoo Studio', description: 'Vegan, eco-friendly tattoo studio in Bristol, UK', keywords: 'tengu tattoo studio, vegan, eco-friendly, bristol, uk, cruelty-free products, renewable energy, clifton', url: 'https://tengutattoo.com/' },
                    { title: 'Tribe Tattoo', description: 'Vegan-friendly tattoo studio with locations in Glasgow and Edinburgh, Scotland', keywords: 'tribe tattoo, vegan-friendly, glasgow, edinburgh, scotland, 2000, tattooing, piercing, laser removal', url: 'https://tribetattoo.com/' },
                    { title: 'Luna Tattoo Glasgow', description: 'Tattoo studio in Glasgow, Scotland offering quality tattooing services', keywords: 'luna tattoo glasgow, tattoo studio, glasgow, scotland, quality tattooing, artistic excellence', url: 'https://lunatattooglasgow.com/' },
                    { title: 'Mourningstar Collective', description: 'Tattoo collective featuring multiple artists with a focus on quality tattooing and artistic collaboration', keywords: 'mourningstar collective, tattoo collective, multiple artists, quality tattooing, artistic collaboration, newport, uk', url: 'https://mourningstarcollective.com/' }
                ]
            },
            {
                page: 'restaurants.html',
                title: 'Restaurants',
                url: 'restaurants.html',
                content: [
                    { title: 'Restaurants', description: 'Vegan restaurants and dining', keywords: 'restaurants, dining, food, vegan restaurants, vegan food, eating out', url: 'restaurants.html' },
                    { title: 'Suggest a Restaurant', description: 'Know a great vegan restaurant that we should add? Help us grow our directory by sharing your favorite spots!', keywords: 'suggest restaurant, add restaurant, directory, vegan restaurant, share, favorite spots, help grow', url: 'restaurants.html' }
                ]
            },
            {
                page: 'restaurants-by-location.html',
                title: 'Restaurants by Location',
                url: 'restaurants-by-location.html',
                content: [
                    { title: 'Restaurants by Location', description: 'Vegan restaurants by location', keywords: 'restaurants, location, cities, vegan restaurants, local, dining', url: 'restaurants-by-location.html' }
                ]
            },
            {
                page: 'casual-dining.html',
                title: 'Casual Dining',
                url: 'casual-dining.html',
                content: [
                    { title: 'Casual Dining', description: 'Vegan casual dining restaurants', keywords: 'casual dining, relaxed, informal, vegan casual dining, family dining', url: 'casual-dining.html' }
                ]
            },
            {
                page: 'cafes-coffee.html',
                title: 'Cafes & Coffee',
                url: 'cafes-coffee.html',
                content: [
                    { title: 'Cafes & Coffee', description: 'Vegan cafes and coffee shops', keywords: 'cafes, coffee, coffee shops, vegan cafes, vegan coffee, coffee shops', url: 'cafes-coffee.html' }
                ]
            },
            {
                page: 'london-restaurants.html',
                title: 'London Restaurants',
                url: 'london-restaurants.html',
                content: [
                    { title: 'London Restaurants', description: 'Vegan restaurants in London', keywords: 'london, restaurants, vegan london, london dining, uk restaurants', url: 'london-restaurants.html' },
                    { title: 'Tofu Vegan', description: 'Dedicated vegan restaurant offering innovative plant-based cuisine with a focus on tofu-based dishes', keywords: 'tofu vegan, vegan restaurant, london, plant-based, tofu dishes, innovative cuisine', url: 'https://www.tofuvegan.com/home' },
                    { title: 'Plates Restaurant London', description: 'Fine dining plant-based restaurant by chef Kirk Haworth featuring seasonal menus of nature-inspired creativity', keywords: 'plates restaurant, london, fine dining, plant-based, kirk haworth, seasonal menu, nature-inspired', url: 'https://plates-london.com/plant-based-restaurant-london/' },
                    { title: 'Gauthier Soho', description: 'Elegant fine dining restaurant in the heart of Soho, London offering sophisticated cuisine', keywords: 'gauthier soho, london, fine dining, soho, elegant, sophisticated cuisine, reservations', url: 'https://www.gauthiersoho.co.uk/' },
                    { title: 'Studio Gauthier', description: 'Alexis Gauthier\'s exciting new restaurant featuring a 100% animal-free menu in a relaxed, chic setting', keywords: 'studio gauthier, alexis gauthier, london, animal-free menu, relaxed, chic, modern cuisine', url: 'https://www.studiogauthier.co.uk/' },
                    { title: 'Mali Vegan', description: 'Family-run vegan restaurant offering authentic Ethiopian cuisine with traditional injera bread and flavorful stews', keywords: 'mali vegan, london, ethiopian cuisine, family-run, injera, traditional, authentic', url: 'https://www.malivegan.co.uk/' },
                    { title: 'Club Mexicana', description: 'Award-winning Mexican restaurant serving plant-based tacos, burritos, and authentic Mexican street food', keywords: 'club mexicana, london, mexican cuisine, tacos, burritos, street food, plant-based, award-winning', url: 'https://www.clubmexicana.com/' },
                    { title: 'Jam Delish', description: 'Family-owned Caribbean restaurant in Angel, Islington founded in 2020, blending traditional recipes with modern plant-based cuisine', keywords: 'jam delish, london, caribbean cuisine, angel islington, family-owned, plant-based, traditional recipes', url: 'https://jamdelish.co.uk/' },
                    { title: 'Mildreds', description: 'London\'s plant-based pioneers serving extraordinary food & drink since 1988 with multiple locations across London', keywords: 'mildreds, london, plant-based pioneers, 1988, camden, covent garden, kings cross, soho, victoria, internationally inspired', url: 'https://www.mildreds.com/' },
                    { title: 'BIG sister Vegan Café', description: 'Community-focused vegan concept with a UK base in London. Discover the experience and join the movement through the BIG sister Café and music projects', keywords: 'big sister vegan, bigsistervegan, london, vegan cafe, cafe, music, community, movement', url: 'https://www.bigsistervegan.com/' },
                    { title: 'The Spread Eagle', description: 'London\'s first fully vegan pub on Homerton High Street with a seasonal, minimal-waste kitchen, rotating vegan draught lines, small-batch wines, and cocktails', keywords: 'the spread eagle, london, vegan pub, homerton, minimal waste, seasonal menu, draught lines, cocktails, small-batch wines', url: 'https://www.thespreadeaglelondon.co.uk/' }
                ]
            },
            {
                page: 'manchester-restaurants.html',
                title: 'Manchester Restaurants',
                url: 'manchester-restaurants.html',
                content: [
                    { title: 'Manchester Restaurants', description: 'Vegan restaurants in Manchester', keywords: 'manchester, restaurants, vegan manchester, manchester dining, uk restaurants', url: 'manchester-restaurants.html' },
                    { title: 'Purezza Manchester', description: 'Award-winning vegan restaurant in Manchester\'s Northern Quarter offering the finest vegan pizza, pasta, burgers', keywords: 'purezza, manchester, award-winning, vegan pizza, pasta, burgers, northern quarter, wood-fired oven', url: 'https://purezza.co.uk/locations/manchester/' },
                    { title: 'Lotus Plant Based Kitchen', description: 'Established in 2014, Lotus serves vibrant, flavorful pan-Asian cuisine with fresh ingredients in Withington', keywords: 'lotus plant based, manchester, withington, pan-asian cuisine, flavorful, fresh ingredients, 2014', url: 'https://www.lotusplantbasedkitchen.com/' },
                    { title: 'Wholesome Junkies', description: 'Vegan restaurant in Manchester\'s Northern Quarter at Hinterland Bar offering unique events and menu specials', keywords: 'wholesome junkies, manchester, northern quarter, hinterland bar, events, menu specials, themed nights', url: 'https://www.wholesomejunkies.co.uk/' },
                    { title: 'Ortica Plant Based', description: 'Fully vegan Italian bar and deli offering an authentic Italian dining experience in Manchester', keywords: 'ortica plant based, manchester, italian, bar, deli, authentic italian, family-run, plant-based italian', url: 'https://www.orticarestaurant.com/' }
                ]
            },
            {
                page: 'birmingham-restaurants.html',
                title: 'Birmingham Restaurants',
                url: 'birmingham-restaurants.html',
                content: [
                    { title: 'Birmingham Restaurants', description: 'Vegan restaurants in Birmingham', keywords: 'birmingham, restaurants, vegan birmingham, birmingham dining, uk restaurants', url: 'birmingham-restaurants.html' }
                ]
            },
            {
                page: 'glasgow-restaurants.html',
                title: 'Glasgow Restaurants',
                url: 'glasgow-restaurants.html',
                content: [
                    { title: 'Glasgow Restaurants', description: 'Vegan restaurants in Glasgow', keywords: 'glasgow, scotland, restaurants, vegan glasgow, glasgow dining, scottish restaurants', url: 'glasgow-restaurants.html' },
                    { title: 'Mono Vegan Cafe Bar & Venue', description: 'Established in 2002, offering quality vegan food, drinks, and live music events in Glasgow\'s Kings Court', keywords: 'mono vegan, glasgow, 2002, vegan food, drinks, live music, kings court, venue', url: 'https://www.monocafebar.com/' },
                    { title: 'The 78 Vegan Bar & Restaurant', description: 'Popular vegan bar and restaurant in Glasgow\'s West End, known for its relaxed atmosphere and great food', keywords: 'the 78, glasgow, west end, vegan bar, restaurant, relaxed atmosphere, great food', url: 'https://www.the78.co.uk/' },
                    { title: 'Suissi Vegan Kitchen', description: 'Delicious vegan cuisine in Glasgow, offering plant-based dishes with a focus on quality and taste', keywords: 'suissi vegan kitchen, glasgow, plant-based dishes, quality, taste, delicious vegan cuisine', url: 'https://www.suissi.co.uk/' },
                    { title: 'Non Viet Vietnamese Cuisine', description: 'Glasgow\'s first choice for authentic Vietnamese cuisine, with multiple locations offering traditional Vietnamese dishes', keywords: 'non viet, glasgow, vietnamese cuisine, authentic, traditional vietnamese dishes, multiple locations', url: 'https://nonviet.co.uk/' },
                    { title: 'Stereo Vegan Bar & Cafe', description: 'Vegan bar and cafe in Glasgow\'s city centre, known for its live music and plant-based menu', keywords: 'stereo vegan, glasgow, city centre, vegan bar, cafe, live music, plant-based menu', url: 'https://www.stereocafebar.com/' }
                ]
            },
            {
                page: 'wales-restaurants.html',
                title: 'Wales Restaurants',
                url: 'wales-restaurants.html',
                content: [
                    { title: 'Wales Restaurants', description: 'Vegan restaurants across Wales', keywords: 'wales, restaurants, vegan wales, welsh dining, uk restaurants, plant-based wales', url: 'wales-restaurants.html' },
                    { title: 'The Queen Inn', description: 'The world\'s first plant-based steakhouse! Set in a country pub dating back to the 1800s, showcasing the best plant-based meats from across the world. Proudly vegan since January 2022, located in Upper Cwmbran, Torfaen', keywords: 'the queen inn, plant-based steakhouse, world\'s first, country pub, 1800s, upper cwmbran, torfaen, wales, vegan steakhouse, plant-based meats, vegan since 2022', url: 'https://thequeeninn.uk/' },
                    { title: 'Eating Gorilla', description: 'Plant-based restaurant and bar offering innovative vegan cuisine in Wales with a focus on fresh, locally sourced ingredients', keywords: 'eating gorilla, wales, plant-based restaurant, vegan bar, innovative cuisine, locally sourced, sustainable, fresh ingredients, welsh dining', url: 'https://www.eatinggorilla.co.uk/' },
                    { title: 'Luna\'s Vegan Corner', description: 'One of Cardiff\'s premiere vegan restaurants offering traditional and creative cuisine with organic ingredients and exceptional customer service', keywords: 'lunas vegan corner, cardiff, wales, premiere vegan restaurant, organic ingredients, traditional cuisine, creative cuisine, wellfield road, conscious living, kindness to animals', url: 'https://lunasvegancorner.com/' },
                    { title: 'Pear Kitchen', description: 'Family-owned vegan café in Cowbridge offering home-cooked vegan meals with a cozy atmosphere and friendly staff', keywords: 'pear kitchen, cowbridge, wales, family-owned, vegan café, home-cooked meals, mung bean dhal, scrambled tofu, american pancakes, caesar salad, high street, cozy atmosphere', url: 'https://www.instagram.com/pearkitchen/' },
                    { title: 'Heavenly Vegan Coffi', description: 'Winner of the prestigious Vegan Choice Award 2025! Located in Barry, offering Welsh cakes, luxury cookies, pancakes, and barista coffee', keywords: 'heavenly vegan coffi, barry, wales, vegan choice award 2025, welsh cakes, luxury cookies, pancakes, milkshakes, barista coffee, dog-friendly, gluten-free, afternoon tea, patisserie', url: 'https://www.heavenlyvegancoffi.co.uk/' }
                ]
            },
            {
                page: 'edinburgh-restaurants.html',
                title: 'Edinburgh Restaurants',
                url: 'edinburgh-restaurants.html',
                content: [
                    { title: 'Edinburgh Restaurants', description: 'Vegan restaurants in Edinburgh', keywords: 'edinburgh, scotland, restaurants, vegan edinburgh, edinburgh dining, scottish restaurants', url: 'edinburgh-restaurants.html' },
                    { title: 'Soul Vegan', description: 'A heaven for vegan food lovers, serving 100% organic plant-based cuisine in Edinburgh\'s vibrant food scene', keywords: 'soul vegan, edinburgh, organic, plant-based, vibrant food scene, vegan food lovers', url: 'https://soulvegan.uk/' },
                    { title: 'Chapter One Coffee Shop', description: 'Scotland\'s first woman-owned vegan coffee shop and micro roaster since 2015 with fresh coffee beans from women-owned coops', keywords: 'chapter one coffee, edinburgh, scotland, woman-owned, vegan coffee shop, micro roaster, 2015', url: 'https://www.chapterone.coffee/' },
                    { title: 'Novapizza', description: 'Edinburgh\'s first Italian vegan restaurant run by a Roman family. Serving authentic Italian dishes made exclusively from extraordinary vegan ingredients with a wide range of gluten-free options', keywords: 'novapizza, edinburgh, italian, vegan restaurant, roman family, authentic italian, gluten-free, pasta, pizza', url: 'https://novapizza.co.uk/' },
                    { title: 'PULSE PlantBased', description: 'Plant-based kitchen & eatery at St John\'s Church, Edinburgh serving whole, unprocessed and organic ingredients', keywords: 'pulse plantbased, edinburgh, st johns church, whole ingredients, unprocessed, organic, plant-based kitchen', url: 'http://www.pulsehomecooking.com/' },
                    { title: 'Sen Viet Vegan Restaurant', description: 'Proudly No.1 Vietnamese Vegan Only Restaurant in London. Authentic Vietnamese cuisine turned 100% vegan since April 2022', keywords: 'sen viet, vietnamese, vegan restaurant, london, authentic vietnamese, april 2022, number 1', url: 'https://www.senvietchay.co.uk/home' },
                    { title: 'Holy Cow Vegan Café', description: 'One of Edinburgh\'s first fully vegan cafés since 2016, famous for mouth-watering homemade vegan burgers', keywords: 'holy cow, edinburgh, vegan café, 2016, homemade vegan burgers, fresh organic ingredients', url: 'https://holycow.cafe/' },
                    { title: 'Curran Geal', description: 'Vegan restaurant in Edinburgh - details to be updated', keywords: 'curran geal, edinburgh, vegan restaurant', url: 'https://www.facebook.com/currangeal/' },
                    { title: 'Black Rabbit', description: 'Edinburgh\'s original alternative vegan deli and coffee shop offering daily favourites without animal ingredients. Handmade pastries, sandwiches, and artisan vegan cheeses with 100% green electricity and compostable packaging', keywords: 'black rabbit, edinburgh, vegan deli, coffee shop, handmade pastries, artisan vegan cheeses, green electricity, compostable packaging, 33 brougham street, alternative vegan', url: 'https://www.blackrabbitedinburgh.co.uk/' },
                    { title: 'Consider It Chocolate', description: 'Handcrafted plant-based indulgence in Edinburgh. Artisan vegan chocolate, doughnuts, and ice cream handcrafted daily with the highest quality ingredients', keywords: 'consider it chocolate, edinburgh, chocolate, artisan, vegan chocolate, doughnuts, ice cream, plant-based indulgence, handcrafted, sciennes, 3-5a sciennes', url: 'https://www.consideritchocolate.com/' }
                ]
            },
            {
                page: 'leeds-restaurants.html',
                title: 'Leeds Restaurants',
                url: 'leeds-restaurants.html',
                content: [
                    { title: 'Leeds Restaurants', description: 'Vegan restaurants in Leeds', keywords: 'leeds, restaurants, vegan leeds, leeds dining, uk restaurants', url: 'leeds-restaurants.html' },
                    { title: 'Fat Annie\'s Stateside Street Food', description: 'Established in 2014, serving quality vegan hot dogs, burgers, and banging sides at Leeds Kirkgate Market with 5-star food hygiene rating', keywords: 'fat annies, leeds, kirkgate market, vegan hot dogs, burgers, street food, 5-star hygiene, 2014, new york inspired', url: 'https://fatannies.co.uk/' },
                    { title: 'Döner Summer', description: 'Modern vegan döner restaurant offering fresh, plant-based döner wraps and dishes with table booking and gift cards', keywords: 'doner summer, leeds, vegan doner, wraps, table booking, gift cards, modern, contemporary dining', url: 'https://www.donersummer.com/' },
                    { title: 'The Greenhouse Horsforth', description: 'Plant-based café serving nutritious, delicious food all day long. 100% vegan eatery and 2021 Good Food Award winner with Ecologi Climate Partnership', keywords: 'the greenhouse horsforth, leeds, horsforth, plant-based café, vegan café, good food award, ecologi, carbon neutral, climate partner', url: 'https://www.thegreenhousehorsforth.co.uk/' },
                    { title: 'Scoffs', description: 'Family-run café in the heart of Horsforth serving tasty homemade plant-based food. Home of the famous Scoffage rolls, Scoffs Eggs, signature burgers, and decadent donuts', keywords: 'scoffs, leeds, horsforth, family-run, café, plant-based, scoffage rolls, signature burgers, buddha bowls, burritos, donuts', url: 'https://scoffsleeds.co.uk/' }
                ]
            },
            {
                page: 'newcastle-restaurants.html',
                title: 'Newcastle Restaurants',
                url: 'newcastle-restaurants.html',
                content: [
                    { title: 'Newcastle Restaurants', description: 'Vegan restaurants in Newcastle', keywords: 'newcastle, restaurants, vegan newcastle, newcastle dining, uk restaurants', url: 'newcastle-restaurants.html' },
                    { title: 'Vegano', description: 'Italian-inspired cruelty-free cafe in Newcastle. From quality coffee and house-made cake to full 3-course evening meals with wine. Started from a food truck to their own cafe at Blandford Square', keywords: 'vegano, vegan restaurant, newcastle, italian-inspired, food truck, blandford square, coffee, cake, evening meals, wine, cosy cafe', url: 'https://www.vegano.uk.com/' },
                    { title: 'SnackWallah', description: 'Authentic vegan Indian street food at Newcastle Grainger Market', keywords: 'snackwallah, indian street food, vegan, newcastle, grainger market, authentic, indian cuisine', url: 'https://snackwallahuk.onepage.website/' },
                    { title: 'Veganatomy', description: 'Vegan eatery in Heaton specializing in vegan sushi, bánh mì, and rice bowls. Asian-inspired cuisine with a North East accent, all freshly prepared each morning from their open kitchen', keywords: 'veganatomy, heaton, newcastle, vegan sushi, banh mi, rice bowls, asian cuisine, take-out, chillingham road, northeast accent, elderbeer', url: 'https://www.veganatomy.co.uk/' },
                    { title: 'Glazed Handmade Donuts', description: 'Damn good vegan donuts, artisan cakes & plant-based pastries', keywords: 'glazed handmade donuts, vegan donuts, artisan cakes, plant-based pastries, newcastle, desserts', url: 'https://glazedhandmadedonuts.co.uk/' },
                    { title: 'The Ship Inn', description: 'Family-friendly pub in Ouseburn Valley with fully vegan kitchen. Serving fresh, globally inspired dishes, in-house baked bread and cakes, vegan-friendly beers, wines, spirits, and specialty teas with live music events', keywords: 'ship inn, ouseburn, newcastle, vegan pub, fully vegan kitchen, globally inspired dishes, live music, stepney bank, family-friendly', url: 'https://www.facebook.com/shipouseburn/' }
                ]
            },
            {
                page: 'york-restaurants.html',
                title: 'York Restaurants',
                url: 'york-restaurants.html',
                content: [
                    { title: 'York Restaurants', description: 'Vegan restaurants in York', keywords: 'york, restaurants, vegan york, york dining, uk restaurants', url: 'york-restaurants.html' },
                    { title: 'Orchid Vegan', description: 'Pure vegan kitchen with Asian fusion cuisine awarded as diners\' choice for 2024', keywords: 'orchid vegan, york, asian fusion, vegan kitchen, diners choice 2024, george hudson street, free delivery, takeaway', url: 'https://orchidvegan.com/' }
                ]
            },
            {
                page: 'liverpool-restaurants.html',
                title: 'Liverpool Restaurants',
                url: 'liverpool-restaurants.html',
                content: [
                    { title: 'Liverpool Restaurants', description: 'Vegan restaurants in Liverpool', keywords: 'liverpool, restaurants, vegan liverpool, liverpool dining, uk restaurants, merseyside', url: 'liverpool-restaurants.html' },
                    { title: 'The Vibe Cafe', description: 'Top rated vegan restaurant in Liverpool on Happy Cow! Family-run wholefood and plant-based cafe', keywords: 'the vibe cafe, liverpool, happy cow, top rated, family-run, wholefood, plant-based, paradise street, fair-trade coffee, homemade', url: 'https://thevibecafe.co.uk/' },
                    { title: 'Guac \'n\' Roll Kitchen', description: 'Vibrant vegan restaurant in Liverpool offering a diverse plant-based menu with creative dishes', keywords: 'guac n roll kitchen, guacnrollkitchen, liverpool, vegan restaurant, creative menu, chikn parm, shawarma, kempston street, plant-based', url: 'https://www.facebook.com/guacnrollkitchen' },
                    { title: 'Down the Hatch', description: 'Award-winning seitan\'s basement serving wholesome 100% plant-based food. Offering generous portions, cocktails, venue hire, wedding catering, and dog-friendly dining. Woo Tan Scran available', keywords: 'down the hatch, liverpool, award-winning, seitan, plant-based, vegan, cocktails, venue hire, wedding, dog-friendly, duke street, woo tan scran', url: 'https://www.downthehatchliv.co.uk/' }
                ]
            },
            {
                page: 'brighton-restaurants.html',
                title: 'Brighton Restaurants',
                url: 'brighton-restaurants.html',
                content: [
                    { title: 'Brighton Restaurants', description: 'Vegan restaurants in Brighton', keywords: 'brighton, restaurants, vegan brighton, brighton dining, uk restaurants', url: 'brighton-restaurants.html' },
                    { title: 'Bonsai Plant Kitchen', description: 'Plant-based restaurant in Brighton offering innovative cuisine with Japanese-inspired elements, featuring chef\'s tasting menu and outdoor dining', keywords: 'bonsai plant kitchen, brighton, japanese-inspired, chef tasting menu, outdoor dining, baker street, sustainable dining', url: 'https://www.bonsaiplantkitchen.co.uk/' },
                    { title: 'Oowee Vegan', description: 'Making the fast food of the future with an obsession for flavor! Serving deliciously vegan comfort food including classic double cheeseburgers and signature milkshakes', keywords: 'oowee vegan, brighton, fast food, vegan comfort food, cheeseburgers, milkshakes, market street, delivery, click collect', url: 'https://ooweevegan.com/' },
                    { title: 'Purezza Brighton', description: 'Founded in 2015 by Italian chef Stefania and Tim Barclay, born in Brighton with award-winning vegan pizza, pasta and Italian cuisine. Serving sustainably sourced ingredients with commitment to zero-waste', keywords: 'purezza, brighton, 2015, italian, vegan pizza, award-winning, sustainable, zero-waste, stefania, tim barclay, pasta, salads, desserts', url: 'https://purezza.co.uk/' },
                    { title: 'The Roundhill Pub', description: 'Brighton\'s award-winning 100% vegan pub & restaurant. Famous Sunday roasts voted 4th Best Roast 2024, innovative plant-based dishes, 7 craft beer taps, hand-crafted cocktails, and zero-waste wine network. Plant Champions and Sustainable Eats winners', keywords: 'roundhill pub, brighton, vegan pub, restaurant, sunday roast, 4th best roast 2024, craft beer, cocktails, zero-waste, plant champions, sustainable eats, ditchling road, plant-based burger, cauli wings', url: 'https://www.theroundhill.co.uk/' }
                ]
            },

            // Events Page
            {
                page: 'events.html',
                title: 'UK Vegan Events',
                url: 'events.html',
                content: [
                    { title: 'Bournemouth Vegan Festival', description: 'Join The Vegan Events UK Movement - 6 September 2025', keywords: 'bournemouth, festival, september, 2025, events, vegan events' },
                    { title: 'Leicester Vegan Festival 2025', description: 'Join The Vegan Events UK Movement - 13 September 2025', keywords: 'leicester, festival, september, 2025, events, vegan events' },
                    { title: 'Portsmouth Vegan Festival 2025', description: 'Join The Vegan Events UK Movement - 20 September 2025', keywords: 'portsmouth, festival, september, 2025, events, vegan events' },
                    { title: 'Bournemouth Vegan Festival 2025', description: 'Join The Vegan Events UK Movement - 5 October 2025', keywords: 'bournemouth, festival, october, 2025, events, vegan events' },
                    { title: 'Essex Vegan Festival 2025', description: 'Join The Vegan Events UK Movement - 4 October 2025', keywords: 'essex, southend, festival, october, 2025, events, vegan events' },
                    { title: 'Sheffield Vegan Festival 2025', description: 'Join The Vegan Events UK Movement - 12 October 2025', keywords: 'sheffield, festival, october, 2025, events, vegan events' },
                    { title: 'Glasgow Vegan Festival', description: 'Join The Vegan Events UK Movement - 18 October 2025', keywords: 'glasgow, scotland, festival, october, 2025, events, vegan events' },
                    { title: 'Northern Vegan Winter Festival', description: 'Join The Vegan Events UK Movement - 1 November 2025', keywords: 'manchester, winter, festival, november, 2025, events, vegan events, christmas' },
                    { title: 'Newcastle Vegan Festival', description: 'Join The Vegan Events UK Movement - 15 November 2025', keywords: 'newcastle, festival, november, 2025, events, vegan events' },
                    { title: 'Edinburgh Vegan Christmas Festival', description: 'Join The Vegan Events UK Movement - 29 November 2025', keywords: 'edinburgh, scotland, christmas, festival, november, 2025, events, vegan events, xmas' },
                    { title: 'Northampton Vegan Christmas Festival', description: 'Join The Vegan Events UK Movement - 7 December 2025', keywords: 'northampton, christmas, festival, december, 2025, events, vegan events, xmas' },
                    { title: 'York Vegan Christmas Festival', description: 'Join The Vegan Events UK Movement - 14 December 2025', keywords: 'york, christmas, festival, december, 2025, events, vegan events, xmas' },
                    { title: 'Scotland Vegan Festival', description: 'Join The Vegan Events UK Movement - 7 February 2026', keywords: 'scotland, paisley, festival, february, 2026, events, vegan events' },
                    { title: 'Stockport Vegan Festival', description: 'Join The Vegan Events UK Movement - 15 February 2026', keywords: 'stockport, festival, february, 2026, events, vegan events' },
                    { title: 'Swansea Vegan Festival', description: 'Join The Vegan Events UK Movement - 7 March 2026', keywords: 'swansea, wales, festival, march, 2026, events, vegan events' },
                    { title: 'Dundee Vegan Festival', description: 'Join The Vegan Events UK Movement - 15 March 2026', keywords: 'dundee, scotland, festival, march, 2026, events, vegan events' },
                    { title: 'Northern Vegan Festival', description: 'Join The Vegan Events UK Movement - 4 April 2026', keywords: 'manchester, festival, april, 2026, events, vegan events' },
                    { title: 'Birmingham Vegan Festival', description: 'Join The Vegan Events UK Movement - 11 April 2026', keywords: 'birmingham, festival, april, 2026, events, vegan events' },
                    { title: 'Merseyside Vegan Festival', description: 'Join The Vegan Events UK Movement - 9 May 2026', keywords: 'merseyside, liverpool, festival, may, 2026, events, vegan events' },
                    { title: 'Vegan Events UK', description: 'Since 2017, bringing the best of vegan living to communities across the UK', keywords: 'vegan events uk, partner, festivals, events, vegan events' },
                    { title: 'Vegan Camp Out', description: 'Voted UK\'s Best Vegan Festival! Ultimate vegan camping experience', keywords: 'vegan camp out, camping, festival, music, events, vegan events' }
                ]
            },

            // Sanctuaries Page
            {
                page: 'sanctuaries.html',
                title: 'Animal Sanctuaries',
                url: 'sanctuaries.html',
                content: [
                    { title: 'Ananda Animal Sanctuary', description: 'Based just outside Biggar in Scotland, home to over 80 animals', keywords: 'ananda, scotland, biggar, animals, sanctuary' },
                    { title: 'Tribe Animal Sanctuary Scotland', description: 'Small sanctuary for animals rescued from abuse, neglect or slaughter', keywords: 'tribe, scotland, clyde valley, sanctuary' },
                    { title: 'Dean Farm Trust', description: 'Animal sanctuary in Wales providing forever homes for rescued animals', keywords: 'dean farm, wales, sanctuary, rescued animals' },
                    { title: 'Eden Farmed Animal Sanctuary', description: 'Sanctuary providing care and protection for farmed animals', keywords: 'eden, farmed animals, sanctuary, protection' },
                    { title: 'Goodheart Animal Sanctuaries', description: 'Multiple sanctuaries across the UK caring for rescued animals', keywords: 'goodheart, multiple locations, sanctuary, rescued' },
                    { title: 'Heartstone Haven', description: 'Animal sanctuary dedicated to providing loving homes for rescued animals', keywords: 'heartstone, haven, sanctuary, loving homes' },
                    { title: 'Hopefield Animal Sanctuary', description: 'Essex-based sanctuary caring for a variety of rescued animals', keywords: 'hopefield, essex, sanctuary, variety of animals' },
                    { title: 'Lotus Animal Sanctuary', description: 'Sanctuary providing refuge for animals in need', keywords: 'lotus, sanctuary, refuge, animals in need' },
                    { title: 'Pear Tree Animal Sanctuary', description: 'Caring for rescued animals and providing education about animal welfare', keywords: 'pear tree, sanctuary, education, animal welfare' },
                    { title: 'The Retreat Animal Rescue & Sanctuary', description: 'All-vegan sanctuary in High Halden, Kent with 1,250+ residents and education centre. Café, thrift shop and lodges on site', keywords: 'retreat animal rescue, the retreat, kent, high halden, england, sanctuary, vegan, cafe, shop, lodges, 1250 animals, 20,000 saved', url: 'https://www.retreatanimalrescue.org.uk/' },
                    { title: 'The Farm Animal Sanctuary', description: 'Established over 30 years ago, the first of its kind in the UK, providing a safe haven for over 600 neglected and abused farm animals', keywords: 'farm animal sanctuary, worcestershire, evesham, 600 animals, 30 years, first sanctuary, jan taylor, manor orchard farm, charity 702287, sponsorship, volunteering, donations, forever home', url: 'https://thefarmanimalsanctuary.co.uk/' },
                    { title: 'Millington\'s Magical Barn', description: 'Yorkshire-based animal sanctuary with over 100 animals in care, rescuing animals from abuse, neglect and slaughter', keywords: 'millington magical barn, yorkshire, 100 animals, rescue, abuse, neglect, slaughter, charity application, guided tours, donations', url: 'https://millingtonsmagicalbarn.com/' },
                    { title: 'Willow Animal Sanctuary', description: 'Providing sanctuary and care for rescued farm animals', keywords: 'willow, sanctuary, farm animals, rescued' },
                    { title: 'Big V Sanctuary', description: 'A vegan animal sanctuary in France dedicated to providing a safe haven for rescued animals', keywords: 'big v sanctuary, france, vegan, sanctuary, rescued animals, visit, volunteer, sponsor', url: 'https://www.bigvsanctuary.com/' },
                    { title: 'Kanda Farm Sanctuary', description: '501(c)(3) nonprofit organization in Ambia, Indiana providing a safe haven for rescued farm animals', keywords: 'kanda farm sanctuary, indiana, ambia, nonprofit, 501c3, sanctuary, rescued farm animals, visit, volunteer', url: 'https://www.kandafarmsanctuary.org/' },
                    { title: 'The Gentle Barn', description: 'A sanctuary inspiring kindness and compassion with cow hug therapy, animal therapy programs, and educational experiences', keywords: 'gentle barn, cow hug therapy, animal therapy, sanctuary, kindness, compassion, multiple locations, usa', url: 'https://www.gentlebarn.org/' }
                ]
            },

            // Trailblazers Page
            {
                page: 'vegan-trailblazers.html',
                title: 'Vegan Trailblazers',
                url: 'vegan-trailblazers.html',
                content: [
                    { title: 'Donald Watson', description: 'Coined the term "vegan" and founded The Vegan Society in 1944', keywords: 'donald watson, vegan society, founder, 1944' },
                    { title: 'Genesis Butler', description: 'Young climate and animal rights activist who founded Genesis for Animals and advocates for plant-based living', keywords: 'genesis butler, climate activist, animal rights, genesis for animals, plant-based, young activist, environmentalist, vegan advocate' },
                    { title: 'Fiona Oakes', description: 'Ultra-marathon runner and animal rights activist', keywords: 'fiona oakes, marathon, runner, animal rights, activist' }
                ]
            },

            // Information Page
            {
                page: 'information.html',
                title: 'Information',
                url: 'information.html',
                content: [
                    { title: 'Vegan Resources', description: 'Comprehensive guides and information about veganism', keywords: 'resources, guides, information, veganism' },
                    { title: 'Books', description: 'Recommended books about veganism, animal rights, and plant-based living', keywords: 'books, reading, animal rights, plant-based' },
                    { title: 'Documentaries', description: 'Educational documentaries about veganism and animal welfare', keywords: 'documentaries, education, animal welfare' },
                    { title: 'Recipes', description: 'Delicious vegan recipes for all occasions', keywords: 'recipes, cooking, food, delicious' }
                ]
            },

            // About Page
            {
                page: 'about.html',
                title: 'About Us',
                url: 'about.html',
                content: [
                    { title: 'About The Kind Link', description: 'Learn about our mission to connect people with vegan resources', keywords: 'about, mission, connect, vegan resources' },
                    { title: 'Contact Us', description: 'Get in touch with The Kind Link team', keywords: 'contact, get in touch, team' }
                ]
            },
            
            // New Categories Added
            {
                page: 'cheese.html',
                title: 'Cheese',
                url: 'cheese.html',
                content: [
                    { title: 'Cheese', description: 'Delicious plant-based cheese alternatives', keywords: 'cheese, vegan cheese, plant-based cheese, dairy-free cheese, cheese alternatives, vegan dairy, cheese substitutes', url: 'cheese.html' },
                    { title: 'Kinda Co.', description: 'Award-winning dairy-free cheese handmade in Somerset', keywords: 'kinda co, vegan cheese, artisanal, traditional, dairy-free, plant-based cheese, somerset, great taste award', url: 'https://thekindaco.com/' },
                    { title: 'Tyne Chease', description: 'The UK\'s first artisan hand-crafted cashew cheese company', keywords: 'tyne chease, vegan cheese, handcrafted, uk, dairy-free, plant-based, cashew, fairtrade', url: 'https://tynechease.com/' },
                    { title: 'Sheese', description: 'Scottish-made vegan cheese with traditional cheese varieties', keywords: 'sheese, vegan cheese, scottish, authentic, dairy-free, plant-based, cheddar, mozzarella, cream cheese', url: 'https://buteisland.com/' },
                    { title: 'Violife', description: 'Plant-based cheese alternatives made from coconut oil', keywords: 'violife, vegan cheese, coconut oil, cheddar, mozzarella, feta, cream cheese, dairy-free', url: 'https://violife.com/' },
                    { title: 'Follow Your Heart', description: 'Pioneering vegan cheese brand offering a wide range of plant-based alternatives', keywords: 'follow your heart, vegan cheese, pioneering, cheddar, mozzarella, parmesan, cream cheese', url: 'https://followyourheart.com/' },
                    { title: 'Jay & Joy', description: 'France\'s first vegan cheese dairy! Artisanal alternatives to traditional cheeses', keywords: 'jay and joy, vegan cheese, french, artisan, dairy-free, plant-based, almond, cashew, blue cheese, camembert', url: 'https://www.jay-joy.com/' },
                    { title: 'I AM NUT OK', description: 'Artisan vegan cheese made in London by Angela and Nivi', keywords: 'i am nut ok, vegan cheese, london, hackney, artisanal, dairy-free, plant-based', url: 'https://www.iamnutok.com/' },
                    { title: 'Miyoko\'s Creamery', description: 'Artisanal vegan cheese made from nuts and traditional fermentation methods', keywords: 'miyokos creamery, vegan cheese, artisanal, nuts, fermentation, cultured, dairy-free, plant-based', url: 'https://miyokos.com/' }
                ]
            },
            {
                page: 'textiles-linens.html',
                title: 'Textiles & Linens',
                url: 'textiles-linens.html',
                content: [
                    { title: 'Textiles & Linens', description: 'Vegan bedding, towels, and home textiles', keywords: 'textiles, linens, bedding, towels, sheets, pillows, mattresses, vegan textiles, eco textiles', url: 'textiles-linens.html' },
                    { title: 'Panda London', description: 'Sustainable bamboo bedding and home textiles', keywords: 'panda london, bamboo, bedding, sustainable, eco, home textiles', url: 'https://pandalondon.com/' },
                    { title: 'Cottonsafe Natural Mattress', description: 'Organic cotton mattresses and bedding', keywords: 'cottonsafe, natural mattress, organic cotton, bedding, mattresses', url: 'https://www.cottonsafenaturalmattress.co.uk/' },
                    { title: 'Ettitude', description: 'Bamboo lyocell bedding and home textiles', keywords: 'ettitude, bamboo lyocell, bedding, home textiles, sustainable', url: 'https://www.ettitude.com/en-gb' },
                    { title: 'Vossen', description: 'Sustainable home textiles and linens', keywords: 'vossen, home textiles, linens, sustainable, eco', url: 'https://uk.vossen.com/' }
                ]
            },

            // Merch Page
            {
                page: 'merch.html',
                title: 'Kind VGN Link Merch',
                url: 'merch.html',
                content: [
                    { title: 'Kind VGN Link Merch', description: 'Wear your values with pride. Support our mission with every purchase', keywords: 'merch, merchandise, shop, store, clothing, apparel, accessories, vegan merch, kind vgn link merch', url: 'merch.html' },
                    { title: 'Kind VGN Link Logo Zip Hoodie', description: 'Comfortable, sustainable hoodie featuring the Kind VGN Link logo. Available in multiple colours and sizes', keywords: 'hoodie, zip hoodie, logo hoodie, sustainable, organic cotton, vegan clothing, apparel', url: 'https://kind-vgn-link.teemill.com/product/kind-vgn-link-logo-zipper/' },
                    { title: 'Kind VGN Link Mug', description: 'Ceramic mug featuring the Kind VGN Link logo. Perfect for your morning coffee or tea and available in multiple colours', keywords: 'mug, ceramic mug, coffee mug, tea mug, logo mug, drinkware, kitchen', url: 'https://kind-vgn-link.teemill.com/product/kind-vgn-link-mug/' },
                    { title: 'Kind VGN Link Logo T-Shirt', description: 'Comfortable t-shirt featuring the Kind VGN Link logo. Made from organic cotton and available in multiple colours and sizes', keywords: 't-shirt, tshirt, logo t-shirt, organic cotton, vegan clothing, apparel, casual wear', url: 'https://kind-vgn-link.teemill.com/product/kind-vgn-link-logo-t-shirt/Black' },
                    { title: 'Kind VGN Link Logo Hoodie', description: 'Comfortable hoodie featuring the Kind VGN Link logo. Made from organic cotton and available in multiple colours including Stone Blue', keywords: 'hoodie, logo hoodie, organic cotton, vegan clothing, apparel, casual wear, stone blue', url: 'https://kind-vgn-link.teemill.com/product/kind-vgn-link-logo-hoodie/Stone%20Blue' },
                    { title: 'Kind VGN Link Eco Notebook', description: 'Sustainable notebook featuring the Kind VGN Link logo. Perfect for jotting down ideas, recipes, or thoughts about your vegan journey', keywords: 'notebook, eco notebook, sustainable, vegan notebook, stationery, writing, journal', url: 'https://kind-vgn-link.teemill.com/product/the-kind-vgn-link-eco-notebook/' },
                    { title: 'Kind VGN Link Jumper', description: 'Comfortable jumper featuring the Kind VGN Link logo. Made from organic cotton and available in multiple colours and sizes', keywords: 'jumper, logo jumper, organic cotton, vegan clothing, apparel, casual wear', url: 'https://kind-vgn-link.teemill.com/product/kind-vgn-link-jumper/' },
                    { title: 'Kind VGN Link Reusable Bottle', description: 'Sustainable reusable bottle featuring the Kind VGN Link logo. Perfect for staying hydrated while showing your support for the movement', keywords: 'reusable bottle, water bottle, sustainable, eco-friendly, hydration, drinkware', url: 'https://kind-vgn-link.teemill.com/product/kind-vgn-link-logo-reusable-bottle/' },
                    { title: 'Kind VGN Link Logo Jumper', description: 'Warm and comfortable jumper featuring the Kind VGN Link logo. Made from organic cotton and available in multiple colours and sizes', keywords: 'jumper, logo jumper, organic cotton, vegan clothing, apparel, casual wear, warm', url: 'https://kind-vgn-link.teemill.com/product/kind-vgn-link-logo-jumper/' },
                    { title: 'Kind VGN Link Logo Cap', description: 'Stylish cap featuring the Kind VGN Link logo. Perfect for sunny days and outdoor activities while showing your support for the movement', keywords: 'cap, hat, logo cap, outdoor, sunny days, accessories, headwear', url: 'https://kind-vgn-link.teemill.com/product/kind-vgn-link-logo-cap/' }
                ]
            },
            // {
            //     page: 'video-games.html',
            //     title: 'Video Games & Gaming',
            //     url: 'video-games.html',
            //     content: [
            //         { title: 'Sonic Origins Plus', description: 'Remastered collection of classic Sonic games featuring the iconic blue hedgehog. Speed through Green Hill Zone and thwart Doctor Robotnik\'s plans', keywords: 'sonic, hedgehog, platformer, classic games, sega, blue hedgehog, green hill zone, robotnik', url: 'https://www.playstation.com/en-gb/games/sonic-origins/' },
            //         { title: 'Stray', description: 'Beautiful third-person cat adventure game set in a cybercity. Play as a stray cat exploring neon-lit alleys and befriending robots', keywords: 'stray, cat, adventure, cybercity, robots, neon, exploration, animal protagonist', url: 'https://www.playstation.com/en-gb/games/stray/' },
            //         { title: 'Oddworld: Soulstorm', description: 'Second chapter of Abe\'s heroic journey. Play as Abe, a transformed Mudokon who rises from corporate cog to unlikely hero', keywords: 'oddworld, abe, mudokon, corporate, hero, adventure, action, soulstorm', url: 'https://www.playstation.com/en-gb/games/oddworld-soulstorm/' },
            //         { title: 'Herdling', description: 'Guide a herd of mysterious Calicorn creatures on a stirring journey into the mountains. Emotional storytelling about trust, survival, and companionship', keywords: 'herdling, calicorn, creatures, mountains, journey, emotional, trust, survival, companionship', url: 'https://store.steampowered.com/app/3047750/Herdling/' },
            //         { title: 'Animal Shelter', description: 'Run a refuge for strays and rescues! Clean, protect, and care for abandoned animals as you help them find loving new homes', keywords: 'animal shelter, refuge, strays, rescues, animals, care, adoption, simulation', url: 'https://store.steampowered.com/app/1389820/Animal_Rescue/' },
            //         { title: 'Bunny Raiders', description: 'Roguelike game where you and friends battle through randomly generated rooms, destroying evil robots and saving furry friends', keywords: 'bunny raiders, roguelike, bunnies, robots, animals, nature, protection, multiplayer', url: 'https://store.playstation.com/en-gb/product/EP8209-CUSA30149_00-7386874431634642' }
            //     ]
            // },

            // Spa & Retreat Page
            {
                page: 'spa-retreat.html',
                title: 'Spa & Retreat',
                url: 'spa-retreat.html',
                content: [
                    { title: 'Spa & Retreat', description: 'Vegan-friendly wellness and relaxation experiences', keywords: 'spa, retreat, wellness, relaxation, glamping, sanctuary, vegan spa, wellness retreat, detox, mindfulness, meditation, yoga retreat, animal sanctuary', url: 'spa-retreat.html' },
                    { title: 'Hempsall Farm Vegan Glamping', description: 'Luxury vegan glamping in the Cambridgeshire countryside with wood-fired hot tubs and animal sanctuary', keywords: 'hempsall farm, vegan glamping, cambridgeshire, countryside, hot tubs, animal sanctuary, luxury, safari tents, family, groups, fenland, woodland walks', url: 'https://www.veganglamping.site/' },
                    { title: 'The Base Vegan Retreat Animal Sanctuary', description: 'Luxury vegan retreat and animal sanctuary in Bristol with bespoke cabin and outdoor spa area', keywords: 'base retreat, bristol, animal sanctuary, luxury cabin, cotswolds, outdoor spa, vegan breakfast, wildlife rescue, not-for-profit, campaigning', url: 'https://thebaseretreat.co.uk/' },
                    { title: 'La Crisalida Retreats', description: 'Holistic health and wellness retreat in the Upper Severn Valley, Wales with daily yoga and plant-based nutrition', keywords: 'la crisalida, wales, holistic wellness, yoga, meditation, plant-based nutrition, maesmawr hall, severn valley, detox, longevity retreat, flexible arrival', url: 'https://lacrisalidaretreats.co.uk/' },
                    { title: 'Haye Cornwall', description: 'Unique holidays and wellness retreats at an animal sanctuary in Cornwall with yoga retreats and wild swimming', keywords: 'haye cornwall, animal sanctuary, yoga retreats, wild swimming, rescued animals, permaculture garden, cornish countryside, small groups, homemade vegan food', url: 'https://hayecornwall.co.uk/' },
                    { title: 'The Greenhouse Spa Retreat', description: 'Nurture yourself in nature at this serene Cornish garden spa retreat with 30-year mature garden', keywords: 'greenhouse spa, cornish garden, nature spa, 30-year garden, glamping, holistic treatments, wellness activities, mother nature, sanctuary', url: 'https://www.thegreenhousespa.co.uk/' },
                    { title: 'The Gavin Sisters - The Detox Barn', description: 'Recognized by Condé Nast as one of the top wellness retreats of 2025! Weekend detox retreats in Suffolk countryside', keywords: 'gavin sisters, detox barn, suffolk, condé nast, top wellness retreats 2025, weekend detox, yoga, plant-based food, fresh juices, barn conversion, open fires, 2-acre garden', url: 'https://gavinsisters.co.uk/' }
                ]
            },

            // Decorating Page
            {
                page: 'decorating.html',
                title: 'Decorating',
                url: 'decorating.html',
                content: [
                    { title: 'Decorating', description: 'Transform your space with vegan home decor and sustainable interior design', keywords: 'decorating, home decor, interior design, vegan furniture, wall art, lighting, plants, rugs, accessories, sustainable design, eco-friendly home', url: 'decorating.html' },
                    { title: 'Edward Bulmer Natural Paint', description: 'Pioneering plant-based natural paint that doesn\'t cost the Earth. 100% natural, toxin-free paints with complete transparency about ingredients', keywords: 'edward bulmer, natural paint, plant-based paint, toxin-free, eco-friendly paint, natural pigments, colour consultancy, london showroom, responsible design, biodiversity', url: 'https://www.edwardbulmerpaint.co.uk/' },
                    { title: 'Claybrook Studio', description: 'UK-made eco-friendly and vegan paint options with 75 beautiful hues. Water-based paints that are low in VOCs, cruelty-free, and offer excellent coverage and durability', keywords: 'claybrook studio, uk-made, eco-friendly paint, vegan paint, water-based, low voc, cruelty-free, 75 hues, emulsion, eggshell, free samples, sustainable paint', url: 'https://www.claybrookstudio.co.uk/' },
                    { title: 'Victory Colours Down to Earth Paints', description: 'Brother and sister team creating highly technical, high-performing, solvent-free paint with low toxins. Extremely low VOC paint that is practically odourless', keywords: 'victory colours, down to earth paints, low voc paint, low odour paint, vegan paint, eco-friendly paint, solvent-free, high performing, professional quality, brother sister team, chemistry expertise', url: 'https://www.victorycolours.co.uk/' },
                    { title: 'Little Greene', description: 'Eco-friendly paint and wallpaper company committed to producing vegan and sustainable decorating solutions. Free from animal-derived ingredients and not tested on animals', keywords: 'little greene, eco-friendly paint, vegan paint, wallpaper, sustainable decorating, cruelty-free, animal-free, quality paint, conscious decorating, uk paint company', url: 'https://www.littlegreene.com/' }
                ]
            },

            // Support Websites Page
            {
                page: 'support-websites.html',
                title: 'Support these websites',
                url: 'support-websites.html',
                content: [
                    { title: 'Support these websites', description: 'Help support these amazing vegan websites and movements', keywords: 'support websites, vegan websites, vegan movements, support vegan causes, plant-based websites, ethical websites, vegan community, support vegan activism', url: 'support-websites.html' },
                    { title: 'Plant-Based Schools', description: 'Parents, teachers and supporters uniting to push for healthier, more sustainable meals in schools. Join the movement fighting to make plant-based school meals happen', keywords: 'plant-based schools, school meals, children health, sustainable school food, vegan school meals, healthy school lunches, plant-based education, school nutrition, vegan kids, sustainable education', url: 'https://www.plantbasedschools.com/' },
                    { title: 'Vegan Vend', description: 'Revolutionary all-vegan snack vending machines bringing the best quality vegan snacks to convenient locations. Meet Daisy, Willow, Lumi, and Bluebell', keywords: 'vegan vend, vegan vending machines, all-vegan snacks, daisy willow lumi bluebell, vegan snacks, vending machines, local business, plant-based snacks, vegan convenience, independent business', url: 'https://www.veganvend.co.uk/' }
                ]
            },

            // Recipes Page
            {
                page: 'recipes.html',
                title: 'Recipes',
                url: 'recipes.html',
                content: [
                    { title: 'Recipes', description: 'Delicious vegan recipes and cooking inspiration for every meal', keywords: 'recipes, vegan recipes, cooking, plant-based cooking, vegan food, meal ideas, breakfast, lunch, dinner, desserts, snacks, special occasions, vegan cooking, healthy recipes', url: 'recipes.html' },
                    { title: 'The Veg Space', description: 'Easy vegan recipes with beautiful bakes, speedy suppers, and entertaining ideas. Created by Kate Ford, author of \'Vegan in 15\', featuring straightforward recipes with no weird ingredients', keywords: 'the veg space, kate ford, vegan in 15, easy vegan recipes, vegan baking, seasonal soups, step-by-step photos, first-time cooks, vegan suppers, entertaining ideas, tried-and-tested recipes', url: 'https://www.thevegspace.co.uk/' },
                    { title: 'Lazy Cat Kitchen', description: 'Beautiful vegan recipes with stunning photography and easy-to-follow instructions. Created by Ania Marcinowska, featuring a wide variety of dishes from breakfast to desserts', keywords: 'lazy cat kitchen, ania marcinowska, vegan recipes, beautiful photography, easy recipes, vegan baking, large plates, small plates, salads, soups, sweets, reader favorites, seasonal recipes, vegan desserts', url: 'https://www.lazycatkitchen.com/' },
                    { title: 'One Ingredient Chef', description: 'Hundreds of free unprocessed, 100% vegan recipes designed to make you healthier while cooking the most delicious food. Created by Andrew Olson, featuring whole food nutrition', keywords: 'one ingredient chef, andrew olson, unprocessed vegan recipes, whole food recipes, health-focused recipes, vegan main dishes, vegan breakfast, vegan desserts, vegan soups, vegan salads, vegan appetizers, vegan sides, vegan snacks, vegan beverages, plant-based nutrition, healthy vegan cooking', url: 'https://oneingredientchef.com/' },
                    { title: 'Love and Lemons', description: 'Fresh, zesty vegetarian recipes with beautiful photography from Jeanine and Jack. Features seasonal produce, plant-based cooking basics, and creative vegetarian dishes', keywords: 'love and lemons, jeanine jack, vegetarian recipes, fresh recipes, seasonal produce, plant-based cooking, beautiful photography, healthy meal prep, freezer meals, cooking basics, vibrant food, colorful recipes, breakfast ideas, healthy lunch, dinner ideas, soup recipes, salad recipes', url: 'https://www.loveandlemons.com/' },
                    { title: 'No Fuss Vegan Food', description: 'Simple, easy vegan recipes made from everyday ingredients with a no-fuss approach. Features tried and tested recipes for busy lifestyles', keywords: 'no fuss vegan food, simple vegan recipes, easy vegan cooking, everyday ingredients, quick vegan meals, one pot meals, 10 minute recipes, vegan starters, vegan snacks, vegan lunch, vegan dinner, vegan desserts, vegan treats, tried and tested recipes, busy lifestyle cooking', url: 'https://www.nofussvegan.org/' },
                    { title: 'Madeleine Olivia', description: 'Full-time content creator making plant-based living easy and attainable for everyone. Features accessible vegan recipes with 550,000+ YouTube subscribers and comprehensive dietary filters', keywords: 'madeleine olivia, youtube creator, plant-based recipes, accessible vegan recipes, dietary filters, gluten-free vegan, nut-free vegan, soy-free vegan, refined sugar-free vegan, vegan breakfast, vegan lunch, vegan mains, vegan desserts, vegan sides, vegan snacks, vegan drinks, vegan cookbook, make it vegan', url: 'https://madeleineolivia.co.uk/' }
                ]
            }
        ];
    }

    bindEvents() {
        // Bind search trigger buttons
        const searchTriggerBtns = document.querySelectorAll('.search-trigger-btn');
        console.log('Found search trigger buttons:', searchTriggerBtns.length);
        
        // If no buttons found, create one
        if (searchTriggerBtns.length === 0) {
            console.log('No search buttons found, creating one...');
            this.createSearchButton();
        }
        
        searchTriggerBtns.forEach(btn => {
            console.log('Binding search button:', btn);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openSearch();
            });
        });

        // Keyboard shortcut to open search (Ctrl/Cmd + K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            
            // Close search with Escape
            if (e.key === 'Escape') {
                this.closeSearch();
            }
        });

        // Search input events
        const searchInput = document.getElementById('globalSearchInput');
        const searchCloseBtn = document.getElementById('searchCloseBtn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const firstResult = document.querySelector('.search-result-item');
                    if (firstResult) {
                        firstResult.click();
                    }
                }
            });
        }

        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', () => {
                this.closeSearch();
            });
        }

        // Close search when clicking outside (desktop only)
        document.addEventListener('click', (e) => {
            const searchContainer = document.querySelector('.global-search-container');
            if (searchContainer && !searchContainer.contains(e.target) && searchContainer.classList.contains('active') && window.innerWidth > 768) {
                this.closeSearch();
            }
        });

        // Add mobile-specific enhancements
        this.addMobileSupport();
    }

    createSearchButton() {
        const header = document.querySelector('.header-container');
        if (header) {
            const searchBtn = document.createElement('button');
            searchBtn.className = 'search-trigger-btn';
            searchBtn.innerHTML = '<i class="fas fa-search"></i>';
            searchBtn.setAttribute('aria-label', 'Search');
            searchBtn.style.cssText = `
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                background: red !important;
                border: 2px solid blue !important;
                position: absolute !important;
                right: 60px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                z-index: 9999 !important;
                width: 40px !important;
                height: 40px !important;
                align-items: center !important;
                justify-content: center !important;
            `;
            
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openSearch();
            });
            
            header.appendChild(searchBtn);
            console.log('Created search button:', searchBtn);
        }
    }

    addMobileSupport() {
        const searchInput = document.getElementById('globalSearchInput');
        const searchContainer = document.querySelector('.global-search-container');
        
        if (searchInput) {
            // Handle mobile keyboard
            searchInput.addEventListener('focus', () => {
                if (window.innerWidth <= 768) {
                    // Prevent zoom on iOS
                    const viewport = document.querySelector('meta[name="viewport"]');
                    if (viewport) {
                        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                    }
                }
            });

            searchInput.addEventListener('blur', () => {
                if (window.innerWidth <= 768) {
                    // Restore viewport
                    const viewport = document.querySelector('meta[name="viewport"]');
                    if (viewport) {
                        viewport.content = 'width=device-width, initial-scale=1.0';
                    }
                }
            });
        }

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                if (searchContainer && searchContainer.classList.contains('active')) {
                    this.adjustMobileLayout();
                }
            }, 100);
        });

        // Handle resize
        window.addEventListener('resize', () => {
            if (searchContainer && searchContainer.classList.contains('active')) {
                this.adjustMobileLayout();
            }
        });
    }

    adjustMobileLayout() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults && window.innerWidth <= 768) {
            const availableHeight = window.innerHeight - 120;
            searchResults.style.maxHeight = `${availableHeight}px`;
        }
    }

    openSearch() {
        const searchContainer = document.querySelector('.global-search-container');
        const searchInput = document.getElementById('globalSearchInput');
        
        if (searchContainer) {
            searchContainer.classList.add('active');
            
            // Prevent body scroll on mobile
            if (window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            }
            
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                    // Adjust layout for mobile
                    this.adjustMobileLayout();
                }
            }, 100);
        }
    }

    closeSearch() {
        const searchContainer = document.querySelector('.global-search-container');
        const searchInput = document.getElementById('globalSearchInput');
        const searchResults = document.getElementById('searchResults');
        
        if (searchContainer) {
            searchContainer.classList.remove('active');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            if (searchInput) {
                searchInput.value = '';
            }
            if (searchResults) {
                searchResults.classList.remove('active');
                searchResults.innerHTML = '';
            }
        }
    }

    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        
        if (!query.trim()) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }

        const results = this.searchContent(query.toLowerCase());
        this.displayResults(results);
    }

    searchContent(query) {
        const results = [];
        
        this.searchData.forEach(page => {
            page.content.forEach(item => {
                const searchText = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
                
                if (searchText.includes(query)) {
                    // Prioritize internal page URLs over external URLs
                    let targetUrl = page.url; // Default to the page URL
                    
                    // Only use item.url if it's an internal page (doesn't start with http)
                    if (item.url && !item.url.startsWith('http')) {
                        targetUrl = item.url;
                    }
                    
                    results.push({
                        title: item.title,
                        description: item.description,
                        page: page.title,
                        url: targetUrl, // Always use internal page URL
                        relevance: this.calculateRelevance(query, searchText)
                    });
                }
            });
        });

        // Sort by relevance
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    calculateRelevance(query, text) {
        let score = 0;
        
        // Exact title match gets highest score
        if (text.includes(query)) {
            score += 10;
        }
        
        // Title starts with query gets high score
        if (text.startsWith(query)) {
            score += 5;
        }
        
        // Count occurrences
        const occurrences = (text.match(new RegExp(query, 'g')) || []).length;
        score += occurrences * 2;
        
        return score;
    }

    displayResults(results) {
        const searchResults = document.getElementById('searchResults');
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-search-results">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No results found</h3>
                    <p>Try searching with different keywords</p>
                </div>
            `;
        } else {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" data-url="${result.url}">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-description">${result.description}</div>
                    <div class="search-result-page">${result.page}</div>
                </div>
            `).join('');
            
            // Add click handlers to results
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const url = item.getAttribute('data-url');
                    if (url && url !== this.currentPage) {
                        window.location.href = url;
                    } else {
                        this.closeSearch();
                    }
                });
            });
        }
        
        searchResults.classList.add('active');
    }
}

// Initialize global search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GlobalSearch();
});

// Search button is now added directly to HTML, no need to create it here
