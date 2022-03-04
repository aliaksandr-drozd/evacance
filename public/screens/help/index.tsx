import React, { FC } from 'react'
import { Button, Card, Popup, Space } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { useLocalStorage } from '../../common/hooks'
import { DEFAULT_APP_LANGUAGE, HELP_LOCALSTORAGE_KEY, LANGUAGE_LOCALSTORAGE_KEY } from '../../common/consts'
import { LanguageSwitch } from '../../common/components'
import styles from './styles.module.less'


export const HelpScreen: FC = () => {
  const [lang] = useLocalStorage(LANGUAGE_LOCALSTORAGE_KEY, DEFAULT_APP_LANGUAGE)
  const [isHelpVisible, setIsHelpVisible] = useLocalStorage(HELP_LOCALSTORAGE_KEY, false)
  const { t } = useTranslation()

  return (
    <Popup
      visible={ isHelpVisible }
      position="bottom"
      bodyStyle={{ minHeight: '80vh' }}
      destroyOnClose={ true }
      className={ styles.container }
    >
      <Card>
        <LanguageSwitch />
      </Card>
      <Card>
        {
          lang === 'ru' && <>
            <h1>Как использовать freeseat.me?</h1>
            <h2>● Коротко для водителей</h2>
            <p>Водители, вы рулите! Вы выбираете, куда ехать и кого везти. Мы хотим сделать поездку максимально эффективной, поэтому первыми покажем тех, кому ехать дальше всего.</p>
            <p>Если у вас есть возможность, воспользуйтесь функцией “отклонение от маршрута” (бегунок, расположенный под картой). Она позволит охватить большую область для перевозки и увеличит количество кандидатов для поездки.</p>
            <p>Если по вашему поиску ничего не найдено, пожалуйста, попробуйте расширить радиус отклонения или обязательно вернитесь позже.</p>

            <h2>● Направление имеет значение</h2>
            <p>Мы учитываем направление вашей поездки. Водителю, который едет из пункта А в пункт Б, не будут отображаться заявки в обратном направлении. Направление отображается на карте красными стрелочками.</p>

            <h2>● Ваша заявка привязана к одному браузеру</h2>
            <p>Ваш аккаунт на freeseat.me привязан к браузеру на том устройстве, с которого вы использовали наш сервис. Если у вас несколько устройств, то ваши заявки будут видны только там, где вы их создавали. Другое устройство = другой аккаунт. На этот шаг пришлось пойти для сокращения времени разработки.</p>

            <h2>● Доступ к заявке 24 часа</h2>
            <p>Ваша заявка будет автоматически удалена через 24 часа после ее создания. НО, если вы зайдете на сайт freeseat.me с того же устройства и браузера до истечения этого времени - ваша заявка будет продлена на следующие 24 часа. Это можно повторять столько раз, сколько будет необходимо для поиска транспорта. Таким образом заявки всегда будут актуальными.</p>

            <h2>Не забудьте сообщить, если вы уже нашли транспорт</h2>
            <p>Если вы нашли водителя, сообщите нам об этом, кликнув “Транспорт найден” и подтвердите ваш выбор. Или удалите свою заявку, если она больше не актуальна.  Таким образом вы поможете нам сохранить актуальность данных и будете освобождены от звонков водителей, желающих вам помочь.</p>

            <h2>● Вероятность найти легковую машину больше</h2>
            <p>Если вы ищете транспорт для большой группы людей, создайте несколько заявок, в каждой из которых укажите по 3-4 человека (вместимость легкового авто), вместо того, чтобы создавать одну заявку на 20 человек.</p>
            <p>Если вы отметили большое количество человек или большое количество багажа, вас увидят только водители на грузовиках/автобусах.</p>

            <h2>● Выбирайте язык, чтобы экономить время</h2>
            <p>В результатах поиска водителя будут отображаться только те заявки, языки которых совпадают с его запросом. У вас есть возможность выбрать несколько языков.</p>

            <h2>● Маркеры на карте</h2>
            <p>Нет необходимости в том, чтобы точно попадать маркером на карте в какой-то определенный дом или улицу, куда вам необходимо попасть. Будет достаточно бросить маркер в примерный центр нужного населенного пункта, а о поездке в какую-то конкретную точку вы сможете договариться с водителем.</p>
            <p>Чтобы водитель забрал вас из вашего текущего местоположения, при выборе маршрута нажмите на Кнопку локации и красный маркер переместиться в нужную точку.</p>
          </>
        }
        {
          lang === 'en' && <>
            <h1>How to use freeseat.me?</h1>

            <h2>● Briefly for drivers</h2>
            <p>Drivers, you rule! You choose where and with whom you will go. We want to make a trip most effective, that’s why firstly show you someone, who goes farthest.</p>
            <p>If you have an opportunity, use the function “Deviate from route” (runner unde the map). It helps you to cover a large area and increase the quantity of people for the trip.</p>
            <p>If you have “No results”, please, try to expand the radius of deviation or try again later.</p>

            <h2>● Direction has matter</h2>
            <p>We take into account the direction of your trip. If you go from point A to B, you will not see the tickets in the opposite direction. The direction is shown on the map with red arrows.</p>

            <h2>Your ticket is connected with one browser</h2>
            <p>Your account on freeseat.me is linked to one browser and one device from which you used our service. If you have several devices, your tickets will only be visible where you created them. Other device = other account. This step had to be taken to reduce development time.</p>

            <h2>● Access to ticket in 24 hours</h2>
            <p>Your ticket will be automatically deleted in 24 hours after it was created. BUT, if you return to freeseat.me from the same device and browser before this time expires, your ticket will be extended for another 24 hours. This can be repeated as many times as needed to find the transport. Thus, tickets will always be up-to-date.</p>

            <h2>● Don’t forget to inform if you found the transport</h2>
            <p>If you’ve found a driver, let us know by clicking "Transport Found" and confirm your choice. Or delete your ticket if it is no longer relevant. In this way, you will help us keep the data up-to-date and will be freed from calls from drivers who want to help you.</p>

            <h2>● More likely to find a regular passenger car</h2>
            <p>If you are looking for transportation for a large group of people, create several tickets, each of which indicate 3-4 people (car capacity), instead of creating one request for 20 people.</p>
            <p>If you have tagged a large number of people or a large amount of luggage, only truck/bus drivers will see you.</p>

            <h2>● Choose language to keep time</h2>
            <p>Driver search results will display only those tickets whose languages match his request. You have the option to select multiple languages.</p>

            <h2>● Map markers</h2>
            <p>There is no need to accurately hit the marker on the map in a specific house or street where you need to go. It will be enough to put a marker in the approximate center of the desired locality, and you can negotiate with the driver about a trip to a specific point.</p>
            <p>You should click on “Location button” to help a driver to pick you up from your current location (the red marker will move to the desired point).</p>

          </>
        }
        {
          lang === 'pl' && <>
            <h1>Jak korzystać freeseat.me?</h1>

            <h2>● Krótko dla kierowców</h2>
            <p>Kierowcy, kierujecie! Wybierasz, gdzie jechać i kogo zabrać. Chcemy, aby podróż była jak najbardziej efektywna, dlatego jako pierwsi pokażemy tych, do których należy jechać najdalej.</p>
            <p>Jeśli masz taką możliwość, skorzystaj z funkcji "odchylenie od trasy" (suwak znajdujący się pod mapą). Pozwoli to objąć większy obszar transportu i zwiększy liczbę kandydatów do podróży.</p>
            <p>Jeśli nic nie zostanie znalezione w Twoim wyszukiwaniu, spróbuj rozszerzyć promień odchylenia lub pamiętaj, aby wrócić później.</p>

            <h2>● Kierunek ma znaczenie</h2>
            <p>Bierzemy pod uwagę kierunek podróży. Kierowca jadący z punktu A do punktu B nie będzie wyświetlał ofert w przeciwnym kierunku. Kierunek jest wyświetlany na mapie czerwonymi strzałkami.</p>

            <h2>● Twoja aplikacja jest powiązana z jedną przeglądarką</h2>
            <p>Twoje konto na freeseat.me powiązany z przeglądarką na urządzeniu, z którego korzystałeś z naszej usługi. Jeśli masz wiele urządzeń, Twoje aplikacje będą widoczne tylko tam, gdzie je utworzyłeś. Inne urządzenie = inne konto. Ten krok musiał zostać podjęty w celu skrócenia czasu rozwoju.</p>

            <h2>● Dostęp do aplikacji 24 godziny</h2>
            <p>Twoje zgłoszenie zostanie automatycznie usunięte 24 godziny po jego utworzeniu. Ale jeśli wejdziesz na stronę freeseat.me z tego samego urządzenia i przeglądarki przed upływem tego czasu-aplikacja zostanie przedłużona o następne 24 godziny. Można to powtórzyć tyle razy, ile będzie to konieczne do znalezienia transportu. W ten sposób aplikacje będą zawsze aktualne.</p>

            <h2>● Nie zapomnij poinformować, jeśli już znalazłeś transport</h2>
            <p>Jeśli znalazłeś kierowcę, daj nam znać, klikając "znaleziono Transport" i potwierdź swój wybór. Lub usuń aplikację, jeśli nie jest już aktualna. W ten sposób pomożesz nam zachować aktualność danych i będziesz zwolniony z wezwań kierowców, którzy chcą Ci pomóc.</p>

            <h2>● Prawdopodobieństwo znalezienia samochodu osobowego jest większe</h2>
            <p>Jeśli szukasz transportu dla dużej grupy osób, utwórz kilka aplikacji, z których każda zawiera 3-4 osoby (pojemność samochodu osobowego), zamiast tworzyć jedną aplikację dla 20 osób.</p>
            <p>Jeśli oznaczyłeś dużą liczbę osób lub dużą ilość bagażu, zobaczysz tylko kierowców ciężarówek/autobusów.</p>

            <h2>● Wybierz język, aby zaoszczędzić czas</h2>
            <p>W wynikach wyszukiwania kierowcy będą wyświetlane tylko te oferty, których języki są zgodne z jego zapytaniem. Masz możliwość wyboru wielu języków.</p>

            <h2>● Znaczniki na mapie</h2>
            <p>Nie ma potrzeby dokładnego trafienia znacznikiem na mapie do określonego domu lub ulicy, do której musisz się dostać. Wystarczy rzucić znacznik w przybliżonym centrum żądanej miejscowości, a podróż do określonego punktu będzie w stanie negocjować z kierowcą.</p>
            <p>Aby kierowca zabrał cię z bieżącej lokalizacji, Po wybraniu trasy naciśnij przycisk lokalizacji i czerwony znacznik, aby przejść do żądanego punktu.</p>
          </>
        }
        {
          lang === 'ua' && <>
            <h1>Як використовувати freeseat.me?</h1>

            <h2>● Коротко для водіїв</h2>
            <p>Водії, ви керуєте! Ви вибираєте, куди їхати і кого везти. Ми хочемо зробити поїздку максимально ефективною, тому першими покажемо тих, кому їхати найдалі.</p>
            <p>Якщо у вас є можливість, скористайтеся функцією" відхилення від маршруту " (бігунок, розташований під картою). Вона дозволить охопити велику область для перевезення і збільшить кількість кандидатів для поїздки.</p>
            <p>Якщо на ваш пошук нічого не знайдено, будь ласка, спробуйте розширити радіус відхилення або обов'язково поверніться пізніше.</p>

            <h2>● Напрямок має значення</h2>
            <p>Ми враховуємо напрямок вашої поїздки. Водієві, який їде з пункту а в пункт Б, не будуть відображатися заявки в зворотному напрямку. Напрямок відображається на карті червоними стрілочками.</p>

            <h2>● Ваша заявка прив'язана до одного браузеру</h2>
            <p>Ваш аккаунт на freeseat.me прив'язаний до браузеру на тому пристрої, з якого ви використовували наш сервіс. Якщо у вас кілька пристроїв, то ваші заявки будуть видні тільки там, де ви їх створювали. Інший пристрій = інший обліковий запис. На цей крок довелося піти для скорочення часу розробки.</p>

            <h2>● Доступ до заявки 24 години</h2>
            <p>Ваша заявка буде автоматично видалена через 24 години після її створення. Але, якщо ви зайдете на сайт freeseat.me з того ж пристрою і браузера до закінчення цього часу - ваша заявка буде продовжена на наступні 24 години. Це можна повторювати стільки разів, скільки буде необхідно для пошуку транспорту. Таким чином заявки завжди будуть актуальними.</p>

            <h2>● Не забудьте повідомити, якщо ви вже знайшли транспорт</h2>
            <p>Якщо ви знайшли водія, повідомте нам про це, клікнувши "Транспорт знайдений" і підтвердіть ваш вибір. Або видаліть свою заявку, якщо вона більше не актуальна. Таким чином ви допоможете нам зберегти актуальність даних і будете звільнені від дзвінків водіїв, які бажають вам допомогти.</p>

            <h2>● Імовірність знайти легкову машину більше</h2>
            <p>Якщо ви шукаєте транспорт для великої групи людей, створіть кілька заявок, в кожній з яких вкажіть по 3-4 людини (місткість легкового авто), замість того, щоб створювати одну заявку на 20 осіб.</p>
            <p>Якщо ви відзначили велику кількість людей або велику кількість багажу, вас побачать тільки водії на вантажівках/автобусах.</p>

            <h2>● Вибирайте мову, щоб економити час</h2>
            <p>У результатах пошуку водія будуть відображатися тільки ті заявки, мови яких збігаються з його запитом. У вас є можливість вибрати кілька мов.</p>

            <h2>● Маркери на карті</h2>
            <p>Немає необхідності в тому, щоб точно потрапляти маркером на карті в якийсь певний будинок або вулицю, куди вам необхідно потрапити. Буде досить кинути маркер в приблизний центр потрібного населеного пункту, а про поїздку в якусь конкретну точку ви зможете домовитися з водієм.</p>
            <p>Щоб водій забрав вас з вашого поточного місця розташування, при виборі маршруту натисніть на Кнопку локації і червоний маркер переміститися в потрібну точку.</p>
          </>
        }
      </Card>
      <Card>
        <Space>
          <Button
            color="primary"
            onClick={ () => setIsHelpVisible(false) }
          >
            { t('accept') }
          </Button>
        </Space>
      </Card>
    </Popup>
  )
}
