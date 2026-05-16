// "use client";

// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const HeroSection = () => {
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const imageElement = imageRef.current;

//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const scrollThreshold = 100;

//       if (scrollPosition > scrollThreshold) {
//         imageElement.classList.add("scrolled");
//       } else {
//         imageElement.classList.remove("scrolled");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="pt-40 pb-20 px-4">
//       <div className="container mx-auto text-center">
//         <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
//           Manage Your Finances <br /> with Intelligence
//         </h1>
//         <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//           An AI-powered financial management platform that helps you track,
//           analyze, and optimize your spending with real-time insights.
//         </p>
//         <div className="flex justify-center space-x-4">
//           <Link href="/dashboard">
//             <Button size="lg" className="px-8">
//               Get Started
//             </Button>
//           </Link>
          
//         </div>
//         <div className="hero-image-wrapper mt-5 md:mt-0">
//           <div ref={imageRef} className="hero-image">
//             <Image
//               src="/banner.jpeg"
//               width={1280}
//               height={720}
//               alt="Dashboard Preview"
//               className="rounded-lg shadow-2xl border mx-auto"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// /* ─────────────────────────────────────────
//    Tiny sparkline — SVG path drawn from data
//    ───────────────────────────────────────── */
// function Sparkline({ data, color = "#6366f1", width = 120, height = 40 }) {
//   const max = Math.max(...data);
//   const min = Math.min(...data);
//   const range = max - min || 1;
//   const pts = data
//     .map((v, i) => {
//       const x = (i / (data.length - 1)) * width;
//       const y = height - ((v - min) / range) * height;
//       return `${x},${y}`;
//     })
//     .join(" ");
//   const fill = `${pts} ${width},${height} 0,${height}`;

//   return (
//     <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
//       <defs>
//         <linearGradient id={`g-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
//           <stop offset="0%" stopColor={color} stopOpacity="0.3" />
//           <stop offset="100%" stopColor={color} stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       <polygon points={fill} fill={`url(#g-${color.replace("#", "")})`} />
//       <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// /* ─────────────────────────────────────────
//    Animated bar chart (vertical bars)
//    ───────────────────────────────────────── */
// function AnimatedBarChart({ data, colors }) {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => { setTimeout(() => setMounted(true), 300); }, []);
//   const max = Math.max(...data);

//   return (
//     <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "64px" }}>
//       {data.map((v, i) => (
//         <div
//           key={i}
//           style={{
//             flex: 1,
//             borderRadius: "4px 4px 0 0",
//             background: colors[i % colors.length],
//             height: mounted ? `${(v / max) * 100}%` : "4px",
//             transition: `height 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms`,
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    Donut chart (CSS conic-gradient)
//    ───────────────────────────────────────── */
// function DonutChart({ segments }) {
//   const total = segments.reduce((s, c) => s + c.value, 0);
//   let acc = 0;
//   const stops = segments.map(({ value, color }) => {
//     const start = (acc / total) * 360;
//     acc += value;
//     const end = (acc / total) * 360;
//     return `${color} ${start}deg ${end}deg`;
//   });

//   return (
//     <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           borderRadius: "50%",
//           background: `conic-gradient(${stops.join(", ")})`,
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           inset: "16px",
//           borderRadius: "50%",
//           background: "var(--dash-card)",
//         }}
//       />
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    Floating particle dots (decorative)
//    ───────────────────────────────────────── */
// function Particle({ style }) {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         borderRadius: "50%",
//         background: "currentColor",
//         opacity: 0.15,
//         animation: "floatDot 6s ease-in-out infinite",
//         ...style,
//       }}
//     />
//   );
// }

// /* ─────────────────────────────────────────
//    Animated counter
//    ───────────────────────────────────────── */
// function AnimCounter({ target, prefix = "", suffix = "", duration = 1800 }) {
//   const [val, setVal] = useState(0);
//   const started = useRef(false);
//   useEffect(() => {
//     if (started.current) return;
//     started.current = true;
//     const start = performance.now();
//     const tick = (now) => {
//       const p = Math.min((now - start) / duration, 1);
//       const ease = 1 - Math.pow(1 - p, 3);
//       setVal(Math.round(ease * target));
//       if (p < 1) requestAnimationFrame(tick);
//     };
//     setTimeout(() => requestAnimationFrame(tick), 500);
//   }, [target, duration]);

//   return <>{prefix}{val.toLocaleString()}{suffix}</>;
// }

