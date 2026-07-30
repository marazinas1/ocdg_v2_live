## Tikslas
Kad Lovable dashboard'e OCDG_V2_LIVE kortelė rodytų svetainės nuotrauką, kaip ir kiti projektai.

## Kodėl dabar tuščia
Miniatiūra nėra kodo dalis — Lovable pats padaro published svetainės ekrano nuotrauką po publikavimo. Dabar rodoma sulūžusio paveikslėlio ikona, t. y. nuotrauka neegzistuoja arba nepavyko jos padaryti. Nauja publikacija priverčia ją sugeneruoti iš naujo.

## Žingsniai
1. Patikrinti publikavimo nustatymus (ar projektas viešas — privatus published puslapis rodo login ekraną ir nuotrauka nepavyksta).
2. Patikrinti pradinį puslapį naršyklėje: ar per kelias sekundes užsikrauna hero vaizdas ir turinys, kad ekrano nuotrauka nebūtų tuščia. Jei kas nors lėta ar sulūžę — pataisyti.
3. Patikrinti, kad `public/robots.txt` neblokuoja (anksčiau demo metu buvo `Disallow: /`).
4. Perpublikuoti projektą, kad Lovable padarytų naują ekrano nuotrauką.
5. Palaukti ~1 min ir patvirtinti, kad live puslapis atsidaro; miniatiūra dashboard'e atsinaujina netrukus (gali reikėti perkrauti dashboard).

## Techninės pastabos
- Kodo keitimų greičiausiai nereikės; jei 2 žingsnis parodys, kad pradinis puslapis pirmą sekundę tuščias (turinys krauna iš duomenų bazės), pridėsiu paprastą pataisą, kad hero būtų matomas iš karto.
- `index.html` `noindex` skriptas veikia tik ne-produkcijos hostuose ir ekrano nuotraukų neblokuoja — jo neliesiu.
