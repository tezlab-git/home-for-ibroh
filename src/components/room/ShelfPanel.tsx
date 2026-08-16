import { useEffect, useState } from "react";
import type { ShelfItem } from "./shelfTypes";

type Props = {
  item: ShelfItem;
  onClose: () => void;
};

export function ShelfPanel({ item, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  return (
    <>
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(3px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 280ms ease",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          padding: "0 16px 24px",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 320ms cubic-bezier(0.34,1.2,0.64,1)",
        }}
      >
        <div
          style={{
            width: "100%", maxWidth: 440,
            borderRadius: 16, padding: 24,
            position: "relative",
            background: "rgba(14,9,3,0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
          }}
        >
          <button
            onClick={handleClose}
            aria-label="Yopish"
            style={{
              position: "absolute", right: 14, top: 14,
              background: "none", border: "none",
              color: "rgba(240,235,224,0.25)", cursor: "pointer",
              fontSize: 15, lineHeight: 1, padding: 4,
              transition: "color 150ms",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,235,224,0.7)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,235,224,0.25)")}
          >
            x
          </button>
          <PanelContent item={item} />
        </div>
      </div>
    </>
  );
}

function PanelContent({ item }: { item: ShelfItem }) {
  const labelColor = "rgba(210,170,90,0.75)";
  const titleColor = "#f0ebe0";
  const subColor = "rgba(240,235,224,0.45)";
  const bodyColor = "rgba(240,235,224,0.28)";

  switch (item.type) {
    case "globe":
      return (
        <>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: labelColor }}>Dunyo</p>
          <h2 style={{ marginTop: 7, fontSize: 19, fontWeight: 600, color: titleColor }}>Sayohat va madaniyatlar</h2>
          <p style={{ marginTop: 6, fontSize: 13, lineHeight: 1.6, color: subColor }}>
            Borgan joylar, bormoqchi bo'lgan joylar, o'rganayotgan tillar va madaniyatlar.
          </p>
          <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {["O'zbekiston", "Turkiya", "UAE", "Arabiston"].map(c => (
              <span key={c} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: "rgba(255,255,255,0.07)", color: subColor }}>{c}</span>
            ))}
          </div>
          <p style={{ marginTop: 14, fontSize: 11, color: bodyColor }}>Xarita tez orada qo'shiladi.</p>
        </>
      );

    case "notebook":
      return (
        <>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: labelColor }}>Qaydlar</p>
          <h2 style={{ marginTop: 7, fontSize: 19, fontWeight: 600, color: titleColor }}>Fikrlar va g'oyalar</h2>
          <p style={{ marginTop: 6, fontSize: 13, lineHeight: 1.6, color: subColor }}>
            Qayta-qayta qaytib keladigan g'oyalar, kuzatishlar va eslatmalar.
          </p>
          <p style={{ marginTop: 14, fontSize: 11, color: bodyColor }}>Tez orada to'ldiriladi.</p>
        </>
      );

    case "camera":
      return (
        <>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: labelColor }}>Kontent</p>
          <h2 style={{ marginTop: 7, fontSize: 19, fontWeight: 600, color: titleColor }}>Suratlar va videolar</h2>
          <p style={{ marginTop: 6, fontSize: 13, lineHeight: 1.6, color: subColor }}>
            Yaratgan kontent, suratlar va vizual ishlar.
          </p>
          <p style={{ marginTop: 14, fontSize: 11, color: bodyColor }}>Tez orada qo'shiladi.</p>
        </>
      );

    case "plant":
      return (
        <>
          <h2 style={{ fontSize: 28, color: titleColor }}>O'simlik</h2>
          <p style={{ marginTop: 8, fontSize: 13, color: subColor }}>Hali o'sib kelayotgan narsalar...</p>
          <p style={{ marginTop: 6, fontSize: 12, color: bodyColor }}>Davom eting. Har kuni bir qadam.</p>
        </>
      );

    default:
      return (
        <>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: labelColor }}>
            {item.subtitle ?? item.type}
          </p>
          <h2 style={{ marginTop: 7, fontSize: 19, fontWeight: 600, color: titleColor }}>{item.title}</h2>
          <p style={{ marginTop: 14, fontSize: 11, color: bodyColor }}>Tez orada to'ldiriladi.</p>
        </>
      );
  }
}
