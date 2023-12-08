/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  RegistryContract_Canceled_loader,
  RegistryContract_Canceled_handler,
  RegistryContract_CheckedIn_loader,
  RegistryContract_CheckedIn_handler,
  RegistryContract_ConditionModuleWhitelisted_loader,
  RegistryContract_ConditionModuleWhitelisted_handler,
  RegistryContract_Created_loader,
  RegistryContract_Created_handler,
  RegistryContract_OwnershipTransferred_loader,
  RegistryContract_OwnershipTransferred_handler,
  RegistryContract_Registered_loader,
  RegistryContract_Registered_handler,
  RegistryContract_Settled_loader,
  RegistryContract_Settled_handler,
} from "../generated/src/Handlers.gen";

import {
  CanceledEntity,
  CheckedInEntity,
  ConditionModuleWhitelistedEntity,
  CreatedEntity,
  OwnershipTransferredEntity,
  RegisteredEntity,
  SettledEntity,
  EventsSummaryEntity,
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  canceledsCount: BigInt(0),
  checkedInsCount: BigInt(0),
  conditionModuleWhitelistedsCount: BigInt(0),
  createdsCount: BigInt(0),
  ownershipTransferredsCount: BigInt(0),
  registeredsCount: BigInt(0),
  settledsCount: BigInt(0),
};

RegistryContract_Canceled_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_Canceled_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    canceledsCount: currentSummaryEntity.canceledsCount + BigInt(1),
  };

  let canceledEntity: CanceledEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    eventId: event.params.id,
    reason: event.params.reason,
    data: event.params.data,
    sender: event.params.sender,
    timestamp: event.params.timestamp,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Canceled.set(canceledEntity);
});

RegistryContract_CheckedIn_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_CheckedIn_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    checkedInsCount: currentSummaryEntity.checkedInsCount + BigInt(1),
  };

  let checkedInEntity: CheckedInEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    eventId: event.params.id,
    attendees: event.params.attendees,
    data: event.params.data,
    sender: event.params.sender,
    timestamp: event.params.timestamp,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.CheckedIn.set(checkedInEntity);
});

RegistryContract_ConditionModuleWhitelisted_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_ConditionModuleWhitelisted_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    conditionModuleWhitelistedsCount:
      currentSummaryEntity.conditionModuleWhitelistedsCount + BigInt(1),
  };

  let conditionModuleWhitelistedEntity: ConditionModuleWhitelistedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    conditionModule: event.params.conditionModule,
    whitelisted: event.params.whitelisted,
    sender: event.params.sender,
    timestamp: event.params.timestamp,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ConditionModuleWhitelisted.set(conditionModuleWhitelistedEntity);
});

RegistryContract_Created_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_Created_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    createdsCount: currentSummaryEntity.createdsCount + BigInt(1),
  };

  let createdEntity: CreatedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    eventId: event.params.id,
    contentUri: event.params.contentUri,
    conditionModule: event.params.conditionModule,
    data: event.params.data,
    sender: event.params.sender,
    timestamp: event.params.timestamp,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Created.set(createdEntity);
});

RegistryContract_OwnershipTransferred_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_OwnershipTransferred_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    ownershipTransferredsCount:
      currentSummaryEntity.ownershipTransferredsCount + BigInt(1),
  };

  let ownershipTransferredEntity: OwnershipTransferredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.OwnershipTransferred.set(ownershipTransferredEntity);
});

RegistryContract_Registered_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_Registered_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    registeredsCount: currentSummaryEntity.registeredsCount + BigInt(1),
  };

  let registeredEntity: RegisteredEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    eventId: event.params.id,
    participant: event.params.participant,
    data: event.params.data,
    sender: event.params.sender,
    timestamp: event.params.timestamp,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Registered.set(registeredEntity);
});

RegistryContract_Settled_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_Settled_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    settledsCount: currentSummaryEntity.settledsCount + BigInt(1),
  };

  let settledEntity: SettledEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    eventId: event.params.id,
    data: event.params.data,
    sender: event.params.sender,
    timestamp: event.params.timestamp,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Settled.set(settledEntity);
});
