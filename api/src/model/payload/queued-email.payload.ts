export class QueuedEmailPayload {
  attempts: number;
  to: string;
  template: string;
  data: any;
  subject?: string;
}
