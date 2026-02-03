import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const STRETCHES = [
  { id: 1, name: "Finger Walk – Flexion", desc: "Stand facing wall, walk fingers up slowly. Hold at end range 30 seconds.", time: "2 min", youtubeId: "PASTE_VIDEO_ID_1" },
  { id: 2, name: "Finger Walk – Abduction", desc: "Stand sideways to wall, walk fingers up laterally. Hold at end range 30 seconds.", time: "2 min", youtubeId: "PASTE_VIDEO_ID_2" },
  { id: 3, name: "External Rotation Stretch", desc: "Use doorway or towel, gently rotate shoulder outward. Hold 30 seconds.", time: "2 min", youtubeId: "PASTE_VIDEO_ID_3" },
  { id: 4, name: "Pectoral Stretch", desc: "Stand in doorway, arms on frame, lean forward gently. Hold 30 seconds.", time: "2 min", youtubeId: "PASTE_VIDEO_ID_4" },
  { id: 5, name: "Crossover Arm Stretch", desc: "Pull arm across chest with opposite hand. Hold 30 seconds.", time: "2 min", youtubeId: "PASTE_VIDEO_ID_5" },
  { id: 6, name: "Towel – Extension", desc: "Behind back, use towel to assist arm upward. Hold 30 seconds.", time: "2 min", youtubeId: "PASTE_VIDEO_ID_6" },
  { id: 7, name: "Towel – Internal Rotation", desc: "Up the back, use towel to assist rotation. Hold 30 seconds.", time: "2 min", youtubeId: "PASTE_VIDEO_ID_7" },
];

const STRENGTHENING = {
  8:  { id: 8,  name: "Scapular Setting", desc: "Squeeze shoulder blades together and hold 5 sec. 2×10 reps.", time: "3 min", youtubeId: "PASTE_VIDEO_ID_8", phases: [1,2,3] },
  9:  { id: 9,  name: "Isometric External Rotation", desc: "Press back of hand into doorframe, hold 5 sec. No movement. 2×10 reps.", time: "3 min", youtubeId: "PASTE_VIDEO_ID_9", phases: [1] },
  11: { id: 11, name: "Band External Rotation", desc: "Light band at door, rotate arm outward. 2 sec out, 3 sec back. 2×12 reps.", time: "3 min", youtubeId: "PASTE_VIDEO_ID_11", phases: [2,3] },
  12: { id: 12, name: "Scapular Rows", desc: "Band at chest height, pull elbows back, squeeze blades. 2×12 reps.", time: "3 min", youtubeId: "PASTE_VIDEO_ID_12", phases: [2,3] },
  13: { id: 13, name: "Prone I-Y-T", desc: "Face down, lift arms in I, Y, T positions. Thumbs up. 2×8 each position.", time: "4 min", youtubeId: "PASTE_VIDEO_ID_13", phases: [2,3] },
  15: { id: 15, name: "Lateral Raises", desc: "Light weights, raise arms to shoulder height. 2 sec up, 3 sec down. 2×12 reps.", time: "3 min", youtubeId: "PASTE_VIDEO_ID_15", phases: [3] },
};

const MOTOR = {
  10: { id: 10, name: "Scapular PNF Pattern", desc: "Retract + depress blades, hold 5 sec. Then protract. 2×10 each pattern.", time: "4 min", youtubeId: "PASTE_VIDEO_ID_10", phases: [1,2,3] },
  14: { id: 14, name: "Wall Angels", desc: "Back to wall, slide arms up in Y maintaining contact. 4 sec up/down. 2×10 reps.", time: "3 min", youtubeId: "PASTE_VIDEO_ID_14", phases: [2,3] },
  16: { id: 16, name: "Eccentric Control Drill", desc: "Good arm lifts affected arm to 90°. Slowly lower over 8–10 sec. 2×8 reps.", time: "3 min", youtubeId: "PASTE_VIDEO_ID_16", phases: [3] },
};

