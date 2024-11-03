export default interface Animation {
  duration: string;
  delay?: string;
  fill: 'backwards' | 'forwards';
  cubic?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}