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

            <p>Drivers, you rule! You choose where and whom you go with. We want to make trips most effective, that’s why you'll see people who are further away.</p>
            <p>If you have an opportunity, use the function “Deviate from route”. It helps you to cover a large area and assist more people.</p>
            <p>If you get “No results”, please, try expanding the deviation range or try again later.</p>

            <h2>● Direction you're going to is considered</h2>

            <p>We take into account the direction of your trip. If you go from point A to B, you will not see requests in
              the opposite direction. The direction is shown on the map with red arrows.</p>
            <p>Each request is tied to a specific device.</p>

            <p>Your session on freeseat.me is tied to a single device. If you have several devices, each one will have a
              different session. This is made to remove registration procedure and save your time.</p>

            <h2>● Requests are active for 24 hours after your last visit.</h2>

            <p>Your ticket will be automatically deleted in 24 hours after it was created. BUT, if you return to
              freeseat.me from the same device before this time expires, your ticket will be extended for another 24
              hours. This can be repeated as many times as needed to find the transport.</p>

            <h2>● Don’t forget to inform us if you have found the transport</h2>

            <p>If you’ve found a driver, let us know by clicking "Transport found" and confirm your choice. Or delete your
              ticket if it is no longer relevant. This way, you will help us keep the data up-to-date and you will not
              receive calls from other drivers.</p>

            <h2>● Chance to find a regular passenger car is bigger</h2>

            <p>If you are looking for a transport for a large group of people, create several ticketsfor groups of 3-4
              people (regular car capacity), instead of creating one request for 20 people.</p>

            <p>If you create a request with big number of people or big amount of luggage, only truck/bus drivers will see
              you.</p>

            <h2>● Choose language to save time</h2>

            <p>Drivers will only see requests with their language. You can select multiple languages.</p>

            <h2>● Map markers</h2>

            <p>There is no need to pinpoint specific street address. It will be sufficient to select your approximate
              destination, then you can tell the driver where you would like to go to specifically.</p>

            <p>You can click "location" button in the bottom right corner of the map to select your current location.</p>
          </>
        }{
          lang === 'de' && <>
            <h1>Wie benutzt man freeseat.me?</h1>

            <h2>● Kurz und knapp für Autofahrer</h2>

            <p>Autofahrer, ihr habt das Sagen! Sie entscheiden, wo und mit wem Sie fahren. Wir wollen die Fahrten so effektiv wie möglich gestalten, deshalb siehst du auch Leute, die weiter weg sind.</p>
            <p>Wenn Sie die Möglichkeit haben, nutzen Sie die Funktion "Von der Route abweichen". Sie hilft Ihnen, ein großes Gebiet abzudecken und mehr Menschen zu helfen.</p>
            <p>Wenn Sie "Keine Ergebnisse" erhalten, versuchen Sie bitte, den Abweichungsbereich zu erweitern oder es später erneut zu versuchen.</p>

            <h2>● Die Richtung, in die Sie gehen, wird berücksichtigt</h2>

            <p>Wir berücksichtigen die Richtung Ihrer Reise. Wenn Sie von Punkt A nach B fahren, werden Sie keine Anfragen in der Gegenrichtung sehen. Die Richtung wird auf der Karte mit roten Pfeilen angezeigt.
              Jede Anfrage ist an ein bestimmtes Gerät gebunden.</p>
            <p>Ihre Sitzung auf freeseat.me ist an ein einziges Gerät gebunden. Wenn Sie mehrere Geräte haben, hat jedes Gerät eine andere Sitzung. Dies dient dazu, das Registrierungsverfahren abzuschaffen und Ihre Zeit zu sparen.</p>

            <h2>● Anfragen sind 24 Stunden nach Ihrem letzten Besuch aktiv.</h2>

            <p>Ihr Ticket wird automatisch innerhalb von 24 Stunden nach seiner Erstellung gelöscht. ABER, wenn Sie freeseat.me von demselben Gerät aus erneut besuchen, bevor diese Zeit abläuft, wird Ihr Ticket um weitere 24 Stunden verlängert. Dies kann so oft wiederholt werden, wie es nötig ist, um den Transport zu finden.</p>

            <h2>● Vergessen Sie nicht, uns zu informieren, wenn Sie den Transport gefunden haben</h2>

            <p>Wenn Sie einen Fahrer gefunden haben, informieren Sie uns, indem Sie auf "Transport gefunden" klicken und Ihre Wahl bestätigen. Oder löschen Sie Ihr Ticket, wenn es nicht mehr relevant ist. Auf diese Weise helfen Sie uns, die Daten auf dem neuesten Stand zu halten, und Sie erhalten keine Anrufe von anderen Fahrern.</p>

            <h2>● Die Chance, einen regulären Pkw zu finden, ist größer</h2>

            <p>Wenn Sie einen Transport für eine große Gruppe von Personen suchen, erstellen Sie mehrere Tickets für Gruppen von 3 bis 4 Personen (reguläre Pkw-Kapazität), anstatt eine Anfrage für 20 Personen zu erstellen.</p>

            <p>Wenn Sie eine Anfrage mit einer großen Anzahl von Personen oder einer großen Menge an Gepäck erstellen, werden Sie nur von LKW-/Busfahrern gesehen.</p>

            <h2>● Wählen Sie eine Sprache, um Zeit zu sparen</h2>

            <p>Die Fahrer sehen nur Anfragen in ihrer Sprache. Sie können mehrere Sprachen auswählen.</p>

            <h2>● Kartenmarkierungen</h2>

            <p>Es ist nicht notwendig, eine bestimmte Adresse anzugeben. Es reicht aus, wenn Sie Ihr ungefähres Ziel auswählen, dann können Sie dem Fahrer sagen, wohin Sie genau fahren möchten.</p>

            <p>Sie können auf die Schaltfläche "Standort" in der unteren rechten Ecke der Karte klicken, um Ihren aktuellen Standort auszuwählen.</p>
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
          lang === 'uk' && <>
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
