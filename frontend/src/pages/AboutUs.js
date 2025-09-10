import React from 'react';
import Header from '../components/Header';
import logoUniversidad from '../assets/usac-logo.png';
import fotoGrupo from '../assets/grupo-foto.png';

const SobreNosotros = () => {
  return (
    <>
      <style>{`
        .sobre-nosotros-container {
          background-color: #d8f3dc;
          min-height: 100vh;
          color: #2d6a4f;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .sobre-nosotros-main {
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .titulo-principal {
          font-size: 2.8rem;
          color: #2d6a4f;
          margin-bottom: 50px;
          font-weight: 700;
          text-align: center;
        }

        /* Sección de universidad */
        .info-grid {
          display: flex;
          gap: 50px;
          align-items: center;
          margin-bottom: 70px;
        }

        .info-left {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .info-right {
          flex: 2;
          padding: 25px;
          background-color: white;
          border-radius: 18px;
          box-shadow: 0 6px 16px rgba(45, 106, 79, 0.12);
        }

        .info-right h2 {
          color: #2d6a4f;
          margin-top: 0;
          font-size: 1.9rem;
          margin-bottom: 15px;
        }

        .info-right p {
          font-size: 1.15rem;
          line-height: 2;
          margin: 10px 0;
        }

        .university-logo {
          max-width: 300px;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
        }

        /* Sección de equipo */
        .team-section {
          margin-top: 40px;
        }

        .team-grid {
          display: flex;
          gap: 50px;
          align-items: start;
        }

        .team-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .team-title {
          font-size: 2.1rem;
          color: #2d6a4f;
          margin: 0 0 20px 0;
          font-weight: 700;
        }

        .team-names-card {
          background-color: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(45, 106, 79, 0.1);
          font-size: 1.15rem;
          color: #2d6a4f;
          font-weight: 600;
          line-height: 2.2;
        }

        .team-photos {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .group-photo {
          width: 100%;
          max-width: 420px;
          border-radius: 16px;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
          border: 4px solid white;
        }

        /* === SECCIÓN FINAL CON ANTORCHA EN RECUADRO BLANCO === */
        .torch-section {
          margin-top: 80px;
          padding: 40px;
          background-color: #d8f3dc;
          border-radius: 18px;
          text-align: center;
        }

        .torch-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .torch-wrapper {
          position: relative;
          display: inline-block;
        }

        .torch-text {
          color: #2d6a4f;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .container {
          position: relative;
          cursor: pointer;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .container input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
          clip: rect(0 0 0 0);
        }

        .torch {
          height: 150px;
          display: flex;
          justify-content: center;
        }

        .head,
        .stick {
          position: absolute;
          width: 30px;
          transform-style: preserve-3d;
          transform: rotateX(-30deg) rotateY(45deg);
        }

        .stick {
          position: relative;
          height: 120px;
        }

        .face {
          position: absolute;
          transform-style: preserve-3d;
          width: 30px;
          height: 30px;
          display: grid;
          grid-template-columns: 50% 50%;
          grid-template-rows: 50% 50%;
          background-color: #000000;
        }

        .top {
          transform: rotateX(90deg) translateZ(15px);
        }

        .left {
          transform: rotateY(-90deg) translateZ(15px);
        }

        .right {
          transform: rotateY(0deg) translateZ(15px);
        }

        .top div,
        .left div,
        .right div {
          width: 102%;
          height: 102%;
        }

        .top div:nth-child(1),
        .left div:nth-child(3),
        .right div:nth-child(3) {
          background-color: #ffff9760;
        }

        .top div:nth-child(2),
        .left div:nth-child(1),
        .right div:nth-child(1) {
          background-color: #ffd80060;
        }

        .top div:nth-child(3),
        .left div:nth-child(4),
        .right div:nth-child(4) {
          background-color: #ffffff60;
        }

        .top div:nth-child(4),
        .left div:nth-child(2),
        .right div:nth-child(2) {
          background-color: #ff8f0060;
        }

        .side {
          position: absolute;
          width: 30px;
          height: 120px;
          display: grid;
          grid-template-columns: 50% 50%;
          grid-template-rows: repeat(8, 12.5%);
          translate: 0 12px;
        }

        .side-left {
          transform: rotateY(-90deg) translateZ(15px) translateY(8px);
        }

        .side-right {
          transform: rotateY(0deg) translateZ(15px) translateY(8px);
        }

        .side-left div,
        .side-right div {
          width: 103%;
          height: 103%;
        }

        /* Colores de la madera */
        .side div:nth-child(1) { background-color: #443622; }
        .side div:nth-child(2) { background-color: #2e2517; }
        .side div:nth-child(3),
        .side div:nth-child(5) { background-color: #4b3b23; }
        .side div:nth-child(4),
        .side div:nth-child(10) { background-color: #251e12; }
        .side div:nth-child(6) { background-color: #292115; }
        .side div:nth-child(7) { background-color: #4b3c26; }
        .side div:nth-child(8) { background-color: #292115; }
        .side div:nth-child(9) { background-color: #4b3a21; }
        .side div:nth-child(11),
        .side div:nth-child(15) { background-color: #3d311d; }
        .side div:nth-child(12) { background-color: #2c2315; }
        .side div:nth-child(13) { background-color: #493a22; }
        .side div:nth-child(14) { background-color: #2b2114; }
        .side div:nth-child(16) { background-color: #271e10; }

        /* ===== EFECTO DE LUZ AL ENCENDER ===== */
        .container input:checked ~ .torch .face {
          filter: drop-shadow(0px 0px 2px #ffffff)
                  drop-shadow(0px 0px 10px rgba(255, 237, 156, 0.8))
                  drop-shadow(0px 0px 25px rgba(255, 227, 101, 0.5));
        }

        .container input:checked ~ .torch .top div:nth-child(1),
        .container input:checked ~ .torch .left div:nth-child(3),
        .container input:checked ~ .torch .right div:nth-child(3) {
          background-color: #ffff97;
        }

        .container input:checked ~ .torch .top div:nth-child(2),
        .container input:checked ~ .torch .left div:nth-child(1),
        .container input:checked ~ .torch .right div:nth-child(1) {
          background-color: #ffd800;
        }

        .container input:checked ~ .torch .top div:nth-child(3),
        .container input:checked ~ .torch .left div:nth-child(4),
        .container input:checked ~ .torch .right div:nth-child(4) {
          background-color: #ffffff;
        }

        .container input:checked ~ .torch .top div:nth-child(4),
        .container input:checked ~ .torch .left div:nth-child(2),
        .container input:checked ~ .torch .right div:nth-child(2) {
          background-color: #ff8f00;
        }

        /* Madera más clara cuando está encendida */
        .container input:checked ~ .torch .side div:nth-child(1) {
          background-color: #7c623e;
        }
        .container input:checked ~ .torch .side div:nth-child(2) {
          background-color: #4c3d26;
        }
        .container input:checked ~ .torch .side div:nth-child(3),
        .container input:checked ~ .torch .side div:nth-child(5) {
          background-color: #937344;
        }
        .container input:checked ~ .torch .side div:nth-child(4),
        .container input:checked ~ .torch .side div:nth-child(10) {
          background-color: #3c2f1c;
        }
        .container input:checked ~ .torch .side div:nth-child(6) {
          background-color: #423522;
        }
        .container input:checked ~ .torch .side div:nth-child(7) {
          background-color: #9f7f50;
        }
        .container input:checked ~ .torch .side div:nth-child(8) {
          background-color: #403320;
        }
        .container input:checked ~ .torch .side div:nth-child(9) {
          background-color: #977748;
        }
        .container input:checked ~ .torch .side div:nth-child(11),
        .container input:checked ~ .torch .side div:nth-child(15) {
          background-color: #675231;
        }
        .container input:checked ~ .torch .side div:nth-child(12) {
          background-color: #3d301d;
        }
        .container input:checked ~ .torch .side div:nth-child(13) {
          background-color: #987849;
        }
        .container input:checked ~ .torch .side div:nth-child(14) {
          background-color: #3b2e1b;
        }
        .container input:checked ~ .torch .side div:nth-child(16) {
          background-color: #372a17;
        }
      `}</style>

      <div className="sobre-nosotros-container">
        <Header />

        <main className="sobre-nosotros-main">
          <h1 className="titulo-principal">Sobre Nosotros</h1>

          <div className="info-grid">
            <div className="info-left">
              <img
                src={logoUniversidad}
                alt="Logo Universidad"
                className="university-logo"
              />
            </div>
            <div className="info-right">
              <h2>Universidad de San Carlos de Guatemala</h2>
              <p><strong>Facultad:</strong> Ingeniería</p>
              <p><strong>Escuela:</strong> Ciencias y Sistemas</p>
              <p><strong>Curso:</strong> Prácticas iniciales sección F-</p>
              <p><strong>Taller:</strong> Desarrollo Web</p>
            </div>
          </div>

          <div className="team-section">
            <div className="team-grid">
              <div className="team-info">
                <h2 className="team-title">Integrantes</h2>
                <div className="team-names-card">
                    Alison Melysa Pérez Blanco - 202400023<br />
                    Dulce María Esperanza Gutiérrez Cáceres  - 202400009<br />
                    Jazmín Rocio López Lima - 202243063<br />
                    José Fernando Ramírez Ambrocio - 202400195<br />
                    Mario Rodrigo Balam Churunel - 202200147<br />
                    Juan Carlos Humberto Reyes Chavarría - 202307699
                </div>
              </div>
              <div className="team-photos">
                <img
                  src={fotoGrupo}
                  alt="Foto del grupo"
                  className="group-photo"
                />
              </div>
            </div>
          </div>
          
          <section className="torch-section">
            <div className="torch-container">
              <div className="torch-wrapper">
                <label className="container">
                  <input type="checkbox" />
                  <div className="torch">
                    <div className="head">
                      <div className="face top">
                        <div></div><div></div><div></div><div></div>
                      </div>
                      <div className="face left">
                        <div></div><div></div><div></div><div></div>
                      </div>
                      <div className="face right">
                        <div></div><div></div><div></div><div></div>
                      </div>
                    </div>
                    <div className="stick">
                      <div className="side side-left">
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                      </div>
                      <div className="side side-right">
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              <div className="torch-text">CLICK HERE!!!!</div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default SobreNosotros;