const PHASES = {
  1: {
    label: "Phase 1",
    subtitle: "High Irritability",
    color: "#e8453c",
    bg: "#fef2f1",
    stretchFreq: 3,
    stretchLabels: ["AM", "Afternoon", "PM"],
    strengthIds: [8, 9],
    motorIds: [10],
    weeks: "Weeks 1–4",
  },
  2: {
    label: "Phase 2",
    subtitle: "Moderate Irritability",
    color: "#d97706",
    bg: "#fffbeb",
    stretchFreq: 2,
    stretchLabels: ["AM", "PM"],
    strengthIds: [8, 11, 12, 13],
    motorIds: [10, 14],
    weeks: "Weeks 4–12",
  },
  3: {
    label: "Phase 3",
    subtitle: "Low Irritability",
    color: "#16a34a",
    bg: "#f0fdf4",
    stretchFreq: 1,
    stretchLabels: ["Once Daily"],
    strengthIds: [8, 11, 12, 13, 15],
    motorIds: [10, 14, 16],
    weeks: "Weeks 12–24+",
  },
};

const PAIN_COLORS = [
  "#22c55e","#4ade80","#86efac","#bef264","#eab308","#f97316","#ef4444","#dc2626","#991b1b","#7c2d12","#450a00"
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function YouTubeEmbed({ videoId, title }) {
  // If videoId starts with "PASTE_", show placeholder
  if (videoId.startsWith("PASTE_")) {
    return (
      <div style={{
        backgroundColor: "#f3f4f6", borderRadius: 8, padding: 20, textAlign: "center",
        border: "2px dashed #d1d5db",
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>📹</div>
        <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>Video Placeholder</div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Replace "{videoId}" with actual YouTube video ID</div>
      </div>
    );
  }
  
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 8 }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: 8,
        }}
      />
    </div>
  );
}

function PainScale({ value, onChange }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", minWidth: 80 }}>Pain Level</span>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
            <button
              key={n}
              onClick={() => onChange(n)}
              style={{
                width: 32, height: 32, borderRadius: 6, border: "none", cursor: "pointer",
                backgroundColor: value === n ? PAIN_COLORS[n] : "#e5e7eb",
                color: value === n ? (n >= 7 ? "#fff" : "#1f2937") : "#6b7280",
                fontWeight: value === n ? 700 : 500,
                fontSize: 13,
                boxShadow: value === n ? "0 2px 6px rgba(0,0,0,0.25)" : "none",
                transition: "all 0.15s ease",
                transform: value === n ? "scale(1.12)" : "scale(1)",
              }}
            >{n}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginLeft: 88, marginTop: 2, maxWidth: 376 }}>
        <span style={{ fontSize: 10, color: "#9ca3af" }}>No pain</span>
        <span style={{ fontSize: 10, color: "#9ca3af" }}>Worst imaginable</span>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, category, showVideo = false }) {
  const catColor = category === "stretch" ? "#3b82f6" : category === "strength" ? "#8b5cf6" : "#06b6d4";
  const catLabel = category === "stretch" ? "Stretch" : category === "strength" ? "Strength" : "Motor Control";
  const [videoOpen, setVideoOpen] = useState(showVideo);
  
  return (
    <div style={{
      border: `1px solid ${catColor}22`, borderRadius: 10, padding: "12px 14px",
      backgroundColor: `${catColor}08`, marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: videoOpen ? 12 : 0 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{
              backgroundColor: catColor, color: "#fff", fontSize: 11, fontWeight: 700,
              borderRadius: 4, padding: "2px 7px",
            }}>{catLabel}</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1f2937" }}>#{exercise.id} – {exercise.name}</span>
          </div>
          <p style={{ margin: "0 0 4px 0", fontSize: 13, color: "#4b5563", lineHeight: 1.5 }}>{exercise.desc}</p>
          <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>⏱ {exercise.time}</div>
        </div>
        <button
          onClick={() => setVideoOpen(!videoOpen)}
          style={{
            display: "flex", alignItems: "center", gap: 5, color: catColor,
            fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
            backgroundColor: `${catColor}15`, borderRadius: 6, padding: "6px 10px",
            border: "none", cursor: "pointer", transition: "all 0.15s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          {videoOpen ? "Hide" : "Watch"}
        </button>
      </div>
      {videoOpen && (
        <div style={{ marginTop: 10 }}>
          <YouTubeEmbed videoId={exercise.youtubeId} title={exercise.name} />
        </div>
      )}
    </div>
  );
}

function Day1Reference({ phase }) {
  const p = PHASES[phase];
  return (
    <div style={{
      border: `2px solid ${p.color}`, borderRadius: 14, overflow: "hidden", marginBottom: 20,
      boxShadow: `0 4px 14px ${p.color}22`,
    }}>
      <div style={{ backgroundColor: p.color, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>📖</span>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{p.label} – Exercise Reference</div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}>{p.subtitle} · {p.weeks} · Click "Watch" to view any video</div>
        </div>
      </div>
      <div style={{ padding: "14px 18px", backgroundColor: "#fff" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          🧘 Stretching – Exercises 1–7
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10, fontWeight: 500 }}>
          Do {p.stretchLabels.join(" / ")} · {p.stretchFreq}× daily
        </div>
        {STRETCHES.map(ex => <ExerciseCard key={ex.id} exercise={ex} category="stretch" />)}

        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, marginTop: 18, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          💪 Strengthening – Exercises {p.strengthIds.join(", ")}
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10, fontWeight: 500 }}>
          Do once daily · 5-6 days per week
        </div>
        {p.strengthIds.map(id => <ExerciseCard key={id} exercise={STRENGTHENING[id]} category="strength" />)}

        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, marginTop: 18, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          🧠 Motor Control – Exercises {p.motorIds.join(", ")}
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10, fontWeight: 500 }}>
          Do once daily · 5-6 days per week
        </div>
        {p.motorIds.map(id => <ExerciseCard key={id} exercise={MOTOR[id]} category="motor" />)}
      </div>
    </div>
  );
}

