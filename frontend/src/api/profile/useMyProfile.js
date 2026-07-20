import { useQuery } from "@tanstack/react-query";

import { createProfileQueryOptions } from "./profileOptions";

export const useMyProfile = () => {
  return useQuery(createProfileQueryOptions());
};
