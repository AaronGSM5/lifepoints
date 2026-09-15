/* global jest */
const mockReplace = jest.fn();
const mockPush = jest.fn();
const mockBack = jest.fn();
const mockCanGoBack = jest.fn(() => true);
const mockUsePathname = jest.fn(() => "/");

module.exports = {
  useRouter: () => ({
    replace: mockReplace,
    push: mockPush,
    back: mockBack,
    canGoBack: mockCanGoBack,
  }),
  router: {
    replace: mockReplace,
    push: mockPush,
    back: mockBack,
    canGoBack: mockCanGoBack,
  },
  usePathname: mockUsePathname,
};