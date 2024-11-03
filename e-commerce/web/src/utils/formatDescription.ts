const formatDescription = (desc: string) => 
  desc.length > 130
    ? desc.slice(0, 120) + '...'
    : desc;

export default formatDescription;