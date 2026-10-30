import styles from "./AboutVisual.module.css";

// Exact service categories, node positions CSS ke .node1-.node4 se match karti hain
const practices = [
  { index: "01", title: "Business & Enterprise", x: 24, y: 18 },
  { index: "02", title: "Technology & Software", x: 76, y: 28 },
  { index: "03", title: "Marketing & Digital Growth", x: 22, y: 76 },
  { index: "04", title: "Facility Services", x: 74, y: 86 },
];

const ariaLabel = `Diagram: OSS at the center, connecting four practice areas: ${practices
  .map((p) => p.title)
  .join(", ")}.`;

export default function AboutVisual() {
  return (
    <figure className={styles.figure}>
      <div className={styles.stage} role="img" aria-label={ariaLabel}>
        <div className={styles.disc} />
        <div className={styles.ringSolid} />
        <div className={styles.ringDashed} />

        <svg className={styles.lines} viewBox="0 0 100 100" aria-hidden="true">
          {practices.map((p) => (
            <line
              key={p.index}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              className={styles.line}
            />
          ))}
        </svg>

        <div className={`${styles.sphere} ${styles.sphereA}`} />
        <div className={`${styles.sphere} ${styles.sphereB}`} />

        <div className={styles.hubHalo} />
        <div className={styles.hub}>
          <span>OSS</span>
        </div>

        {practices.map((p, i) => (
          <div key={p.index} className={`${styles.node} ${styles[`node${i + 1}`]}`}>
            <span className={styles.nodeLabel}>PRACTICE {p.index}</span>
            <span className={styles.nodeTitle}>{p.title}</span>
          </div>
        ))}
      </div>

      <figcaption className={styles.caption}>
        ONE PARTNER · FOUR PRACTICES · ONE ROOF
      </figcaption>
    </figure>
  );
}
