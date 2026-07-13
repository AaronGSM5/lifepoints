import { memo } from "react";

import NotificationEntry from "./NotificationEntry";

const NotificationListItem = memo(({ item }) => (
  <NotificationEntry
    notification={{
      ...item,
      message: item.description,
      timestamp: item.formattedTime
    }}
  />
));
NotificationListItem.displayName = "NotificationListItem";

export default NotificationListItem;
