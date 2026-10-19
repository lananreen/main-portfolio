import { useLayoutEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import "./JellyRadio.css";

// React Bits Jelly Radio springs: independent axes create the squash-and-stretch.
const spring = (stiffness, mass, bounce) => ({
  type: "spring",
  stiffness,
  damping: 2 * Math.sqrt(stiffness * mass) * (1 - bounce),
  mass,
});

function JellyChip({ item, index, selected, onChange }) {
  const ref = useRef(null);
  const initialized = useRef(false);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const sx = useMotionValue(1);
  const sy = useMotionValue(1);
  const transform = useTransform(() => `translateX(${x.get()}px) scale(${sx.get()}, ${sy.get()})`);
  const active = index === selected;

  useLayoutEffect(() => {
    const button = ref.current;
    const group = button.parentElement;
    let animations = [];
    const apply = (instant) => {
      animations.forEach(animation => animation.stop());
      const width = group.children[selected]?.offsetWidth ?? 0;
      const direction = getComputedStyle(group).direction === "rtl" ? -1 : 1;
      const distance = Math.abs(index - selected);
      const targetX = Math.sign(index - selected) * direction * (width * 0.12 / 2 + 3);
      const scale = active ? 1.12 : 0.97;
      if (instant || reduce) {
        x.jump(targetX);
        sx.jump(scale);
        sy.jump(scale);
        return;
      }
      const k = 580 * (1 - 0.12 * Math.min(distance, 3));
      const delay = distance * 0.022;
      animations = [
        animate(x, targetX, { ...spring(k, 0.9, 0.25), delay }),
        animate(sx, scale, { ...spring(k * 1.24, 0.8, 0.55), delay }),
        animate(sy, scale, { ...spring(k * 0.86, 0.95, 0.25), delay: delay + 0.05 }),
      ];
    };
    apply(!initialized.current);
    initialized.current = true;
    let measuredWidth = group.offsetWidth;
    const observer = new ResizeObserver(() => {
      const nextWidth = group.offsetWidth;
      if (nextWidth === measuredWidth) return;
      measuredWidth = nextWidth;
      apply(true);
    });
    observer.observe(group);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.stop());
    };
  }, [active, index, selected, reduce, x, sx, sy]);

  return (
    <motion.button
      ref={ref}
      type="button"
      className="jelly-radio__chip"
      data-on={active}
      aria-current={active ? "location" : undefined}
      aria-controls={item.id}
      style={{ transform }}
      onClick={() => onChange(item.id)}
    >
      <span className="jelly-radio__skin">{item.label}</span>
    </motion.button>
  );
}

export default function JellyRadio({ items, value, onChange }) {
  const selected = Math.max(0, items.findIndex(item => item.id === value));
  return (
    <div className="jelly-radio">
      {items.map((item, index) => (
        <JellyChip key={item.id} item={item} index={index} selected={selected} onChange={onChange} />
      ))}
    </div>
  );
}
