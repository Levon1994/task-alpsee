const isAndroid = () => !!navigator.userAgent.match(/Android/i);
const isOpera = () => !!navigator.userAgent.match(/Opera Mini/i);
const isWindows = () => !!navigator.userAgent.match(/IEMobile/i);
const isIOS = () => !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
const isBlackBerry = () => !!navigator.userAgent.match(/BlackBerry/i);

const isMobile = () => isAndroid() || isBlackBerry() || isIOS() || isOpera() || isWindows();

export default isMobile;
