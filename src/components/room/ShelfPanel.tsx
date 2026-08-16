import type { ShelfItem } from "./shelfTypes";

type Props = {
  item: ShelfItem;
  onClose: () => void;
};

export function ShelfPanel({ item, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
        <div
          className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl"
          style={{
            background: "rgba(14,9,3,0.96)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Yopish"
            style={{
              position: "absolute",
              right: 16,
              top: 16,
              background: "none",
              border: "none",
              color: "rgba(240,235,224,0.3)",
              cursor: "pointer",
              fontSize: 16,
              lineHeight: 1,
              padding: 4,
              transition: "color 150ms",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(240,235,224,0.75)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(240,235,224,0.3)")
            }
          >
            ✕
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
  const subtitleColor = "rgba(240,235,224,0.45)";
  const bodyColor = "rgba(240,235,224,0.3)";

  switch (item.type) {
    case "globe":
      return (
        <>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor }}>
            Dunyo
          </p>
          <h2 style={{ marginTop: 8, fontSize: 20, fontWeight: 500, color: titleColor }}>
            Sayohat va madaniyatlar
          </h2>
          <p style={{ marginTop: 6, fontSize: 13, color: subtitleColor }}>
            Borgan joylar, bormoqchi bo'lgan joylar, o'rganayotgan tillar va madaniyatlar.
          </p>
          <p style={{ marginTop: 16, fontSize: 12, color: bodyColor }}>
            Xarita tez orada qo'shiladi.
          </p>
        </>
      );

    case "notebook":
      return (
        <>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor }}>
            Qaydlar
          </p>
          <h2 style={{ marginTop: 8, fontSize: 20, fontWeight: 500, color: titleColor }}>
            Fikrlar va g'oyalar
          </h2>
          <p style={{ marginTop: 6, fontSize: 13, color: subtitleColor }}>
            Qayta-qayta qaytib keladigan g'oyalar, kuzatishlar va eslatmalar.
          </p>
          <p style={{ marginTop: 16, fontSize: 12, color: bodyColor }}>
            Tez orada to'ldiriladi.
          </p>
        </>
      );

    case "camera":
      return (
        <>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor }}>
            Kontent
          </p>
          <h2 style={{ marginTop: 8, fontSize: 20, fontWeight: 500, color: titleColor }}>
            Suratlar va videolar
          </h2>
          <p style={{ marginTop: 6, fontSize: 13, color: subtitleColor }}>
            Yaratgan kontent, suratlar va vizual ishlar.
          </p>
          <p style={{ marginTop: 16, fontSize: 12, color: bodyColor }}>
            Tez orada qo'shiladi.
          </p>
        </>
      );

    case "plant":
      return (
        <>
          <h2 style={{ marginTop: 8, fontSize: 24, color: titleColor }}>
            🌱
          </h2>
          <p style={{ marginTop: 8, fontSize: 13, color: subtitleColor }}>
            Hali o'sib kelayotgan narsalar...
          </p>
        </>
      );

    case "topic-book":
      return (
        <>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor }}>
            {item.subtitle ?? "Mavzu"}
          </p>
          <h2 style={{ marginTop: 8, fontSize: 20, fontWeight: 500, color: titleColor }}>
            {item.title}
          </h2>
          <p style={{ marginTop: 6, fontSize: 13, color: subtitleColor }}>
            Bu mavzu bo'yicha o'rganayotgan va qiziqayotgan narsalarim.
          </p>
          <p style={{ marginTop: 16, fontSize: 12, color: bodyColor }}>
            Tez orada to'ldiriladi.
          </p>
        </>
      );

    case "book":
    default:
      return (
        <>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor }}>
            Kitob
          </p>
          <h2 style={{ marginTop: 8, fontSize: 20, fontWeight: 500, color: titleColor }}>
            {item.title}
          </h2>
          {item.author && (
            <p style={{ marginTop: 4, fontSize: 13, color: subtitleColor }}>
              {item.author}
            </p>
          )}
          <p style={{ marginTop: 16, fontSize: 12, color: bodyColor }}>
            Tafsilotlar tez orada qo'shiladi.
          </p>
        </>
      );
  }
}
