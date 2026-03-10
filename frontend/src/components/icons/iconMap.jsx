import React from "react";
import Icon from "react-native-remix-icon";

const getName = (baseName, outline) => {
  const exceptions = ["spotify", "google", "apple", "facebook", "twitter"];
  if (exceptions.includes(baseName)) return `${baseName}-fill`;

  return outline ? `${baseName}-line` : `${baseName}-fill`;
};

export const IconMap = {
  // Navigation Tabs
  home: ({ outline, ...props }) => <Icon name={getName("home", outline)} {...props} />,
  communities: ({ outline, ...props }) => <Icon name={getName("user-community", outline)} {...props} />,
  tasks: ({ outline, ...props }) => <Icon name={getName("heart-add-2", outline)} {...props} />,
  shop: ({ outline, ...props }) => <Icon name={getName("shopping-bag-4", outline)} {...props} />,
  profile: ({ outline, ...props }) => <Icon name={getName("user", outline)} {...props} />,
  help: (props) => <Icon name="question-line" {...props} />,
  // Toolbar
  back: (props) => <Icon name="arrow-left-s-line" size={28} {...props} />,
  notifications: ({ outline, ...props }) => <Icon name={getName("notification", outline)} {...props} />,
  settings: ({ outline, ...props }) => <Icon name={getName("settings-3", outline)} {...props} />,
  // UI
  add: (props) => <Icon name="add-line" {...props} />,
  filter: (props) => <Icon name="equalizer-line" {...props} />,
  checkmark: (props) => <Icon name="check-line" {...props} />,
  close: (props) => <Icon name="close-line" {...props} />,
  eyeOpen: (props) => <Icon name="eye-line" {...props} />,
  eyeClosed: (props) => <Icon name="eye-close-line" {...props} />,
  checkmarkCircle: (props) => <Icon name="checkbox-circle-line" {...props} />,
  infoCircle: (props) => <Icon name="information-line" {...props} />,
  bulb: (props) => <Icon name="lightbulb-line" {...props} />,
  search: (props) => <Icon name="search-line" {...props} />,
  send: (props) => <Icon name="send-plane-2-fill" {...props} />,
  pencil: (props) => <Icon name="edit-2-line" {...props} />,
  share: (props) => <Icon name="share-line" {...props} />,
  statsChart: ({ outline, ...props }) => <Icon name={getName("bar-chart-2", outline)} {...props} />,
  trophy: ({ outline, ...props }) => <Icon name={getName("trophy", outline)} {...props} />,
  wallet: (props) => <Icon name="wallet-line" {...props} />,
  lock: (props) => <Icon name="lock-password-line" {...props} />,
  forwardShare: (props) => <Icon name="share-forward-line" {...props} />,
  chat: (props) => <Icon name="chat-3-line" {...props} />,
  heart: ({ outline, ...props }) => <Icon name={getName("heart-3", outline)} {...props} />,
  bookmark: ({ outline, ...props }) => <Icon name={getName("bookmark", outline)} {...props} />,
  dots: (props) => <Icon name="more-2-fill" {...props} />,
  right: (props) => <Icon name="arrow-right-s-line" {...props} />,
  trash: (props) => <Icon name="delete-bin-6-line" {...props} />,
  // Placeholders
  newFolder: (props) => <Icon name="folder-add-line" {...props} />,
  timer: (props) => <Icon name="timer-line" {...props} />,
  fire: (props) => <Icon name="fire-fill" {...props} />,
  gem: (props) => <Icon name="vip-diamond-fill" {...props} />,
  ban: (props) => <Icon name="forbid-line" {...props} />,
  calendar: (props) => <Icon name="calendar-2-line" {...props} />,
  music: (props) => <Icon name="music-ai-line" {...props} />,
  shopping: (props) => <Icon name="shopping-bag-2-line" {...props} />,
  shoppingCat: (props) => <Icon name="shopping-cart-line" {...props} />,
  mail: (props) => <Icon name="mail-send-line" {...props} />,
  coffeeCat: (props) => <Icon name="cup-line" {...props} />,
  techCat: (props) => <Icon name="smartphone-line" {...props} />,
  giftCat: (props) => <Icon name="gift-2-line" {...props} />,
  dumbbell: (props) => <Icon name="pulse-line" {...props} />,
  sun: (props) => <Icon name="sun-line" {...props} />,
  robot: (props) => <Icon name="robot-2-line" {...props} />,
  book: (props) => <Icon name="book-open-line" {...props} />,
  candy: (props) => <Icon name="cookie-line" {...props} />,
  bed: (props) => <Icon name="zzz-line" {...props} />,
  user: (props) => <Icon name="id-card-line" {...props} />,
  shield: (props) => <Icon name="shield-keyhole-line" {...props} />,
  link: (props) => <Icon name="links-line" {...props} />,
  bell: (props) => <Icon name="notification-line" {...props} />,
  star: (props) => <Icon name="star-line" {...props} />,
  moon: (props) => <Icon name="moon-line" {...props} />,
  globe: (props) => <Icon name="earth-line" {...props} />,
  hardDrive: (props) => <Icon name="hard-drive-3-line" {...props} />,
  shieldOff: (props) => <Icon name="shield-flash-line" {...props} />,
  fileText: (props) => <Icon name="file-text-line" {...props} />,
  userX: (props) => <Icon name="user-unfollow-line" {...props} />,
  bicycle: (props) => <Icon name="riding-line" {...props} />,
  camera: (props) => <Icon name="camera-4-fill" {...props} />,
  spotify: (props) => <Icon name="spotify-fill" color="#1DB954" {...props} />,
  at: (props) => <Icon name="at-line" {...props} />
};
