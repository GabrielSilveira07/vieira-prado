"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { areas, consult } from "@/content/site";
import styles from "./ConsultDrawer.module.css";

type Props = { isOpen: boolean; initialArea: string | null; openKey: number; onClose: () => void };
type Data = { area: string; form: string; name: string; contact: string; message: string };
const empty: Data = { area: "", form: "", name: "", contact: "", message: "" };

/** Consulta em três etapas: área → forma de atendimento → dados. */
export default function ConsultDrawer({ isOpen, initialArea, openKey, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Partial<Record<"name" | "contact", string>>>({});
  const panel = useRef<HTMLElement>(null);
  const last = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    last.current = document.activeElement as HTMLElement;
    setData({ ...empty, area: initialArea ?? "" });
    setErrors({});
    setStep(initialArea ? 2 : 1);
    window.__lenis?.stop();
    return () => { window.__lenis?.start(); last.current?.focus(); };
  }, [isOpen, openKey, initialArea]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("button[data-choice], input")?.focus(), 80);
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    addEventListener("keydown", key);
    return () => { clearTimeout(t); removeEventListener("keydown", key); };
  }, [isOpen, step, onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!data.name.trim()) err.name = consult.errors.name;
    if (!data.contact.trim()) err.contact = consult.errors.contact;
    setErrors(err);
    if (!Object.keys(err).length) setStep(4);
  };

  const choices = (list: { name: string; note: string }[], pick: (v: string) => void) => (
    <div>
      {list.map((c) => (
        <button key={c.name} type="button" className={styles.choice} data-choice onClick={() => pick(c.name)}>
          <span className={styles.cn}>{c.name}</span><small>{c.note}</small>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className={`${styles.scrim} ${isOpen ? styles.open : ""}`} onClick={onClose} aria-hidden="true" />
      <aside ref={panel} className={`${styles.drawer} ${isOpen ? styles.open : ""}`} role="dialog" aria-modal="true" aria-labelledby="consult-title" aria-hidden={!isOpen} inert={!isOpen}>
        <div className={styles.top}>
          <span className="k">{step < 4 ? `Etapa ${step} de 3` : "Solicitação"}</span>
          <button type="button" className="k" onClick={onClose}>Fechar</button>
        </div>
        <div className={styles.body}>
          {step === 1 && (<>
            <h2 id="consult-title" className={styles.h}>{consult.steps.area}</h2>
            {choices([...areas.items.map((a) => ({ name: a.name, note: a.kind })), { name: consult.other.name, note: consult.other.kind }], (v) => { setData((d) => ({ ...d, area: v })); setStep(2); })}
          </>)}
          {step === 2 && (<>
            <h2 id="consult-title" className={styles.h}>{consult.steps.form}</h2>
            {choices(consult.forms, (v) => { setData((d) => ({ ...d, form: v })); setStep(3); })}
            <div className={styles.foot}><button type="button" className={styles.back} onClick={() => setStep(1)}>Voltar</button><span className="k">{data.area}</span></div>
          </>)}
          {step === 3 && (<>
            <h2 id="consult-title" className={styles.h}>{consult.steps.data}</h2>
            <form onSubmit={submit} noValidate className={styles.form}>
              <label className={styles.field}><span className="k">{consult.fields.name}</span>
                <input name="name" autoComplete="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} aria-invalid={!!errors.name} />
                {errors.name && <span className={styles.err}>{errors.name}</span>}</label>
              <label className={styles.field}><span className="k">{consult.fields.contact}</span>
                <input name="contact" value={data.contact} onChange={(e) => setData({ ...data, contact: e.target.value })} aria-invalid={!!errors.contact} />
                {errors.contact && <span className={styles.err}>{errors.contact}</span>}</label>
              <label className={styles.field}><span className="k">{consult.fields.message}</span>
                <textarea rows={3} placeholder={consult.fields.placeholder} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} /></label>
              <div className={styles.foot}><button type="button" className={styles.back} onClick={() => setStep(2)}>Voltar</button><button type="submit" className="ln">Enviar</button></div>
            </form>
          </>)}
          {step === 4 && (<>
            <h2 id="consult-title" className={styles.h}>{consult.steps.done}</h2>
            <p className={styles.p}>{consult.doneText}</p>
            <div>{[["Área", data.area], ["Atendimento", data.form], ["Nome", data.name], ["Contato", data.contact]].map(([l, v]) => (
              <div key={l} className={styles.choice} style={{ cursor: "default" }}><small>{l}</small><span>{v}</span></div>))}</div>
            <p className={styles.note}>{consult.pending}</p>
          </>)}
        </div>
      </aside>
    </>
  );
}
