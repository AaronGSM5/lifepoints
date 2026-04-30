export const settingsSections = [
  {
    title: 'Your Account',
    data: [
      { id: '1', label: 'Edit Profile', icon: 'user', type: 'link', route: '/setting/edit-profile' },
      { id: '2', label: 'Security & Login', icon: 'shield', type: 'link', route: '/setting/security' },
      { id: '3', label: 'Linked Services', icon: 'link', type: 'link', route: '/setting/linked-services' },
      { id: '4', label: 'Notifications', icon: 'bell', type: 'link', route: '/setting/notifications' },
      { id: '5', label: 'Subscription', icon: 'star', type: 'link', route: '/setting/subscription' },
    ],
  },
  {
    title: 'App Experience',
    data: [
      { id: '6', label: 'Appearance', icon: 'moon', type: 'link', route: '/setting/appearance' },
      { id: '7', label: 'Language & Region', icon: 'globe', type: 'link', route: '/setting/language' },
      { id: '8', label: 'Storage & Cache', icon: 'hardDrive', type: 'action', actionName: 'clearCache' },
    ],
  },
  {
    title: 'Support & Legal',
    data: [
      { id: '9', label: 'Help & Support', icon: 'help', type: 'link', route: '/setting/support' },
      { id: '10', label: 'Privacy Policy', icon: 'shieldOff', type: 'link', route: '/setting/privacy' },
      { id: '11', label: 'Terms of Service', icon: 'fileText', type: 'link', route: '/setting/terms' },
      { id: '12', label: 'Delete Account', icon: 'userX', type: 'action', actionName: 'deleteAccount', danger: true },
    ],
  },
];