/* global jest */
const mockReplace = jest.fn();
const mockPush = jest.fn();
const mockBack = jest.fn();
const mockUsePathname = jest.fn(() => "/");

module.exports = {
  useRouter: () => ({
    replace: mockReplace,
    push: mockPush,
    back: mockBack
  }),
  router: {
    replace: mockReplace,
    push: mockPush,
    back: mockBack
  },
  usePathname: mockUsePathname,
};