// /* ─────────────────────────────────────────
//    Main HeroSection
//    ───────────────────────────────────────── */
// const HeroSection = () => {
//   const spendData = [42, 61, 55, 78, 66, 90, 74, 88, 95, 82, 97, 110];
//   const incomeData = [80, 85, 90, 88, 95, 100, 98, 105, 110, 108, 115, 120];
//   const barData = [55, 80, 65, 90, 72, 95, 84];
//   const barColors = ["#818cf8", "#6366f1", "#818cf8", "#4f46e5", "#6366f1", "#4338ca", "#818cf8"];
//   const donutSegments = [
//     { value: 45, color: "#6366f1" },
//     { value: 25, color: "#818cf8" },
//     { value: 20, color: "#a5b4fc" },
//     { value: 10, color: "#c7d2fe" },
//   ];

//   const txns = [
//     { name: "Netflix", cat: "Entertainment", amt: "-$15.99", icon: "▶", color: "#6366f1" },
//     { name: "Whole Foods", cat: "Groceries", amt: "-$84.32", icon: "🛒", color: "#10b981" },
//     { name: "Salary", cat: "Income", amt: "+$5,200", icon: "💼", color: "#f59e0b", positive: true },
//     { name: "Uber", cat: "Transport", amt: "-$12.50", icon: "🚗", color: "#ef4444" },
//   ];

//   return (
//     <>
//       {/* ── Global keyframes ── */}
//       <style>{`
//         @keyframes floatDot {
//           0%, 100% { transform: translateY(0px) scale(1); }
//           50% { transform: translateY(-18px) scale(1.1); }
//         }
//         @keyframes slideInUp {
//           from { opacity: 0; transform: translateY(32px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulseGlow {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.25); }
//           50%       { box-shadow: 0 0 0 12px rgba(99,102,241,0); }
//         }
//         @keyframes shimmer {
//           0%   { background-position: -400px 0; }
//           100% { background-position: 400px 0; }
//         }
//         @keyframes scanLine {
//           0%   { top: 0%; opacity: 0.6; }
//           80%  { opacity: 0.6; }
//           100% { top: 100%; opacity: 0; }
//         }
//         @keyframes blink {
//           0%,100% { opacity: 1; } 50% { opacity: 0.3; }
//         }
//         .dash-card {
//           background: var(--dash-card, rgba(255,255,255,0.85));
//           border: 1px solid rgba(99,102,241,0.15);
//           border-radius: 16px;
//           backdrop-filter: blur(12px);
//           animation: slideInUp 0.6s ease both;
//         }
//         @media (prefers-color-scheme: dark) {
//           :root { --dash-card: rgba(20,20,35,0.85); }
//         }
//         :root { --dash-card: rgba(255,255,255,0.85); }
//       `}</style>

//       <section style={{ paddingTop: "10rem", paddingBottom: "5rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
//         <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>

//           {/* ── Headline ── */}
//           <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
//             Manage Your Finances <br /> with Intelligence
//           </h1>
//           <p style={{ fontSize: "1.2rem", color: "#6b7280", marginBottom: "2rem", maxWidth: "560px", margin: "0 auto 2rem" }}>
//             An AI-powered financial management platform that helps you track,
//             analyze, and optimize your spending with real-time insights.
//           </p>

//           {/* ── CTA ── */}
//           <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3.5rem" }}>
//             <Link href="/dashboard">
//               <Button size="lg" style={{ padding: "0 2rem", animation: "pulseGlow 3s ease infinite" }}>
//                 Get Started
//               </Button>
//             </Link>
//           </div>

//           {/* ════════════════════════════════════════
//               ANIMATED DASHBOARD VISUALIZATION
//               ════════════════════════════════════════ */}
//           <div
//             style={{
//               position: "relative",
//               maxWidth: "900px",
//               margin: "0 auto",
//               borderRadius: "24px",
//               padding: "2px",
//               background: "linear-gradient(135deg,rgba(99,102,241,0.6) 0%,rgba(168,85,247,0.4) 50%,rgba(59,130,246,0.5) 100%)",
//               boxShadow: "0 40px 80px rgba(99,102,241,0.25), 0 8px 32px rgba(0,0,0,0.12)",
//             }}
//           >
//             {/* scan-line effect */}
//             <div
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 borderRadius: "24px",
//                 overflow: "hidden",
//                 pointerEvents: "none",
//                 zIndex: 10,
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",
//                   left: 0,
//                   right: 0,
//                   height: "2px",
//                   background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)",
//                   animation: "scanLine 4s ease-in-out infinite",
//                 }}
//               />
//             </div>

