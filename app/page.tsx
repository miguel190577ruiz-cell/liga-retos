"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rldffnkqebxigtygpxwa.supabase.co",
  "sb_publishable_e8lnYDhwxDcj44ZmrAsuIg_zplmJRAK"
);

export default function Home() {
  const [desafios, setDesafios] = useState<any[]>([]);
  const [retoAbierto, setRetoAbierto] = useState<any>(null);
const [adminAbierto, setAdminAbierto] = useState(false);
const [pinCorrecto, setPinCorrecto] = useState(false);
const [pinInput, setPinInput] = useState("");

  const jogadores = [
    { nome: "Miguel09", pontos: 320 },
    { nome: "Crack77", pontos: 280 },
    { nome: "Tigre10", pontos: 240 },
  ];

 useEffect(() => {
  async function carregarDesafios() {
    const { data, error } = await supabase
      .from("desafios")
      .select("*")
      .order("posicion", { ascending: true });

    if (error) {
      alert("ERROR SUPABASE: " + error.message);
      return;
    }

    

    setDesafios(data || []);
  }

  carregarDesafios();
}, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          padding: "14px",
          paddingBottom: "80px",
        }}
      >
        <img
          src="/hero-top.png"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "24px",
            marginBottom: "14px",
          }}
        />

        <section
  style={{
    backgroundImage: "url('/bg-desafios.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "22px",
    padding: "16px 10px",
    marginBottom: "14px",
    border: "1px solid #1f2937",
    minHeight: "190px",
    position:"relative",
    zIndex:10,
  }}
>
  <h2 style={{ margin: "0 0 12px", fontSize: "16px" }}>
    🔥 Desafios ativos
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "8px",
    }}
  >
    {(desafios && desafios.length > 0 ? desafios : [
  { titulo: "20 toques", pontos: 50, descricao: "..." },
  { titulo: "Chute na trave", pontos: 100, descricao: "..." },
  { titulo: "Pé fraco", pontos: 30, descricao: "..." }
]).slice(0, 3).map((desafio, index) => (
      <button
        key={index}
        onClick={() => setRetoAbierto(desafio)}
        style={{
          background: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(34, 197, 94, 0.8)",
          color: "white",
          borderRadius: "16px",
          padding: "34px 10px",
          minHeight: "120px",
          textAlign: "left",
          cursor: "pointer",
          position:"relative",
          zIndex:20,
          touchAction:"manipulation",
        }}
      >
        <strong style={{ fontSize: "16px" }}>{desafio.titulo}</strong>

        <p
          style={{
            color: "#22c55e",
            margin: "10px 0 0",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          +{desafio.pontos} pts
        </p>
      </button>
    ))}
  </div>
</section>



        <section
          style={{
            backgroundImage: "url('/top3-pg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "22px",
            padding: "18px",
            marginBottom: "14px",
            minHeight: "210px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            border: "1px solid #22c55e",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "8px",
            }}
          >
            {jogadores.map((j, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(0,0,0,0.65)",
                  border: "1px solid #22c55e",
                  borderRadius: "16px",
                  padding: "10px 6px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{i + 1}º</div>
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  {j.nome}
                </div>
                <div style={{ color: "#22c55e", fontWeight: "bold" }}>
                  {j.pontos} pts
                </div>
              </div>
            ))}
          </div>
        </section>

          
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "430px",
            background: "#020617",
            borderTop: "1px solid #1f2937",
            display: "flex",
            justifyContent: "space-around",
            padding: "10px 0",
            zIndex:1,
            pointerEvents:"auto",
          }}
        >
          
          <button style={menuBtn}>🏆<br />Semanal</button>
          <button style={menuBtn}>📊<br />Mensal</button>
          <button
  style={menuBtn}
  onClick={() => {
    console.log("CLICK ADMIN");
    setAdminAbierto(true);
  }}
>
  🔒 Admin
</button>
        </nav>
      </div>
{adminAbierto && !pinCorrecto && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  }}>
    <div style={{
      width: "100%",
      maxWidth: "360px",
      background: "#020617",
      border: "1px solid #22c55e",
      borderRadius: "24px",
      padding: "22px",
      color: "white",
    }}>
      <h2>🔐 Acceso Admin</h2>

      <input
        type="password"
        placeholder="PIN de 6 dígitos"
        value={pinInput}
        onChange={(e) => setPinInput(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid #22c55e",
          marginBottom: "12px",
          fontSize: "18px",
        }}
      />

      <button
        onClick={() => {
          if (pinInput === "190577") {
            setPinCorrecto(true);
          } else {
            alert("PIN incorrecto");
          }
        }}
        style={adminBtn}
      >
        Entrar
      </button>

      <button
        onClick={() => {
          setAdminAbierto(false);
          setPinInput("");
        }}
        style={adminBtn}
      >
        Cancelar
      </button>
    </div>
  </div>
)}
{adminAbierto && pinCorrecto && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  }}>
    <div style={{
      width: "100%",
      maxWidth: "380px",
      background: "#020617",
      border: "1px solid #22c55e",
      borderRadius: "24px",
      padding: "22px",
      color: "white",
    }}>
      <h2>🔐 Administrador</h2>

      <button style={adminBtn}>➕ Añadir jugador</button>
      <button style={adminBtn}>🗑️ Borrar jugador</button>
      <button style={adminBtn}>⭐ Gestionar puntos</button>
      <button style={adminBtn}>🎯 Editar desafíos</button>

      <button
        onClick={() => {
          setAdminAbierto(false);
          setPinCorrecto(false);
          setPinInput("");
        }}
        style={adminBtn}
      >
        Cerrar
      </button>
    </div>
  </div>
)}

      {retoAbierto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "380px",
              background: "#020617",
              border: "1px solid #22c55e",
              borderRadius: "24px",
              padding: "22px",
              color: "white",
              boxShadow: "0 0 35px rgba(34,197,94,0.4)",
            }}
          >
            <h2>{retoAbierto.titulo}</h2>

            <p style={{ color: "#22c55e", fontSize: "22px", fontWeight: "bold" }}>
              +{retoAbierto.pontos} pontos
            </p>

            <p style={{ color: "#cbd5e1", lineHeight: 1.5 }}>
              {retoAbierto?.descricao}
            
            </p>

            <button
              onClick={() => setRetoAbierto(null)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                background: "#22c55e",
                color: "black",
                fontWeight: "bold",
                marginTop: "16px",
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
const adminBtn = {
  width: "100%",
  padding: "14px",
  marginBottom: "10px",
  borderRadius: "14px",
  border: "1px solid #22c55e",
  background: "rgba(34,197,94,0.12)",
  color: "white",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
};

const menuBtn = {
  background: "none",
  border: "none",
  color: "white",
  fontWeight: "bold",
  fontSize: "12px",
};

