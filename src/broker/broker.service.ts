import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MemphisService } from 'memphis-dev/nest';
import { Consumer, Producer } from 'memphis-dev/types';

@Injectable()
export class BrokerService implements OnModuleInit {
  consumer: Consumer;
  producer: Producer;

  constructor(
    private configService: ConfigService,
    private memphisService: MemphisService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.memphisService.connect({
        host: this.configService.get('MEMPHIS_HOST'),
        username: this.configService.get('MEMPHIS_USERNAME'),
        connectionToken: this.configService.get('MEMPHIS_TOKEN'),
      });
      this.consumer = await this.memphisService.consumer({
        stationName: 'chat',
        consumerName: 'chatConsumer',
        consumerGroup: 'chatConsumers',
      });
      this.producer = await this.memphisService.producer({
        stationName: 'chat',
        producerName: 'chatProducer',
      });
    } catch (error) {
      console.error(error);
      this.memphisService.close();
    }
  }
}
