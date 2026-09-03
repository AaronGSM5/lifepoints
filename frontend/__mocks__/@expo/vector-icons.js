const React = require('react');
const { Text } = require('react-native');

const MockIcon = (props) => React.createElement(Text, props, props.name);

module.exports = {
  Ionicons: MockIcon,
  MaterialIcons: MockIcon,
  FontAwesome: MockIcon,
  Feather: MockIcon,
  AntDesign: MockIcon,
  Entypo: MockIcon,
  EvilIcons: MockIcon,
  Foundation: MockIcon,
  MaterialCommunityIcons: MockIcon,
  Octicons: MockIcon,
  SimpleLineIcons: MockIcon,
  Zocial: MockIcon,
};