import styles from "./CharacterCardSkeleton.module.scss";

export default function CharacterCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.info}>
        <div className={styles.lineLg} />
        <div className={styles.lineSm} />
      </div>
    </div>
  );
}