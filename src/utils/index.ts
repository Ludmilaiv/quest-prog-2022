export const playSound = (name: string) => {
  const audio = document.getElementById(name) as HTMLAudioElement;
  if (!audio) return;
  audio.play();
};