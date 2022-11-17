import { FeatureUpdatedNotificationHandler } from "../../notifiers/FeatureUpdatedNotifier";
import { ApiFeatureInterface } from "../../../../types/api";

export const slackHandleFeatureUpdatedNotifier: FeatureUpdatedNotificationHandler = async (
  payload
) => {
  console.log("slackHandleFeatureUpdatedNotifier -> ", payload);

  const feature: ApiFeatureInterface = payload.data;

  // Do async things
};
