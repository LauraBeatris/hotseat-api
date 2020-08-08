export default interface ICreateNotificationDTO {
  read?: boolean;
  content: string;
  recipient_id: string;
}
