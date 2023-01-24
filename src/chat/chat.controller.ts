import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BrokerService } from 'src/broker/broker.service';
import { ChatMessageDto } from './chat-message.dto';

@Controller('chat')
export class ChatController {
  private readonly chatMessages = [];

  constructor(private brokerService: BrokerService) {}

  onModuleInit(): void {
    this.brokerService.consumer.on('message', (message) => {
      this.chatMessages.push(
        JSON.parse(message.getData().toString()) as ChatMessageDto,
      );
      message.ack();
    });
  }

  @Get('')
  all(): ChatMessageDto[] {
    return this.chatMessages;
  }

  @Post('')
  async send(
    @Body() chatMessage: ChatMessageDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.brokerService.producer.produce({
      message: Buffer.from(JSON.stringify(chatMessage)),
    });
    res.json({ status: true, message: 'Acknowledged' });
  }
}
