import { BigInt } from "@graphprotocol/graph-ts"
import {
  CorgiFarmManager,
  Deposit,
  DepositEvent,
  EmergencyWithdraw,
  OwnershipTransferred,
  SafeCorgiTransfer,
  UpdatePoolEvent,
  Withdraw
} from "../generated/CorgiFarmManager/CorgiFarmManager"
import { ExampleEntity } from "../generated/schema"

export function handleDeposit(event: Deposit): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())
    entity.totalStake = BigInt.fromI32(0)
  }

  // Entity fields can be set based on event parameters
  entity.user = event.params.user
  entity.pid = event.params.pid

  if(entity.totalStake !== null) {
    entity.totalStake = entity.totalStake.plus(event.params.amount)
  }
 

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BONUS_MULTIPLIER(...)
  // - contract.CorgiPerBlock(...)
  // - contract.corToken(...)
  // - contract.distributeRewardWallet(...)
  // - contract.getMultiplier(...)
  // - contract.holdRewardedWallet(...)
  // - contract.migrator(...)
  // - contract.owner(...)
  // - contract.pendingCorgi(...)
  // - contract.poolInfo(...)
  // - contract.poolLength(...)
  // - contract.rewardToken(...)
  // - contract.startBlock(...)
  // - contract.totalAllocPoint(...)
  // - contract.userInfo(...)
}

export function handleDepositEvent(event: DepositEvent): void {}

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleSafeCorgiTransfer(event: SafeCorgiTransfer): void {}

export function handleUpdatePoolEvent(event: UpdatePoolEvent): void {}

export function handleWithdraw(event: Withdraw): void {
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())
    entity.totalStake = BigInt.fromI32(0)   
  }

  // BigInt and BigDecimal math are supported

  // Entity fields can be set based on event parameters
  entity.user = event.params.user
  entity.pid = event.params.pid
 
  if(entity.totalStake !== null) {
    entity.totalStake = entity.totalStake.minus(event.params.amount)
  }
  
  // Entities can be written to the store with `.save()`
  entity.save()

}
