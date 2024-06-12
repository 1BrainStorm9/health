# Анотация
Настоящий документ является руководством пользователя по эксплуатации HealthApp.
В данном руководстве приводится следующая информация:
• подготовка к работе
• описание операций
• аварийные случаи
• рекомендации по освоению
• термины и сокращения

Настоящий документ разработан в соответствии с ГОСТ 34 РД 50-34.698-90 «Автоматизированные системы. Требования к содержанию документов» — в части структуры и содержания документов, и в соответствии с ГОСТ 19 «Единая система программной документации (ЕСПД)» — в части общих требований и правил оформления программных документов.
------------------------------------------------------------------------------------------
# Введение
Информационная система организации правильного питания может быть применена в различных сферах.
Для личных и семейных нужд, эта система представляет собой важный инструмент для людей, стремящихся к здоровому питанию. Она помогает пользователям подбирать и заказывать сбалансированные блюда, соответствующие их диетическим требованиям и предпочтениям. Семьи могут использовать эту систему для планирования здорового рациона для всех членов семьи, что способствует поддержанию здорового образа жизни и экономии времени на составление меню и приготовление пищи.
В сфере ресторанов и сервисов доставки еды, такая система может значительно расширить спектр услуг. Рестораны и службы доставки могут предложить клиентам широкий ассортимент здоровых и сбалансированных блюд, что позволит им привлекать новую аудиторию, заинтересованную в правильном питании. Система упрощает процесс заказа и доставки, обеспечивая клиентам удобный доступ к полезным и разнообразным вариантам питания. Это способствует не только улучшению сервиса, но и поддержке общественного здоровья.
------------------------------------------------------------------------------------------
# Назначение и условия применения 
Разработанная информационная система организации правильного питания предназначена для автоматизации следующих видов деятельности и функций:
1. Планирование и подбор рациона питания:
  • Автоматизированный подбор сбалансированных блюд на основе калорийности, диетических предпочтений и потребностей пользователя.
  • Создание персонализированных планов питания для различных целей (похудение, поддержание веса, набор массы).
2. Оформление и управление заказами:
  <ol><li>• Удобное оформление заказов на доставку выбранных блюд через мобильное приложение.</li>
  <li>• Управление историей заказов и отслеживание статуса текущих заказов.</li></ol>
Для обеспечения корректного применения средства автоматизации в соответствии с его назначением необходимо выполнение следующих условий:
1. Конфигурация технических средств:
  • Наличие смартфона или планшета с операционной системой Android (версия 5.0 и выше) или iOS (версия 11.0 и выше).
  • Минимальные технические характеристики устройства: процессор с тактовой частотой не менее 1 ГГц, оперативная память не менее 1 ГБ, свободное место на устройстве не менее 100 МБ.
2. Операционная среда и общесистемные программные средства:
  • Установленное мобильное приложение, доступное для загрузки из официальных магазинов приложений (Google Play, App Store).
  • Доступ к сети Интернет для загрузки и обновления данных, а также для оформления заказов.
------------------------------------------------------------------------------------------
# Установка
- [ ] Скачиванеи приложения
- [ ] Установка приложения
- [ ] Открытие приложения
- [ ] Настройка
------------------------------------------------------------------------------------------
# Описание операций
Наименование: Просмотр готового рациона питания.
Условия :
  • Приложение должно быть установлено на устройстве. 
  • У пользователя должен быть личный аккаунт в приложении.
  • Устройство должно быть включено и находится в рабочем состоянии.
Подготовительные действия: Открыть приложение на устройстве.
Основные действия в требуемой последовательности:
  • Выбрать план питания
  • Добавить в корзину 
  • Оформить заказ
Заключительные действия: В списке заказов отобразится статус заказа и время доставки.
Ресурсы, расходуемые на операцию: Время и заряд мобильного устройства.

Исходный код для операции: 

    ```
    export const getPlansData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "plan"));
        let data = [];
        querySnapshot.forEach((doc) => {
            const docData = {
                ...doc.data(),
                docId: doc.id
            }
            data.push(docData);
        });

        let arr = []

        for (const item of data) {
            let result = {};
            const recipeDataPromises = item.recipesId.map(async (recipeRef) => {
                const respData = await getDoc(recipeRef);
                return respData.data();
            });

            const recipeData = await Promise.all(recipeDataPromises);

            result.background = item.background;
            result.calories = item.calories;
            result.meals = item.meals;
            result.id = item.id;
            result.price  = item.price ;
            result.title = item.title;
            result.planId = item.docId;

            result.recipesId = await transformRecipeData(recipeData);

            arr.push(result);
        }

        return arr;
    } catch (error) {
        console.error("Ошибка получения документов: ", error);
    }}; 
    ```

------------------------------------------------------------------------------------------
# Термины и сокращения
| **Термин** | **Полная форма** | **Описание** |
| ---------- | ---------------- | ------------ |
| **APK**    | (Android Package Kit) | Это формат файлов для установки приложений на устройства с операционной системой Android. |
| **UI**     | (User Interface) | Это интерфейс пользователя, то есть то, через что пользователь взаимодействует с программным обеспечением или устройством. |
