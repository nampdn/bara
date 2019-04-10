import { BaraAction } from './action'
import { AppStream } from './app'
import { Base } from './base'
import { BaraCondition } from './condition'
import { BaraEvent } from './event'

import { UseActionHookType } from '../hooks/use-action'
import { UseConditionHookType } from '../hooks/use-condition'
import { UseEventHookType } from '../hooks/use-event'

export interface BaraTriggerSetupReturn<T> {
  event?: (appStream: AppStream<T>) => BaraEvent<T> | null
  condition?: (...args: any[]) => BaraCondition<T> | null
  action?: (...args: any[]) => BaraAction<T> | null
}

export type BaraTriggerSetup<T> = (...args: any[]) => BaraTriggerSetupReturn<T>

export interface BaraTriggerConfig<T> extends Base {
  event: UseEventHookType<T> | null
}

export enum TriggerEntityType {
  EVENT = 'EVENT',
  CONDITION = 'CONDITION',
  ACTION = 'ACTION',
}

// You have to add UseXHookType<T> when add new entity to Bara Trigger in here
export type TriggerEntities<T> =
  | UseActionHookType<T>
  | UseConditionHookType<T>
  | UseEventHookType<T>

export type TriggerAttachFunc<T> = (
  type: TriggerEntityType,
  entity: TriggerEntities<T>,
  deps?: any[],
) => BaraEvent<T> | BaraCondition<T> | BaraAction<T> | void

export interface BaraTrigger<T> extends Base {
  // Metadata
  _config: BaraTriggerConfig<T>

  // Entities
  EVENT?: BaraEvent<T>
  CONDITION?: BaraCondition<T>
  ACTION?: BaraAction<T>

  // Methods
  attach: TriggerAttachFunc<T>
}