function DailyLogForm({ phase, onSubmit, submitted }) {
  const p = PHASES[phase];
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [pain, setPain] = useState(null);
  const [stretchChecks, setStretchChecks] = useState(p.stretchLabels.map(() => false));
  const [strengthDone, setStrengthDone] = useState(false);
  const [motorDone, setMotorDone] = useState(false);
  const [notes, setNotes] = useState("");

  const totalChecked = stretchChecks.filter(Boolean).length + (strengthDone ? 1 : 0) + (motorDone ? 1 : 0);
  const totalItems = stretchChecks.length + 2;

  const handleSubmit = () => {
    if (pain === null) { alert("Please select a pain level before submitting."); return; }
    onSubmit({ date, pain, stretchChecks, strengthDone, motorDone, notes, phase });
  };

  return (
    <div style={{
      border: "1.5px solid #e5e7eb", borderRadius: 14, padding: 20, backgroundColor: "#fafafa",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>📋</span>
        <div style={{ fontWeight: 700, fontSize: 17, color: "#1f2937" }}>Today's Log</div>
        <div style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: p.color, backgroundColor: p.bg, padding: "3px 10px", borderRadius: 20 }}>
          {p.label}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", minWidth: 80 }}>Date</label>
        <input
          type="date" value={date} onChange={e => setDate(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, fontFamily: "inherit" }}
        />
      </div>

      <PainScale value={pain} onChange={setPain} />

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "14px 0" }} />

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
          🧘 Stretching (Exercises 1–7)
          <span style={{ fontWeight: 400, color: "#6b7280", marginLeft: 6 }}>— check each session completed</span>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {p.stretchLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => {
                const next = [...stretchChecks];
                next[i] = !next[i];
                setStretchChecks(next);
              }}
              style={{
                display: "flex", alignItems: "center", gap: 7, padding: "8px 14px",
                borderRadius: 10, border: `2px solid ${stretchChecks[i] ? "#3b82f6" : "#d1d5db"}`,
                backgroundColor: stretchChecks[i] ? "#eff6ff" : "#fff",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              <span style={{
                width: 20, height: 20, borderRadius: 5, border: `2px solid ${stretchChecks[i] ? "#3b82f6" : "#9ca3af"}`,
                backgroundColor: stretchChecks[i] ? "#3b82f6" : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700,
              }}>{stretchChecks[i] ? "✓" : ""}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: stretchChecks[i] ? "#1d4ed8" : "#374151" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => setStrengthDone(!strengthDone)}
          style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: "10px 14px", borderRadius: 10,
            border: `2px solid ${strengthDone ? "#8b5cf6" : "#d1d5db"}`,
            backgroundColor: strengthDone ? "#f5f3ff" : "#fff",
            cursor: "pointer", transition: "all 0.15s",
          }}
        >
          <span style={{
            width: 20, height: 20, borderRadius: 5, border: `2px solid ${strengthDone ? "#8b5cf6" : "#9ca3af"}`,
            backgroundColor: strengthDone ? "#8b5cf6" : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700,
            flexShrink: 0,
          }}>{strengthDone ? "✓" : ""}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: strengthDone ? "#6d28d9" : "#374151" }}>
              💪 Strengthening – Exercises {p.strengthIds.join(", ")}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{p.strengthIds.map(id => STRENGTHENING[id].name).join(" · ")}</div>
          </div>
        </button>
      </div>

      <div style={{ marginBottom: 14 }}>
        <button
          onClick={() => setMotorDone(!motorDone)}
          style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: "10px 14px", borderRadius: 10,
            border: `2px solid ${motorDone ? "#06b6d4" : "#d1d5db"}`,
            backgroundColor: motorDone ? "#f0fdff" : "#fff",
            cursor: "pointer", transition: "all 0.15s",
          }}
        >
          <span style={{
            width: 20, height: 20, borderRadius: 5, border: `2px solid ${motorDone ? "#06b6d4" : "#9ca3af"}`,
            backgroundColor: motorDone ? "#06b6d4" : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700,
            flexShrink: 0,
          }}>{motorDone ? "✓" : ""}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: motorDone ? "#0891b2" : "#374151" }}>
              🧠 Motor Control – Exercises {p.motorIds.join(", ")}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{p.motorIds.map(id => MOTOR[id].name).join(" · ")}</div>
          </div>
        </button>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Notes (optional)</label>
        <textarea
          value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="How did it feel? Any sharp pain? Anything to flag for your therapist..."
          rows={2}
          style={{
            width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db",
            fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box",
            backgroundColor: "#fff",
          }}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
          <span>Session progress</span><span>{totalChecked}/{totalItems} complete</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, backgroundColor: "#e5e7eb", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 4, transition: "width 0.4s ease",
            width: `${(totalChecked / totalItems) * 100}%`,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
          }} />
        </div>
      </div>

      {!submitted ? (
        <button onClick={handleSubmit} style={{
          width: "100%", padding: "11px", borderRadius: 10, border: "none",
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
          boxShadow: "0 3px 10px rgba(59,130,246,0.35)",
        }}>
          ✓ Submit Today's Log
        </button>
      ) : (
        <div style={{
          textAlign: "center", padding: "12px", borderRadius: 10,
          background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", color: "#065f46", fontWeight: 700, fontSize: 15,
        }}>
          ✓ Today's log submitted!
        </div>
      )}
    </div>
  );
}