//             {/* decorative particles */}
//             <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "24px", pointerEvents: "none" }}>
//               {[
//                 { width: 8, height: 8, top: "10%", left: "5%", color: "#6366f1", animationDelay: "0s" },
//                 { width: 6, height: 6, top: "70%", left: "8%", color: "#8b5cf6", animationDelay: "1.5s" },
//                 { width: 10, height: 10, top: "20%", right: "6%", color: "#3b82f6", animationDelay: "0.8s" },
//                 { width: 5, height: 5, top: "80%", right: "10%", color: "#6366f1", animationDelay: "2.2s" },
//                 { width: 7, height: 7, top: "45%", left: "3%", color: "#a78bfa", animationDelay: "3s" },
//               ].map((p, i) => (
//                 <Particle key={i} style={p} />
//               ))}
//             </div>

//             {/* inner dashboard surface */}
//             <div
//               style={{
//                 borderRadius: "22px",
//                 background: "linear-gradient(180deg,#f8f7ff 0%,#f1f0ff 100%)",
//                 overflow: "hidden",
//                 padding: "1.5rem",
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr 1fr",
//                 gridTemplateRows: "auto auto",
//                 gap: "1rem",
//               }}
//             >

//               {/* ── Top bar header ── */}
//               <div
//                 style={{
//                   gridColumn: "1 / -1",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginBottom: "0.25rem",
//                 }}
//               >
//                 <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//                   <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: 700 }}>F</div>
//                   <span style={{ fontWeight: 600, fontSize: 14, color: "#1e1b4b" }}>FinanceAI Dashboard</span>
//                 </div>
//                 <div style={{ display: "flex", gap: 6 }}>
//                   {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
//                     <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
//                   ))}
//                 </div>
//               </div>

//               {/* ── Metric card: Balance ── */}
//               <div
//                 className="dash-card"
//                 style={{
//                   padding: "1rem",
//                   gridColumn: "1 / 3",
//                   animationDelay: "0.1s",
//                   background: "linear-gradient(135deg,#6366f1 0%,#4f46e5 100%)",
//                   border: "none",
//                   color: "#fff",
//                   position: "relative",
//                   overflow: "hidden",
//                 }}
//               >
//                 <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
//                 <div style={{ position: "absolute", bottom: -30, right: 20, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
//                 <p style={{ fontSize: 11, opacity: 0.8, margin: 0, letterSpacing: "0.08em", textTransform: "uppercase" }}>Total Balance</p>
//                 <p style={{ fontSize: 28, fontWeight: 700, margin: "4px 0 0", letterSpacing: "-0.02em" }}>
//                   $<AnimCounter target={48250} />
//                 </p>
//                 <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
//                   <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>↑ +12.4%</span>
//                   <span style={{ fontSize: 11, opacity: 0.7 }}>vs last month</span>
//                 </div>
//               </div>

//               {/* ── Metric card: Savings ── */}
//               <div className="dash-card" style={{ padding: "1rem", animationDelay: "0.2s" }}>
//                 <p style={{ fontSize: 11, color: "#6b7280", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Savings Goal</p>
//                 <p style={{ fontSize: 20, fontWeight: 700, margin: "4px 0 0", color: "#1e1b4b" }}>
//                   <AnimCounter target={68} suffix="%" />
//                 </p>
//                 <div style={{ marginTop: 8, background: "#e0e7ff", borderRadius: 4, height: 6 }}>
//                   <div style={{ height: "100%", width: "68%", borderRadius: 4, background: "linear-gradient(90deg,#6366f1,#818cf8)", transition: "width 1.5s ease" }} />
//                 </div>
//                 <p style={{ fontSize: 10, color: "#9ca3af", margin: "4px 0 0" }}>$6,800 / $10,000</p>
//               </div>

//               {/* ── Spending chart ── */}
//               <div className="dash-card" style={{ padding: "1rem", gridColumn: "1 / 2", animationDelay: "0.3s" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//                   <p style={{ fontSize: 12, fontWeight: 600, color: "#374151", margin: 0 }}>Spending</p>
//                   <span style={{ fontSize: 10, color: "#ef4444", background: "#fef2f2", padding: "2px 6px", borderRadius: 8 }}>-8.2%</span>
//                 </div>
//                 <Sparkline data={spendData} color="#ef4444" width={160} height={48} />
//               </div>

