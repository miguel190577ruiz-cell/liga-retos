"use client";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mmfuhvlxjzvfotonjycw.supabase.co",
  "sb_publishable_wy2qvGG23Ozj-unBH8YqKQ_ZyC7ArIu"
);

export default function Home() {
  const [desafios, setDesafios] = useState<any[]>([]);
  const [retoAbierto, setRetoAbierto] = useState<any>(null);
  const [modoAdmin, setModoAdmin] = useState("");
  const [pantalla, setPantalla] = useState("inicio");
  const [nuevoJugador, setNuevoJugador] = useState("");
  const [puntosAdmin, setPuntosAdmin] = useState("");
  const [adminAbierto, setAdminAbierto] = useState(false);
  const [pinCorrecto, setPinCorrecto] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [jogadores, setJogadores] = useState<any[]>([]);

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

    async function carregarJogadores() {
      const { data, error } = await supabase
        .from("jogadores")
        .select("*")
        .order("pontos_semanal", { ascending: false });

      if (error) {
        alert("ERROR JUGADORES: " + error.message);
        return;
      }

      setJogadores(data || []);
    }

    carregarDesafios();
    carregarJogadores();
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
            position: "relative",
            zIndex: 10,
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
            {(desafios.length > 0
              ? desafios
              : [
                  { titulo: "20 toques", pontos: 50, descricao: "..." },
                  { titulo: "Chute na trave", pontos: 100, descricao: "..." },
                  { titulo: "Pé fraco", pontos: 30, descricao: "..." },
                ]
            )
              .slice(0, 3)
              .map((desafio, index) => (
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
                    position: "relative",
                    zIndex: 20,
                    touchAction: "manipulation",
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
            {[0, 1, 2].map((i) => {
              const j = jogadores[i];

              return (
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
                    {j ? j.nome : "—"}
                  </div>

                  <div style={{ color: "#22c55e", fontWeight: "bold" }}>
                    {j ? j.pontos_semanal : 0} pts
                  </div>
                </div>
              );
            })}
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
            zIndex: 99999,
            pointerEvents: "auto",
          }}
        >
          <button style={menuBtn} onClick={() => setPantalla("semanal")}>
  🏆<br />Semanal
</button>

<button style={menuBtn} onClick={() => setPantalla("mensal")}>
  📊<br />Mensal
</button>
          <button
            style={menuBtn}
            onClick={() => {
              setAdminAbierto(true);
            }}
          >
            🔒 Admin
          </button>
        </nav>
      </div>

      {adminAbierto && !pinCorrecto && (
        <div style={modalFondo}>
          <div style={modalCaja}>
            <h2>🔐 Acceso Admin</h2>

            <input
              type="password"
              placeholder="PIN de 6 dígitos"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={() => {
                if (pinInput === "777777") {
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
        <div style={modalFondo}>
          <div style={modalCaja}>
            <h2>🔐 Administrador</h2>

            {modoAdmin === "editarDesafios" && (
              <div style={{ marginTop: "12px" }}>
                <p style={{ color: "#22c55e", fontWeight: "bold" }}>
                  Editar desafíos abierto ✅
                </p>

                {desafios.map((d, i) => (
                  <div key={d.id} style={{ marginBottom: "10px" }}>
                    <input
                      value={d.titulo}
                      onChange={(e) => {
                        const nuevos = [...desafios];
                        nuevos[i].titulo = e.target.value;
                        setDesafios(nuevos);
                      }}
                      style={inputStyle}
                    />

                    <input
                      type="number"
                      value={d.pontos}
                      onChange={(e) => {
                        const nuevos = [...desafios];
                        nuevos[i].pontos = Number(e.target.value);
                        setDesafios(nuevos);
                      }}
                      style={inputStyle}
                    />

                    <textarea
                      value={d.descricao}
                      onChange={(e) => {
                        const nuevos = [...desafios];
                        nuevos[i].descricao = e.target.value;
                        setDesafios(nuevos);
                      }}
                      style={inputStyle}
                    />

                    <button
                      onClick={async () => {
                        const { error } = await supabase
                          .from("desafios")
                          .update({
                            titulo: d.titulo,
                            descricao: d.descricao,
                            pontos: d.pontos,
                          })
                          .eq("id", d.id);

                        if (error) {
                          alert("Error: " + error.message);
                        } else {
                          alert("Desafío guardado ✅");
                        }
                      }}
                      style={adminBtn}
                    >
                      💾 Guardar desafío
                    </button>
                  </div>
                ))}
              </div>
            )}

            {modoAdmin === "addJugador" && (
              <div style={{ marginTop: "12px" }}>
                <input
                  placeholder="Nombre del jugador"
                  value={nuevoJugador}
                  onChange={(e) => setNuevoJugador(e.target.value)}
                  style={inputStyle}
                />

                <button
                  style={adminBtn}
                  onClick={async () => {
                    if (!nuevoJugador) return;

                    const { error } = await supabase
                      .from("jogadores")
                      .insert([
                        {
                          nome: nuevoJugador,
                          pontos_semanal: 0,
                          pontos_mensal: 0,
                        },
                      ]);

                    if (error) {
                      alert("ERROR AÑADIENDO: " + error.message);
                      return;
                    }

                    alert("Jugador añadido ✅");
                    setNuevoJugador("");
                    location.reload();
                  }}
                >
                  💾 Guardar jugador
                </button>
              </div>
            )}

            {modoAdmin === "borrarJugador" && (
              <div style={{ marginTop: "12px" }}>
                <input
                  placeholder="Nombre del jugador a borrar"
                  value={nuevoJugador}
                  onChange={(e) => setNuevoJugador(e.target.value)}
                  style={inputStyle}
                />
                
                <button
                  style={adminBtn}
                  onClick={async () => {
                    if (!nuevoJugador) return;

                    const { error } = await supabase
                      .from("jogadores")
                      .delete()
                      .eq("nome", nuevoJugador);

                    if (error) {
                      alert("ERROR BORRANDO: " + error.message);
                      return;
                    }

                    alert("Jugador borrado ✅");
                    setNuevoJugador("");
                    location.reload();
                  }}
                >
                  🗑️ Confirmar borrar
                </button>
              </div>
            )}
{modoAdmin === "gestionarPuntos" && (
  <div style={{ marginTop: "12px" }}>
    
    <input
      placeholder="Nombre del jugador"
      value={nuevoJugador}
      onChange={(e) => setNuevoJugador(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        marginBottom: "10px",
      }}
    />

    <input
      type="number"
      placeholder="Puntos"
      value={puntosAdmin}
      onChange={(e) => setPuntosAdmin(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        marginBottom: "10px",
      }}
    />

    <button
      style={adminBtn}
      onClick={async () => {
        const jugador = jogadores.find(
          (j: any) =>
            j.nome.toLowerCase() === nuevoJugador.toLowerCase()
        );

        if (!jugador) {
          alert("Jugador no encontrado");
          return;
        }

        const nuevosPuntos =
          jugador.pontos_semanal + Number(puntosAdmin);

        const { error } = await supabase
          .from("jogadores")
          .update({
  pontos_semanal: nuevosPuntos,
  pontos_mensal: (jugador.pontos_mensal || 0) + Number(puntosAdmin),
})
          .eq("id", jugador.id);

        if (error) {
          alert(error.message);
          return;
        }

        alert("Puntos sumados ✅");
        location.reload();
      }}
    >
      ➕ Sumar puntos
    </button>

    <button
      style={adminBtn}
      onClick={async () => {
        const jugador = jogadores.find(
          (j: any) =>
            j.nome.toLowerCase() === nuevoJugador.toLowerCase()
        );

        if (!jugador) {
          alert("Jugador no encontrado");
          return;
        }

        const nuevosPuntos =
          jugador.pontos_semanal - Number(puntosAdmin);

        const { error } = await supabase
          .from("jogadores")
          .update({
  pontos_semanal: nuevosPuntos,
  pontos_mensal: (jugador.pontos_mensal || 0) - Number(puntosAdmin),
})
          .eq("id", jugador.id);

        if (error) {
          alert(error.message);
          return;
        }

        alert("Puntos restados ✅");
        location.reload();
      }}
    >
      ➖ Restar puntos
    </button>

  </div>
)}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "12px",
              }}
            >
              <button style={adminBtn} onClick={() => setModoAdmin("addJugador")}>
                ➕ Añadir jugador
              </button>

              <button style={adminBtn} onClick={() => setModoAdmin("borrarJugador")}>
                🗑️ Borrar jugador
              </button>

              <button style={adminBtn} onClick={() => setModoAdmin("gestionarPuntos")}>
                ⭐ Gestionar puntos
              </button>

              <button style={adminBtn} onClick={() => setModoAdmin("editarDesafios")}>
                🎯 Editar desafíos
              </button>

              <button
                style={adminBtn}
                onClick={() => {
                  setAdminAbierto(false);
                  setPinCorrecto(false);
                  setPinInput("");
                  setModoAdmin("");
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
{pantalla === "semanal" && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "#020617",
      zIndex: 5000,
      overflowY: "auto",
      padding: "20px",
      color: "white",
      animation: "fadeIn 0.35s ease-out",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        fontSize: "34px",
        marginBottom: "6px",
      }}
    >
      🏆 CLASIFICAÇAO
    </h1>

    <h2
      style={{
        textAlign: "center",
        color: "#22c55e",
        marginBottom: "24px",
      }}
    >
      SEMANAL
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px",
        marginBottom: "24px",
        alignItems: "end",
      }}
    >
      {[1, 0, 2].map((pos) => {
        const j = jogadores[pos];
        if (!j) return <div key={pos}></div>;

        return (
          <div
            key={j.id}
            style={{
              background:
  pos === 0
    ? "rgba(255,215,0,0.12)"
    : pos === 1
    ? "rgba(192,192,192,0.10)"
    : "rgba(205,127,50,0.10)",

border:
  pos === 0
    ? "3px solid gold"
    : pos === 1
    ? "2px solid silver"
    : "2px solid #cd7f32",
              borderRadius: "20px",
              padding: "18px 10px",
              textAlign: "center",
              transform:
                pos === 0 ? "scale(1.08)" : "scale(1)",
                animation:
  pos === 0
    ? "pulseGold 1.6s infinite ease-in-out"
    : "none",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>
              {pos === 0 ? "👑" : "⚽"}
            </div>

            <div style={{ fontWeight: "bold" }}>
              #{pos + 1}
            </div>

            <div
              style={{
                fontWeight: "bold",
                marginTop: "8px",
                fontSize: "16px",
              }}
            >
              {j.nome}
            </div>

            <div
              style={{
                color: "#22c55e",
                marginTop: "8px",
                fontWeight: "bold",
              }}
            >
              {j.pontos_semanal} pts
            </div>
          </div>
        );
      })}
    </div>

    <div>
      {jogadores.map((j: any, i) => (
        <div
          key={j.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid #1f2937",
            borderRadius: "14px",
            padding: "14px",
            marginBottom: "10px",
          }}
        >
          <div>
            <strong>
              #{i + 1} {j.nome}
            </strong>
          </div>

          <div
            style={{
              color: "#22c55e",
              fontWeight: "bold",
            }}
          >
            {j.pontos_semanal} pts
          </div>
        </div>
      ))}
    </div>

    <button
      style={{
        width: "100%",
        marginTop: "20px",
        padding: "14px",
        borderRadius: "14px",
        border: "none",
        background: "#22c55e",
        color: "black",
        fontWeight: "bold",
      }}
      onClick={() => setPantalla("inicio")}
    >
      Fechar
    </button>
  </div>
)}
{pantalla === "mensal" && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background:
  "linear-gradient(180deg, #101103 0%, #756716 55%, #957f3181 100%)",
      zIndex: 5000,
      overflowY: "auto",
      padding: "20px",
      color: "white",
      animation: "fadeIn 0.35s ease-out",
    }}
  >
    <h1 style={{ textAlign: "center", fontSize: "34px", marginBottom: "6px" }}>
      🏆 CLASIFICAÇAO
    </h1>

    <h2 style={{ textAlign: "center", color: "#22c55e", marginBottom: "24px" }}>
      MENSUAL
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px",
        marginBottom: "24px",
        alignItems: "end",
      }}
    >
      {[1, 0, 2].map((pos) => {
        const j = jogadores[pos];
        if (!j) return <div key={pos}></div>;

        return (
          <div
            key={j.id}
            style={{
              background:
                pos === 0
                  ? "rgba(255,215,0,0.12)"
                  : pos === 1
                  ? "rgba(192,192,192,0.10)"
                  : "rgba(205,127,50,0.10)",
              border:
                pos === 0
                  ? "3px solid gold"
                  : pos === 1
                  ? "2px solid silver"
                  : "2px solid #cd7f32",
              borderRadius: "20px",
              padding: "18px 10px",
              textAlign: "center",
              transform: pos === 0 ? "scale(1.08)" : "scale(1)",
              animation: pos === 0 ? "pulseGold 1.6s infinite ease-in-out" : "none",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>
              {pos === 0 ? "👑" : "⚽"}
            </div>

            <div style={{ fontWeight: "bold" }}>#{pos + 1}</div>

            <div style={{ fontWeight: "bold", marginTop: "8px", fontSize: "16px" }}>
              {j.nome}
            </div>

            <div style={{ color: "#22c55e", marginTop: "8px", fontWeight: "bold" }}>
              {j.pontos_mensal} pts
            </div>
          </div>
        );
      })}
    </div>

    <div>
      {jogadores.slice(0, 12).map((j: any, i) => (
        <div
          key={j.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid #1f2937",
            borderRadius: "14px",
            padding: "14px",
            marginBottom: "10px",
          }}
        >
          <div>
            <strong>
              #{i + 1} {j.nome}
            </strong>
          </div>

          <div style={{ color: "#22c55e", fontWeight: "bold" }}>
            {j.pontos_mensal} pts
          </div>
        </div>
      ))}
    </div>

    <button
      style={{
        width: "100%",
        marginTop: "20px",
        padding: "14px",
        borderRadius: "14px",
        border: "none",
        background: "#22c55e",
        color: "black",
        fontWeight: "bold",
      }}
      onClick={() => setPantalla("inicio")}
    >
      Fechar
    </button>
  </div>
)}

      {retoAbierto && (
        <div style={modalFondo}>
          <div style={modalCaja}>
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

const modalFondo = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.75)",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const modalCaja: CSSProperties = {
  width: "100%",
  maxWidth: "380px",
  background: "#020617",
  border: "1px solid #22c55e",
  borderRadius: "24px",
  padding: "22px",
  color: "white",
  maxHeight: "85vh",
overflowY: "auto",
boxSizing: "border-box" as const,
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  marginBottom: "10px",
};
const animaciones = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;