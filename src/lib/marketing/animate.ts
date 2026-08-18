/**
 * Marketing motion — one orchestrated language, used sparingly:
 * `reveal` fades sections up as they enter, `countUp` rolls the real
 * stats. GSAP loads client-side only; `prefers-reduced-motion` disables
 * everything (elements simply render in place).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Action } from "svelte/action";

let registered = false;
function ensure(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return true;
}

/** Fade-up the node (or its direct children when stagger is set). */
export const reveal: Action<HTMLElement, { stagger?: number; y?: number } | undefined> = (
  node,
  opts,
) => {
  if (!ensure()) return;
  const targets = opts?.stagger ? Array.from(node.children) : node;
  const tween = gsap.from(targets, {
    opacity: 0,
    y: opts?.y ?? 28,
    duration: 0.7,
    ease: "power2.out",
    stagger: opts?.stagger ?? 0,
    scrollTrigger: { trigger: node, start: "top 82%", once: true },
  });
  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    },
  };
};

/** Roll a numeric stat from 0 to its rendered value (keeps suffixes). */
export const countUp: Action<HTMLElement> = (node) => {
  if (!ensure()) return;
  const raw = node.textContent ?? "";
  const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(num)) return;
  const suffix = raw.replace(/^[0-9,.]+/, "");
  const state = { v: 0 };
  const tween = gsap.to(state, {
    v: num,
    duration: 1.4,
    ease: "power2.out",
    scrollTrigger: { trigger: node, start: "top 85%", once: true },
    onUpdate() {
      node.textContent = Math.round(state.v).toLocaleString() + suffix;
    },
  });
  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
    },
  };
};
