import { queryOptions } from "@tanstack/react-query"

import { mapUserProfileData } from "./profileMappers"
import { apiRequest } from "../client/api"

export const profileKeys = {
  me: ["profile", "me"]
}

export const createProfileQueryOptions = () => {
  return queryOptions({
    queryKey: profileKeys.me,
    queryFn: async () => {
      const data = await apiRequest("/pages/user")
      return mapUserProfileData(data)
    }
  })
}