//               {/* ── Income chart ── */}
//               <div className="dash-card" style={{ padding: "1rem", gridColumn: "2 / 3", animationDelay: "0.35s" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//                   <p style={{ fontSize: 12, fontWeight: 600, color: "#374151", margin: 0 }}>Income</p>
//                   <span style={{ fontSize: 10, color: "#10b981", background: "#f0fdf4", padding: "2px 6px", borderRadius: 8 }}>+5.1%</span>
//                 </div>
//                 <Sparkline data={incomeData} color="#10b981" width={160} height={48} />
//               </div>

//               {/* ── Portfolio donut ── */}
//               <div className="dash-card" style={{ padding: "1rem", gridColumn: "3 / 4", gridRow: "2 / 4", animationDelay: "0.4s" }}>
//                 <p style={{ fontSize: 12, fontWeight: 600, color: "#374151", margin: "0 0 12px" }}>Portfolio</p>
//                 <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
//                   <DonutChart segments={donutSegments} />
//                 </div>
//                 {[
//                   { label: "Stocks", pct: "45%", color: "#6366f1" },
//                   { label: "ETFs", pct: "25%", color: "#818cf8" },
//                   { label: "Crypto", pct: "20%", color: "#a5b4fc" },
//                   { label: "Cash", pct: "10%", color: "#c7d2fe" },
//                 ].map((item) => (
//                   <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                       <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
//                       <span style={{ fontSize: 11, color: "#6b7280" }}>{item.label}</span>
//                     </div>
//                     <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{item.pct}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* ── Weekly bar chart ── */}
//               <div className="dash-card" style={{ padding: "1rem", gridColumn: "1 / 3", animationDelay: "0.45s" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
//                   <p style={{ fontSize: 12, fontWeight: 600, color: "#374151", margin: 0 }}>Weekly Activity</p>
//                   <span style={{ fontSize: 10, color: "#6b7280" }}>Mon–Sun</span>
//                 </div>
//                 <AnimatedBarChart data={barData} colors={barColors} />
//                 <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
//                   {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
//                     <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 9, color: "#9ca3af" }}>{d}</span>
//                   ))}
//                 </div>
//               </div>

