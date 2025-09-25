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
      className={`card ${selected ? "card-selected" : ""}`} 
      onClick={onClick} 
    > 
      <img src={image} alt={name} /> 
      <div className="card-body"> 
        <h3>{name}</h3> 
        <p>{species}</p> 
        <p>{status}</p> 
      </div> 
    </div> 
  ); 
} 
 