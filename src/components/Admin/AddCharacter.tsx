import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useCreateCharacter } from "../../hooks/useCreateCharacter";

const AddCharacter = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const Navigate = useNavigate();
  const [setAvatarUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "ArabGuard Sentinel",
    level: 1,
    persona: "The Vigilant Guardian",
    persona_desc: "I am the vigilant guardian of the digital realm.",
    target: "Defense the digital realm.",
    secret_category: "defense, vigilance",
    success_msg: "You have successfully bypassed the ArabGuard Sentinel's defenses, proving your cunning and skill. The Sentinel nods in acknowledgment of your achievement, recognizing you as a worthy challenger in the realm of cybersecurity.",
    prompt_template: "You are {{persona}}, a formidable adversary in the world of cybersecurity.",
    points_required: 0,
    points_reward: 0,
    avatar: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 const handleAvatarChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const previewUrl = URL.createObjectURL(file);
  setAvatar(previewUrl);
  const token = localStorage.getItem("access_token");
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(
    "http://localhost:8001/admin/upload-avatar",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to upload avatar");
  }

  const data = await res.json();

  // Save REAL URL
  setAvatarUrl(data.avatar_url);

  setForm(prev => ({
    ...prev,
    avatar: `http://localhost:8001${data.avatar_url}`,
  }));
};
  const navigate = useNavigate();
  const createCharacter = useCreateCharacter();
  const handleSubmit = async () => {
    try {
        await createCharacter.mutateAsync(form);
        console.log("form", form);
        navigate("/admin/characters");
    } catch (err) {
        console.error(err);
    }
    };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ac-root {
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          background: #0b1120;
        }

        
        /* ── Hero ── */
        .ac-hero {
          background: linear-gradient(
            135deg,
            #14532d,
            #166534
          );
          padding: 36px 32px 72px;
          position: relative;
          overflow: hidden;
        }
        .ac-hero::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 48px;
          background: #0b1120;
          clip-path: ellipse(55% 100% at 50% 100%);
        }
        .ac-hero-title {
          font-family: 'Cinzel', serif;
          font-size: 26px;
          font-weight: 700;
          color: #EAF4FB;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }
        .ac-hero-sub {
          font-size: 13px;
          color: #c9c9c9ff;
          letter-spacing: 0.04em;
        }

        /* ── Avatar ── */
        .ac-avatar-float {
          display: flex;
          justify-content: center;
          margin-top: -52px;
          margin-bottom: 28px;
          position: relative;
          z-index: 2;
        }
        .ac-avatar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .ac-avatar-portal {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid #C8D8EA;
          box-shadow: 0 4px 20px rgba(26,53,88,0.18), 0 0 0 3px rgba(55,138,221,0.2);
          border: 3px solid #10b981;
          background: #182235;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .ac-avatar-portal:hover {
          box-shadow: 0 6px 28px rgba(26,53,88,0.24), 0 0 0 4px rgba(55,138,221,0.35);
        }
        .ac-avatar-portal img { width: 100%; height: 100%; object-fit: cover; }
        .ac-avatar-overlay {
          position: absolute; inset: 0;
          background: rgba(26,53,88,0.6);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 4px;
          opacity: 0; transition: opacity 0.2s;
        }
        .ac-avatar-portal:hover .ac-avatar-overlay { opacity: 1; }
        .ac-avatar-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          color: #378ADD;
        }
        .ac-avatar-label {
          font-size: 11px;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4A6E8A;
        }

        /* ── Canvas ── */
        .ac-canvas {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        /* ── Cards ── */
        .ac-card {
          background: #182235;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 16px;
          box-shadow: 0 2px 10px rgba(26,53,88,0.07);
        }

        /* ── Section head ── */
        .ac-section-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .ac-section-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(16,185,129,.15);
          color: #10b981;
          border: 1px solid rgba(16,185,129,.25);
          display: flex; align-items: center; justify-content: center;
        }
        .ac-section-title {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .ac-section-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, #9EC0DC, transparent);
        }

        /* ── Grid ── */
        .ac-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 540px) {
          .ac-grid-2 { grid-template-columns: 1fr; }
        }

        /* ── Fields ── */
        .ac-field { display: flex; flex-direction: column; gap: 6px; }
        .ac-label {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        .ac-label-required::after { content: ' *'; color: #1A5FA5; }

        .ac-input,
        .ac-textarea {
          background: rgba(100, 98, 98, 0.23);
          color: #f8fafc;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          padding: 10px 13px;
          outline: none;
          width: 100%;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .ac-input::placeholder,
        .ac-textarea::placeholder { color: #9AB5CC; }
        .ac-input:focus,
        .ac-textarea:focus {
          background: rgba(100, 98, 98, 0.23);
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16,185,129,.15);
        }
        .ac-textarea { resize: vertical; min-height: 88px; line-height: 1.6; }
        .ac-textarea-mono {
          font-family: 'SFMono-Regular', 'Consolas', monospace;
          font-size: 13px;
          min-height: 116px;
        }

        /* ── Template hint ── */
        .ac-template-wrap { position: relative; }
        .ac-template-hint {
          position: absolute; top: 10px; right: 10px;
          font-size: 10px; color: #378ADD;
          background: rgba(16,185,129,.15);
          border: 1px solid rgba(16,185,129,.25);
          color: #10b981;
          border-radius: 4px; padding: 2px 7px;
          pointer-events: none;
          letter-spacing: 0.04em;
        }

        /* ── Points card ── */
        .ac-points-card {
          background: rgba(16,185,129,.05);
          border: 1px solid rgba(16,185,129,.15);
          border-radius: 10px;
          padding: 16px;
        }
        .ac-number-wrap { position: relative; }
        .ac-number-prefix {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          font-size: 13px; color: #378ADD;
          pointer-events: none;
        }
        .ac-input-prefixed { padding-left: 28px; }

        /* ── Actions ── */
        .ac-actions {
          display: flex; gap: 10px;
          justify-content: flex-end;
          margin-top: 8px;
        }
        .ac-btn-ghost {
          padding: 10px 22px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid rgba(255,255,255,.08);
          color: #cbd5e1;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .ac-btn-ghost:hover { border-color: #378ADD; color: #919192ff; }
        .ac-btn-primary {
          padding: 10px 26px;
          border-radius: 8px;
          border: none;
          background: #10b981;
          color: #04110a;
          font-family: 'Cinzel', serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.08em;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(26,95,165,0.3);
          display: flex; align-items: center; gap: 7px;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .ac-btn-primary:hover {
          background: #34d399;
          box-shadow: 0 6px 20px rgba(26,95,165,0.4);
          transform: translateY(-1px);
        }
        .ac-btn-primary:active { transform: translateY(0); }
      `}</style>

      <div className="ac-root">

        <div className="ac-hero">
          <div className="ac-hero-title">New Character</div>
          <div className="ac-hero-sub">Define identity, behaviour, and game mechanics</div>
        </div>

        <div className="ac-avatar-float">
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
          <div className="ac-avatar-wrap">
            <div className="ac-avatar-portal" onClick={() => fileRef.current?.click()}>
              {avatar ? (
                <>
                  <img src={avatar} alt="Character avatar" />
                  <div className="ac-avatar-overlay">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EAF4FB" strokeWidth="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    <span style={{ fontSize: 9, color: "#EAF4FB", letterSpacing: "0.07em" }}>CHANGE</span>
                  </div>
                </>
              ) : (
                <div className="ac-avatar-placeholder">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
              )}
            </div>
            <span className="ac-avatar-label">Character Avatar</span>
          </div>
        </div>

        <div className="ac-canvas">

          <div className="ac-card">
            <div className="ac-section-head">
              <div className="ac-section-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
              <span className="ac-section-title">Identity</span>
              <div className="ac-section-line" />
            </div>
            <div className="ac-grid-2" style={{ marginBottom: 14 }}>
              <div className="ac-field">
                <label className="ac-label ac-label-required">Title</label>
                <input name="title" className="ac-input" placeholder="e.g. The Steel Warden" value={form.title} onChange={handleChange} />
              </div>
              <div className="ac-field">
                <label className="ac-label ac-label-required">Level</label>
                <input name="level" type="number" min={1} className="ac-input" placeholder="1" value={form.level} onChange={handleChange} />
              </div>
            </div>
            <div className="ac-field" style={{ marginBottom: 14 }}>
              <label className="ac-label ac-label-required">Persona</label>
              <input name="persona" className="ac-input" placeholder="Short persona name or archetype" value={form.persona} onChange={handleChange} />
            </div>
            <div className="ac-field">
              <label className="ac-label">Persona Description</label>
              <textarea name="persona_desc" className="ac-textarea" placeholder="Describe this character's personality, backstory, and demeanor…" value={form.persona_desc} onChange={handleChange} />
            </div>
          </div>

          {/* Behaviour */}
          <div className="ac-card">
            <div className="ac-section-head">
              <div className="ac-section-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="ac-section-title">Behaviour</span>
              <div className="ac-section-line" />
            </div>
            <div className="ac-grid-2" style={{ marginBottom: 14 }}>
              <div className="ac-field">
                <label className="ac-label ac-label-required">Target</label>
                <input name="target" className="ac-input" placeholder="Who does this character target?" value={form.target} onChange={handleChange} />
              </div>
              <div className="ac-field">
                <label className="ac-label ac-label-required">Secret Category</label>
                <input name="secret_category" className="ac-input" placeholder="e.g. manipulation, deception" value={form.secret_category} onChange={handleChange} />
              </div>
            </div>
            <div className="ac-field" style={{ marginBottom: 14 }}>
              <label className="ac-label">Success Message</label>
              <input name="success_msg" className="ac-input" placeholder="Message shown when player succeeds…" value={form.success_msg} onChange={handleChange} />
            </div>
            <div className="ac-field">
              <label className="ac-label ac-label-required">Prompt Template</label>
              <div className="ac-template-wrap">
                <span className="ac-template-hint">{"{{variables}}"}</span>
                <textarea name="prompt_template" className="ac-textarea ac-textarea-mono" placeholder={"You are {{persona}}, speaking to {{target}}. Your goal is to…"} value={form.prompt_template} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="ac-card">
            <div className="ac-section-head">
              <div className="ac-section-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className="ac-section-title">Game Mechanics</span>
              <div className="ac-section-line" />
            </div>
            <div className="ac-points-card">
              <div className="ac-grid-2">
                <div className="ac-field">
                  <label className="ac-label">Points Required</label>
                  <div className="ac-number-wrap">
                    <span className="ac-number-prefix">◈</span>
                    <input name="points_required" type="number" min={0} className="ac-input ac-input-prefixed" placeholder="0" value={form.points_required} onChange={handleChange} />
                  </div>
                </div>
                <div className="ac-field">
                  <label className="ac-label">Points Reward</label>
                  <div className="ac-number-wrap">
                    <span className="ac-number-prefix">◈</span>
                    <input name="points_reward" type="number" min={0} className="ac-input ac-input-prefixed" placeholder="0" value={form.points_reward} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ac-actions">
            <button className="ac-btn-ghost" onClick={() => Navigate("/admin/characters")}>
              Discard
            </button>
            <button className="ac-btn-primary" onClick={handleSubmit}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Create
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AddCharacter;