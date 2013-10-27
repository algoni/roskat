# GeoTrashing

## Demo

Ohjelma voidaan ajaa selaimessa tai käännettynä Phonegapin avulla natiiviksi mobiiliapplikaatioksi. 
Selaimella käytettävä versio on julkaistu [Githubissa](http://algoni.github.io/roskat).

**Huom.** Parhaan testauskokemuksen saat käyttämällä selainta koko näytöllä. Tämä onnistuu esim. 
iOS:n Safarissa käymällä applikaation osoitteessa ja lisäämällä ohjelma Home screenin Safarin valikosta.

## Kehitysympäristö

Globaaleja riippuvuuksia kehitysympäristön ajamiseen sellaisenaan ovat ``node`` ja ``npm``, ``ruby``ja ``compass``, ``grunt`` sekä ``bower``

* Jos node ja ruby on asennettu, rippuvuudet voi asentaa helposti näin: ``npm install -g grunt-cli bower && gem install compass`` 
* Kloonaa repository ja asenna projektikohtaiset riippuvuudet: ``npm install && bower install``
* Gruntissa on oma http-palvelin, jonka saa käyntiin komennolla: ``grunt server``
