export type Action =
  | "next"
  | "previous"
  | "cancel"
  | "draft"
  | "complete"
  | "step";

export type CommonStepProps = {
  onActionTriggered: (action?: Action, stepNumber?: number, data?: any) => any;
};
