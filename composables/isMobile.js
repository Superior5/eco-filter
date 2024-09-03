export const isMobile = () => {
  if (process.client) {
    if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
      return window.innerWidth < 768;
    } else {
      return document.documentElement.clientWidth < 768;
    }
  }
  return false;
}