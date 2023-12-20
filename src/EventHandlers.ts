/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  RegistryContract_Canceled_handlerAsync,
  RegistryContract_CheckedIn_handlerAsync,
  RegistryContract_ConditionModuleWhitelisted_handlerAsync,
  RegistryContract_Created_handlerAsync,
  RegistryContract_OwnershipTransferred_handlerAsync,
  RegistryContract_Registered_handlerAsync,
  RegistryContract_Settled_handlerAsync,
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

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

RegistryContract_Canceled_handlerAsync(async ({ event, context }) => {
  let summary = await context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    canceledsCount: currentSummaryEntity.canceledsCount + BigInt(1),
  };

  context.log.info("sleeping for 1 seconds to test async code!")
  await sleep(1000)
  context.log.info("FINISHED: sleeping for 1 seconds to test async code!")

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

RegistryContract_CheckedIn_handlerAsync(async ({ event, context }) => {
  context.log.info("sleeping for 1 seconds to test async code!")
  await sleep(1000)
  context.log.info("FINISHED: sleeping for 1 seconds to test async code!")

  let summary = await context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

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

RegistryContract_ConditionModuleWhitelisted_handlerAsync(async ({ event, context }) => {
  context.log.info("sleeping for 1 seconds to test async code!")
  await sleep(1000)
  context.log.info("FINISHED: sleeping for 1 seconds to test async code!")

  let summary = await context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

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

RegistryContract_Created_handlerAsync(async ({ event, context }) => {
  context.log.info("sleeping for 1 seconds to test async code!")
  await sleep(1000)
  context.log.info("FINISHED: sleeping for 1 seconds to test async code!")

  let summary = await context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

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

RegistryContract_OwnershipTransferred_handlerAsync(async ({ event, context }) => {
  context.log.info("sleeping for 1 seconds to test async code!")
  await sleep(1000)
  context.log.info("FINISHED: sleeping for 1 seconds to test async code!")

  let summary = await context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

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

RegistryContract_Registered_handlerAsync(async ({ event, context }) => {
  context.log.info("sleeping for 1 seconds to test async code!")
  await sleep(1000)
  context.log.info("FINISHED: sleeping for 1 seconds to test async code!")

  let summary = await context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

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

RegistryContract_Settled_handlerAsync(async ({ event, context }) => {
  let summary = await context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

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
