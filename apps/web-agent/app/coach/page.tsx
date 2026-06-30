import { Coach } from "@/components/Coach";

export const metadata = {
  title: "Builder Loop Coach — turn an idea into something real",
  description: "A voice-first AI coach that guides your family through one Builder Loop.",
};

export default function CoachPage() {
  return (
    <main style={{ maxWidth: 1080, margin: "0 auto", padding: "1.2rem 1rem 3rem" }}>
      <header className="hero">
        <span className="eyebrow">🌱 Family Field Lab</span>
        <h1>
          Turn one idea into <span className="grad">something real people love</span>
        </h1>
        <p>
          Talk it through with your Builder Loop Coach. You build something small, show one real
          person, learn what to fix — five fast times. The coach does the busywork; you stay the mind.
        </p>
      </header>
      <Coach />
    </main>
  );
}
