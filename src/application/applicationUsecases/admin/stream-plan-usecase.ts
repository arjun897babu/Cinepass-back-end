import { CustomError } from "../../../utils/CustomError";
import { HTTPActions, HttpStatusCode, ResponseStatus } from "../../../utils/enum"
import { IStreamPlanProps } from "../../../utils/interface"
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies"

const streamPlanUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { addStreamPlan, editStreamPlan, getStreamPlan, isPlanExists, deleteStreamPlan } } = dependencies

  return {
    execute: async (streamPlanProps: IStreamPlanProps) => {

      try {

        if (
           (
            streamPlanProps.action === HTTPActions.add
            || streamPlanProps.action === HTTPActions.edit
          )
          && streamPlanProps.data) {
          const isExists = await isPlanExists(streamPlanProps.data.planName)
          if (isExists) {
            throw new CustomError('Plan already exists', HttpStatusCode.BAD_REQUEST, 'planName')
          }
        }

        let response

        if (
          streamPlanProps.action === HTTPActions.add
          && streamPlanProps.data
        ) {
          response = await addStreamPlan(streamPlanProps.data)
        }
         
        else if (
          streamPlanProps.action === HTTPActions.edit
          && streamPlanProps.data
          && streamPlanProps.planId
        ) {
          response = await editStreamPlan(streamPlanProps.planId, streamPlanProps.data)
        }

        else if (
          streamPlanProps.action === HTTPActions.delete
          && streamPlanProps.planId
        ) {
          response = await deleteStreamPlan(streamPlanProps.planId)
        }

        else if (
          streamPlanProps.action === HTTPActions.get
          && streamPlanProps.filter
        ) {
          response = await getStreamPlan(streamPlanProps.filter)
        }


        if (!response) {
          throw new CustomError('plan not found', HttpStatusCode.NOT_FOUND, 'plan')
        }

        return {
          status: ResponseStatus.SUCCESS,
          message: `Streaming plan ${checkAction(streamPlanProps.action)}`,
          data: response
        }
      } catch (error) {
        throw error
      }
    }
  }
};

export {
  streamPlanUsecase
}


export function checkAction(action: HTTPActions) {
  switch (action) {
    case HTTPActions.add:
      return 'added'
    case HTTPActions.delete:
      return 'deleted'
    case HTTPActions.edit:
      return 'edited'
    case HTTPActions.get:
      return 'fetched successfully'
  }
}