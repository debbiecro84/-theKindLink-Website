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
                    { title: 'Explore Now', description: 'Discover amazing vegan products and ethical brands', keywords: 'explore, products, brands' }
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
                    { title: 'Fitness & Wellness', description: 'Vegan fitness and wellness products', keywords: 'fitness, wellness, health, exercise, workout, sports, nutrition, supplements', url: 'fitness-nutrition.html' },
                    { title: 'Books & Media', description: 'Vegan books, magazines, and media', keywords: 'books, media, magazines, reading, literature, documentaries, films', url: 'books-children.html' },
                    { title: 'Travel', description: 'Vegan-friendly travel and accommodation', keywords: 'travel, accommodation, hotels, vegan travel, holidays, trips, vacation', url: 'travel.html' },
                    { title: 'Gifts & Accessories', description: 'Vegan gifts and accessories', keywords: 'gifts, accessories, presents, vegan gifts, presents, souvenirs', url: 'gifts-accessories.html' }
                ]
            },

            // Individual Category Pages
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
                    { title: 'Beauty & Skincare', description: 'Cruelty-free beauty products', keywords: 'beauty, skincare, cosmetics, cruelty-free, makeup, skincare, personal care, toiletries', url: 'beauty.html' }
                ]
            },
            {
                page: 'skincare.html',
                title: 'Skincare',
                url: 'skincare.html',
                content: [
                    { title: 'Skincare', description: 'Vegan skincare products', keywords: 'skincare, skin care, face, moisturizer, cleanser, serum, cream, lotion, vegan skincare', url: 'skincare.html' }
                ]
            },
            {
                page: 'makeup.html',
                title: 'Makeup',
                url: 'makeup.html',
                content: [
                    { title: 'Makeup', description: 'Cruelty-free makeup products', keywords: 'makeup, cosmetics, lipstick, foundation, mascara, eyeshadow, blush, powder, vegan makeup', url: 'makeup.html' }
                ]
            },
            {
                page: 'fragrances.html',
                title: 'Fragrances',
                url: 'fragrances.html',
                content: [
                    { title: 'Fragrances', description: 'Vegan perfumes and fragrances', keywords: 'fragrances, perfume, perfumes, cologne, scent, aromas, body spray, eau de toilette, eau de parfum, vegan perfume', url: 'fragrances.html' }
                ]
            },
            {
                page: 'tanning.html',
                title: 'Tanning',
                url: 'tanning.html',
                content: [
                    { title: 'Tanning', description: 'Vegan tanning products', keywords: 'tanning, tan, self tan, fake tan, bronzer, sunless tanning, tanning lotion, tanning oil, vegan tanning', url: 'tanning.html' }
                ]
            },
            {
                page: 'hair-care.html',
                title: 'Hair Care',
                url: 'hair-care.html',
                content: [
                    { title: 'Hair Care', description: 'Vegan hair care products', keywords: 'hair care, haircare, shampoo, conditioner, hair treatment, hair mask, hair oil, vegan hair care', url: 'hair-care.html' },
                    { title: 'Plant Made', description: 'Plant-based beauty and personal care brand', keywords: 'plant made, hair care, beauty, personal care, vegan, cruelty-free, sustainable', url: 'https://www.weareplantmade.com/' }
                ]
            },
            {
                page: 'body-care.html',
                title: 'Body Care',
                url: 'body-care.html',
                content: [
                    { title: 'Body Care', description: 'Vegan body care products', keywords: 'body care, bodycare, body lotion, body wash, body scrub, body butter, body oil, vegan body care', url: 'body-care.html' },
                    { title: 'AKT London', description: 'Premium natural deodorant and body care brand', keywords: 'akt london, deodorant, body care, natural, premium, vegan, cruelty-free', url: 'https://www.aktlondon.com/' }
                ]
            },
            {
                page: 'tooth-care.html',
                title: 'Tooth Care',
                url: 'tooth-care.html',
                content: [
                    { title: 'Tooth Care', description: 'Vegan dental care products', keywords: 'tooth care, dental, toothpaste, toothbrush, mouthwash, dental floss, oral care, vegan dental', url: 'tooth-care.html' }
                ]
            },
            {
                page: 'vitamins-supplements.html',
                title: 'Vitamins & Supplements',
                url: 'vitamins-supplements.html',
                content: [
                    { title: 'Vitamins & Supplements', description: 'Vegan vitamins and supplements', keywords: 'vitamins, supplements, nutrition, health, b12, iron, calcium, omega, protein powder, vegan supplements', url: 'vitamins-supplements.html' }
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
                    { title: 'Clothing', description: 'Vegan clothing and apparel', keywords: 'clothing, clothes, apparel, shirts, pants, dresses, tops, bottoms, vegan clothing', url: 'clothing.html' }
                ]
            },
            {
                page: 'footwear.html',
                title: 'Footwear',
                url: 'footwear.html',
                content: [
                    { title: 'Footwear', description: 'Vegan shoes and footwear', keywords: 'footwear, shoes, boots, sneakers, sandals, heels, flats, vegan shoes, vegan footwear', url: 'footwear.html' }
                ]
            },
            {
                page: 'bags-accessories.html',
                title: 'Bags & Accessories',
                url: 'bags-accessories.html',
                content: [
                    { title: 'Bags & Accessories', description: 'Vegan bags and accessories', keywords: 'bags, accessories, handbags, backpacks, purses, wallets, belts, vegan bags, vegan accessories', url: 'bags-accessories.html' }
                ]
            },
            {
                page: 'jewellery.html',
                title: 'Jewellery',
                url: 'jewellery.html',
                content: [
                    { title: 'Jewellery', description: 'Vegan jewellery and accessories', keywords: 'jewellery, rings, necklaces, earrings, bracelets, watches, vegan jewellery', url: 'jewellery.html' }
                ]
            },
            {
                page: 'fitness-clothing.html',
                title: 'Fitness Clothing',
                url: 'fitness-clothing.html',
                content: [
                    { title: 'Fitness Clothing', description: 'Vegan fitness and workout clothing', keywords: 'fitness clothing, workout clothes, gym wear, activewear, sports clothing, yoga pants, leggings, vegan fitness wear', url: 'fitness-clothing.html' }
                ]
            },
            {
                page: 'fitness-workout.html',
                title: 'Fitness & Workout',
                url: 'fitness-workout.html',
                content: [
                    { title: 'Fitness & Workout', description: 'Vegan fitness and workout products', keywords: 'fitness, workout, gym, exercise, sports, yoga, pilates, fitness equipment, vegan fitness', url: 'fitness-workout.html' }
                ]
            },
            {
                page: 'fitness-nutrition.html',
                title: 'Fitness & Nutrition',
                url: 'fitness-nutrition.html',
                content: [
                    { title: 'Fitness & Nutrition', description: 'Vegan fitness and nutrition products', keywords: 'fitness, nutrition, protein, supplements, health, wellness, vegan nutrition, vegan fitness', url: 'fitness-nutrition.html' }
                ]
            },
            {
                page: 'food-drinks.html',
                title: 'Food & Drinks',
                url: 'food-drinks.html',
                content: [
                    { title: 'Food & Drinks', description: 'Plant-based food and beverages', keywords: 'food, drinks, plant-based, vegan food, sweets, treats, snacks, chocolate, candy, desserts, beverages, drinks', url: 'food-drinks.html' },
                    { title: 'Cheese', description: 'Delicious plant-based cheese alternatives', keywords: 'cheese, vegan cheese, plant-based cheese, dairy-free cheese, cheese alternatives, vegan dairy, cheese substitutes', url: 'cheese.html' }
                ]
            },
            {
                page: 'beverages.html',
                title: 'Beverages',
                url: 'beverages.html',
                content: [
                    { title: 'Beverages', description: 'Vegan drinks and beverages', keywords: 'beverages, drinks, juice, smoothies, tea, coffee, plant milk, vegan drinks, vegan beverages', url: 'beverages.html' },
                    { title: 'Overherd', description: 'Powdered oat milk that you just add water to', keywords: 'overherd, oat milk, powdered, sustainable, dairy-free, plant milk', url: 'https://overherd.uk/' },
                    { title: 'MYOM', description: 'Revolutionary oat milk paste that you make at home', keywords: 'myom, oat milk, paste, home made, dairy-free, plant milk', url: 'https://myom.shop/' }
                ]
            },
            {
                page: 'snacks-treats.html',
                title: 'Snacks & Treats',
                url: 'snacks-treats.html',
                content: [
                    { title: 'Snacks & Treats', description: 'Vegan snacks and treats', keywords: 'snacks, treats, sweets, chocolate, candy, cookies, chips, vegan snacks, vegan treats, vegan sweets', url: 'snacks-treats.html' },
                    { title: 'Based Food', description: 'Plant-based baking and breakfast mixes', keywords: 'based food, baking, breakfast, mixes, plant-based, gluten-free, allergen-free', url: 'https://basedfood.co.uk/' },
                    { title: 'Vive', description: 'Dangerously delicious plant-based chocolate treats', keywords: 'vive, chocolate, treats, plant-based, vegan chocolate, sweets', url: 'https://eatvive.com/' }
                ]
            },
            {
                page: 'frozen-foods.html',
                title: 'Frozen Foods',
                url: 'frozen-foods.html',
                content: [
                    { title: 'Frozen Foods', description: 'Vegan frozen foods', keywords: 'frozen foods, frozen, ice cream, frozen meals, frozen vegetables, vegan frozen, vegan ice cream', url: 'frozen-foods.html' },
                    { title: 'Shicken Foods', description: 'Vegan versions of everyday favorite foods', keywords: 'shicken foods, vegan, curries, kebabs, wings, sides, plant-based', url: 'https://shickenfoods.com/' }
                ]
            },
            {
                page: 'bakery.html',
                title: 'Bakery',
                url: 'bakery.html',
                content: [
                    { title: 'Bakery', description: 'Vegan bakery and baked goods', keywords: 'bakery, baked goods, bread, cakes, pastries, vegan bakery, vegan baked goods', url: 'bakery.html' },
                    { title: 'Magpye', description: 'Multi-award winning vegan pies handmade in Northumberland', keywords: 'magpye, vegan pies, handmade, northumberland, organic, sustainable', url: 'https://magpye.co.uk/' }
                ]
            },
            {
                page: 'pantry-essentials.html',
                title: 'Pantry Essentials',
                url: 'pantry-essentials.html',
                content: [
                    { title: 'Pantry Essentials', description: 'Vegan pantry essentials', keywords: 'pantry, essentials, cooking, ingredients, spices, herbs, vegan pantry, vegan essentials', url: 'pantry-essentials.html' }
                ]
            },
            {
                page: 'cleaning-essentials.html',
                title: 'Cleaning Essentials',
                url: 'cleaning-essentials.html',
                content: [
                    { title: 'Cleaning Essentials', description: 'Vegan cleaning products', keywords: 'cleaning, essentials, household, detergent, soap, cleaner, vegan cleaning, eco cleaning', url: 'cleaning-essentials.html' }
                ]
            },
            {
                page: 'candles.html',
                title: 'Candles',
                url: 'candles.html',
                content: [
                    { title: 'Candles', description: 'Vegan candles and home fragrances', keywords: 'candles, candle, home fragrance, aromatherapy, wax, vegan candles, soy candles', url: 'candles.html' }
                ]
            },
            {
                page: 'home-decor.html',
                title: 'Home Decor',
                url: 'home-decor.html',
                content: [
                    { title: 'Home Decor', description: 'Vegan home decor and accessories', keywords: 'home decor, decoration, furniture, accessories, vegan home, eco home', url: 'home-decor.html' }
                ]
            },
            {
                page: 'home-living.html',
                title: 'Home & Living',
                url: 'home-living.html',
                content: [
                    { title: 'Home & Living', description: 'Sustainable home products', keywords: 'home, living, sustainable, eco, household, decor, furniture, cleaning', url: 'home-living.html' },
                    { title: 'Textiles & Linens', description: 'Vegan bedding, towels, and home textiles', keywords: 'textiles, linens, bedding, towels, sheets, pillows, mattresses, vegan textiles, eco textiles', url: 'textiles-linens.html' }
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
                    { title: 'Books - Children', description: 'Vegan children\'s books', keywords: 'books, children, kids, reading, vegan books, children books, kids books', url: 'books-children.html' }
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
                page: 'books-lifestyle.html',
                title: 'Books - Lifestyle',
                url: 'books-lifestyle.html',
                content: [
                    { title: 'Books - Lifestyle', description: 'Vegan lifestyle books', keywords: 'books, lifestyle, vegan lifestyle, health, wellness, vegan books', url: 'books-lifestyle.html' }
                ]
            },
            {
                page: 'books-magazines.html',
                title: 'Books - Magazines',
                url: 'books-magazines.html',
                content: [
                    { title: 'Books - Magazines', description: 'Vegan magazines and publications', keywords: 'books, magazines, publications, vegan magazines, vegan publications', url: 'books-magazines.html' }
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
                page: 'travel.html',
                title: 'Travel',
                url: 'travel.html',
                content: [
                    { title: 'Travel', description: 'Vegan-friendly travel and accommodation', keywords: 'travel, accommodation, hotels, vegan travel, holidays, trips, vacation', url: 'travel.html' }
                ]
            },
            {
                page: 'travel-accessories.html',
                title: 'Travel Accessories',
                url: 'travel-accessories.html',
                content: [
                    { title: 'Travel Accessories', description: 'Vegan travel accessories', keywords: 'travel, accessories, luggage, bags, travel gear, vegan travel, travel accessories', url: 'travel-accessories.html' }
                ]
            },
            {
                page: 'travel-clothing.html',
                title: 'Travel Clothing',
                url: 'travel-clothing.html',
                content: [
                    { title: 'Travel Clothing', description: 'Vegan travel clothing', keywords: 'travel, clothing, travel clothes, vacation wear, travel fashion, vegan travel clothing', url: 'travel-clothing.html' }
                ]
            },
            {
                page: 'travel-gadgets.html',
                title: 'Travel Gadgets',
                url: 'travel-gadgets.html',
                content: [
                    { title: 'Travel Gadgets', description: 'Vegan travel gadgets and electronics', keywords: 'travel, gadgets, electronics, travel tech, vegan travel gadgets', url: 'travel-gadgets.html' }
                ]
            },
            {
                page: 'travel-shoes.html',
                title: 'Travel Shoes',
                url: 'travel-shoes.html',
                content: [
                    { title: 'Travel Shoes', description: 'Vegan travel shoes and footwear', keywords: 'travel, shoes, footwear, travel shoes, vacation shoes, vegan travel shoes', url: 'travel-shoes.html' }
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
                    { title: 'Europe Hotels & B&Bs', description: 'Vegan-friendly European accommodation', keywords: 'europe, hotels, b&b, bed and breakfast, accommodation, vegan hotels, europe travel', url: 'europe-hotels-b&bs.html' }
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
                page: 'gifts-baskets.html',
                title: 'Gift Baskets',
                url: 'gifts-baskets.html',
                content: [
                    { title: 'Gift Baskets', description: 'Vegan gift baskets', keywords: 'gifts, baskets, gift baskets, presents, vegan gifts, gift sets', url: 'gifts-baskets.html' }
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
                page: 'gifts-personalized.html',
                title: 'Personalized Gifts',
                url: 'gifts-personalized.html',
                content: [
                    { title: 'Personalized Gifts', description: 'Personalized vegan gifts', keywords: 'gifts, personalized, custom, engraved, monogrammed, vegan gifts', url: 'gifts-personalized.html' }
                ]
            },
            {
                page: 'tattoo-studios.html',
                title: 'Tattoo Studios',
                url: 'tattoo-studios.html',
                content: [
                    { title: 'Tattoo Studios', description: 'Vegan-friendly tattoo studios', keywords: 'tattoo, tattoos, studio, studios, vegan tattoo, vegan tattoos, body art', url: 'tattoo-studios.html' }
                ]
            },
            {
                page: 'restaurants.html',
                title: 'Restaurants',
                url: 'restaurants.html',
                content: [
                    { title: 'Restaurants', description: 'Vegan restaurants and dining', keywords: 'restaurants, dining, food, vegan restaurants, vegan food, eating out', url: 'restaurants.html' }
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
                page: 'fine-dining.html',
                title: 'Fine Dining',
                url: 'fine-dining.html',
                content: [
                    { title: 'Fine Dining', description: 'Vegan fine dining restaurants', keywords: 'fine dining, upscale, gourmet, vegan fine dining, luxury dining', url: 'fine-dining.html' }
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
                page: 'fast-casual.html',
                title: 'Fast Casual',
                url: 'fast-casual.html',
                content: [
                    { title: 'Fast Casual', description: 'Vegan fast casual restaurants', keywords: 'fast casual, quick, casual, vegan fast casual, quick service', url: 'fast-casual.html' }
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
                page: 'bars-pubs.html',
                title: 'Bars & Pubs',
                url: 'bars-pubs.html',
                content: [
                    { title: 'Bars & Pubs', description: 'Vegan bars and pubs', keywords: 'bars, pubs, drinks, alcohol, vegan bars, vegan pubs, nightlife', url: 'bars-pubs.html' }
                ]
            },
            {
                page: 'london-restaurants.html',
                title: 'London Restaurants',
                url: 'london-restaurants.html',
                content: [
                    { title: 'London Restaurants', description: 'Vegan restaurants in London', keywords: 'london, restaurants, vegan london, london dining, uk restaurants', url: 'london-restaurants.html' }
                ]
            },
            {
                page: 'manchester-restaurants.html',
                title: 'Manchester Restaurants',
                url: 'manchester-restaurants.html',
                content: [
                    { title: 'Manchester Restaurants', description: 'Vegan restaurants in Manchester', keywords: 'manchester, restaurants, vegan manchester, manchester dining, uk restaurants', url: 'manchester-restaurants.html' }
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
                    { title: 'Glasgow Restaurants', description: 'Vegan restaurants in Glasgow', keywords: 'glasgow, scotland, restaurants, vegan glasgow, glasgow dining, scottish restaurants', url: 'glasgow-restaurants.html' }
                ]
            },
            {
                page: 'edinburgh-restaurants.html',
                title: 'Edinburgh Restaurants',
                url: 'edinburgh-restaurants.html',
                content: [
                    { title: 'Edinburgh Restaurants', description: 'Vegan restaurants in Edinburgh', keywords: 'edinburgh, scotland, restaurants, vegan edinburgh, edinburgh dining, scottish restaurants', url: 'edinburgh-restaurants.html' }
                ]
            },
            {
                page: 'leeds-restaurants.html',
                title: 'Leeds Restaurants',
                url: 'leeds-restaurants.html',
                content: [
                    { title: 'Leeds Restaurants', description: 'Vegan restaurants in Leeds', keywords: 'leeds, restaurants, vegan leeds, leeds dining, uk restaurants', url: 'leeds-restaurants.html' }
                ]
            },
            {
                page: 'newcastle-restaurants.html',
                title: 'Newcastle Restaurants',
                url: 'newcastle-restaurants.html',
                content: [
                    { title: 'Newcastle Restaurants', description: 'Vegan restaurants in Newcastle', keywords: 'newcastle, restaurants, vegan newcastle, newcastle dining, uk restaurants', url: 'newcastle-restaurants.html' }
                ]
            },
            {
                page: 'york-restaurants.html',
                title: 'York Restaurants',
                url: 'york-restaurants.html',
                content: [
                    { title: 'York Restaurants', description: 'Vegan restaurants in York', keywords: 'york, restaurants, vegan york, york dining, uk restaurants', url: 'york-restaurants.html' }
                ]
            },
            {
                page: 'brighton-restaurants.html',
                title: 'Brighton Restaurants',
                url: 'brighton-restaurants.html',
                content: [
                    { title: 'Brighton Restaurants', description: 'Vegan restaurants in Brighton', keywords: 'brighton, restaurants, vegan brighton, brighton dining, uk restaurants', url: 'brighton-restaurants.html' }
                ]
            },
            {
                page: 'bath-restaurants.html',
                title: 'Bath Restaurants',
                url: 'bath-restaurants.html',
                content: [
                    { title: 'Bath Restaurants', description: 'Vegan restaurants in Bath', keywords: 'bath, restaurants, vegan bath, bath dining, uk restaurants', url: 'bath-restaurants.html' }
                ]
            },

            // Events Page
            {
                page: 'events.html',
                title: 'UK Vegan Events',
                url: 'events.html',
                content: [
                    { title: 'Bournemouth Vegan Festival', description: 'Join The Vegan Events UK Movement - 6 September 2025', keywords: 'bournemouth, festival, september, 2025, events, vegan events' },
                    { title: 'Leicester Vegan Festival', description: 'Join The Vegan Events UK Movement - 13 September 2025', keywords: 'leicester, festival, september, 2025, events, vegan events' },
                    { title: 'Portsmouth Vegan Festival', description: 'Join The Vegan Events UK Movement - 20 September 2025', keywords: 'portsmouth, festival, september, 2025, events, vegan events' },
                    { title: 'Essex Vegan Festival', description: 'Join The Vegan Events UK Movement - 4 October 2025', keywords: 'essex, festival, october, 2025, events, vegan events' },
                    { title: 'Sheffield Vegan Festival', description: 'Join The Vegan Events UK Movement - 12 October 2025', keywords: 'sheffield, festival, october, 2025, events, vegan events' },
                    { title: 'Glasgow Vegan Festival', description: 'Join The Vegan Events UK Movement - 18 October 2025', keywords: 'glasgow, scotland, festival, october, 2025, events, vegan events' },
                    { title: 'Northern Vegan Christmas Festival', description: 'Join The Vegan Events UK Movement - 1 November 2025', keywords: 'manchester, christmas, festival, november, 2025, events, vegan events, xmas' },
                    { title: 'Newcastle Vegan Festival', description: 'Join The Vegan Events UK Movement - 15 November 2025', keywords: 'newcastle, festival, november, 2025, events, vegan events' },
                    { title: 'Edinburgh Vegan Christmas Festival', description: 'Join The Vegan Events UK Movement - 29 November 2025', keywords: 'edinburgh, scotland, christmas, festival, november, 2025, events, vegan events, xmas' },
                    { title: 'Northampton Vegan Festival', description: 'Join The Vegan Events UK Movement - 7 December 2025', keywords: 'northampton, festival, december, 2025, events, vegan events' },
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
                    { title: 'Willow Animal Sanctuary', description: 'Providing sanctuary and care for rescued farm animals', keywords: 'willow, sanctuary, farm animals, rescued' }
                ]
            },

            // Trailblazers Page
            {
                page: 'vegan-trailblazers.html',
                title: 'Vegan Trailblazers',
                url: 'vegan-trailblazers.html',
                content: [
                    { title: 'Donald Watson', description: 'Coined the term "vegan" and founded The Vegan Society in 1944', keywords: 'donald watson, vegan society, founder, 1944' },
                    { title: 'Freya Dinshah', description: 'Founded the American Vegan Society and promoted veganism in the US', keywords: 'freya dinshah, american vegan society, us veganism' },
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
                    { title: 'Kinda Co.', description: 'Artisanal vegan cheese made with traditional methods', keywords: 'kinda co, vegan cheese, artisanal, traditional, dairy-free, plant-based cheese', url: 'https://thekindaco.com/' },
                    { title: 'Tyne Chease', description: 'Handcrafted vegan cheese from the UK', keywords: 'tyne chease, vegan cheese, handcrafted, uk, dairy-free, plant-based', url: 'https://tynechease.com/' },
                    { title: 'Sheese', description: 'Scottish vegan cheese with authentic taste', keywords: 'sheese, vegan cheese, scottish, authentic, dairy-free, plant-based', url: 'https://buteisland.com/' },
                    { title: 'Jay & Joy', description: 'French artisan vegan cheese and dairy products', keywords: 'jay and joy, vegan cheese, french, artisan, dairy-free, plant-based', url: 'https://www.jay-joy.com/' },
                    { title: 'I AM NUT OK', description: 'Nut-based vegan cheese and spreads', keywords: 'i am nut ok, vegan cheese, nut-based, spreads, dairy-free, plant-based', url: 'https://www.iamnutok.com/' },
                    { title: 'Miyoko\'s Creamery', description: 'Artisan vegan cheese and butter', keywords: 'miyokos, vegan cheese, artisan, butter, dairy-free, plant-based', url: 'https://miyokos.com/' }
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
                    results.push({
                        title: item.title,
                        description: item.description,
                        page: page.title,
                        url: item.url || page.url, // Use item-specific URL if available, otherwise use page URL
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
