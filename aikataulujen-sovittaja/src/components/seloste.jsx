import React from "react";

const seloste = (props) => {
  const buttonWidth = 120;
  const right = 15;

  return (
    <div className="box" clickable="false">
      <div className="seloste-box">
        <button
          className="btn btn-secondary"
          style={{
            right: "15px",
            position: "absolute",
            top: "30px",
            width: "120px",
          }}
          type="button"
          onClick={props.rightClick}
        >
          {props.right}
        </button>
        <button
          className="btn btn-secondary"
          style={{
            right: "145px",
            position: "absolute",
            top: "30px",
            width: "120px",
          }}
          type="button"
          onClick={props.leftClick}
        >
          {props.left}
        </button>
        <>
          <h1>Tietosuojaseloste</h1>
          <div>
            <p>
              <strong>Palvelun käyttämisen ehdot</strong>
            </p>
            <p>
              Hyväksymällä tietosuojailmoituksen ja antamalla palvelun käyttöön
              kalenteritiedot hyväksyt mahdollisuuden, että kalenteritietosi ovat vapaiden
              aikojesi osalta nähtävissä muille saman yhdistetyn kalenterin käyttäjille.
            </p>
            <p>
              <strong>Palvelussa käsiteltävät henkilötiedot</strong>
            </p>
            <p>
              Palvelun käyttämisessä sinulta pyydetään seuraavia tietoja: henkilökohtaisen
              kalenterin URL-osoite ja henkilökohtainen kalenteridata. Palvelun
              käyttäminen ei vaadi käyttäjältä yksilöiviä henkilötietoja kalenteritietojen
              ja url:n lisäksi. Kalenteritiedoista poistetaan kaikki suorat tunnistetiedot
              sekä käyttäjästä että kalenteritapahtumien sisällöistä.
            </p>
            <p>
              <strong>Miksi käyttäjätietoja kerätään?</strong>
            </p>
            <p>
              Kalenterisovelluksen käyttämiseen tarvitaan henkilökohtaisten
              kalenteritietojen lataamista sovellukseen. Käyttäjän lataamien
              kalenteritietojen avulla palvelussa voidaan tarjota näkymä eri käyttäjien
              yhteisistä vapaista ajoista.
            </p>
            <p>
              <strong>Kenellä on pääsy tietoihin?</strong>
            </p>
            <p>
              Palvelussa on mahdollista muodostaa useiden käyttäjien yhdistetty kalenteri.
              Yhdistetyn kalenterin käyttäjät näkevät samaa yhdistettyä kalenteria
              käyttävien käyttäjien keskinäiset yhteiset vapaat ajat. Jokainen yhdistetty
              kalenteri on salasanasuojattu.
            </p>
            <p>
              <strong>Tietojen säilyttäminen</strong>
            </p>
            <p>
              Käyttäjän lataamat kalenteritiedot säilytetään kuusi kuukautta palveluun
              lataamishetkestä eteenpäin, jonka jälkeen tiedot poistetaan automaattisesti.
              Käyttäjällä on aina mahdollisuus poistaa omat kalenteritietonsa palvelusta.
            </p>
            <p>
              <strong>Tietojen luovutukset</strong>
            </p>
            <p>Palveluun syötettyjä tietoja ei luovuteta kaupallisiin tarkoituksiin.</p>
          </div>
        </>
      </div>
    </div>
  );
};
export default seloste;
