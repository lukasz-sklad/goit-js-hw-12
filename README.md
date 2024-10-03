# goit-js-hw-12
### Zadanie domowe nr 12

Gratulacje! Jesteś już prawie na mecie 💪

Czas na podsumowanie, w którym zastanowisz się nad tym, co Ci się udało osiągnąć w module 12.

Upewnij się, że dobrze orientujesz się w tematach takich jak:

* składnia async/await
* obsługa błędów
* paginacja
* parametry żądania podczas pracy z paginacją
* używanie opcji “Pokaż więcej” (”Fetch more posts”)

Czas wykorzystać tę wiedzę w praktyce i dokończyć projekt aplikacji do wyszukiwania obrazów.

Zadanie domowe nr 12

* Utwórz repozytorium `goit-js-hw-12`
* Zbuduj projekt, korzystając z [Vite](https://vitejs.dev/). Przygotowaliśmy dla Ciebie [wstępnie skonfigurowany szablon](https://github.com/goitacademy/vanilla-app-template) z niezbędnymi ustawieniami przyszłego projektu, dlatego zalecamy z niego skorzystać.
* Jeśli chodzi o żądania HTTP, należy korzystać z biblioteki [Axios](https://axios-http.com/).
* Używaj składni `async/await`.
* Przeczytaj zadanie i wykonaj je w edytorze kodu.
* `Prettier` pomoże Ci upewnić się, że kod jest poprawnie sformatowany i nie zawiera żadnych błędów wyświetlanych jako ostrzeżenia w konsoli po uruchomieniu strony.
* Przekaż pracę domową do sprawdzenia.

__Sposób przekazania pracy domowej:__ Praca domowa zawiera dwa linki: do plików źródłowych i działającej strony na `GitHub Pages`.

<pre>
! Używaj tej <a href="https://www.figma.com/file/m8k9NQV7qZrtYDCvxfD68B/%D0%94%D0%97-JavaScript?type=design&amp;node-id=3-1010&amp;mode=design&amp;t=eCh8cUwdfWOakuAr-0" rel="noopener noreferrer" target="_blank">makiety</a> podczas wykonywania zadań domowych.
</pre>

Zadanie __— Wyszukiwanie obrazów__

Wykorzystaj kod z pracy domowej do poprzedniego modułu, dodając nową funkcjonalność do kodu aplikacji będącej wyszukiwarką obrazów.

Refaktoryzacja

Dodaj do projektu bibliotekę [Axios](https://axios-http.com/), z której będziesz korzystać w celu obsługi żądań HTTP. Zrefaktoryzuj projekt, zastępując funkcje `fetch`.

Użyj składni `async/await` do obsługi żądań asynchronicznych. Przeprowadź refaktoryzację kodu.



Paginacja

Interfejs API Pixabay obsługuje paginację i wykorzystuje parametry `page` i `per_page`. Upewnij się, że każdy wynik wyszukiwania obrazów obejmuje 40 obiektów (domyślnie 20).

* Początkowa wartość parametru `page` powinna być równa `1`.
* Z każdym kolejnym żądaniem wartość ta powinna być zwiększana o `1`.
* W przypadku wyszukiwania przy użyciu nowego słowa kluczowego wartość `page` powinna zostać przywrócona do wartości początkowej, ponieważ zostanie wykonana paginacja dla nowego zbioru obrazów.


W dokumencie HTML pod galerią dodaj przycisk z tekstem `Load more`, który umożliwi pobranie i wyświetlenie kolejnej porcji obrazów, dodając je do załadowanych wcześniej elementów galerii. W tym celu przy wysyłaniu formularza należy zapisywać dane wprowadzone przez użytkownika w zmiennej globalnej.

* Dopóki w galerii nie ma żadnych obrazów, przycisk powinien być ukryty.
* Gdy w galerii będą wyświetlone obrazy, przycisk pojawi się w interfejsie pod galerią.
* Przy ponownym przesłaniu formularza przycisk jest najpierw ukryty, a następnie pojawia się ponownie po otrzymaniu wyników żądania.
* Przesuń wskaźnik ładowania pod przycisk pobierania kolejnych obrazów.

Obejrzyj film demonstracyjny aplikacji na tym etapie:

[![12](https://filedn.eu/lPq6O1K7j8DR1n7JwTuYjYz/img/warsztaty/video12-1.jpg)](https://goitlmsstorage.b-cdn.net/4583329d-d19f-46f7-8e6a-ff429a952bf0HW%2012%20vid%201.mp4)

Koniec zbioru

W odpowiedzi na żądanie back-end zwraca właściwość `totalHits`, tj. całkowitą liczbę obrazów spełniających kryterium wyszukiwania (w przypadku darmowego konta). Jeśli użytkownik dotarł do końca zbioru, przycisk `Load more` powinien zostać ukryty. Ponadto należy wyświetlić komunikat `"We're sorry, but you've reached the end of search results."`.

Obejrzyj film demonstracyjny aplikacji na tym etapie: 

[![12](https://filedn.eu/lPq6O1K7j8DR1n7JwTuYjYz/img/warsztaty/video12-2.jpg)](https://goitlmsstorage.b-cdn.net/d13794ef-2e1b-47b3-afaa-d65369281134HW%2012%20vid%202.mp4)

Przewijanie strony

Zadbaj o płynne przewijanie strony po wysłaniu żądania i wyświetleniu każdej kolejnej porcji obrazów. W tym celu należy pobrać wysokość jednego elementu galerii w kodzie za pomocą funkcji [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). Następnie użyj metody [window.scrollBy](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy), aby przewinąć stronę o dwie wysokości elementu galerii.

Obejrzyj film demonstracyjny aplikacji na tym etapie:

[![12](https://filedn.eu/lPq6O1K7j8DR1n7JwTuYjYz/img/warsztaty/video12-2.jpg)](https://goitlmsstorage.b-cdn.net/bb7e9de3-1302-47f5-b070-6f757a06cc00HW%2012%20vid%203.mp4)

Na co mentor będzie zwracał uwagę podczas sprawdzania pracy domowej:

* Praca domowa zawiera dwa linki: do plików źródłowych i strony udostępnionej na `GitHub Pages`.
* Projekt jest zbudowany przy użyciu [Vite](https://vitejs.dev/).
* W konsoli w narzędziach deweloperskich nie ma żadnych błędów, ostrzeżeń ani funkcji wypisujących dane (`console.log`).
* Elementy na stronie są zgodne z makietą (lub mają style niestandardowe).
* Projekt zawiera kod z poprzedniego zadania domowego.
* Wszystkie żądania asynchroniczne są zrefaktoryzowane i zaimplementowane przy użyciu składni `async/await`.
* Dla każdego żądania zwracanych jest nie więcej niż 20 elementów.
* Nowe obrazy są dodawane do struktury DOM w ramach jednej operacji.
* Pod galerią znajduje się przycisk `Load more`, który wysyła żądanie kolejnej strony (czyli porcji obrazów).
* Po tym, jak nowe elementy zostaną dodane do listy obrazów w instancji `SimpleLightbox`, wywoływana jest metoda `refresh()`.
* Gdy użytkownik pobierze ostatnie dostępne wyniki dla wybranego słowa kluczowego, czyli nie będzie już nic do pobrania, przycisk `Load more` zniknie i pojawi się odpowiedni komunikat.
* Przy każdym kolejnym przesłaniu formularza numer strony jest resetowany do wartości domyślnej (`1`), a wyniki poprzednich żądań znikają.
* Kliknięcie małego obrazka w galerii otwiera jego powiększoną wersję w oknie modalnym przy użyciu biblioteki `SimpleLightbox`.

https://github.com/lukasz-sklad/goit-js-hw-12/
https://lukasz-sklad.github.io/goit-js-hw-12/