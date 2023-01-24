import { Module } from '@nestjs/common';
import { BrokerModule } from './../broker/broker.module';
import { ChatController } from './chat.controller';

@Module({
  imports: [BrokerModule],
  controllers: [ChatController]
})
export class ChatModule {}