//               {/* ── Recent transactions ── */}
//               <div className="dash-card" style={{ padding: "1rem", gridColumn: "1 / -1", animationDelay: "0.55s" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
//                   <p style={{ fontSize: 12, fontWeight: 600, color: "#374151", margin: 0 }}>Recent Transactions</p>
//                   <span style={{ fontSize: 10, color: "#6366f1", cursor: "pointer" }}>View all →</span>
//                 </div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
//                   {txns.map((t, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 10,
//                         padding: "8px 10px",
//                         background: "#f8f7ff",
//                         borderRadius: 10,
//                         animationDelay: `${0.6 + i * 0.08}s`,
//                       }}
//                     >
//                       <div style={{ width: 30, height: 30, borderRadius: 8, background: `${t.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{t.icon}</div>
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <p style={{ fontSize: 11, fontWeight: 600, color: "#1e1b4b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</p>
//                         <p style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>{t.cat}</p>
//                       </div>
//                       <span style={{ fontSize: 12, fontWeight: 700, color: t.positive ? "#10b981" : "#374151", flexShrink: 0 }}>{t.amt}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* ── AI insight banner ── */}
//               <div
//                 style={{
//                   gridColumn: "1 / -1",
//                   padding: "0.75rem 1rem",
//                   background: "linear-gradient(90deg,rgba(99,102,241,0.08),rgba(139,92,246,0.08))",
//                   border: "1px solid rgba(99,102,241,0.2)",
//                   borderRadius: 12,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 10,
//                   animationDelay: "0.7s",
//                 }}
//                 className="dash-card"
//               >
//                 <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                   <span style={{ fontSize: 13 }}>✦</span>
//                 </div>
//                 <div>
//                   <p style={{ fontSize: 11, fontWeight: 600, color: "#4338ca", margin: 0 }}>AI Insight</p>
//                   <p style={{ fontSize: 10, color: "#6b7280", margin: 0 }}>
//                     You could save <strong style={{ color: "#6366f1" }}>$340/mo</strong> by optimizing subscriptions &amp; dining.
//                   </p>
//                 </div>
//                 <span style={{ marginLeft: "auto", fontSize: 10, color: "#6366f1", cursor: "pointer", flexShrink: 0 }}>Optimize →</span>
//               </div>

//             </div>
//           </div>
//           {/* ─── end dashboard ─── */}
//         </div>
//       </section>
//     </>
//   );
// };

// export default HeroSection;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  PieChart, 
  LineChart, 
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Wallet,
  CreditCard,
  Building2
} from "lucide-react";

const HeroSection = () => {
  const animatedRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const metrics = [
    { label: "Total Balance", value: "₹12,84,500", change: "+8.2%", positive: true, icon: Wallet },
    { label: "Monthly Spend", value: "₹32,410", change: "-12%", positive: true, icon: TrendingDown },
    { label: "Savings Rate", value: "24%", change: "+5%", positive: true, icon: TrendingUp },
    { label: "Investments", value: "₹8,43,200", change: "+15.3%", positive: true, icon: LineChart },
  ];

  const transactions = [
    { name: "Spotify", amount: "₹129", date: "Today", category: "Entertainment", icon: "🎵" },
    { name: "Big Basket", amount: "₹843", date: "Yesterday", category: "Groceries", icon: "🛒" },
    { name: "Uber", amount: "₹245", date: "Dec 12", category: "Transport", icon: "🚗" },
    { name: "Swiggy", amount: "₹456", date: "Dec 11", category: "Food", icon: "🍔" },
  ];

  const aiInsights = [
    "AI predicts you'll save ₹4,500 this month",
    "Your dining budget is 20% below target",
    "Consider moving ₹5,000 to high-yield savings",
    "You spent 15% less on entertainment this week",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-40 pb-20 px-4 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[85px] pb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent font-bold">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Free
            </Button>
          </Link>
          
        </div>

        {/* Animated Dashboard Preview */}
        <div ref={animatedRef} className="mt-16 relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full" />
          
          <div className="relative max-w-6xl mx-auto">
            {/* Main Dashboard Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6 transform transition-all duration-500 hover:shadow-3xl">
              
              {/* Header with AI Badge */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">Dashboard</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                  <span className="text-xs font-medium text-purple-700 dark:text-purple-300">AI Active</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className={`text-sm font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full ${
                          metric.positive 
                            ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" 
                            : "text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30"
                        }`}>
                          {metric.change}
                          {metric.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{metric.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-slate-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <PieChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    Recent Transactions
                  </h3>
                  <div className="space-y-2">
                    {transactions.map((transaction, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all animate-in fade-in slide-in-from-left duration-500 cursor-pointer"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{transaction.icon}</div>
                          <div className="text-left">
                            <p className="text-slate-900 dark:text-white text-sm font-medium">{transaction.name}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs">{transaction.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-900 dark:text-white text-sm font-semibold">{transaction.amount}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">{transaction.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 mx-auto">
                    View all transactions
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>

                {/* AI Insights Carousel */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 rounded-xl p-4 relative overflow-hidden border border-purple-200 dark:border-purple-800">
                  <div className="absolute top-0 right-0 opacity-20">
                    <Sparkles className="h-16 w-16 text-purple-600 dark:text-purple-400 animate-pulse" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    AI Powered Insights
                  </h3>
                  <div className="relative h-28 overflow-hidden">
                    {aiInsights.map((insight, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-all duration-500 ${
                          activeCard === idx 
                            ? "opacity-100 translate-y-0" 
                            : "opacity-0 translate-y-8"
                        }`}
                      >
                        <div className="flex items-start gap-3 h-full">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium">
                              {insight}
                            </p>
                            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                              AI Recommendation
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Carousel Indicators */}
                  <div className="flex justify-center gap-2 mt-4">
                    {aiInsights.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCard(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeCard === idx 
                            ? "w-8 bg-gradient-to-r from-purple-600 to-blue-600" 
                            : "w-2 bg-purple-300 dark:bg-purple-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Bar */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      
                      
                    </div>
                    
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
                      🔒 secure
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
                      ⚡ Real-time updates
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
                      📊 Smart analytics
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute -top-4 -right-4 animate-bounce-slow">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 animate-bounce-slow animation-delay-300">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl">
                <IndianRupee className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="absolute top-1/2 -left-6 animate-ping-slow opacity-30">
              <div className="h-8 w-8 rounded-full bg-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ping-slow {
          0% { transform: scale(0.95); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.1; }
          100% { transform: scale(0.95); opacity: 0.3; }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animation-delay-300 {
          animation-delay: 1.5s;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;