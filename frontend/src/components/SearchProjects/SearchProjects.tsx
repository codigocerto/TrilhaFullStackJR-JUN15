export default function SeachField({ valueTag,functionSetTag}:any) {
  return (
    <div>
      <input value={valueTag} onChange={(e)=>functionSetTag(e.target.value)} placeholder="Buscar Projetos" className="border border-preto-trila" />
    </div>
  );
}