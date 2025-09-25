type CharacterCardProps = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
};

export default function CharacterCard({ image, name, status, species }: CharacterCardProps) {
  return (
    <div className="card">
      <img src={image} alt={name} width={140} height={140} />
      <div className="card-body">
        <h3>{name}</h3>
        <p>{species}</p>
        <p>{status}</p>
      </div>
    </div>
  );
}
