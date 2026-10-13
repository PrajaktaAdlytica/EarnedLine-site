import React from "react";
import {
  AbsoluteFill,
  Composition,
  Still,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  CanvasImage,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/fonts";

loadFont({
  family: "Manrope",
  url: staticFile("Manrope-variable.woff2"),
  weight: "200 800",
});
loadFont({
  family: "IBM Plex Sans",
  url: staticFile("IBMPlexSans-variable.woff2"),
  weight: "100 700",
});
const C = {
  paper: "#F7F7F2",
  ink: "#192019",
  olive: "#46533B",
  petrol: "#215E55",
  citron: "#DCE7A3",
  mint: "#C5E1D1",
  clay: "#C66E3D",
  line: "#DFE2D8",
  muted: "#697166",
  warning: "#8A4B10",
  warm: "#FFF3E5",
  white: "#FFFFFF",
};
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const edge = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
  easing: ease,
};
const panel: React.CSSProperties = {
  background: C.white,
  border: `1px solid ${C.line}`,
  borderRadius: 18,
  boxShadow: "0 14px 44px rgba(25,32,25,.07)",
};
const micro: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 500,
  letterSpacing: "0.11em",
  textTransform: "uppercase",
  color: C.muted,
};
function Icon({
  type,
  size = 24,
  color = C.muted,
}: {
  type: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {type === "file" ? (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6M8 13h8M8 17h5" />
        </>
      ) : type === "lock" ? (
        <>
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M8 10V6a4 4 0 0 1 8 0v4" />
        </>
      ) : type === "bars" ? (
        <>
          <path d="M4 20V9M10 20V4M16 20v-9M22 20H2" />
        </>
      ) : type === "arrow" ? (
        <>
          <path d="M4 12h16M15 7l5 5-5 5" />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 12h8M12 8v8" />
        </>
      )}
    </svg>
  );
}
function Pill({
  children,
  warning = false,
}: {
  children: React.ReactNode;
  warning?: boolean;
}) {
  return (
    <span
      style={{
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: ".035em",
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        borderRadius: 5,
        padding: "7px 10px",
        background: warning ? "#F9DFC0" : "#EDF0E8",
        color: warning ? C.warning : C.olive,
      }}
    >
      {children}
    </span>
  );
}
function ClauseDocument({ highlight = 1 }: { highlight?: number }) {
  return (
    <div
      style={{
        ...panel,
        width: 590,
        height: 675,
        padding: "42px 44px",
        borderRadius: 3,
        position: "relative",
        boxShadow: "0 18px 55px rgba(25,32,25,.10)",
        fontFamily: "IBM Plex Sans",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...micro,
        }}
      >
        <span>Executed agreement</span>
        <span>CT-22</span>
      </div>
      <h2
        style={{
          fontFamily: "Manrope",
          fontSize: 34,
          fontWeight: 650,
          letterSpacing: "-.04em",
          lineHeight: 1.15,
          margin: "28px 0 20px",
        }}
      >
        Acme Analytics
        <br />
        Customer agreement
      </h2>
      <div
        style={{
          display: "flex",
          gap: 18,
          fontSize: 16,
          color: C.muted,
          paddingBottom: 25,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <span>Signed 12 Aug 2026</span>
        <span>Effective 01 Sep 2026</span>
        <span>USD · Synthetic</span>
      </div>
      <div style={{ fontSize: 25, fontWeight: 600, margin: "28px 0 20px" }}>
        2. Usage and fees
      </div>
      <div style={{ fontSize: 23, lineHeight: 1.55, color: C.ink }}>
        <span style={{ color: C.muted, fontSize: 16 }}>C-22 · 2.1</span>
        <br />
        The monthly subscription includes
        <br />
        <span style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              position: "absolute",
              inset: "4px -6px",
              background: C.citron,
              clipPath: `inset(0 ${100 - highlight * 100}% 0 0)`,
              zIndex: 0,
            }}
          />
          <span style={{ position: "relative" }}>10,000 events per month.</span>
        </span>
      </div>
      <div style={{ fontSize: 23, lineHeight: 1.55, marginTop: 22 }}>
        <span style={{ color: C.muted, fontSize: 16 }}>C-22 · 2.2</span>
        <br />
        Additional events are charged at
        <br />
        <span style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              position: "absolute",
              inset: "4px -6px",
              background: C.citron,
              clipPath: `inset(0 ${100 - highlight * 100}% 0 0)`,
            }}
          />
          <span style={{ position: "relative" }}>
            $0.04 per additional event.
          </span>
        </span>
      </div>
      <div style={{ display: "grid", gap: 10, marginTop: 30 }}>
        <div style={{ height: 3, width: "95%", background: "#EBEDE6" }} />
        <div style={{ height: 3, width: "87%", background: "#EBEDE6" }} />
        <div style={{ height: 3, width: "93%", background: "#EBEDE6" }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          marginTop: 30,
        }}
      >
        <span style={{ fontSize: 16, color: C.muted }}>
          Fictional executed record
        </span>
        <span
          style={{
            fontSize: 16,
            color: C.olive,
            borderBottom: `1px solid ${C.line}`,
            paddingBottom: 4,
          }}
        >
          A. Morgan
        </span>
      </div>
    </div>
  );
}
function UsageCard({ meter = 1 }: { meter?: number }) {
  return (
    <div style={{ ...panel, width: 440, padding: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={micro}>Usage export · Sep 2026</span>
        <Icon type="bars" />
      </div>
      <div
        style={{
          fontFamily: "Manrope",
          fontSize: 72,
          fontWeight: 550,
          letterSpacing: "-.06em",
          margin: "32px 0 0",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        12,000
      </div>
      <div style={{ fontSize: 23, color: C.muted, marginBottom: 30 }}>
        metered events
      </div>
      <div
        style={{
          height: 9,
          background: "#E7EBE1",
          borderRadius: 2,
          position: "relative",
          marginBottom: 15,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${83.333 * meter}%`,
            background: C.olive,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "83.333%",
            height: 9,
            width: `${16.667 * meter}%`,
            background: C.clay,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          color: C.muted,
        }}
      >
        <span>10,000 included</span>
        <span>2,000 additional</span>
      </div>
      <div
        style={{
          marginTop: 32,
          borderTop: `1px solid ${C.line}`,
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 17,
        }}
      >
        <span>Source: USG-SEP22</span>
        <Pill>ILLUSTRATIVE</Pill>
      </div>
    </div>
  );
}
function InvoiceCard() {
  return (
    <div style={{ ...panel, width: 410, padding: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={micro}>Invoice · I-88</span>
        <Icon type="file" />
      </div>
      <h3
        style={{
          fontFamily: "Manrope",
          fontSize: 35,
          fontWeight: 600,
          letterSpacing: "-.04em",
          margin: "30px 0 12px",
        }}
      >
        Acme Analytics
      </h3>
      <div style={{ fontSize: 18, color: C.muted }}>
        01 Oct 2026 · September period
      </div>
      <div
        style={{
          fontSize: 20,
          display: "flex",
          justifyContent: "space-between",
          padding: "30px 0 20px",
          marginTop: 25,
          borderTop: `1px solid ${C.line}`,
        }}
      >
        <span>Base subscription</span>
        <strong>$2,000.00</strong>
      </div>
      <div
        style={{
          border: `1px dashed #CD9D74`,
          borderRadius: 6,
          padding: "17px 15px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: C.warm,
          color: C.warning,
          fontSize: 18,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.clay,
          }}
        />
        No usage overage line
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          paddingTop: 28,
        }}
      >
        <span>Total invoiced</span>
        <strong>$2,000.00</strong>
      </div>
    </div>
  );
}
function Workbench({
  progress = 1,
  credit = 1,
  review = 1,
}: {
  progress?: number;
  credit?: number;
  review?: number;
}) {
  return (
    <div
      style={{
        ...panel,
        width: 1080,
        height: 662,
        overflow: "hidden",
        background: "#FCFDF9",
        fontFamily: "IBM Plex Sans",
      }}
    >
      <div
        style={{
          height: 60,
          borderBottom: `1px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 22px",
          background: "#F8F9F5",
        }}
      >
        <CanvasImage
          src={staticFile("earnedline.svg")}
          style={{ width: 151, height: 31 }}
        />
        <span style={{ fontSize: 15, color: C.muted }}>
          Contract-to-invoice review
        </span>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: C.olive,
            color: "white",
            display: "grid",
            placeItems: "center",
            fontSize: 13,
          }}
        >
          MC
        </div>
      </div>
      <div style={{ display: "flex", height: 600 }}>
        <div
          style={{
            width: 145,
            borderRight: `1px solid ${C.line}`,
            padding: "22px 17px",
            fontSize: 15,
            color: C.muted,
          }}
        >
          <div style={{ marginBottom: 26 }}>Review desk</div>
          {[
            "Overview",
            "Contracts",
            "Usage",
            "Invoices",
            "Review",
            "Reports",
          ].map((x, i) => (
            <div
              key={x}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                padding: "14px 9px",
                marginBottom: 8,
                borderRadius: 6,
                background: i === 4 ? "#E9EDE2" : "transparent",
                color: i === 4 ? C.ink : C.muted,
              }}
            >
              <Icon
                type={i === 2 ? "bars" : i === 1 || i === 3 ? "file" : "grid"}
                size={17}
              />
              {x}
            </div>
          ))}
        </div>
        <div
          style={{
            width: 651,
            padding: "30px 24px",
            borderRight: `1px solid ${C.line}`,
          }}
        >
          <div style={{ fontSize: 14, color: C.muted, marginBottom: 13 }}>
            ← Back to review queue
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontFamily: "Manrope",
                fontSize: 32,
                lineHeight: 1.15,
                letterSpacing: "-.045em",
                fontWeight: 650,
                margin: 0,
              }}
            >
              Contract to
              <br />
              invoice review
            </h2>
            <Pill>DEMO RECORD</Pill>
          </div>
          <p style={{ fontSize: 17, color: C.muted, margin: "13px 0 23px" }}>
            Acme Analytics · CT-22 · September 2026
          </p>
          <div style={{ display: "flex", gap: 11 }}>
            {[
              {
                name: "Signed clause",
                id: "C-22",
                big: "10,000",
                small: "events included",
                detail: "$0.04 / additional event",
              },
              {
                name: "Usage",
                id: "USG-SEP22",
                big: "12,000",
                small: "events metered",
                detail: "2,000 additional events",
              },
              {
                name: "Invoice",
                id: "I-88",
                big: "$2,000",
                small: "base fee only",
                detail: "No overage invoice line",
              },
            ].map((x, i) => (
              <div
                key={x.name}
                style={{
                  width: 194,
                  height: 164,
                  padding: 16,
                  border: `1px solid ${C.line}`,
                  borderRadius: 9,
                  background: "#F7F8F3",
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 5 }}>
                  {x.name}
                </div>
                <div style={{ fontSize: 13, color: C.muted }}>{x.id}</div>
                <div
                  style={{
                    fontFamily: "Manrope",
                    fontSize: 29,
                    fontWeight: 650,
                    letterSpacing: "-.04em",
                    marginTop: 16,
                  }}
                >
                  {x.big}
                </div>
                <div style={{ fontSize: 14 }}>{x.small}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 13 }}>
                  {x.detail}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              opacity: progress,
              translate: `0 ${(1 - progress) * 20}px`,
              marginTop: 17,
              padding: "17px 19px",
              border: "1px solid #EFCCAB",
              background: C.warm,
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                flexShrink: 0,
                background: C.warning,
                borderRadius: "50%",
                color: "white",
                fontSize: 25,
                display: "grid",
                placeItems: "center",
              }}
            >
              !
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 23,
                  fontWeight: 600,
                  letterSpacing: "-.025em",
                }}
              >
                $80 candidate discrepancy
              </div>
              <div style={{ fontSize: 15, color: C.warning, marginTop: 6 }}>
                2,000 additional events × $0.04
              </div>
            </div>
            <Pill warning>NOT VERIFIED</Pill>
          </div>
          <div
            style={{
              opacity: credit,
              translate: `0 ${(1 - credit) * 20}px`,
              marginTop: 12,
              padding: "16px 19px",
              border: `1px solid ${C.line}`,
              background: "#F9FAF6",
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <Icon type="file" size={35} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                $40 existing credit · CR-40
              </div>
              <div style={{ fontSize: 14, color: C.muted, marginTop: 5 }}>
                Applicability pending. Net amount requires review.
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 20 }}>
            Sources: CT-22 / C-22 · USG-SEP22 · I-88 · CR-40
          </div>
        </div>
        <div
          style={{
            width: 284,
            padding: "28px 20px",
            background: "white",
            opacity: review,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            Review<Pill>HELD</Pill>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              margin: "27px 0",
            }}
          >
            <div
              style={{
                background: C.citron,
                width: 42,
                height: 42,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontSize: 16,
              }}
            >
              MC
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>Mira Chen</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
                Finance reviewer · fictional
              </div>
            </div>
          </div>
          <div
            style={{
              background: C.warm,
              padding: "16px 15px",
              borderRadius: 8,
              color: C.warning,
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 600 }}>
              Held for finance review
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.5, marginTop: 6 }}>
              Historical billability has
              <br />
              not been assessed.
            </div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, margin: "26px 0 13px" }}>
            Evidence
          </div>
          {[
            "Executed clause C-22",
            "Usage export USG-SEP22",
            "Invoice I-88",
            "Credit note CR-40",
          ].map((x) => (
            <div
              key={x}
              style={{
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 0",
              }}
            >
              <Icon type="file" size={17} />
              {x}
            </div>
          ))}
          <div
            style={{
              background: "#EEF0E9",
              border: `1px solid ${C.line}`,
              borderRadius: 7,
              padding: "13px 10px",
              textAlign: "center",
              fontSize: 15,
              color: C.muted,
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
            }}
          >
            <Icon type="lock" size={17} />
            Correction export held
          </div>
          <div
            style={{
              fontSize: 12,
              color: C.muted,
              lineHeight: 1.5,
              marginTop: 10,
            }}
          >
            Requires finance and contract / legal approval.
          </div>
        </div>
      </div>
    </div>
  );
}
function FrameChrome() {
  return (
    <>
      <div style={{ position: "absolute", left: 55, top: 36 }}>
        <CanvasImage
          src={staticFile("earnedline.svg")}
          style={{ width: 190, height: 39 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 55,
          top: 39,
          fontFamily: "IBM Plex Sans",
          fontSize: 15,
          letterSpacing: ".07em",
          color: C.olive,
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            background: C.olive,
            borderRadius: "50%",
          }}
        />
        DEMO — SYNTHETIC DATA<span style={{ color: "#B5BCAF" }}>│</span>CONCEPT
        PREVIEW
      </div>
      <div
        style={{
          position: "absolute",
          left: 55,
          right: 55,
          bottom: 30,
          paddingTop: 15,
          borderTop: `1px solid ${C.line}`,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "IBM Plex Sans",
          fontSize: 16,
          color: C.muted,
        }}
      >
        <span>Illustrative source records. No operating product.</span>
        <span>No invoice or customer message is sent.</span>
      </div>
    </>
  );
}
function Film() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const spread = interpolate(t, [3.4, 4.7], [0, 1], edge);
  const returnDoc = interpolate(t, [17.1, 17.97], [0, 1], edge);
  const stage = spread * (1 - returnDoc);
  const showWorkbench = interpolate(
    t,
    [9.1, 10.3, 17.1, 17.85],
    [0, 1, 1, 0],
    edge,
  );
  const showSources = interpolate(t, [4.0, 4.9, 9.3, 10.3], [0, 1, 1, 0], edge);
  const showInvoice = interpolate(t, [6.8, 7.6, 9.3, 10.3], [0, 1, 1, 0], edge);
  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        color: C.ink,
        fontFamily: "IBM Plex Sans",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#B8C2AD 0.8px, transparent 0.8px)",
          backgroundSize: "23px 23px",
          opacity: 0.13,
        }}
      />
      <FrameChrome />
      <div
        style={{
          position: "absolute",
          top: 97,
          left: 55,
          fontFamily: "Manrope",
          fontSize: 30,
          fontWeight: 550,
          letterSpacing: "-.045em",
          opacity: interpolate(t, [0, 3.4, 4.2], [1, 1, 0], edge),
        }}
      >
        Start with what was signed.
      </div>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 55,
          fontFamily: "Manrope",
          fontSize: 30,
          fontWeight: 550,
          letterSpacing: "-.045em",
          opacity: interpolate(t, [4.1, 4.8, 9, 9.8], [0, 1, 1, 0], edge),
        }}
      >
        Then compare what was used and billed.
      </div>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 55,
          fontFamily: "Manrope",
          fontSize: 30,
          fontWeight: 550,
          letterSpacing: "-.045em",
          opacity: interpolate(t, [9.6, 10.3, 17.1, 17.7], [0, 1, 1, 0], edge),
        }}
      >
        A missing line becomes a reviewable decision.
      </div>
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 153,
          scale: interpolate(t, [9.1, 10.5], [0.94, 1], edge),
          opacity: showWorkbench,
          transformOrigin: "right center",
          translate: `0 ${interpolate(t, [9.1, 10.5], [30, 0], edge)}px`,
        }}
      >
        <Workbench
          progress={interpolate(t, [10.5, 11.3], [0, 1], edge)}
          credit={interpolate(t, [12.3, 13.1], [0, 1], edge)}
          review={interpolate(t, [10.2, 11.0], [0, 1], edge)}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: interpolate(stage, [0, 1], [424, 45]),
          top: interpolate(stage, [0, 1], [148, 259]),
          scale: interpolate(stage, [0, 1], [1, 0.6]),
          rotate: interpolate(stage, [0, 1], ["0deg", "-3deg"]),
          transformOrigin: "top left",
          opacity: 1,
        }}
      >
        <ClauseDocument
          highlight={interpolate(
            t,
            [1.1, 2.4, 17.2, 17.97],
            [0, 1, 1, 0],
            edge,
          )}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: interpolate(t, [4, 5, 7, 7.7], [700, 535, 535, 443], edge),
          top: interpolate(t, [4, 5, 7, 7.7], [300, 243, 243, 247], edge),
          opacity: showSources,
          scale: interpolate(t, [4, 5, 7, 7.7], [0.93, 1, 1, 0.96], edge),
          transformOrigin: "top left",
        }}
      >
        <UsageCard meter={interpolate(t, [4.7, 5.9], [0, 1], edge)} />
      </div>
      <div
        style={{
          position: "absolute",
          left: interpolate(t, [6.8, 7.7], [1150, 936], edge),
          top: 247,
          opacity: showInvoice,
          scale: interpolate(t, [6.8, 7.7], [0.93, 0.96], edge),
          transformOrigin: "top left",
        }}
      >
        <InvoiceCard />
      </div>
      <div
        style={{
          position: "absolute",
          top: 747,
          left: 450,
          fontSize: 20,
          color: C.warning,
          opacity: interpolate(t, [7.8, 8.5, 9.4, 10.1], [0, 1, 1, 0], edge),
        }}
      >
        2,000 additional events × $0.04 = $80 candidate gap{" "}
        <span style={{ marginLeft: 20 }}>
          <Pill warning>NOT VERIFIED</Pill>
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 99,
          left: 55,
          fontFamily: "Manrope",
          fontSize: 30,
          fontWeight: 550,
          letterSpacing: "-.045em",
          opacity: interpolate(t, [17.2, 17.97], [0, 1], edge),
        }}
      >
        Start with what was signed.
      </div>
    </AbsoluteFill>
  );
}
function Poster() {
  return (
    <AbsoluteFill
      style={{ background: C.paper, color: C.ink, fontFamily: "IBM Plex Sans" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#B8C2AD 0.8px, transparent 0.8px)",
          backgroundSize: "23px 23px",
          opacity: 0.13,
        }}
      />
      <FrameChrome />
      <div
        style={{
          position: "absolute",
          left: 55,
          top: 99,
          fontFamily: "Manrope",
          fontSize: 30,
          fontWeight: 550,
          letterSpacing: "-.045em",
        }}
      >
        A missing line becomes a reviewable decision.
      </div>
      <div style={{ position: "absolute", left: 300, top: 153 }}>
        <Workbench />
      </div>
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 259,
          scale: 0.6,
          rotate: "-3deg",
          transformOrigin: "top left",
        }}
      >
        <ClauseDocument />
      </div>
    </AbsoluteFill>
  );
}
function MobilePoster() {
  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        color: C.ink,
        fontFamily: "IBM Plex Sans",
        padding: 36,
      }}
    >
      <CanvasImage
        src={staticFile("earnedline.svg")}
        style={{ width: 195, height: 40 }}
      />
      <div style={{ ...micro, fontSize: 13, margin: "27px 0 28px" }}>
        DEMO — SYNTHETIC DATA
      </div>
      <h2
        style={{
          fontFamily: "Manrope",
          fontSize: 46,
          lineHeight: 1.11,
          letterSpacing: "-.05em",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Evidence before
        <br />
        correction.
      </h2>
      <div style={{ ...panel, padding: 25, marginTop: 31 }}>
        <div style={{ ...micro, fontSize: 12 }}>
          CT-22 / C-22 · signed clause
        </div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>
          Signed 12 Aug 2026 · Effective 01 Sep 2026
        </div>
        <div style={{ fontSize: 20, lineHeight: 1.6, marginTop: 15 }}>
          <mark style={{ background: C.citron, padding: "3px 5px" }}>
            10,000 events included
          </mark>
          <br />
          <mark style={{ background: C.citron, padding: "3px 5px" }}>
            $0.04 per additional event
          </mark>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <div style={{ ...panel, width: "50%", padding: 20 }}>
          <div style={{ fontSize: 12, color: C.muted }}>USAGE · USG-SEP22</div>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "-.05em",
              marginTop: 9,
            }}
          >
            12,000
          </div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 5 }}>
            events metered
          </div>
        </div>
        <div style={{ ...panel, width: "50%", padding: 20 }}>
          <div style={{ fontSize: 12, color: C.muted }}>INVOICE · I-88</div>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "-.05em",
              marginTop: 9,
            }}
          >
            $2,000
          </div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 5 }}>
            base fee only
          </div>
        </div>
      </div>
      <div
        style={{
          border: "1px solid #EFCCAB",
          background: C.warm,
          borderRadius: 12,
          padding: 22,
          marginTop: 14,
        }}
      >
        <div
          style={{
            fontFamily: "Manrope",
            fontSize: 29,
            fontWeight: 650,
            letterSpacing: "-.03em",
          }}
        >
          $80 candidate gap
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 15,
            color: C.warning,
            marginTop: 14,
          }}
        >
          <span>2,000 events × $0.04</span>
          <Pill warning>NOT VERIFIED</Pill>
        </div>
      </div>
      <div style={{ ...panel, padding: 21, marginTop: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          $40 existing credit · CR-40
        </div>
        <div style={{ fontSize: 15, color: C.muted, marginTop: 6 }}>
          Applicability pending. Net requires review.
        </div>
      </div>
      <div
        style={{
          background: "#E9EDE2",
          borderRadius: 12,
          padding: 22,
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Icon type="lock" size={25} color={C.olive} />
        <div>
          <div style={{ fontSize: 19, fontWeight: 600 }}>
            Held for finance review
          </div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 5 }}>
            Correction export held.
          </div>
        </div>
      </div>
      <div
        style={{ fontSize: 14, lineHeight: 1.5, color: C.muted, marginTop: 19 }}
      >
        No invoice or customer message is sent.
        <br />
        Concept preview · fictional records only.
      </div>
    </AbsoluteFill>
  );
}
function MobileFilm() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const outro = interpolate(t, [17.2, 17.97], [1, 0], edge);
  const highlight = interpolate(t, [1.1, 2.4, 17.3, 17.97], [0, 1, 1, 0], edge);
  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        color: C.ink,
        fontFamily: "IBM Plex Sans",
        padding: 36,
      }}
    >
      <CanvasImage
        src={staticFile("earnedline.svg")}
        style={{ width: 195, height: 40 }}
      />
      <div
        style={{
          position: "absolute",
          top: 43,
          right: 36,
          fontSize: 11,
          letterSpacing: ".08em",
          color: C.muted,
        }}
      >
        CONCEPT PREVIEW
      </div>
      <div style={{ position: "absolute", top: 98, right: 36 }}>
        <Pill warning>NOT VERIFIED</Pill>
      </div>
      <div style={{ ...micro, fontSize: 13, margin: "27px 0 28px" }}>
        DEMO — SYNTHETIC DATA
      </div>
      <h2
        style={{
          fontFamily: "Manrope",
          fontSize: 46,
          lineHeight: 1.11,
          letterSpacing: "-.05em",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Evidence before
        <br />
        correction.
      </h2>
      <div style={{ ...panel, padding: 25, marginTop: 31 }}>
        <div style={{ ...micro, fontSize: 12 }}>
          CT-22 / C-22 · signed clause
        </div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>
          Signed 12 Aug 2026 · Effective 01 Sep 2026
        </div>
        <div style={{ fontSize: 20, lineHeight: 1.6, marginTop: 15 }}>
          <mark
            style={{
              background: "transparent",
              padding: "3px 5px",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: C.citron,
                clipPath: `inset(0 ${100 - highlight * 100}% 0 0)`,
              }}
            />
            <span style={{ position: "relative" }}>10,000 events included</span>
          </mark>
          <br />
          <mark
            style={{
              background: "transparent",
              padding: "3px 5px",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: C.citron,
                clipPath: `inset(0 ${100 - highlight * 100}% 0 0)`,
              }}
            />
            <span style={{ position: "relative" }}>
              $0.04 per additional event
            </span>
          </mark>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <div
          style={{
            ...panel,
            width: "50%",
            padding: 20,
            opacity: interpolate(t, [4.1, 4.9], [0, 1], edge) * outro,
            translate: `${interpolate(t, [4.1, 4.9], [-20, 0], edge)}px 0`,
          }}
        >
          <div style={{ fontSize: 12, color: C.muted }}>USAGE · USG-SEP22</div>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "-.05em",
              marginTop: 9,
            }}
          >
            12,000
          </div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 5 }}>
            events metered
          </div>
        </div>
        <div
          style={{
            ...panel,
            width: "50%",
            padding: 20,
            opacity: interpolate(t, [6.5, 7.3], [0, 1], edge) * outro,
            translate: `${interpolate(t, [6.5, 7.3], [20, 0], edge)}px 0`,
          }}
        >
          <div style={{ fontSize: 12, color: C.muted }}>INVOICE · I-88</div>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "-.05em",
              marginTop: 9,
            }}
          >
            $2,000
          </div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 5 }}>
            base fee only
          </div>
        </div>
      </div>
      <div
        style={{
          border: "1px solid #EFCCAB",
          background: C.warm,
          borderRadius: 12,
          padding: 22,
          marginTop: 14,
          opacity: interpolate(t, [9.5, 10.3], [0, 1], edge) * outro,
          clipPath: `inset(${interpolate(t, [9.5, 10.3], [100, 0], edge)}% 0 0 0 round 12px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Manrope",
            fontSize: 29,
            fontWeight: 650,
            letterSpacing: "-.03em",
          }}
        >
          $80 candidate gap
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 15,
            color: C.warning,
            marginTop: 14,
          }}
        >
          <span>2,000 events × $0.04</span>
          <Pill warning>NOT VERIFIED</Pill>
        </div>
      </div>
      <div
        style={{
          ...panel,
          padding: 21,
          marginTop: 14,
          opacity: interpolate(t, [12.3, 13.1], [0, 1], edge) * outro,
          translate: `0 ${interpolate(t, [12.3, 13.1], [20, 0], edge)}px`,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          $40 existing credit · CR-40
        </div>
        <div style={{ fontSize: 15, color: C.muted, marginTop: 6 }}>
          Applicability pending. Net requires review.
        </div>
      </div>
      <div
        style={{
          background: "#E9EDE2",
          borderRadius: 12,
          padding: 22,
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: interpolate(t, [14.2, 15], [0, 1], edge) * outro,
          scale: interpolate(t, [14.2, 15], [0.97, 1], edge),
        }}
      >
        <Icon type="lock" size={25} color={C.olive} />
        <div>
          <div style={{ fontSize: 19, fontWeight: 600 }}>
            Held for finance review
          </div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 5 }}>
            Correction export held.
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
            Finance + contract/legal approval required.
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          color: C.muted,
          position: "absolute",
          left: 36,
          right: 36,
          bottom: 28,
        }}
      >
        No invoice or customer message is sent.
        <br />
        Concept preview · fictional records only.
      </div>
    </AbsoluteFill>
  );
}
export const MyComposition = () => (
  <>
    <style>{`*{box-sizing:border-box}`}</style>
    <Composition
      id="EarnedLineHero"
      component={Film}
      durationInFrames={540}
      fps={30}
      width={1440}
      height={900}
    />
    <Composition
      id="EarnedLineMobileHero"
      component={MobileFilm}
      durationInFrames={540}
      fps={30}
      width={540}
      height={1080}
    />
    <Still id="EarnedLinePoster" component={Poster} width={1440} height={900} />
    <Still
      id="EarnedLineMobile"
      component={MobilePoster}
      width={540}
      height={1080}
    />
  </>
);
