export const plans = [
    {
        id: '1',
        title: 'План для гурманов',
        recipesId : ['1','3'],
        calories: '2400 ккал',
        meals: '3 приема пищи',
        price: 1800,
        background: 'https://www.recipetineats.com/wp-content/uploads/2016/08/Paella-8.jpg',
    },
    {
        id: '2',
        title: 'План для фитнеса',
        recipesId : ['1','2','3'],
        calories: '2000 ккал',
        meals: '4 приема пищи',
        price: 1600,
        background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC35kM3BaJC2jqgJu97HLOsdX5FYOnje0marMaCnwk8w&s',
    },
    {
        id: '3',
        title: 'План для здоровья',
        recipesId : ['4','2'],
        calories: '1800 ккал',
        meals: '5 приемов пищи',
        price: 1500,
        background: 'https://shireenanwer.com/wp-content/uploads/2022/11/Untitled-design-3-13.png',
    },
    {
        id: '4',
        title: 'План для активных',
        recipesId : ['3','4'],
        calories: '2200 ккал',
        meals: '3 приема пищи',
        price: 1700,
        background: 'https://i0.wp.com/spainonafork.com/wp-content/uploads/2018/02/paella3-11.png?fit=750%2C750&ssl=1',
    },
    {
        id: '5',
        title: 'План для энергии',
        recipesId : ['2','5'],
        calories: '2600 ккал',
        meals: '4 приема пищи',
        price: 1900,
        background: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6561d10cbfa8910d18bf7ca7_6561d11ab5db0d479f2ce105/scale_1200',
    },
];


export const recipes = [
    {
        id: '1',
        title: 'Испанская Паэлья',
        ingredients: 'Оливковое масло экстра-класса, лук, болгарский перец, чеснок, помидоры рома, лавровый лист, паприка, нити шафрана, соль и перец, белое вино, куриные бедра без костей, петрушка, испанский рис, куриный бульон, замороженный горошек, крупные креветки, мидии, кольца кальмаров, лимоны',
        calories: '535',
        weight: '200 г',
        image: 'https://www.recipetineats.com/wp-content/uploads/2016/08/Paella-8.jpg',
        description: 'Традиционное испанское блюдо из риса, родом из Валенсии. Паэлья готовится с разнообразными ингредиентами, такими как морепродукты, курица и овощи.',
        proteins: '25 г',
        fats: '20 г',
        carbs: '55 г',
        recipe: 'Нагрейте масло в большой сковороде. Обжарьте лук, болгарский перец и чеснок. Добавьте помидоры, лавровый лист, паприку и шафран. Положите курицу, готовьте до коричневого цвета. Добавьте рис, бульон и тушите. Добавьте морепродукты, горошек и готовьте до готовности. Украсьте петрушкой и лимоном.',
    },
    {
        id: '2',
        title: 'Палак Панир',
        ingredients: 'Шпинат, панир, помидоры, лук, чеснок, имбирь, зеленый перец, гарам масала, семена тмина, куркума, соль, масло',
        calories: '310 ккал',
        weight: '250 г',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC35kM3BaJC2jqgJu97HLOsdX5FYOnje0marMaCnwk8w&s',
        description: 'Палак Панир — это вегетарианское индийское блюдо, состоящее из панира (индийский сыр) в густой пасте из пюре из шпината, приправленное чесноком, гарам масала и другими специями.',
        proteins: '15 г',
        fats: '20 г',
        carbs: '25 г',
        recipe: 'Бланшируйте шпинат и сделайте пасту. Обжарьте лук, чеснок, имбирь и перец. Добавьте помидоры и специи, готовьте до мягкости. Добавьте пасту из шпината и панир. Тушите, пока панир не приготовится.',
    },
    {
        id: '3',
        title: 'Маттар Панир',
        ingredients: 'Панир, горошек, помидоры, лук, имбирь, чеснок, семена тмина, кориандр молотый, гарам масала, куркума, соль, масло',
        calories: '280 ккал',
        weight: '220 г',
        image: 'https://shireenanwer.com/wp-content/uploads/2022/11/Untitled-design-3-13.png',
        description: 'Маттар Панир — это вегетарианское блюдо северной Индии, состоящее из горошка и панира в томатном соусе, приправленное гарам масала.',
        proteins: '13 г',
        fats: '18 г',
        carbs: '22 г',
        recipe: 'Обжарьте лук, имбирь и чеснок. Добавьте помидоры и специи, готовьте до мягкости. Добавьте горошек и панир. Тушите до готовности горошка и панира.',
    },
    {
        id: '4',
        title: 'Раджма Масала',
        ingredients: 'Красная фасоль, лук, помидоры, имбирь, чеснок, зеленый перец, семена тмина, кориандр молотый, гарам масала, куркума, соль, масло',
        calories: '240 ккал',
        weight: '300 г',
        image: 'https://i0.wp.com/spainonafork.com/wp-content/uploads/2018/02/paella3-11.png?fit=750%2C750&ssl=1',
        description: 'Раджма Масала — это популярное индийское вегетарианское блюдо, состоящее из красной фасоли в густом томатном соусе.',
        proteins: '12 г',
        fats: '10 г',
        carbs: '35 г',
        recipe: 'Замочите фасоль на ночь. Варите фасоль до готовности. Обжарьте лук, имбирь, чеснок и перец. Добавьте помидоры и специи, готовьте до мягкости. Добавьте фасоль и тушите до объединения вкусов.',
    },
    {
        id: '5',
        title: 'Таиландский салат с креветками',
        ingredients: 'Креветки, манго, авокадо, кинза, мятный лист, кунжут, кешью, соус нам пла, соус рыбный, лайм, чили',
        calories: '320 ккал',
        weight: '250 г',
        image: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6561d10cbfa8910d18bf7ca7_6561d11ab5db0d479f2ce105/scale_1200',
        description: 'Свежий и ароматный таиландский салат с креветками, манго и авокадо. Богатый вкус, насыщенный аромат и полезные ингредиенты сделают ваш обед незабываемым.',
        proteins: '20 г',
        fats: '15 г',
        carbs: '30 г',
        recipe: 'Обжарьте креветки. Нарежьте манго, авокадо и свежие травы. Смешайте все ингредиенты в большой миске. Добавьте соус нам пла, соус рыбный, сок лайма и нарезанный чили. Подавайте, украсив кунжутом и кешью.'
    },
];

export let fakeOrders = [

];
