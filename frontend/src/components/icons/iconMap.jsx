import { MyTheme } from "@/constants/Colors";
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5, Feather } from "@expo/vector-icons";

export const IconMap = {
  // Navigation Tabs
  home: ({ outline, ...props }) => <Ionicons name={outline ? "home-outline" : "home"} {...props} />,
  communities: ({ outline, ...props }) => <Ionicons name={outline ? "people-outline" : "people"} {...props} />,
  tasks: ({ outline, ...props }) => <Ionicons name={outline ? "book-outline" : "book"} {...props} />,
  shop: ({ outline, ...props }) => <Ionicons name={outline ? "bag-outline" : "bag"} {...props} />,
  profile: ({ outline, ...props }) => <Ionicons name={outline ? "person-outline" : "person"} {...props} />,
  help: (props) => <Ionicons name="help-circle" {...props} />,

  // Toolbar
  back: (props) => <Ionicons name="chevron-back" {...props} />,
  notifications: (props) => <Ionicons name="notifications-outline" {...props} />,
  settings: (props) => <Ionicons name="settings-outline" {...props} />,

  // UI
  add: (props) => <MaterialIcons name="add" {...props} />,
  filter: (props) => <Ionicons name="filter" {...props} />,
  checkmark: (props) => <Ionicons name="checkmark" {...props} />,
  close: (props) => <Ionicons name="close" {...props} />,
  eyeOpen: (props) => <Ionicons name={"eye-outline"} {...props} />,
  eyeClosed: (props) => <Ionicons name={"eye-off-outline"} {...props} />,
  checkmarkCircle: (props) => <Ionicons name={"checkmark-circle-outline"} {...props} />,
  infoCircle: (props) => <Ionicons name={"information-circle-outline"} {...props} />,
  bulb: (props) => <Ionicons name="bulb-outline" {...props} />,
  search: (props) => <Ionicons name="search" {...props} />,
  send: (props) => <Ionicons name="send" {...props} />,
  pencil: (props) => <MaterialCommunityIcons name="pencil" {...props} />,
  share: (props) => <Ionicons name="share-social-outline" {...props} />,
  statsChart: (props) => <Ionicons name="stats-chart" {...props} />,
  trophy: (props) => <FontAwesome5 name="trophy" {...props} color={MyTheme.gold} />,
  wallet: (props) => <Ionicons name="wallet-outline" {...props} />,
  lock: (props) => <FontAwesome5 name="lock" {...props} />,

  // Placeholders
  newFolder: (props) => <MaterialIcons name="create-new-folder" {...props} />,
  timer: (props) => <Ionicons name="timer" {...props} />,
  fire: (props) => <FontAwesome5 name="fire" {...props} />,
  gem: (props) => <FontAwesome5 name="gem" {...props} />,
  ban: (props) => <FontAwesome5 name="ban" {...props} />,
  calendar: (props) => <FontAwesome5 name="calendar" {...props} />,
  music: (props) => <FontAwesome5 name="music" {...props} />,
  shopping: (props) => <MaterialCommunityIcons name="shopping-outline" {...props} />,
  shoppingCat: (props) => <Feather name="shopping-bag" {...props} />,
  coffeeCat: (props) => <Feather name="coffee" {...props} />,
  techCat: (props) => <Feather name="smartphone" {...props} />,
  giftCat: (props) => <Feather name="gift" {...props} />,
  dumbbell: (props) => <FontAwesome5 name="dumbbell" {...props} />,
  sun: (props) => <FontAwesome5 name="sun" {...props} />,
  robot: (props) => <FontAwesome5 name="robot" {...props} />,
  book: (props) => <FontAwesome5 name="book" {...props} />,
  candy: (props) => <FontAwesome5 name="candy-cane" {...props} />,
  bed: (props) => <FontAwesome5 name="bed" {...props} />
};
