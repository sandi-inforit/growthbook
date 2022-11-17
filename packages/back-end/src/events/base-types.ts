export const APP_NOTIFICATION_EVENT_EMITTER_NAME = "notification_event";

/**
 * Supported events for event notifications
 */
export type NotificationEventName =
  | "feature.created"
  | "feature.updated"
  | "feature.deleted";

/**
 * Supported resources for event notifications
 */
export type NotificationEventResource = "feature" | "experiment";

/**
 * Event Notification payload
 */
export type NotificationEventPayload<
  EventName extends NotificationEventName,
  ResourceType extends NotificationEventResource | unknown,
  DataType
> = {
  event_id: string;
  event: EventName;
  object: ResourceType;
  data: DataType;
};

export interface NotificationEventHandler<
  NotificationEventPayload,
  ReturnType
> {
  (payload: NotificationEventPayload): Promise<ReturnType>;
}
