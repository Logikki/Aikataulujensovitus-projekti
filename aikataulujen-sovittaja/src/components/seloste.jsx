import React from "react";

const seloste = (props) => {
  const buttonWidth = 120;
  const right = 15;

  return (
    <div className="box" clickable="false">
      <div className="seloste-box">
        <>
          <h1>Tietosuojaseloste</h1>
          <div>
            <p className="seloste-text">
              <strong>Palvelun käyttämisen ehdot</strong>
            </p>
            <p>
              Hyväksymällä tietosuojailmoituksen ja antamalla palvelun käyttöön
              kalenteritiedot hyväksyt mahdollisuuden, että kalenteritietosi
              ovat vapaiden aikojesi osalta nähtävissä muille saman yhdistetyn
              kalenterin käyttäjille.
            </p>
            <p className="seloste-text">
              <strong>Palvelussa käsiteltävät henkilötiedot</strong>
            </p>
            <p>
              Palvelun käyttämisessä sinulta pyydetään seuraavia tietoja:
              henkilökohtaisen kalenterin URL-osoite ja henkilökohtainen
              kalenteridata. Palvelun käyttäminen ei vaadi käyttäjältä
              yksilöiviä henkilötietoja kalenteritietojen ja url:n lisäksi.
              Kalenteritiedoista poistetaan kaikki suorat tunnistetiedot sekä
              käyttäjästä että kalenteritapahtumien sisällöistä.
            </p>
            <p className="seloste-text">
              <strong>Miksi käyttäjätietoja kerätään?</strong>
            </p>
            <p>
              Kalenterisovelluksen käyttämiseen tarvitaan henkilökohtaisten
              kalenteritietojen lataamista sovellukseen. Käyttäjän lataamien
              kalenteritietojen avulla palvelussa voidaan tarjota näkymä eri
              käyttäjien yhteisistä vapaista ajoista.
            </p>
            <p className="seloste-text">
              <strong>Kenellä on pääsy tietoihin?</strong>
            </p>
            <p>
              Palvelussa on mahdollista muodostaa useiden käyttäjien yhdistetty
              kalenteri. Yhdistetyn kalenterin käyttäjät näkevät samaa
              yhdistettyä kalenteria käyttävien käyttäjien keskinäiset yhteiset
              vapaat ajat. Jokainen yhdistetty kalenteri on salasanasuojattu.
            </p>
            <p className="seloste-text">
              <strong>Tietojen säilyttäminen</strong>
            </p>
            <p>
              Käyttäjän lataamat kalenteritiedot säilytetään kuusi kuukautta
              palveluun lataamishetkestä eteenpäin, jonka jälkeen tiedot
              poistetaan automaattisesti. Käyttäjällä on aina mahdollisuus
              poistaa omat kalenteritietonsa palvelusta.
            </p>
            <p className="seloste-text">
              <strong>Tietojen luovutukset</strong>
            </p>
            <p className="seloste-text">
              Palveluun syötettyjä tietoja ei luovuteta kaupallisiin
              tarkoituksiin.
            </p>
          </div>
        </>
        <button
          className="seloste-btn btn btn-secondary"
          type="button"
          onClick={props.rightClick}
        >
          {props.right}
        </button>
        <button
          className="seloste-btn btn btn-secondary"
          type="button"
          onClick={props.leftClick}
        >
          {props.left}
        </button>
      </div>
    </div>
  );
};
export default seloste;
