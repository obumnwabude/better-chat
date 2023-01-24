import { IsDefined } from "class-validator";

export class ChatMessageDto {
  @IsDefined()
  author: string;
  
  @IsDefined()
  text: string;
}
 