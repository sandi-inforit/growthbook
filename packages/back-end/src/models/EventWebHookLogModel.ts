import { randomUUID } from "crypto";
import _ from "lodash";
import mongoose from "mongoose";
import { EventWebHookLogInterface } from "../../types/event-webhook-log";

const eventWebHookLogSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  eventWebHookId: {
    type: String,
    required: true,
  },
  dateCreated: Date,
  responseCode: {
    type: Number,
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
  result: {
    type: String,
    enum: ["success", "error"],
    required: true,
  },
  payload: {
    type: Object,
    required: true,
  },
});

eventWebHookLogSchema.index({ eventWebHookId: 1 });

type EventWebHookLogDocument = mongoose.Document & EventWebHookLogInterface;

const toInterface = (doc: EventWebHookLogDocument): EventWebHookLogDocument =>
  _.omit(doc.toJSON(), ["__v", "_id"]) as EventWebHookLogDocument;

const EventWebHookLogModel = mongoose.model<EventWebHookLogDocument>(
  "EventWebHookLog",
  eventWebHookLogSchema
);

type CreateEventWebHookLogOptions = {
  eventWebHookId: string;
  payload: Record<string, unknown>;
  result:
    | {
        state: "error";
        error: string;
        responseCode: number | null;
      }
    | {
        state: "success";
        responseCode: number;
      };
};

/**
 * Create an event web hook log item.
 * @param options CreateEventWebHookLogOptions
 * @returns Promise<EventWebHookLogInterface>
 */
export const createEventWebHookLog = async ({
  eventWebHookId,
  payload,
  result: resultState,
}: CreateEventWebHookLogOptions): Promise<EventWebHookLogInterface> => {
  const now = new Date();
  const error = resultState.state === "error" ? resultState.error : null;

  const doc = await EventWebHookLogModel.create({
    id: `ewhl-${randomUUID()}`,
    dateCreated: now,
    eventWebHookId,
    result: resultState.state,
    responseCode: resultState.responseCode,
    error,
    payload,
  });

  return toInterface(doc);
};