function LogHistory({ logs }) {
  if (logs.length === 0) return null;
  
  const avgPain = logs.length > 0 ? (logs.reduce((sum, l) => sum + l.pain, 0) / logs.length).toFixed(1) : 0;
  const totalDays = logs.length;
  const completionRate = logs.length > 0 
    ? Math.round((logs.reduce((sum, l) => {
        const completed = l.stretchChecks.filter(Boolean).length + (l.strengthDone ? 1 : 0) + (l.motorDone ? 1 : 0);
        const total = l.stretchChecks.length + 2;
        return sum + (completed / total);
      }, 0) / logs.length) * 100)
    : 0;
  
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#374151" }}>📊 Log History</div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Days</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1f2937" }}>{totalDays}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Avg Pain</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: avgPain <= 3 ? "#16a34a" : avgPain <= 6 ? "#d97706" : "#e8453c" }}>{avgPain}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Complete</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1f2937" }}>{completionRate}%</div>
          </div>
        </div>
      </div>
      
      <div style={{ maxHeight: 240, overflowY: "auto", borderRadius: 10, border: "1px solid #e5e7eb", backgroundColor: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6", position: "sticky", top: 0 }}>
              {["Date","Phase","Pain","Stretch","Strength","Motor","Notes"].map(h => (
                <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...logs].reverse().map((log, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "7px 10px", color: "#374151" }}>{log.date}</td>
                <td style={{ padding: "7px 10px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, backgroundColor: PHASES[log.phase].bg, color: PHASES[log.phase].color, borderRadius: 10, padding: "2px 8px" }}>
                    Phase {log.phase}
                  </span>
                </td>
                <td style={{ padding: "7px 10px" }}>
                  <span style={{
                    display: "inline-block", width: 24, height: 24, lineHeight: "24px", textAlign: "center",
                    borderRadius: 6, backgroundColor: PAIN_COLORS[log.pain], color: log.pain >= 7 ? "#fff" : "#1f2937",
                    fontWeight: 700, fontSize: 13,
                  }}>{log.pain}</span>
                </td>
                <td style={{ padding: "7px 10px", color: "#374151" }}>{log.stretchChecks.filter(Boolean).length}/{log.stretchChecks.length}</td>
                <td style={{ padding: "7px 10px", textAlign: "center" }}>{log.strengthDone ? "✓" : "—"}</td>
                <td style={{ padding: "7px 10px", textAlign: "center" }}>{log.motorDone ? "✓" : "—"}</td>
                <td style={{ padding: "7px 10px", color: "#6b7280", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ShareWithProvider({ logs }) {
  const [copied, setCopied] = useState(false);
  
  const generateSummary = () => {
    if (logs.length === 0) return "No data logged yet.";
    
    const avgPain = (logs.reduce((sum, l) => sum + l.pain, 0) / logs.length).toFixed(1);
    const totalDays = logs.length;
    const completionRate = Math.round((logs.reduce((sum, l) => {
      const completed = l.stretchChecks.filter(Boolean).length + (l.strengthDone ? 1 : 0) + (l.motorDone ? 1 : 0);
      const total = l.stretchChecks.length + 2;
      return sum + (completed / total);
    }, 0) / logs.length) * 100);
    
    const recentLogs = logs.slice(-7);
    const lastWeekPain = (recentLogs.reduce((sum, l) => sum + l.pain, 0) / recentLogs.length).toFixed(1);
    
    let summary = `FROZEN SHOULDER PROGRESS REPORT\n`;
    summary += `Generated: ${new Date().toLocaleDateString()}\n\n`;
    summary += `OVERVIEW:\n`;
    summary += `• Total days logged: ${totalDays}\n`;
    summary += `• Average pain level: ${avgPain}/10\n`;
    summary += `• Exercise completion rate: ${completionRate}%\n`;
    summary += `• Last 7 days pain avg: ${lastWeekPain}/10\n\n`;
    
    summary += `RECENT LOGS (Last 7 Days):\n`;
    recentLogs.reverse().forEach(log => {
      summary += `${log.date} | Pain: ${log.pain}/10 | Phase ${log.phase} | Stretch: ${log.stretchChecks.filter(Boolean).length}/${log.stretchChecks.length} | Strength: ${log.strengthDone ? "✓" : "✗"} | Motor: ${log.motorDone ? "✓" : "✗"}`;
      if (log.notes) summary += ` | Notes: ${log.notes}`;
      summary += `\n`;
    });
    
    return summary;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const downloadReport = () => {
    const summary = generateSummary();
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `frozen-shoulder-progress-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (logs.length === 0) return null;
  
  return (
    <div style={{
      marginTop: 24, border: "2px solid #3b82f6", borderRadius: 14, padding: 18,
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 24 }}>🩺</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#1e40af" }}>Share Progress with Your Therapist</div>
          <div style={{ fontSize: 13, color: "#3730a3", marginTop: 2 }}>Download or copy your progress report to share at your next appointment</div>
        </div>
      </div>
      
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button
          onClick={downloadReport}
          style={{
            flex: "1 1 auto", minWidth: 140,
            padding: "10px 16px", borderRadius: 10,
            border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "#fff", fontWeight: 600, fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Report
        </button>
        
        <button
          onClick={copyToClipboard}
          style={{
            flex: "1 1 auto", minWidth: 140,
            padding: "10px 16px", borderRadius: 10,
            border: "2px solid #3b82f6", cursor: "pointer",
            backgroundColor: copied ? "#d1fae5" : "#fff",
            color: copied ? "#065f46" : "#3b82f6",
            fontWeight: 600, fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 0.2s",
          }}
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy Summary
            </>
          )}
        </button>
      </div>
      
      <div style={{
        marginTop: 14, padding: 12, borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid #bfdbfe",
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#1e40af", marginBottom: 6 }}>💡 How to share:</div>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: "#1e3a8a", lineHeight: 1.6 }}>
          <li><strong>Download Report:</strong> Saves a text file you can email or text to your therapist</li>
          <li><strong>Copy Summary:</strong> Copies to clipboard — paste into email, text, or patient portal</li>
          <li><strong>Show Your Phone:</strong> Open this page at your appointment and show the log history table</li>
        </ul>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function FrozenShoulderApp() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [showDay1, setShowDay1] = useState(true);
  const [logs, setLogs] = useState(() => {
    // Load logs from localStorage on mount
    const saved = localStorage.getItem('frozenShoulderLogs');
    return saved ? JSON.parse(saved) : [];
  });
  const [submitted, setSubmitted] = useState(false);
  const [logKey, setLogKey] = useState(0);

  const p = PHASES[currentPhase];

  const handlePhaseChange = (phase) => {
    setCurrentPhase(phase);
    setShowDay1(true);
    setSubmitted(false);
    setLogKey(k => k + 1);
  };

  const handleSubmit = (logEntry) => {
    const newLogs = [...logs, logEntry];
    setLogs(newLogs);
    localStorage.setItem('frozenShoulderLogs', JSON.stringify(newLogs));
    setSubmitted(true);
    
    // Scroll to log history
    setTimeout(() => {
      const historyEl = document.getElementById('log-history');
      if (historyEl) historyEl.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#f1f5f9",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        padding: "20px 24px 16px", color: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 24 }}>🩺</span>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Frozen Shoulder Recovery Program</h1>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#94a3b8" }}>Daily exercise tracker · Video demonstrations · Progress monitoring</p>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "16px 16px 60px" }}>

        {/* Phase Selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
          {[1,2,3].map(ph => {
            const pp = PHASES[ph];
            const active = currentPhase === ph;
            return (
              <button key={ph} onClick={() => handlePhaseChange(ph)} style={{
                flex: "1 1 auto", minWidth: 100,
                padding: "10px 12px", borderRadius: 12,
                border: `2px solid ${active ? pp.color : "#d1d5db"}`,
                backgroundColor: active ? pp.bg : "#fff",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: active ? `0 2px 8px ${pp.color}33` : "0 1px 3px rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: active ? pp.color : "#374151" }}>{pp.label}</div>
                <div style={{ fontSize: 11, color: active ? pp.color : "#9ca3af", marginTop: 1 }}>{pp.subtitle}</div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>{pp.weeks}</div>
              </button>
            );
          })}
        </div>

        {/* Day 1 Reference toggle */}
        <div style={{ marginBottom: 14 }}>
          <button
            onClick={() => setShowDay1(!showDay1)}
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 10,
              border: `1.5px solid ${p.color}55`, backgroundColor: `${p.color}0a`,
              cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>📖</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: p.color }}>{p.label} Exercise Videos & Instructions</span>
              <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 8 }}>— tap to {showDay1 ? "hide" : "show"}</span>
            </div>
            <span style={{ color: p.color, fontSize: 18, transition: "transform 0.2s", transform: showDay1 ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
          </button>
        </div>

        {showDay1 && <Day1Reference phase={currentPhase} />}

        {/* Pain warning box */}
        <div style={{
          border: "1px solid #fbbf24", borderRadius: 10, padding: "10px 14px",
          backgroundColor: "#fffbeb", marginBottom: 16,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 3 }}>⚠️ Pain Guidelines</div>
          <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.5 }}>
            Stretching discomfort 0–3/10 is okay. <strong>Stop if:</strong> sharp pain &gt;4/10, pain lasts &gt;2 hrs after, ROM decreases, or night pain returns. Ice 15 min after if needed.
          </div>
        </div>

        {/* Daily Log Form */}
        <DailyLogForm key={logKey} phase={currentPhase} onSubmit={handleSubmit} submitted={submitted} />

        {/* Log History */}
        <div id="log-history">
          <LogHistory logs={logs} />
        </div>

        {/* Share with Provider */}
        <ShareWithProvider logs={logs} />

        {/* Footer note */}
        <div style={{ marginTop: 24, padding: 16, borderRadius: 10, backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>📱 Bookmark this page</div>
          <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>
            Add this page to your phone's home screen for quick daily access. Your progress saves automatically in your browser. Share your progress report with your therapist at each appointment.
          </div>
        </div>
      </div>
    </div>
  );
}
