import styles from './CharacterCard.module.scss';

type CharacterCardProps = { 
  id: number; 
  image: string; 
  name: string; 
  status: string; 
  species: string; 
  selected?: boolean; 
  onClick?: () => void; 
}; 
 
export default function CharacterCard({ 
  image, 
  name, 
  status, 
  species, 
  selected, 
  onClick, 
}: CharacterCardProps) { 
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.detail}>
          <span className={styles.statusDot} data-status={status}></span>
          {status} - {species}
        </p>
      </div>
    </div>
  );
} 
 